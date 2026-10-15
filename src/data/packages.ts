/**
 * Session packages and rates, from the LVXE Website Vision Board (Oct 2026).
 * Shown only on /packages — never on the homepage (README §2.3).
 * Confirm every figure with Isaiah before launch.
 */
export type SessionPackage = {
  name: string;
  detail: string;
  /** Price in USD. `null` renders as "On request". */
  price: number | null;
};

export const sessionPackages: SessionPackage[] = [
  { name: 'Outdoor Blitz', detail: '1 look · 15 finals · 1 Polaroid', price: 110 },
  { name: 'Outdoor', detail: '2–3 looks · 30 finals', price: 220 },
  { name: 'Full Studio', detail: '3 looks · 30–40 finals', price: 350 },
];

/** Offered, but no published rate yet. */
export const onRequest: string[] = ['Split session', 'Beginner digitals', 'Headshots', 'Comp cards'];

/** Commercial pathway, from README §1 "Commercial Offerings". Quoted per project. */
export const commercial: string[] = [
  'Brand and commercial campaigns',
  'Corporate and workplace portraiture',
  'Private commissions',
  'Event coverage',
];
