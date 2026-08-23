/**
 * Rehype plugin: prefix root-relative hrefs/srcs inside Markdown with the
 * configured base path.
 *
 * Astro rewrites base paths for links written in .astro files, but not for
 * links written inside Markdown bodies. Without this, every internal link in a
 * case study would 404 on a GitHub Pages project site.
 */
export function rehypeBaseUrl(options = {}) {
  const base = String(options.base ?? '/').replace(/\/+$/, '');

  const fix = (value) => {
    if (typeof value !== 'string') return value;
    // Root-relative only: leave protocol, protocol-relative, hash, mailto and
    // already-prefixed URLs untouched.
    if (!value.startsWith('/') || value.startsWith('//')) return value;
    if (base && (value === base || value.startsWith(`${base}/`))) return value;
    // Match the trailing-slash convention used by src/lib/url.ts.
    const [path, hash = ''] = value.split(/(?=#)/);
    const isFile = /\.[a-z0-9]+$/i.test(path);
    const withSlash = isFile || path.endsWith('/') ? path : `${path}/`;
    return `${base}${withSlash}${hash}`;
  };

  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.properties) {
      if (node.tagName === 'a') node.properties.href = fix(node.properties.href);
      if (node.tagName === 'img') node.properties.src = fix(node.properties.src);
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };

  return (tree) => {
    if (base) walk(tree);
  };
}

/**
 * Rehype plugin: drop HTML comments from rendered Markdown.
 *
 * Case studies carry TODO comments marking information I could not verify.
 * They belong in the content source, not in the shipped HTML.
 */
export function rehypeStripComments() {
  // Markdown comments reach hast either as `comment` nodes or, when raw HTML
  // passthrough is enabled, as `raw` nodes whose value is the comment source.
  const isComment = (node) =>
    node.type === 'comment' ||
    (node.type === 'raw' &&
      typeof node.value === 'string' &&
      /^\s*<!--[\s\S]*-->\s*$/.test(node.value));

  const strip = (node) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children = node.children.filter((child) => !isComment(child));
    node.children.forEach(strip);
  };
  return (tree) => strip(tree);
}
