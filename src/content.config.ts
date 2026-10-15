import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { projects };
