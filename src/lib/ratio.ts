/** Native camera ratios accepted for plates. */
export const ratios = ['2:3', '3:2', '4:5', '5:4', '3:4', '4:3', '1:1', '16:9', '9:16'] as const;
export type Ratio = (typeof ratios)[number];

/** Relative tolerance when matching a declared ratio to real pixels (1.5%). */
export const RATIO_TOLERANCE = 0.015;

const value = (r: string) => {
  const [w, h] = r.split(':').map(Number);
  return (w ?? 1) / (h ?? 1);
};

/** True when width/height is within tolerance of the declared ratio. */
export function matchesRatio(declared: string, width: number, height: number): boolean {
  return Math.abs(width / height / value(declared) - 1) <= RATIO_TOLERANCE;
}

const gcd = (a: number, b: number): number => {
  while (b) [a, b] = [b, a % b];
  return a;
};

/** Ratio label derived from the real pixel dimensions (nearest standard, else reduced fraction). */
export function ratioFromDimensions(width: number, height: number): string {
  const hit = ratios.find((r) => matchesRatio(r, width, height));
  if (hit) return hit;
  const d = gcd(width, height);
  return `${width / d}:${height / d}`;
}

export const isLandscape = (width: number, height: number) => width > height * 1.05;
