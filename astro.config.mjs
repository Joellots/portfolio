// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBaseUrl, rehypeStripComments } from './src/lib/rehype-base-url.mjs';

/* ---------------------------------------------------------------------------
 * DEPLOYMENT TARGET
 *
 * Change these two values (or set the matching environment variables in CI) to
 * point the build at wherever the site is hosted. Everything else — canonical
 * URLs, Open Graph tags, the sitemap and every internal link — derives from
 * them, so there is nothing else to hunt down.
 *
 *  A. GitHub Pages *project* site   (repo "portfolio" under github.com/Joellots)
 *       SITE = 'https://joellots.github.io'   BASE = '/portfolio'      <-- default
 *
 *  B. GitHub Pages *user* site      (repo named "Joellots.github.io")
 *       SITE = 'https://joellots.github.io'   BASE = '/'
 *
 *  C. Custom domain                 (e.g. joelokore.dev, via public/CNAME)
 *       SITE = 'https://joelokore.dev'        BASE = '/'
 * ------------------------------------------------------------------------- */
const SITE = process.env.SITE_URL || 'https://joellots.github.io';

// `actions/configure-pages` emits an EMPTY base_path for user sites and custom
// domains, so an unset variable and an empty one mean different things here.
const envBase = process.env.BASE_PATH;
const BASE = envBase === undefined ? '/portfolio' : envBase || '/';

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
  markdown: {
    // The unified processor is selected explicitly because the two rehype
    // plugins below need it: Astro 7 defaults to Sätteri, which does not run
    // unified plugins.
    processor: unified(),
    // Markdown bodies are authored with root-relative links; the first plugin
    // keeps them working when the site is served from a sub-path. The second
    // keeps authoring TODOs out of the shipped HTML.
    rehypePlugins: [[rehypeBaseUrl, { base: BASE }], rehypeStripComments],
  },
  image: {
    // Local files only: no remote image domains are permitted.
    domains: [],
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
