/**
 * Post-build audit of dist/.
 *
 * Checks the things a broken deploy actually looks like: dead internal links,
 * images without alt text or intrinsic dimensions, missing SEO metadata,
 * duplicate or missing H1s, and leftover authoring placeholders.
 *
 * Usage: node scripts/verify-output.mjs [distDir]
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
const BASE = (process.env.BASE_PATH ?? '/portfolio').replace(/\/+$/, '');

const failures = [];
const warnings = [];
const fail = (page, message) => failures.push(`${page}: ${message}`);
const warn = (page, message) => warnings.push(`${page}: ${message}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const files = walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));

/** Resolve an app-absolute href to a file that must exist in dist. */
const resolveTarget = (href) => {
  let path = href.split('#')[0].split('?')[0];
  if (!path.startsWith(BASE)) return null;
  path = path.slice(BASE.length) || '/';
  const candidates = extname(path)
    ? [join(DIST, path)]
    : [join(DIST, path, 'index.html'), join(DIST, `${path.replace(/\/$/, '')}.html`)];
  return candidates.some(existsSync) ? true : candidates[0];
};

const PLACEHOLDERS = [/TODO/, /Lorem ipsum/i, /\bTBD\b/, /FIXME/, /\[[A-Z ]{3,}\]/];

for (const file of pages) {
  const page = file.slice(DIST.length) || '/';
  const html = readFileSync(file, 'utf8');

  // -- internal links ------------------------------------------------------
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const result = resolveTarget(href);
    if (result === null) fail(page, `link escapes base path: ${href}`);
    else if (result !== true) fail(page, `broken internal link: ${href}`);
  }

  // -- images --------------------------------------------------------------
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = /\balt="([^"]*)"/.exec(tag);
    if (!alt) fail(page, `<img> without alt attribute: ${tag.slice(0, 90)}`);
    else if (alt[1].trim() === '') warn(page, `empty alt (decorative?): ${tag.slice(0, 90)}`);
    if (!/\bwidth="\d+"/.test(tag)) fail(page, `<img> without width: ${tag.slice(0, 90)}`);
    if (!/\bheight="\d+"/.test(tag)) fail(page, `<img> without height: ${tag.slice(0, 90)}`);
    if (!/\bloading="/.test(tag) && !/\bfetchpriority="high"/.test(tag))
      warn(page, `<img> without loading hint: ${tag.slice(0, 90)}`);
  }

  // -- document metadata ---------------------------------------------------
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
  if (!title.trim()) fail(page, 'missing <title>');
  if (title.length > 65) warn(page, `title is ${title.length} chars (>65): "${title}"`);

  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
  if (!desc.trim()) fail(page, 'missing meta description');
  else if (desc.length < 50 || desc.length > 170)
    warn(page, `meta description is ${desc.length} chars (aim 50–170)`);

  if (!/rel="canonical"/.test(html)) fail(page, 'missing canonical link');
  if (!/property="og:image"/.test(html)) fail(page, 'missing og:image');
  if (!/<html[^>]*\blang="/.test(html)) fail(page, 'missing lang attribute on <html>');

  // -- headings ------------------------------------------------------------
  const h1s = [...html.matchAll(/<h1\b[^>]*>/g)].length;
  if (h1s === 0) fail(page, 'no <h1>');
  if (h1s > 1) fail(page, `${h1s} <h1> elements (expected exactly 1)`);

  // -- visible placeholders ------------------------------------------------
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ');
  for (const pattern of PLACEHOLDERS) {
    const hit = pattern.exec(visible);
    if (hit) fail(page, `placeholder text in visible copy: "${hit[0]}"`);
  }
  if (/<!--[\s\S]*?TODO/.test(html)) fail(page, 'TODO comment shipped in HTML');
}

// -- required files --------------------------------------------------------
for (const required of ['robots.txt', 'sitemap-index.xml', 'favicon.svg', '404.html']) {
  if (!existsSync(join(DIST, required))) fail('dist', `missing ${required}`);
}

const report = (label, items) => {
  if (!items.length) return;
  console.log(`\n${label} (${items.length}):`);
  for (const item of items) console.log(`  - ${item}`);
};

console.log(`Audited ${pages.length} pages and ${files.length} files in ${DIST}`);
report('WARNINGS', warnings);
report('FAILURES', failures);

if (failures.length) {
  console.log('\n✗ verification failed');
  process.exit(1);
}
console.log(`\n✓ no failures${warnings.length ? ` (${warnings.length} warnings)` : ''}`);
