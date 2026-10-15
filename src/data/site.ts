/**
 * Editable site content. Change copy here, never hard-code it in components.
 * Do not add clients, publications, awards or quotes that Isaiah has not verified.
 */
export const site = {
  name: 'LVXE',
  artist: 'Isaiah Bernard',
  slogan: 'The Art of Being Seen.',
  proposition:
    'Portraiture, fashion, and visual narratives shaped by atmosphere, identity, and intention.',
  disciplines: ['Fashion', 'Portraits', 'Creative', 'Commercial'],
  description:
    'LVXE is the independent photography and visual arts practice of Isaiah Bernard: editorial fashion, intimate portraiture, cinematic visual storytelling and contemporary fine art.',
  brandStatement: 'LVXE — The Art of Being Seen.',
  philosophy:
    'LVXE is an independent photography and visual arts practice exploring the relationship between identity, atmosphere, and expression. Through fashion, portraiture, and cinematic visual storytelling, each composition is approached with intention—balancing light, form, movement, and emotion to create imagery that feels both intimate and commanding.',
  /** No pricing on the site. Used on the homepage strip and /commercial. */
  commercialPreview:
    'LVXE creates distinctive visual assets for brands, creative professionals, and organizations. From editorial campaigns and portraits to corporate headshots and workplace imagery, each commission is developed around the client’s objectives while maintaining a deliberate approach to composition, lighting, and visual quality.',
  inquiryIntro:
    'Have a project in mind? Share your concept, location, timeline, and creative references. Every inquiry is reviewed according to its scope, production requirements, and artistic direction.',
  tagline: 'Photography & Visual Arts',
  contact: {
    email: 'lvxevisuals@gmail.com',
    instagramHandle: 'luxe_editorials',
    instagramUrl: 'https://www.instagram.com/luxe_editorials/',
    archiveUrl: 'https://luxeeditorials.mypixieset.com/',
  },
} as const;

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'About', href: '/about' },
  { label: 'Inquire', href: '/inquire' },
];
