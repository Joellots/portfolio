import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';

/**
 * Generated rather than static so the sitemap URL always matches the
 * configured `site` and `base` in astro.config.mjs.
 */
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', ''];

  if (site) {
    lines.push(`Sitemap: ${absoluteUrl('/sitemap-index.xml', site)}`, '');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
