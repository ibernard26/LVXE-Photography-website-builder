/**
 * LVXE motion engine — no library.
 *
 * Adds `is-in` to `.reveal-mask`, `.reveal-lines` and `.reveal-fade` elements
 * as they enter the viewport; CSS in global.css owns every timing and easing.
 * Start states are gated behind `html.js` and `prefers-reduced-motion:
 * no-preference`, so content is always visible without this script.
 *
 * Re-runs on every Astro page load so it survives ClientRouter navigations.
 */

const SELECTOR = '.reveal-mask, .reveal-lines, .reveal-fade';

let observer: IntersectionObserver | null = null;

/**
 * Chrome's IntersectionObserver honours the target's own clip-path, so a
 * fully masked frame would never count as visible. Masked frames are
 * therefore observed through their parent element.
 */
const sentinels = new WeakMap<Element, HTMLElement[]>();

function reveal() {
  observer?.disconnect();
  const targets = document.querySelectorAll<HTMLElement>(SELECTOR);

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          for (const el of sentinels.get(entry.target) ?? []) el.classList.add('is-in');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => {
    const sentinel = el.classList.contains('reveal-mask') && el.parentElement ? el.parentElement : el;
    const list = sentinels.get(sentinel) ?? [];
    list.push(el);
    sentinels.set(sentinel, list);
    observer!.observe(sentinel);
  });
}

document.addEventListener('astro:page-load', reveal);
document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('js'));

export {};
