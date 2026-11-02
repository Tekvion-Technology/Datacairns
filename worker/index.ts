/**
 * Datacairn Worker.
 *
 * Pages and images are prerendered by Astro into ./dist and served by the
 * static-assets layer without invoking this Worker. wrangler.jsonc routes only
 * /api/* here (run_worker_first), so new server features go in `routes` below.
 */

export interface Env {
  ASSETS: Fetcher;
  /** Optional KV namespace for form submissions (see wrangler.jsonc). */
  LEADS?: KVNamespace;
  /** Strapi base URL, e.g. https://stripi.tekvion-me.com (set in wrangler.jsonc vars). */
  STRAPI_URL?: string;
  /** Strapi API token allowed to create Lead entries only (wrangler secret). */
  STRAPI_LEADS_TOKEN?: string;
}

type Handler = (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;

const routes: Record<string, Partial<Record<string, Handler>>> = {
  '/api/contact': { POST: handleContact },
  '/api/subscribe': { POST: handleSubscribe },
  '/api/health': { GET: async () => json({ ok: true }) },
};

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathname } = new URL(request.url);
    const route = routes[pathname.replace(/\/$/, '')];
    if (!route) {
      if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
      return env.ASSETS.fetch(request);
    }
    const handler = route[request.method];
    if (!handler) return json({ error: 'Method not allowed' }, 405, { allow: Object.keys(route).join(', ') });
    if (request.method === 'POST' && !sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
    try {
      return await handler(request, env, ctx);
    } catch (err) {
      console.error('API error', pathname, err);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

// ---------- Handlers ----------

const TOPICS = ['Book a demo', 'Talk to sales', 'Partnership', 'Something else'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const body = await readBody(request);
  if (!body) return json({ error: 'Invalid request.' }, 400);
  // Bots fill the hidden field; pretend success so they move on.
  if (str(body.company_website)) return json({ ok: true });

  const lead = {
    firstName: str(body.firstName, 100),
    lastName: str(body.lastName, 100),
    email: str(body.email, 200).toLowerCase(),
    company: str(body.company, 200),
    jobTitle: str(body.jobTitle, 200),
    phone: str(body.phone, 50),
    country: str(body.country, 100),
    topic: str(body.topic, 50),
    message: str(body.message, 5000),
  };
  const missing = (['firstName', 'lastName', 'email', 'company', 'country', 'topic'] as const).filter((k) => !lead[k]);
  if (missing.length) return json({ error: 'Please fill in the required fields.', fields: missing }, 422);
  if (!EMAIL_RE.test(lead.email)) return json({ error: 'Please enter a valid email address.', fields: ['email'] }, 422);
  if (!TOPICS.includes(lead.topic)) return json({ error: 'Please choose how we can help.', fields: ['topic'] }, 422);

  await store(env, 'contact', { ...lead, ...meta(request) });
  return json({ ok: true });
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  const body = await readBody(request);
  if (!body) return json({ error: 'Invalid request.' }, 400);
  if (str(body.company_website)) return json({ ok: true });
  const email = str(body.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 422);
  await store(env, 'subscribe', { email, ...meta(request) });
  return json({ ok: true });
}

// ---------- Helpers ----------

function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const type = request.headers.get('content-type') ?? '';
  try {
    if (type.includes('application/json')) {
      const data = await request.json();
      return data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
    }
    if (type.includes('form')) return Object.fromEntries(await request.formData());
  } catch {
    return null;
  }
  return null;
}

function str(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Rejects cross-site form posts; browsers always send Origin on fetch POSTs. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

function meta(request: Request) {
  return {
    receivedAt: new Date().toISOString(),
    ipCountry: (request.cf?.country as string | undefined) ?? null,
    userAgent: request.headers.get('user-agent'),
  };
}

/**
 * Saves a submission to Strapi (Lead collection) and to KV when those are configured,
 * and always logs it (visible with `wrangler tail` or in the dashboard's Workers logs).
 * Throws only when Strapi is configured and no other copy was stored, so the visitor sees an error.
 */
async function store(env: Env, kind: 'contact' | 'subscribe', record: Record<string, unknown>): Promise<void> {
  console.log(JSON.stringify({ kind, ...record }));
  let saved = false;
  if (env.LEADS) {
    const key = `${kind}:${record.receivedAt}:${crypto.randomUUID()}`;
    await env.LEADS.put(key, JSON.stringify(record));
    saved = true;
  }
  if (env.STRAPI_URL && env.STRAPI_LEADS_TOKEN) {
    try {
      const res = await fetch(`${env.STRAPI_URL.replace(/\/$/, '')}/api/leads`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${env.STRAPI_LEADS_TOKEN}` },
        body: JSON.stringify({ data: toLead(kind, record) }),
      });
      if (!res.ok) throw new Error(`Strapi responded ${res.status}`);
      saved = true;
    } catch (err) {
      console.error('Could not save lead to Strapi', err);
      if (!saved) throw err;
    }
  }
}

/** Maps a form submission onto the Lead content type. Fields it lacks go into the message. */
function toLead(kind: 'contact' | 'subscribe', r: Record<string, unknown>) {
  const extra = [['Job title', r.jobTitle], ['Phone', r.phone], ['Country', r.country]]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  const message = [r.message, ...extra].filter(Boolean).join('\n\n');
  return {
    name: [r.firstName, r.lastName].filter(Boolean).join(' ') || undefined,
    email: r.email,
    company: r.company || undefined,
    topic: r.topic || undefined,
    message: message || undefined,
    source: kind,
  };
}
