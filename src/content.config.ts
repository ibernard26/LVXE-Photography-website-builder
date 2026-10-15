import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ratios } from './lib/ratio';

/** Native camera frames. Used for metadata and thumbnail framing, never to crop full views. */
export const aspects = ['2:3', '3:2', '4:5', '4:3', '3:4', '1:1', '16:9'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      title: z.string().min(1),
      category: z.enum(['fashion', 'portraits', 'creative', 'commercial']),
      year: z.number().int().min(2000).max(2100),
      credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
      displayMode: z.enum(['diptych', 'sequence', 'single', 'grid']).default('sequence'),
      cover: image(),
      coverAlt: z.string().min(10),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(10),
            aspect: z.enum(aspects),
            caption: z.string().optional(),
          }),
        )
        .min(1),
      /** Sample entries ship for development only; replace with verified projects. */
      sample: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const disciplines = ['fashion', 'portraits', 'creative', 'commercial'] as const;

/**
 * Plates: one Markdown file per photograph. `image()` is resolved to real
 * pixel dimensions after schema parsing, so the declared `ratio` is verified
 * in src/lib/plates.ts (getPlates), which every page uses; a mismatch throws
 * and fails the build.
 */
const plates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plates' }),
  schema: ({ image }) =>
    z
      .object({
        plateNo: z.number().int().positive(),
        title: z.string().min(1),
        year: z.number().int().min(2000).max(2100),
        discipline: z.enum(disciplines),
        image: image(),
        alt: z.string().min(20, 'Alt text must be at least 20 characters'),
        ratio: z.enum(ratios),
        project: z.string().optional(),
        /** Placeholder metadata (title/year/discipline) awaiting owner confirmation. */
        sample: z.boolean().default(false),
      }),
});

export const collections = { projects, plates };
