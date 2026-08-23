# joel-okore-portfolio

Personal site for **Okore Joel Chidike** — Security Engineer and Researcher.
Static, no tracking, no client-side framework: Astro + TypeScript, hand-written
CSS on design tokens, and roughly 600 bytes of JavaScript (the theme toggle).

- **Pages** — home, projects index, four case studies, about, contact, 404
- **Content** — case studies are Markdown in an Astro content collection
- **Deploys** — GitHub Actions → GitHub Pages

---

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev          # http://localhost:4321/portfolio/
```

Note the `/portfolio/` path — the site is configured for a GitHub Pages
_project_ site by default (see [Deployment](#deployment)).

## Scripts

| Command                | What it does                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                                                                        |
| `npm run build`        | Production build into `dist/`                                                                     |
| `npm run preview`      | Serve the built `dist/` locally                                                                   |
| `npm run check`        | `astro check` — TypeScript and template diagnostics                                               |
| `npm run format`       | Prettier, write                                                                                   |
| `npm run format:check` | Prettier, verify only (what CI runs)                                                              |
| `npm run audit:output` | Audit `dist/` — broken links, image alt/dimensions, SEO metadata, heading order, placeholder text |
| `npm run verify`       | format:check → check → build → audit:output                                                       |

Run `npm run verify` before pushing; CI runs the same steps.

---

## Where to edit your information

Almost everything personal lives in **one file**.

| What                                                             | File                                                                                         |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Name, title, tagline, location, email, CV path, meta description | [`src/data/site.ts`](src/data/site.ts) → `person`                                            |
| Biography paragraphs                                             | `src/data/site.ts` → `bio`                                                                   |
| Email / GitHub / LinkedIn links                                  | `src/data/site.ts` → `socials`                                                               |
| Research interests                                               | `src/data/site.ts` → `researchInterests`                                                     |
| Jobs and roles                                                   | `src/data/site.ts` → `experience`                                                            |
| Degrees                                                          | `src/data/site.ts` → `education`                                                             |
| Papers                                                           | `src/data/site.ts` → `publications`                                                          |
| Scholarships and awards                                          | `src/data/site.ts` → `awards`                                                                |
| Skills / tools (grouped lists, no ratings)                       | `src/data/site.ts` → `capabilities`                                                          |
| Spoken languages                                                 | `src/data/site.ts` → `spokenLanguages`                                                       |
| Header/footer navigation                                         | `src/data/site.ts` → `nav`                                                                   |
| **CV PDF**                                                       | replace `public/cv/Okore-Joel-Chidike-CV.pdf` (keep the filename, or update `person.cvPath`) |
| **Photographs**                                                  | `src/assets/images/` — see [Images](#images)                                                 |
| Contact-page topics ("what I'd like to hear about")              | [`src/pages/contact.astro`](src/pages/contact.astro) → `topics`                              |
| Home page intro line above the contact buttons                   | [`src/pages/index.astro`](src/pages/index.astro) → the `outro__lead` paragraph               |
| About page headline and standfirst                               | [`src/pages/about.astro`](src/pages/about.astro) → `<PageHeader>`                            |
| Social share image                                               | `public/og/joel-okore-og.jpg` — regenerate with `./scripts/generate-og.sh`                   |
| Favicon                                                          | `public/favicon.svg` (+ `favicon.ico`, `apple-touch-icon.png`)                               |

### Case studies

One Markdown file per project in [`src/content/projects/`](src/content/projects/).
The frontmatter is schema-validated in
[`src/content.config.ts`](src/content.config.ts) — the build fails on a typo,
which is intentional.

```yaml
---
title: 'Full title, used as the page H1'
shortTitle: 'Card and breadcrumb title'
tagline: 'One line, sentence case, no trailing full stop'
summary: 'Two sentences max — the card blurb.'
seoDescription: 'Optional ~150-character version for search results.'
kind: 'MSc research · systems'
period: '2025 — 2026'
status: 'Research prototype' # Research | Research prototype | Prototype | Published paper
featured: true # show on the home page
order: 1 # ascending sort across the index
stack: [NFStream, XGBoost] # rendered as the "Technology" rail
domains: [Encrypted traffic analysis] # rendered as the "Domains" rail
evidence: # renders the results table; omit or leave [] if you have no figures
  - label: 'Detection F1'
    value: '≈ 0.97'
    note: 'Scope, dataset or caveat — required, so no number stands alone.'
links:
  - label: 'Source repository'
    href: 'https://github.com/...'
disclosure: 'Verbatim scope disclosure, rendered above the case study.'
---
```

The body follows a fixed section order, and each `##` becomes an entry in the
page's "On this page" rail:

```
## Problem
## My role
## Approach
## Evidence and results
## Limitations
## Links
```

