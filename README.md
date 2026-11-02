# Datacairns website

Marketing site built from design **C** (G42 look on the Snowflake homepage structure), with design **D**'s phone layout as the responsive behaviour.

- **Astro** prerenders every page to `dist/`.
- A **Cloudflare Worker** serves `dist/` as static assets and handles `/api/*`.

Static assets are free and unmetered on Cloudflare, so page views never count against the Workers free tier (100,000 requests/day). Only API calls run the Worker.

## Pages

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` (landing page, design C) |
| `/contact/` | `src/pages/contact.astro` |
| `/use-cases/` | `src/pages/use-cases/index.astro` (listing, filter and search) |
| `/use-cases/public-sector/`, `/finance/`, `/healthcare/` | `src/pages/use-cases/[slug].astro` (one template) |

Use-case content lives in `src/data/useCases.ts`. Retail and Manufacturing are written but have `hidden: true`. Set `hidden: false` to publish them; they also need a photo before they go live.

## API (`worker/index.ts`)

| Route | What it does |
| --- | --- |
| `POST /api/contact` | Validates the contact form and stores the lead |
| `POST /api/subscribe` | Newsletter sign-up from the footer |
| `GET /api/health` | Health check |

To add a feature, add an entry to `routes` in `worker/index.ts`. Every path under `/api/` reaches the Worker.

Submissions are always logged. Run `npx wrangler tail` to watch them, or open Workers Logs in the dashboard. To keep them in storage, add a KV namespace:

```bash
npx wrangler kv namespace create LEADS
```

Then paste the namespace id into the commented `kv_namespaces` block in `wrangler.jsonc`.

## Develop

```bash
npm install
npm run dev        # Astro dev server, pages only
npm run preview    # build, then run pages and API locally in the Workers runtime
npm run check      # type-check the Worker
```

## Deploy (Cloudflare free plan)

```bash
npx wrangler login
npm run deploy
```

The first deploy publishes to `datacairn-site.<your-subdomain>.workers.dev`. To use `datacairns.com`, open the dashboard and go to Workers & Pages › datacairn-site › Settings › Domains & Routes › Add › Custom domain. The domain's DNS has to be on Cloudflare.

You can also deploy on every push: connect the Git repo under Workers & Pages › Create › Import a repository. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.

## Note for Windows

Keep the project in a short folder path, such as `C:\dev\datacairn-site`. Very long paths (over ~200 characters) make Astro drop the page stylesheets from the build, and make `wrangler dev` fail with `SQLITE_CANTOPEN`.

## Still placeholder

- The "Ready for what's next" card image (a grey placeholder box, waiting on a render)
- Social links, Sign in, Docs/Blog/Events/About/Careers/Trust center, and the Privacy Policy (`href="#"`)
- Outcome figures on the use-case pages are illustrative targets, labelled as such on the page
