# joel-okore-portfolio

Personal site for Okore Joel Chidike. One responsive scrolling page, built with
Astro and TypeScript. Hand-written CSS on design tokens, no UI framework, and a
little under 1 kB of JavaScript (theme toggle plus nav highlighting).

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev          # http://localhost:4321/
```

## Scripts

| Command                | What it does                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                                                                                        |
| `npm run build`        | Production build into `dist/`                                                                                     |
| `npm run preview`      | Serve the built `dist/` locally                                                                                   |
| `npm run check`        | `astro check` — TypeScript and template diagnostics                                                               |
| `npm run format`       | Prettier, write                                                                                                   |
| `npm run format:check` | Prettier, verify only (what CI runs)                                                                              |
| `npm run audit:output` | Audit `dist/` for broken links, missing image alt or dimensions, SEO metadata, heading order and placeholder text |
| `npm run verify`       | format:check → check → build → audit:output                                                                       |

## Page structure

A single page, `src/pages/index.astro`, with anchor navigation:

`#about` · `#interests` · `#skills` · `#projects` · `#experience` ·
`#publications` · `#contact`

Three interactive pieces, each degrading cleanly without JavaScript:

- **`Accordion.astro`** wraps native `<details>`/`<summary>`, so disclosures
  (project internals, paper findings, skill groups) are keyboard operable and
  announced correctly with no script at all.
- **`ExperienceTabs.astro`** puts education and roles behind an Academic /
  Professional tab switch, laid out as a centre-spine timeline with entries
  alternating sides. It follows the ARIA tabs pattern (roving tabindex,
  arrow/Home/End keys). Without JavaScript both panels simply render in
  sequence.
- **`ProjectSlider.astro`** is a CSS scroll-snap track, so it swipes and
  scrolls natively; the arrows, position counter and dots are hidden until the
  script attaches them.

Skills render as two independent stacks rather than a two-column grid over one
list, so opening a disclosure grows only its own column.

## Where to edit your information

Nearly everything lives in **[`src/data/site.ts`](src/data/site.ts)**:

| What                                             | Export         |
| ------------------------------------------------ | -------------- |
| Name, title, email, CV path, meta description    | `person`       |
| Hero paragraph                                   | `heroIntro`    |
| About paragraphs                                 | `about`        |
| Telegram, Email, GitHub, LinkedIn, Scholar       | `links`        |
| Research interests                               | `interests`    |
| Roles                                            | `experience`   |
| Papers, DOI, plain-English summary, detail panel | `publications` |
| Degrees                                          | `education`    |
| Anchor navigation                                | `sections`     |

Other files:

- **Portraits** — `src/assets/images/joel-portrait.jpg` (4:5, hero) and
  `joel-portrait-contact.jpg` (1:1, Contact). Both are masked into an organic
  shape by `src/components/Portrait.astro`, which also draws the offset accent
  shape behind them; pass `variant="a"` or `"b"` to pick a shape. Sizing lives
  in `src/pages/index.astro` and must use `:global()`, because a component's
  scoped styles do not reach markup emitted by a child component.
- **Social card** — `public/og/joel-okore-og.jpg`. The design lives in
  [`scripts/og/template.html`](scripts/og/template.html) and is rendered by
  headless Chrome, so it uses the site's own typeface, palette and portrait
  shape. Edit the template (or the copy at the top of
  [`scripts/generate-og.sh`](scripts/generate-og.sh)), then run
  `./scripts/generate-og.sh`. Needs Chrome, ImageMagick and `fonttools`.
- **Favicon** — `public/favicon.svg` (a "J" monogram tile). The header uses a
  plain wordmark, no icon.

### Projects

One Markdown file per project in [`src/content/projects/`](src/content/projects/).
Frontmatter is schema-validated in
[`src/content.config.ts`](src/content.config.ts), so a typo fails the build.

```yaml
---
title: 'Aegis'
period: '2025 – 2026'
purpose: 'One sentence: what it is for.'
contribution: 'One or two sentences: what I actually did.'
outcome: 'Optional. Only when a source backs it up.' # omit rather than estimate
note: 'Optional scope qualifier, shown quietly under the outcome.'
repo: 'https://github.com/...'
order: 1
---
```

Everything shown comes from frontmatter; the Markdown body is unused, since
implementation detail lives on GitHub rather than on the page. Adding a project
means adding a file and giving it an unused `order`.

**If the projects disappear from `npm run dev`,** the content store has gone
stale — this happens when `content.config.ts` or the Markdown files change
while the dev server is running. Stop it, delete `.astro/`, and start it again.
Builds are never affected.

