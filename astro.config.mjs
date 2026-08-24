// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* ---------------------------------------------------------------------------
 * DEPLOYMENT TARGET
 *
 * The site is served from the custom domain in public/CNAME, so it lives at a
 * domain root and needs no base path. Both values can be overridden by
 * environment variables if the site is ever served from somewhere else:
 *
 *   SITE_URL="https://joellots.github.io" BASE_PATH="/portfolio" npm run build
 * ------------------------------------------------------------------------- */
const SITE = process.env.SITE_URL || 'https://joelokore.tech';

// An unset variable and an empty one mean different things: empty is a valid
// base path (a domain root), so it must not fall through to the default.
const envBase = process.env.BASE_PATH;
const BASE = envBase === undefined ? '/' : envBase || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // The whole site's CSS is ~5 kB gzipped per page. Inlining it removes a
    // render-blocking request, which is worth more here than cross-page
    // stylesheet caching.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    // Local files only: no remote image domains are permitted.
    domains: [],
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
