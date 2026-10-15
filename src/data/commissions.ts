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

/** The two booking pathways, shared by /commissions, /book and the booking band. */
export const scopes = {
  editorial: { id: 'editorial', label: 'Editorial & Creative Commissions', for: 'Models, creatives, publications, private clients' },
  commercial: { id: 'commercial', label: 'Commercial Campaigns & Corporate Identity', for: 'Brands, companies, events' },
} as const;
