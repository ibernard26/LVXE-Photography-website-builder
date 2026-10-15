// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Path to a Latin variable woff2 shipped by an @fontsource-variable package.
 * @param {string} family
 * @param {'normal' | 'italic'} style
 */
const fontsource = (family, style) =>
  `./node_modules/@fontsource-variable/${family}/files/${family}-latin-wght-${style}.woff2`;

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://lvxe.studio',

  // Fonts: self-hosted from the installed @fontsource-variable packages via the
  // `local` provider, so builds never depend on a CDN. Only the Latin subset
  // ships. `optimizedFallbacks` generates size-adjusted local fallback faces so
  // the swap from system font to webfont causes no layout shift.
  fonts: [
    {
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      provider: fontProviders.local(),
      options: {
        variants: [
          { src: [fontsource('newsreader', 'normal')], weight: '200 800', style: 'normal' },
          { src: [fontsource('newsreader', 'italic')], weight: '200 800', style: 'italic' },
        ],
      },
      fallbacks: ['Georgia', 'serif'],
      optimizedFallbacks: true,
    },
    {
      name: 'Geist Sans',
      cssVariable: '--font-geist',
      provider: fontProviders.local(),
      options: {
        variants: [{ src: [fontsource('geist', 'normal')], weight: '100 900', style: 'normal' }],
      },
      fallbacks: ['-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
      optimizedFallbacks: true,
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.local(),
      options: {
        variants: [{ src: [fontsource('geist-mono', 'normal')], weight: '100 900', style: 'normal' }],
      },
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      optimizedFallbacks: true,
    },
  ],

  // Images: Astro's responsive `layout` mode is intentionally NOT enabled — it
  // defaults to `fit: cover`. <Plate> passes explicit `widths` + `sizes` instead,
  // so every image is resized proportionally and never cropped.

  build: {
    // Emit hashed assets to /assets instead of Astro's default /_astro.
    assets: 'assets',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
