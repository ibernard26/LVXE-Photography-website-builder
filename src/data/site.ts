import { link } from '@/lib/link';

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

  /** Short form, for inline/brief mentions. Confirmed Oct 2026. */
  region: 'New York',

  /** Exact approved copy (Oct 2026) — use verbatim in footer, contact and booking placements. */
  locationNote: 'Based in New York. Available for assignments nationwide and internationally.',

  description:
    'LVXE is the independent photography and visual arts practice of Isaiah Bernard — editorial fashion, intimate portraiture, and cinematic visual storytelling. Based in New York, available for assignments nationwide and internationally.',

  /** Verified Oct 2026. LVXE's business channels — kept separate from a client's own contact fields on the booking form. */
  contact: {
    email: 'lvxevisuals@gmail.com',
    phone: '929-248-9384',
    instagram: '',
  },

  /**
   * Where the booking form posts (a Formspree, Basin or Netlify Forms URL that
   * accepts a POST and answers JSON when sent `Accept: application/json`).
   * Set PUBLIC_BOOKING_ENDPOINT in the host's environment, never in code.
   * While empty, the form stays visible but tells visitors it is not yet connected.
   */
  bookingEndpoint: (import.meta.env.PUBLIC_BOOKING_ENDPOINT ?? '') as string,
} as const;

/** Masthead issue line — a publication device, not a claim. */
export const issue = { number: '01', year: '2026' };

export type NavItem = { label: string; href: string; note: string; accent?: boolean };

/**
 * Primary navigation, shown in the full-screen menu and the footer.
 * Commissions is the separate scope page (README §2.3); Book carries the
 * burgundy accent.
 */
export const navigation: NavItem[] = [
  { label: 'Index', href: link('/'), note: '' },
  { label: 'Work', href: link('/work'), note: 'Series & Plates' },
  { label: 'Commissions', href: link('/commissions'), note: 'Editorial & Commercial Scopes' },
  { label: 'Book', href: link('/book'), note: 'Inquiry & Brief', accent: true },
];
