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
npm run dev          # http://localhost:4321/portfolio/
```

The `/portfolio/` path is the GitHub Pages project-site base path. See
[Deployment](#deployment) to change it.

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

`#about` · `#interests` · `#work` · `#experience` · `#publications` ·
`#education` · `#contact`

Secondary detail (project internals, paper findings) sits inside
`src/components/Accordion.astro`, which wraps native `<details>`/`<summary>` so
it is keyboard operable and announced as a disclosure with no JavaScript.

## Where to edit your information

Nearly everything lives in **[`src/data/site.ts`](src/data/site.ts)**:

| What                                             | Export         |
| ------------------------------------------------ | -------------- |
| Name, title, email, CV path, meta description    | `person`       |
| Hero paragraph                                   | `heroIntro`    |
| About paragraphs                                 | `about`        |
| Email, GitHub, LinkedIn, Scholar, ORCID          | `links`        |
| Research interests                               | `interests`    |
| Roles                                            | `experience`   |
| Papers, DOI, plain-English summary, detail panel | `publications` |
| Degrees                                          | `education`    |
| Anchor navigation                                | `sections`     |

Other files:

- **CV PDF** — `public/cv/Okore-Joel-Chidike-CV.pdf` (keep the filename, or
  update `person.cvPath`)
- **Portrait** — `src/assets/images/joel-portrait.jpg`, 4:5. Alt text is set in
  `src/pages/index.astro`.
- **Social card** — `public/og/joel-okore-og.jpg`; regenerate with
  `./scripts/generate-og.sh` (needs ImageMagick and `fonttools`)
- **Favicon and mark** — `public/favicon.svg` and
  `src/components/Mark.astro`

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
repo: 'https://github.com/...'
order: 1
---
```

The Markdown body becomes the accordion panel: architecture, method, datasets,
evaluation, and limits. Keep links in frontmatter rather than the body so they
stay correct under a base path.

Adding a project means adding a file and giving it an unused `order`.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every
push to `main` and can be triggered from the Actions tab.

1. Push to a GitHub repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`.

The workflow passes the origin and base path from `actions/configure-pages`
into the build, so a project site, a user site and a custom domain all work
without editing code. Local builds fall back to the defaults at the top of
[`astro.config.mjs`](astro.config.mjs).

| Target                                | `SITE_URL`                   | `BASE_PATH`  |
| ------------------------------------- | ---------------------------- | ------------ |
| Project site (default)                | `https://joellots.github.io` | `/portfolio` |
| User site (repo `Joellots.github.io`) | `https://joellots.github.io` | _(empty)_    |
| Custom domain                         | `https://your-domain`        | _(empty)_    |

Test any of them locally:

```bash
SITE_URL="https://example.com" BASE_PATH="" npm run build
```

For a custom domain, add `public/CNAME` containing the bare domain, point DNS
at GitHub Pages, then set it under Settings → Pages and enable _Enforce HTTPS_.

## Design notes

**Tokens.** Colour, type, spacing and motion live as custom properties in
[`src/styles/tokens.css`](src/styles/tokens.css). Light is the base palette on
`:root`. Dark is defined twice, once under `prefers-color-scheme` and once
under `[data-theme='dark']`, so the system default and the manual toggle both
resolve. Dark is a soft neutral grey (`#1b1c1f`) rather than near-black. Every
text colour is annotated with its measured contrast ratio; all pass WCAG AA.

**Type.** IBM Plex Sans for interface, Source Serif 4 for reading, IBM Plex
Mono for dates and small labels. Latin subsets are self-hosted in
`src/assets/fonts/`, vendored from the Fontsource packages in
`devDependencies`. The three faces used above the fold are preloaded.

**Links.** Internal hrefs go through `url()` in
[`src/lib/url.ts`](src/lib/url.ts), which applies the base path and normalises
trailing slashes so they match the sitemap.

**Motion.** Only two transitions exist: link colour and the accordion chevron.
`prefers-reduced-motion: reduce` disables both, along with smooth scrolling.

**Accuracy.** Figures on the page trace to the thesis or the published paper.
Where a project has no recorded metrics, it says so instead of estimating.

## Verified

At the time of writing, against the built output:

- Lighthouse mobile: performance 99, accessibility 100, best practices 100,
  SEO 100
- No horizontal overflow at 360, 414, 768, 1024 and 1440 px
- `npm run audit:output`: no failures
