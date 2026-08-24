import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Imported directly rather than via the deprecated `astro:content` re-export.
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    /** One sentence: what the project is for. */
    purpose: z.string(),
    /** One or two sentences: what I actually did. */
    contribution: z.string(),
    /**
     * A concrete result. Only set this where a supplied source backs it up —
     * leave it out rather than estimating.
     */
    outcome: z.string().optional(),
    /**
     * Short scope qualifier, shown quietly under the outcome. Use it where a
     * figure would otherwise read as a production claim.
     */
    note: z.string().optional(),
    /** Primary link shown next to the title. */
    repo: z.url().optional(),
    /** Ascending display order. */
    order: z.number(),
  }),
});

export const collections = { projects };
