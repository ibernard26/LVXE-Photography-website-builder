/**
 * Editable site content.
 *
 * Sources: README.md (master spec) and the LVXE Website Vision Board
 * (October 2026). Anything marked `draft` awaits Isaiah's sign-off.
 * Change copy here — never hard-code it in components.
 */

export const site = {
  name: 'LVXE',
  artist: 'Isaiah Bernard',

  /** Working draft — README §1 "Proposed Directions". */
  slogan: { text: 'The Art of Being Seen.', lines: ['The Art of', 'Being', 'Seen'], draft: true },

  /** Working draft — README §1 "Proposed Directions". */
  proposition: {
    text: 'Portraiture, fashion, and visual narratives shaped by atmosphere, identity, and intention.',
    draft: true,
  },

  disciplines: ['Editorial', 'Portraiture', 'Cinematic', 'Fine Art'],

  /** Service area, from the Vision Board. */
  region: 'New Jersey / New York',

  description:
    'LVXE is the independent photography and visual arts practice of Isaiah Bernard — editorial fashion, intimate portraiture, and cinematic visual storytelling across New Jersey and New York.',

  /** Contact details are left empty until confirmed; empty values are not rendered. */
  contact: {
    email: '',
    instagram: '',
  },

  /**
   * Where the booking form posts (e.g. a Formspree or Netlify Forms URL).
   * While empty, the form stays visible but tells visitors it is not yet connected.
   */
  bookingEndpoint: '',
} as const;

/** Masthead issue line — a publication device, not a claim. */
export const issue = { number: '01', year: '2026' };

export type NavItem = { label: string; href: string; note: string; accent?: boolean };

/**
 * Primary navigation, shown in the full-screen menu. Packages is the separate
 * commercial pathway (README §2.3); Book carries the burgundy accent.
 */
export const navigation: NavItem[] = [
  { label: 'Index', href: '/', note: 'The issue' },
  { label: 'Work', href: '/work', note: 'Series and plates' },
  { label: 'Packages', href: '/packages', note: 'Sessions and rates' },
  { label: 'Book', href: '/book', note: 'Portrait and commercial', accent: true },
];
