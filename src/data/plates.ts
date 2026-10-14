import type { ImageMetadata } from 'astro';

import earringPortrait from '@/assets/work/earring-portrait.jpg';
import handsPortrait from '@/assets/work/hands-portrait.jpg';
import meshPair from '@/assets/work/mesh-pair.jpg';
import recordStore from '@/assets/work/record-store.jpg';
import cathedral from '@/assets/work/cathedral.jpg';

/**
 * A "plate" is a single authentic photograph from the LVXE archive.
 * Intrinsic dimensions come from the imported ImageMetadata, so the native
 * aspect ratio is always preserved and never redeclared by hand.
 *
 * Do not invent titles, clients, publications or locations — leave optional
 * fields empty until Isaiah supplies them.
 */
export type Plate = {
  id: string;
  image: ImageMetadata;
  alt: string;
  /** Verified caption only. Rendered as metadata under the image when present. */
  caption?: string;
};

export const plates = {
  earringPortrait: {
    id: 'earring-portrait',
    image: earringPortrait,
    alt: 'Close portrait in low window light: a sitter with straight black hair, a square white earring and a sculpted silver necklace, looking back over one shoulder.',
  },
  handsPortrait: {
    id: 'hands-portrait',
    image: handsPortrait,
    alt: 'Black-and-white portrait of a sitter with long braids, hands framing the face and covering the eyes, long sculpted nails and silver rings catching the light.',
  },
  meshPair: {
    id: 'mesh-pair',
    image: meshPair,
    alt: 'Two sitters in white crochet head coverings and braids photographed from below against a chain-link fence and pale sky.',
  },
  recordStore: {
    id: 'record-store',
    image: recordStore,
    alt: 'Black-and-white low-angle portrait of a sitter in a leather jacket leaning against a counter in a record shop, a wall of vinyl sleeves behind.',
  },
  cathedral: {
    id: 'cathedral',
    image: cathedral,
    alt: 'Low-angle portrait of a sitter in chrome wraparound sunglasses and a dark hood beneath a gothic stone archway, one hand reaching toward the lens.',
  },
} satisfies Record<string, Plate>;

/** The three plates used in the homepage hero, in reading order. */
export const heroPlates: [Plate, Plate, Plate] = [
  plates.earringPortrait,
  plates.handsPortrait,
  plates.cathedral,
];