**Adding a project:** drop a new `.md` file in `src/content/projects/`, give it
an unused `order`, and it appears on `/projects` and at
`/projects/<filename>` automatically. Nothing else needs registering.

**Unverified information** is marked with `<!-- TODO(joel): ... -->` HTML
comments in the Markdown source. These are stripped from the built HTML by a
rehype plugin, so they never ship — they exist for you, not for readers. Search
for them with:

```bash
grep -rn "TODO(joel)" src/
```

### Images

Source images live in `src/assets/images/` and are optimised at build time by
`astro:assets` (WebP, responsive `srcset`, explicit `width`/`height` to prevent
layout shift). To swap a photograph, replace the file and keep the aspect ratio
roughly the same:

| File                       | Used on         | Aspect        |
| -------------------------- | --------------- | ------------- |
| `joel-portrait.jpg`        | home hero       | 4:5 portrait  |
| `joel-portrait-square.jpg` | about biography | 1:1           |
| `joel-commencement.jpg`    | about education | 8:5 landscape |

Alt text is written inline where each image is used; update it when you change
the photograph.

---

## Deployment

Deploys run from [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`, and can be triggered manually from the Actions tab.

### First-time setup

1. Push this directory to a GitHub repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. The workflow formats, type-checks, builds, audits the output
   and publishes `dist/`.

The workflow passes the origin and base path from `actions/configure-pages`
into the build, so **a project site, a user site and a custom domain all work
without editing any code**.

### Deployment targets

Local builds fall back to the defaults at the top of
[`astro.config.mjs`](astro.config.mjs). Change them there if your local preview
should match a different target:

| Target                                    | `SITE_URL`                   | `BASE_PATH`  |
| ----------------------------------------- | ---------------------------- | ------------ |
| Project site (default) — repo `portfolio` | `https://joellots.github.io` | `/portfolio` |
| User site — repo `Joellots.github.io`     | `https://joellots.github.io` | _(empty)_    |
| Custom domain                             | `https://your-domain`        | _(empty)_    |

You can test any of them locally:

```bash
SITE_URL="https://example.com" BASE_PATH="" npm run build
```

### Custom domain

1. Add a `public/CNAME` file containing the bare domain, e.g. `joelokore.dev`.
2. Point DNS at GitHub Pages (`A` records to GitHub's four Pages IPs, or a
   `CNAME` record to `joellots.github.io` for a subdomain).
3. **Settings → Pages → Custom domain**, then enable _Enforce HTTPS_.

`actions/configure-pages` picks the domain up automatically, so canonical URLs,
Open Graph tags, the sitemap and `robots.txt` follow with no code change.

---

## Design and architecture notes

**Tokens.** All colour, type, spacing and motion values are CSS custom
properties in [`src/styles/tokens.css`](src/styles/tokens.css). Light is the
base palette on `:root`; dark is defined twice — once under
`prefers-color-scheme` (guarded so an explicit light choice wins) and once under
`[data-theme='dark']` — so the system default and the manual toggle both
resolve correctly. Every text/background pair is annotated with its measured
WCAG contrast ratio.

**Type.** IBM Plex Sans for headings and interface, Source Serif 4 for
long-form reading, IBM Plex Mono for metadata, labels and data. Latin subsets
are self-hosted from `src/assets/fonts/` (vendored from the Fontsource packages
in `devDependencies`); the two faces used above the fold are preloaded.

**Base paths.** Every internal link goes through `url()` in
[`src/lib/url.ts`](src/lib/url.ts), which prefixes the configured base path and
normalises trailing slashes so links match the generated sitemap and avoid a
redirect on GitHub Pages. Markdown bodies get the same treatment from a rehype
plugin in [`src/lib/rehype-base-url.mjs`](src/lib/rehype-base-url.mjs).

**JavaScript.** One inline script stamps the stored theme before first paint
(no flash), and one ~600-byte module handles the toggle. Nothing else ships.

**Motion.** Transitions are short and limited to colour and small translations.
`prefers-reduced-motion: reduce` disables them and smooth scrolling globally.

**Accuracy.** Every figure on the site traces to the CV or the paper it
describes. Nothing is estimated. Projects with no recorded metrics have an
empty `evidence: []` block and say so in the case study rather than carrying
invented numbers.

## Verified

Checked against the built output at the time of writing:

- Lighthouse (desktop): **100 / 100 / 100 / 100** on home, projects, about,
  contact and case-study pages
- Lighthouse (mobile): performance **97–99**, accessibility, best practices and
  SEO **100**
- No horizontal overflow across 9 pages × 5 viewport widths (360–1440px)
- `npm run audit:output`: no broken internal links, every image has alt text
  and intrinsic dimensions, one `<h1>` per page, no placeholder text
