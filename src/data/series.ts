/**
 * The LVXE series index — the site's structural spine (Vision Board,
 * Direction A "Monolith": a numbered series index as primary navigation).
 *
 * Names and status come from the Vision Board. Concept lines are drafts
 * derived from it and must be confirmed by Isaiah before launch; leave a
 * field empty rather than invent detail.
 */
export type Series = {
  slug: string;
  title: string;
  /** Short status label shown at the end of the index row. */
  status: string;
  /** One-line concept. Empty until confirmed. */
  concept: string;
};

export const series: Series[] = [
  {
    slug: 'nyc-brutalism',
    title: 'NYC Brutalism',
    status: '2026',
    concept: "Portraiture set against New York's brutalist architecture.",
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    status: 'In development',
    concept: 'A two-act editorial. Act I veiled, Act II revealed.',
  },
  {
    slug: 'concrete-and-currency',
    title: 'Concrete & Currency',
    status: '2026',
    concept: '',
  },
  {
    slug: 'conformity',
    title: 'Conformity',
    status: 'Series',
    concept: 'Individuality set against uniformity.',
  },
];
