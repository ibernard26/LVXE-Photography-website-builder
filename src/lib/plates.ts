import { getCollection, type CollectionEntry } from 'astro:content';
import { disciplines } from '@/content.config';
import { matchesRatio, ratioFromDimensions, RATIO_TOLERANCE } from '@/lib/ratio';

export type PlateEntry = CollectionEntry<'plates'>;
export type Discipline = (typeof disciplines)[number];
export { disciplines };

export const disciplineLabel: Record<Discipline, string> = {
  fashion: 'Fashion',
  portraits: 'Portraits',
  creative: 'Creative',
  commercial: 'Commercial',
};

let cache: PlateEntry[] | undefined;

/**
 * All plates, sorted by plate number, with build-time integrity checks:
 *  - declared ratio must match the real image dimensions (within tolerance)
 *  - plate numbers must be unique
 * Any failure throws, which fails `astro build` with a clear message.
 */
export async function getPlates(discipline?: Discipline): Promise<PlateEntry[]> {
  if (!cache) {
    const all = (await getCollection('plates')).sort((a, b) => a.data.plateNo - b.data.plateNo);
    const errors: string[] = [];
    const seen = new Set<number>();
    for (const p of all) {
      const { width, height } = p.data.image;
      if (!matchesRatio(p.data.ratio, width, height)) {
        errors.push(
          `src/content/plates/${p.id}.md: declared ratio ${p.data.ratio} but the image is ${width}x${height} (${ratioFromDimensions(width, height)}); tolerance ${RATIO_TOLERANCE * 100}%. Correct the declared ratio; never crop the photograph to fit.`,
        );
      }
      if (seen.has(p.data.plateNo)) errors.push(`Duplicate plateNo ${p.data.plateNo} (${p.id}).`);
      seen.add(p.data.plateNo);
    }
    if (errors.length) throw new Error(`[LVXE plates] ${errors.length} integrity error(s):\n- ${errors.join('\n- ')}`);
    cache = all;
  }
  return discipline ? cache.filter((p) => p.data.discipline === discipline) : cache;
}

/** Plates in exhibition order (sequence, falling back to plateNo). */
export async function getStream(discipline?: Discipline): Promise<PlateEntry[]> {
  const key = (p: PlateEntry) => p.data.sequence ?? p.data.plateNo;
  return [...(await getPlates(discipline))].sort((a, b) => key(a) - key(b));
}

export const plateNo = (n: number) => String(n).padStart(2, '0');
