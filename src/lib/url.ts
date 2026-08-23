/**
 * Base-path-aware URL helpers.
 *
 * The site may be served from a sub-path (GitHub Pages project site) or from a
 * domain root. Every internal href goes through `url()` so switching between
 * the two is a one-line change in astro.config.mjs.
 */

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** A path segment containing a dot is treated as a file, not a directory. */
const isFile = (path: string): boolean => /\.[a-z0-9]+$/i.test(path);

/**
 * Prefix an app-absolute path with the configured base path, and give
 * directory routes a trailing slash so they match the generated sitemap and
 * avoid a redirect hop on GitHub Pages.
 */
export function url(path: string): string {
  const [pathname = '', hash = ''] = path.split(/(?=#)/) as [string, string?];
  const normalised = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withSlash = isFile(normalised) || normalised.endsWith('/') ? normalised : `${normalised}/`;
  return `${BASE}${withSlash}${hash}`;
}

/** Fully-qualified URL, for canonical links, Open Graph tags and JSON-LD. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  const relative = url(path);
  return site ? new URL(relative, site).href : relative;
}

/** True when `href` points at `current` (or is an ancestor section of it). */
export function isCurrent(href: string, pathname: string): boolean {
  const target = url(href).replace(/#.*$/, '').replace(/\/+$/, '') || '/';
  const here = pathname.replace(/\/+$/, '') || '/';
  if (target === (BASE || '/')) return here === (BASE || '/');
  return here === target || here.startsWith(`${target}/`);
}
