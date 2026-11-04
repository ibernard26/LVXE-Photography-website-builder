import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Longest edge for a link-preview image. Large enough for a Twitter/OG card. */
const LONG_EDGE = 1200;

/**
 * A share-card JPEG at a preview size, in the photograph's own ratio.
 * Only one dimension is set, so the image service scales proportionally
 * and never cover-crops the frame.
 */
export async function shareImage(src: ImageMetadata) {
  const portrait = src.height >= src.width;
  const edge = Math.min(LONG_EDGE, portrait ? src.height : src.width);
  return getImage({
    src,
    format: 'jpeg',
    quality: 80,
    ...(portrait ? { height: edge } : { width: edge }),
  });
}
