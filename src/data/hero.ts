import type { ImageMetadata } from 'astro';
import redMotionPortrait from '@/assets/images/portfolio/red-motion-portrait.jpg';
import earringPortrait from '@/assets/images/portfolio/earring-portrait.jpg';

/** An authentic archive photograph. Dimensions come from the import; never redeclared. */
export type Plate = { image: ImageMetadata; alt: string; caption?: string };

/** Homepage diptych: lead (4:5, 1080x1350) + counterpoint (2:3), in reading order. */
export const heroDiptych: [Plate, Plate] = [
  {
    image: redMotionPortrait,
    alt: 'Portrait against a white background, dissolved by horizontal red motion blur: a sitter with dark hair threaded with red cord, one eye held sharp and looking past the lens.',
  },
  {
    image: earringPortrait,
    alt: 'Close portrait in low window light: a sitter with straight black hair, a square white earring and a sculpted silver necklace, looking back over one shoulder.',
  },
];
