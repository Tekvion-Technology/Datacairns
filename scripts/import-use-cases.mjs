// One-off import of src/data/useCases.ts into Strapi (Use case collection).
// Usage (PowerShell):  $env:STRAPI_TOKEN="<full-access token>"; node scripts/import-use-cases.mjs
// Add --dry to only print what would be sent. Safe to re-run: existing slugs are skipped.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const BASE = process.env.STRAPI_URL || 'https://stripi.tekvion-me.com';
const TOKEN = process.env.STRAPI_TOKEN;
const dry = process.argv.includes('--dry');
if (!TOKEN && !dry) { console.error('Set STRAPI_TOKEN first.'); process.exit(1); }

// Turn the TypeScript data file into plain JS we can evaluate.
let src = readFileSync(new URL('../src/data/useCases.ts', import.meta.url), 'utf8');
src = src
  .replace(/^import .*$/gm, '')
  .replace(/export interface UseCase \{[\s\S]*?\n\}\n/, '')
  .replace(/^\s*photo: \w+,\s*$/gm, '')
  .replace(/const all: UseCase\[\]/, 'const all')
  .replace(/export const useCases[\s\S]*$/, 'return all;');
const items = new Function(src)();

const headers = { Authorization: `Bearer ${TOKEN}` };
const photoFile = (slug) => new URL(`../src/assets/usecase-${slug}.png`, import.meta.url);

async function api(path, init = {}) {
  const res = await fetch(BASE + path, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const text = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${path} -> ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

async function upload(slug) {
  let buf;
  try { buf = readFileSync(photoFile(slug)); } catch { return null; }
  const form = new FormData();
  form.append('files', new Blob([buf], { type: 'image/png' }), basename(photoFile(slug).pathname));
  const [file] = await api('/api/upload', { method: 'POST', body: form });
  return file.id;
}

items.forEach((u, i) => {
  u.order = i;
});

for (const u of items) {
  const data = {
    slug: u.slug, sector: u.sector, title: u.title, summary: u.summary, sub: u.sub, tags: u.tags,
    dataIn: u.dataIn, aiDoes: u.aiDoes, teamGets: u.teamGets, alt: u.alt,
    tileBg: u.tile.bg, tileLine: u.tile.line, tilePebble: u.tile.pebble,
    challenge: u.challenge, solution: u.solution,
    points: u.points, caps: u.caps,
    deep: u.deep.map((text) => ({ text })),
    outcomes: u.outcomes, order: u.order,
  };
  if (dry) { console.log(u.slug, u.hidden ? '(hidden: draft)' : '(publish)', Object.keys(data).length, 'fields'); continue; }

  const found = await api(`/api/use-cases?filters[slug][$eq]=${u.slug}&status=draft`);
  if (found.data?.length) { console.log('skip (exists):', u.slug); continue; }

  const photo = await upload(u.slug);
  if (photo) data.photo = photo;
  // Hidden use cases are imported as drafts so editors can publish them later.
  const status = u.hidden ? 'draft' : 'published';
  await api(`/api/use-cases?status=${status}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  console.log('imported:', u.slug, `(${status})`, photo ? 'with photo' : 'no photo');
}
