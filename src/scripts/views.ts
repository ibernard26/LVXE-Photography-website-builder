/**
 * Index / Ledger view control and discipline filters for the homepage.
 *
 * State is held on <html data-view> and <html data-filter>; CSS in
 * global.css does the showing and hiding, so a switch is instant and costs
 * no layout work beyond the swap itself. The URL mirrors the state
 * (`?view=ledger&d=portraits`) through replaceState, keeping ClientRouter's
 * history entry intact.
 *
 * The ledger's hover preview is a single fixed frame that follows the
 * pointer (fine pointers only) or sits beside a focused row. It shows the
 * whole photograph at its native ratio; it never crops.
 */

type View = 'index' | 'ledger';

const root = document.documentElement;
let cleanup: (() => void) | null = null;

function syncUrl() {
  const url = new URL(location.href);
  const view = root.dataset.view as View;
  const filter = root.dataset.filter;
  if (view === 'ledger') url.searchParams.set('view', 'ledger');
  else url.searchParams.delete('view');
  if (filter) url.searchParams.set('d', filter);
  else url.searchParams.delete('d');
  history.replaceState(history.state, '', url);
}

function setup() {
  cleanup?.();
  cleanup = null;
  const scope = document.querySelector<HTMLElement>('[data-discipline-root]');
  const viewButtons = document.querySelectorAll<HTMLButtonElement>('[data-view-set]');
  if (!scope || !viewButtons.length) return;

  const filterButtons = scope.querySelectorAll<HTMLButtonElement>('[data-filter-set]');
  const status = scope.querySelector<HTMLElement>('[data-filter-status]');
  const empty = scope.querySelector<HTMLElement>('[data-empty]');
  const total = scope.querySelectorAll('[data-mode="index"] [data-item]').length;
  const pad = (n: number) => String(n).padStart(2, '0');

  function render() {
    const view = (root.dataset.view as View) || 'index';
    const filter = root.dataset.filter ?? '';
    viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewSet === view)));
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.filterSet ?? '') === filter)));

    const shown = filter
      ? scope!.querySelectorAll(`[data-mode="index"] [data-item][data-tags~="${filter}"]`).length
      : total;
    if (status) status.textContent = `${pad(shown)} of ${pad(total)} works`;
    if (empty) empty.hidden = shown > 0;
  }

  const onView = (e: Event) => {
    const next = (e.currentTarget as HTMLButtonElement).dataset.viewSet as View;
    if (next === root.dataset.view) return;
    root.dataset.view = next;
    // Bring the start of the new view into place without animating: the top
    // of the page on desktop (the panel is sticky), the start of the right
    // column on small screens (the panel sits above it).
    const start = scope.querySelector<HTMLElement>('[data-views-start]');
    const stacked = getComputedStyle(scope).display !== 'grid';
    if (stacked && start) start.scrollIntoView({ behavior: 'instant', block: 'start' });
    else if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'instant' });
    render();
    syncUrl();
  };
  const onFilter = (e: Event) => {
    const next = (e.currentTarget as HTMLButtonElement).dataset.filterSet ?? '';
    if (next) root.dataset.filter = next;
    else delete root.dataset.filter;
    render();
    syncUrl();
  };

  // Whole-row activation. The row link's ::after already covers the row
  // where table rows can be positioned; this covers engines where they can't.
  const ledgerBody = scope.querySelector<HTMLElement>('[data-mode="ledger"] tbody');
  const onRow = (e: MouseEvent) => {
    if ((e.target as Element).closest('a') || e.defaultPrevented) return;
    const link = (e.target as Element).closest('tr')?.querySelector<HTMLAnchorElement>('a[href]');
    link?.click();
  };
  ledgerBody?.addEventListener('click', onRow);

  viewButtons.forEach((b) => b.addEventListener('click', onView));
  filterButtons.forEach((b) => b.addEventListener('click', onFilter));
  const stopPreview = setupPreview(scope);
  render();

  cleanup = () => {
    viewButtons.forEach((b) => b.removeEventListener('click', onView));
    filterButtons.forEach((b) => b.removeEventListener('click', onFilter));
    ledgerBody?.removeEventListener('click', onRow);
    stopPreview();
  };
}

/** Floating native-ratio preview for ledger rows. */
function setupPreview(scope: HTMLElement) {
  const frame = scope.querySelector<HTMLElement>('[data-ledger-preview]');
  const img = frame?.querySelector('img');
  const rows = scope.querySelectorAll<HTMLElement>('[data-preview]');
  if (!frame || !img || !rows.length) return () => {};

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let raf = 0;
  let x = 0;
  let y = 0;

  const place = () => {
    raf = 0;
    const w = frame.offsetWidth;
    const h = frame.offsetHeight;
    const left = Math.min(x + 28, innerWidth - w - 16);
    const top = Math.min(Math.max(y - h / 2, 80), innerHeight - h - 16);
    frame.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  };
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(place);
  };

  const show = (row: HTMLElement) => {
    const { preview, previewW, previewH } = row.dataset;
    if (!preview) return;
    if (img.getAttribute('src') !== preview) {
      img.width = Number(previewW);
      img.height = Number(previewH);
      img.src = preview;
    }
    frame.hidden = false;
    queue();
  };
  const hide = () => {
    frame.hidden = true;
  };

  const onMove = (e: PointerEvent) => {
    x = e.clientX;
    y = e.clientY;
    queue();
  };
  const onEnter = (e: PointerEvent) => {
    if (!finePointer.matches || e.pointerType !== 'mouse') return;
    x = e.clientX;
    y = e.clientY;
    show(e.currentTarget as HTMLElement);
  };
  const onFocus = (e: FocusEvent) => {
    if (!finePointer.matches) return;
    const row = e.currentTarget as HTMLElement;
    const r = row.getBoundingClientRect();
    x = r.left + r.width * 0.62;
    y = r.top + r.height / 2;
    show(row);
  };

  rows.forEach((row) => {
    row.addEventListener('pointerenter', onEnter);
    row.addEventListener('pointermove', onMove);
    row.addEventListener('pointerleave', hide);
    row.addEventListener('focusin', onFocus);
    row.addEventListener('focusout', hide);
  });
  addEventListener('scroll', hide, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    rows.forEach((row) => {
      row.removeEventListener('pointerenter', onEnter);
      row.removeEventListener('pointermove', onMove);
      row.removeEventListener('pointerleave', hide);
      row.removeEventListener('focusin', onFocus);
      row.removeEventListener('focusout', hide);
    });
    removeEventListener('scroll', hide);
    hide();
  };
}

document.addEventListener('astro:page-load', setup);

export {};
