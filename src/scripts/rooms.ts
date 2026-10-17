/**
 * Exhibition rooms on the homepage — the gallery's own motion.
 *
 * Lights up: a room marked `data-lights` starts with its work unlit; when a
 *   third of the room is in view it gains `is-lit`, the light comes up on
 *   the frame and the wall label sets line by line after it. Once lit, a
 *   room stays lit. CSS in global.css owns timing and the start state, which
 *   applies only under `html.js` and `prefers-reduced-motion: no-preference`,
 *   so without this script or with reduced motion every work is fully lit.
 * Room counter: the header's two-digit counter rolls to the room that
 *   crosses the middle of the window.
 *
 * Re-runs on every Astro page load so it survives ClientRouter navigations.
 */

let cleanup: (() => void) | null = null;

function setup() {
  cleanup?.();
  cleanup = null;
  const rooms = document.querySelectorAll<HTMLElement>('[data-room]');
  if (!rooms.length) return;

  const lit = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-lit');
        lit.unobserve(entry.target);
      }
    },
    { threshold: 0.33 },
  );
  rooms.forEach((room) => {
    if (room.hasAttribute('data-lights')) lit.observe(room);
  });

  const strips = document.querySelectorAll<HTMLElement>('[data-room-counter] [data-odo]');
  const show = (n: string) => strips.forEach((strip, i) => strip.style.setProperty('--d', n[i] ?? '0'));
  // A one-pixel band across the middle of the window: whichever room covers
  // it is the room being visited.
  const counter = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show((entry.target as HTMLElement).dataset.room ?? '01');
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  if (strips.length) rooms.forEach((room) => counter.observe(room));

  cleanup = () => {
    lit.disconnect();
    counter.disconnect();
  };
}

document.addEventListener('astro:page-load', setup);

export {};