## Deployment

Live at **https://joelokore.tech**, from `Joellots/portfolio`.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every
push to `main` and can be triggered from the Actions tab. It formats,
type-checks, builds, audits the output and publishes `dist/`.

The site URL is fixed to the custom domain in the workflow rather than read
from `actions/configure-pages`. Reading it would produce
`joellots.github.io/portfolio` on any run made before the domain is attached,
baking a wrong base path into every asset URL.

`public/CNAME` holds the domain and is copied to the site root at build time.
It keeps the domain attached across redeploys, so do not remove it — but it
does **not** register the domain on its own. With Actions-based publishing the
domain must first be entered under **Settings → Pages → Custom domain**; the
CNAME-file-only route works for branch-based publishing, not this one. Until
that field is set, GitHub answers the domain with "Site not found".

### DNS

Apex domain, four `A` records and four `AAAA` records:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
```

Optionally `CNAME  www  joellots.github.io` so `www` redirects too.

With DNS in place, enter the domain under **Settings → Pages → Custom domain**
and save. GitHub then runs its DNS check and provisions the certificate, which
takes a few minutes; once that is done, tick **Enforce HTTPS**.

### Serving from somewhere else

Both values are environment variables, so no code change is needed:

```bash
SITE_URL="https://joellots.github.io" BASE_PATH="/portfolio" npm run build
```

### Troubleshooting

**`Get Pages site failed … Not Found`**, or **`Create Pages site failed …
Resource not accessible by integration`** — Pages has never been switched on
for the repository. A workflow cannot switch it on itself: the default
`GITHUB_TOKEN` has no permission to create a Pages site, so
`actions/configure-pages` with `enablement: true` fails too. That step is not
in this workflow for exactly that reason.

Fix it once, by hand: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. Then re-run the workflow from the Actions tab.

## Design notes

**Tokens.** Colour, type, spacing and motion live as custom properties in
[`src/styles/tokens.css`](src/styles/tokens.css). **Light is the default**
whatever the operating system prefers; dark applies only under
`[data-theme='dark']`, which the toggle stamps on `<html>` and persists in
`localStorage`. Dark is a soft neutral grey (`#1b1c1f`) rather than
near-black. Every text colour is annotated with its measured contrast ratio;
all pass WCAG AA.

**Type.** Geist for interface and headings, Newsreader for long-form reading,
Geist Mono for dates and small labels. Geist and Geist Mono are a designed
pair. All three are variable, so one file covers every weight. Latin subsets
are self-hosted in `src/assets/fonts/`, vendored from the Fontsource packages
in `devDependencies`, and all three are preloaded.

**Links.** Internal hrefs go through `url()` in
[`src/lib/url.ts`](src/lib/url.ts), which applies the base path and normalises
trailing slashes so they match the sitemap.

**Motion.** Only two transitions exist: link colour and the accordion chevron.
`prefers-reduced-motion: reduce` disables both, along with smooth scrolling.

**No layout shift.** Three separate causes were found and fixed by measuring
the live site, all invisible locally because everything loads instantly there:

1. The tab panels and slider controls were painted in a pre-hydration state and
   rearranged by script. They now paint their final state, with `<noscript>`
   restoring the no-JS fallback.
2. The hero portrait wrapper used `max-inline-size` with `margin-inline: auto`.
   Auto inline margins stop a grid item stretching, so the wrapper sized to
   fit-content of an image that had no intrinsic size yet — zero until it
   loaded, then 300px. It now takes a definite `inline-size`.
3. `font-display: swap` rewrapped every line when the web fonts arrived. The
   `Geist Fallback` and `Newsreader Fallback` faces in
   [`src/styles/fonts.css`](src/styles/fonts.css) carry `size-adjust` and
   vertical overrides computed from the shipped woff2 files, so the fallback
   occupies identical space and the swap does not move anything.

Together these took CLS from 0.262 to 0.001 and performance from 86 to 100
under real (`--throttling-method=devtools`) throttling. Simulated throttling
reports 0 either way, so verify with devtools throttling or against the live
site.

**Accuracy.** Figures on the page trace to the thesis or the published paper.
Where a project has no recorded metrics, it says so instead of estimating.

## Verified

At the time of writing, against the built output:

- Lighthouse mobile 99 / 100 / 100 / 100 and desktop 100 / 100 / 100 / 100
- No horizontal overflow at 320, 360, 414, 600, 768, 1024, 1280 and 1440 px in
  both themes
- `npm run audit:output`: no failures
