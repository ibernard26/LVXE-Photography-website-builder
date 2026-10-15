/**
 * Film playback policy.
 *
 * Every <video data-film> plays muted and only while at least a quarter of
 * it is on screen; it pauses when scrolled away or when the tab is hidden.
 * With prefers-reduced-motion it never autoplays. The adjacent
 * [data-film-toggle] button always works and its choice wins: a film the
 * visitor paused stays paused.
 */

let observer: IntersectionObserver | null = null;

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function label(video: HTMLVideoElement) {
  const btn = video.closest('.film')?.querySelector<HTMLButtonElement>('[data-film-toggle]');
  if (!btn) return;
  const paused = video.paused;
  btn.querySelector('[data-film-state]')!.textContent = paused ? 'Play' : 'Pause';
  btn.setAttribute('aria-pressed', String(paused));
}

function play(video: HTMLVideoElement) {
  if (video.preload === 'none') video.preload = 'auto';
  video.play().catch(() => label(video));
}

function setup() {
  observer?.disconnect();
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-film]'));
  if (!videos.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = target as HTMLVideoElement;
        if (isIntersecting && !reduce() && v.dataset.userPaused !== 'true' && !document.hidden) play(v);
        else if (!isIntersecting && !v.paused) v.pause();
      }
    },
    { threshold: 0.25 },
  );

  for (const v of videos) {
    v.addEventListener('play', () => label(v));
    v.addEventListener('pause', () => label(v));
    label(v);

    const btn = v.closest('.film')?.querySelector<HTMLButtonElement>('[data-film-toggle]');
    btn?.addEventListener('click', () => {
      if (v.paused) {
        v.dataset.userPaused = 'false';
        play(v);
      } else {
        v.dataset.userPaused = 'true';
        v.pause();
      }
    });
    observer.observe(v);
  }
}

document.addEventListener('visibilitychange', () => {
  document.querySelectorAll<HTMLVideoElement>('video[data-film]').forEach((v) => {
    if (document.hidden) v.pause();
  });
});
document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-preparation', () => {
  observer?.disconnect();
  document.querySelectorAll<HTMLVideoElement>('video[data-film]').forEach((v) => v.pause());
});

export {};
