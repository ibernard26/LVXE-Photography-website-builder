/**
 * Editable site content.
 *
 * Everything marked `draft` is a proposed direction from README §1 that is
 * awaiting Isaiah's sign-off. Change copy here — never hard-code it in components.
 */

export const site = {
  name: 'LVXE',
  artist: 'Isaiah Bernard',

  /** Working draft — README §1 "Proposed Directions". */
  slogan: { text: 'The Art of Being Seen.', draft: true },

  /** Working draft — README §1 "Proposed Directions". */
  proposition: {
    text: 'Portraiture, fashion, and visual narratives shaped by atmosphere, identity, and intention.',
    draft: true,
  },

  disciplines: ['Editorial', 'Portraiture', 'Cinematic', 'Fine Art'],

  description:
    'LVXE is the independent photography and visual arts practice of Isaiah Bernard — editorial fashion, intimate portraiture, and cinematic visual storytelling.',

  /** Contact details are left empty until confirmed; empty values are not rendered. */
  contact: {
    email: '',
    instagram: '',
  },
} as const;

export type NavItem = { label: string; href: string };

/**
 * Primary navigation. "Commissions" is the dedicated, separate pathway for
 * commercial, corporate and private clients (README §2.3).
 */
export const navigation: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Commissions', href: '/commissions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
