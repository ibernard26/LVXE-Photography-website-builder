/**
 * Commissions — the two scopes LVXE takes work in.
 *
 * Sitting rates come from the LVXE Website Vision Board (Oct 2026) and are
 * shown only on /commissions, never on the homepage (README §2.3).
 * Confirm every figure with Isaiah before launch.
 */
export type Sitting = {
  name: string;
  detail: string;
  /** Price in USD. `null` renders as "On request". */
  price: number | null;
};

/** Scope I — Editorial & Creative Commissions: portrait sittings. */
export const sittings: Sitting[] = [
  { name: 'Outdoor Blitz', detail: '1 look · 15 finals · 1 Polaroid', price: 110 },
  { name: 'Outdoor', detail: '2–3 looks · 30 finals', price: 220 },
  { name: 'Full Studio', detail: '3 looks · 30–40 finals', price: 350 },
];

/** Also offered under Scope I, no published rate yet. */
export const onRequest: string[] = ['Split session', 'Beginner digitals', 'Headshots', 'Comp cards'];

/** Scope II — Commercial Campaigns & Corporate Identity (README §1). Quoted per brief. */
export const commercial: string[] = [
  'Brand and commercial campaigns',
  'Corporate and workplace portraiture',
  'Private commissions',
  'Event coverage',
];

export type Package = {
  name: string;
  /** Coverage hours, people and deliverables, stated explicitly. */
  detail: string;
  price: number;
  /** Set only for a proposed starting rate, not a fixed published price. */
  startingRate?: boolean;
};

/**
 * Corporate photography — fixed introductory package, confirmed Oct 2026.
 * Scope II's only priced photography item; the video packages below are a
 * separate service and must not be applied to this or any other photography rate.
 */
export const corporatePhotography: Package = {
  name: 'Corporate Headshots & Workplace Photography',
  detail: 'Up to 2 hours · up to 10 finished headshots + 12 workplace/team images',
  price: 850,
};

/**
 * Video packages — proposed starting prices, confirmed Oct 2026. These rates
 * are for video only; do not apply them to photography sittings or the
 * corporate photography package above.
 */
export const videoPackages: Package[] = [
  { name: 'Social Video', detail: '2 hours', price: 800, startingRate: true },
  { name: 'Half-Day Video', detail: '4 hours', price: 1200, startingRate: true },
  { name: 'Full-Day Video', detail: '8 hours', price: 1800, startingRate: true },
];

/** Names shown in the booking form's commercial "Work required" select, alongside `commercial`. */
export const commercialPackages: string[] = [corporatePhotography, ...videoPackages].map((p) => p.name);

/** The two booking pathways, shared by /commissions, /book and the booking band. */
export const scopes = {
  editorial: { id: 'editorial', label: 'Editorial & Creative Commissions', for: 'Models, creatives, publications, private clients' },
  commercial: { id: 'commercial', label: 'Commercial Campaigns & Corporate Identity', for: 'Brands, companies, events' },
} as const;
