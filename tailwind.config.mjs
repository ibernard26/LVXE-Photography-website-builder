// @ts-check
/**
 * LVXE Tailwind config. Tailwind v4 loads this through `@config` in
 * src/styles/global.css. `theme.colors` / `theme.fontFamily` REPLACE the
 * defaults (not `extend`), so off-brand palettes (indigo, cyan…) can't be used.
 *
 * Colours point at --lvxe-* runtime variables (declared in global.css) so the
 * light exhibition mode can re-skin a page by swapping those variables.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      obsidian: 'var(--lvxe-obsidian)', // #0B0B0D canvas
      charcoal: 'var(--lvxe-charcoal)', // #1B1B1F surface
      bone: 'var(--lvxe-bone)', // #F2EFE9 primary type
      'soft-gray': 'var(--lvxe-soft-gray)', // #A7A4A0 secondary type
      burgundy: 'var(--lvxe-burgundy)', // #54252D sparse accent
      hairline: 'var(--lvxe-hairline)', // #1F1F24 dividers
    },
    fontFamily: {
      // --font-newsreader etc. are injected by Astro's Fonts API (Fontsource files).
      display: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
      sans: ['var(--font-geist)', 'Geist Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'Geist Mono', 'ui-monospace', 'monospace'],
    },
    extend: {
      // Thumbnail-only frames (the one sanctioned crop exception). Full views never use these.
      aspectRatio: {
        '4/5': '4 / 5',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '16/9': '16 / 9',
      },
    },
  },
};
