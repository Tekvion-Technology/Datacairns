// @ts-check
import { defineConfig } from 'astro/config';

// Pages are prerendered to ./dist and served by the Worker as static assets
// (free and unmetered on Cloudflare). Dynamic features live in worker/index.ts.
export default defineConfig({
  site: 'https://datacairns.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
