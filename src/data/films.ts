import type { ImageMetadata } from 'astro';
import { link } from '@/lib/link';
import chromeGlassesPoster from '@/assets/film/chrome-glasses-poster.jpg';

/**
 * A "film" is an authentic moving-image piece from the LVXE archive.
 *
 * Web files live in /public/film (H.264, faststart, no audio track) and are
 * produced from Isaiah's master with ffmpeg: trimmed before any editor end
 * card, the tail cross-faded into the head so the loop has no seam, then
 * encoded at 1080p and 720p. The poster is the loop's first frame.
 *
 * Only observable facts are recorded. Title, series and credits stay empty
 * until supplied.
 */
export type Film = {
  id: string;
  title?: string;
  series?: string;
  description: string;
  tone: 'Colour' | 'Monochrome';
  width: number;
  height: number;
  /** Seconds, as encoded. */
  duration: number;
  loop: boolean;
  /**
   * Public URLs without extension; each size ships as .mp4 (H.264, Safari
   * and most browsers) and .webm (VP9, open-source builds). `small` is
   * served below 768px wide.
   */
  sources: { large: string; small: string };
  poster: ImageMetadata;
};

export const films: Film[] = [
  {
    id: 'chrome-glasses',
    title: 'Chrome Blink',
    description:
      'Moving portrait: a sitter with platinum hair under a dark hood looks down into the lens while lowering and raising chrome wraparound sunglasses.',
    tone: 'Colour',
    width: 1080,
    height: 1920,
    duration: 7.8,
    loop: true,
    sources: { large: link('/film/chrome-glasses-1920'), small: link('/film/chrome-glasses-1280') },
    poster: chromeGlassesPoster,
  },
];

export const filmNumber = (film: Film) => String(films.findIndex((f) => f.id === film.id) + 1).padStart(2, '0');

export function filmFrame(film: Film) {
  const r = film.width / film.height;
  const known: [number, string][] = [[9 / 16, '9:16'], [16 / 9, '16:9'], [4 / 5, '4:5'], [1, '1:1'], [2 / 3, '2:3'], [3 / 2, '3:2']];
  return {
    orientation: r < 1 ? 'Vertical' : r > 1 ? 'Horizontal' : 'Square',
    ratio: known.find(([k]) => Math.abs(k - r) < 0.01)?.[1] ?? `${film.width}:${film.height}`,
    runtime: `0:${String(Math.round(film.duration)).padStart(2, '0')}`,
  };
}
