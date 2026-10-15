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
 * Only observable facts are recorded (tone, orientation). Titles, series,
 * locations and dates stay empty until Isaiah supplies them.
 */
export type Plate = {
  id: string;
  image: ImageMetadata;
  alt: string;
  tone: 'Colour' | 'Monochrome';
  /** Verified title. Empty renders as "Untitled". */
  title?: string;
  /** Verified caption only. */
  caption?: string;
  /** Series slug once confirmed. */
  series?: string;
};

export const plates = {
  earringPortrait: {
    id: 'earring-portrait',
    image: earringPortrait,
    tone: 'Colour',
    alt: 'Close portrait in low window light: a sitter with straight black hair, a square white earring and a sculpted silver necklace, looking back over one shoulder.',
  },
  handsPortrait: {
    id: 'hands-portrait',
    image: handsPortrait,
    tone: 'Monochrome',
    alt: 'Black-and-white portrait of a sitter with long braids, hands framing the face and covering the eyes, long sculpted nails and silver rings catching the light.',
  },
  cathedral: {
    id: 'cathedral',
    image: cathedral,
    tone: 'Colour',
    alt: 'Low-angle portrait of a sitter in chrome wraparound sunglasses and a dark hood beneath a gothic stone archway, one hand reaching toward the lens.',
  },
  meshPair: {
    id: 'mesh-pair',
    image: meshPair,
    tone: 'Colour',
    alt: 'Two sitters in white crochet head coverings and braids photographed from below against a chain-link fence and pale sky.',
  },
  recordStore: {
    id: 'record-store',
    image: recordStore,
    tone: 'Monochrome',
    alt: 'Black-and-white low-angle portrait of a sitter in a leather jacket leaning against a counter in a record shop, a wall of vinyl sleeves behind.',
  },
} satisfies Record<string, Plate>;

/** Catalogue order: this order defines plate numbers across the site. */
export const plateList: Plate[] = [
  plates.earringPortrait,
  plates.handsPortrait,
  plates.cathedral,
  plates.meshPair,
  plates.recordStore,
];

export const plateNumber = (plate: Plate) =>
  String(plateList.findIndex((p) => p.id === plate.id) + 1).padStart(2, '0');

/** Orientation and reduced ratio, read from the file itself. */
export function frameOf(plate: Plate) {
  const { width, height } = plate.image;
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const known: [number, string][] = [
    [2 / 3, '2:3'], [3 / 2, '3:2'], [3 / 4, '3:4'], [4 / 3, '4:3'], [1, '1:1'], [16 / 9, '16:9'], [4 / 5, '4:5'],
  ];
  const r = width / height;
  const match = known.find(([k]) => Math.abs(k - r) < 0.01);
  const g = gcd(width, height);
  return {
    orientation: r < 1 ? 'Portrait' : r > 1 ? 'Landscape' : 'Square',
    ratio: match ? match[1] : `${width / g}:${height / g}`,
  };
}

/** The three frames of the homepage contact strip, left to right. */
export const heroPlates: [Plate, Plate, Plate] = [plates.earringPortrait, plates.handsPortrait, plates.cathedral];
