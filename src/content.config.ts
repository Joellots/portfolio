import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Imported directly rather than via the deprecated `astro:content` re-export.
import { z } from 'zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  note: z.string().optional(),
});

const evidenceSchema = z.object({
  /** What was measured. */
  label: z.string(),
  /** The measured value, verbatim from the source material. */
  value: z.string(),
  /** Scope, dataset or caveat — required so no number stands without context. */
  note: z.string(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Short form used in cards and breadcrumbs. */
    shortTitle: z.string(),
    /** One line, sentence case, no trailing full stop. */
    tagline: z.string(),
    /** Two sentences max — the card blurb. */
    summary: z.string(),
    /**
     * Search-result copy. Card blurbs run long for on-page reading; this is the
     * ~150-character version. Falls back to `summary` when omitted.
     */
    seoDescription: z.string().max(170).optional(),
    /** e.g. "MSc research", "Security automation". */
    kind: z.string(),
    period: z.string(),
    /** Honest status label rendered as a badge. */
    status: z.enum(['Research', 'Research prototype', 'Prototype', 'Conference paper']),
    featured: z.boolean().default(false),
    /** Ascending display order across the projects index. */
    order: z.number(),
    stack: z.array(z.string()).min(1),
    domains: z.array(z.string()).min(1),
    evidence: z.array(evidenceSchema).default([]),
    links: z.array(linkSchema).default([]),
    /** Verbatim scope disclosure, rendered prominently above the case study. */
    disclosure: z.string().optional(),
    /** Outstanding gaps, rendered as an editorial note in dev only. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
