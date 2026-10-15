# LVXE — Release Candidate 1 (hardening pass)

Branch `claude/laughing-ptolemy-vww0ug`. Status: **approved by the owner on Oct 15 for launch on
GitHub Pages at lvxe.studio** (composition approved; all sitters confirmed by the owner as
having agreed to publication).

## 1. Baseline

- `main` contains the README only (7223cb2). There is no site code on `main` to
  audit; the two code candidates are this branch and the PR #1 → #2 stack
  (`phase-1-foundation` → `curatorial-split`). This pass hardens this branch.
- PR #2 was read, not modified. It adds six NYC street photographs (committed
  from the owner's account as "owner-confirmed") with placeholder titles and
  years flagged `sample: true`, plus two `sample-*` project entries. Those must
  not reach production as written.

## 2. Spec audit (Oct 15 Curatorial Split brief)

| Requirement | Status |
| --- | --- |
| 35 / 65 split, sticky curatorial panel | Pass (≥1024px); stacked below |
| Wordmark, issue line, proposition, disciplines, Inquire, colophon | Pass |
| [Index / Ledger] header control | Pass (persistent, `aria-pressed`, deep-linkable) |
| Ledger columns, hover preview, row → room | Pass |
| Tokens, Newsreader / Geist / Geist Mono, 11px mono metadata | Pass |
| Zero rounding, no `object-fit: cover`, no blur/gradient/neon | Pass |
| No "Packages", no collapsed word breaks | Pass |
| Plate ratios 2:3 / 16:9 / 3:2 + 4:5 / 2:3 | **Deviation**: every approved master is 2:3; rhythm is carried by scale and offset. A real 4:5 frame (`red-motion-portrait`) exists on PR #2 and awaits approval |
| Pl. 02 Barbican colonnade, Pl. 03 runway | **Not used**: see §3 |
| Homepage leads with art (README) | Fixed in this pass for phones (§4) |

## 3. Assets — provenance, rights, resolution

All photographs and the film were supplied by Isaiah Bernard (chat attachments
and the Lightroom asset IDs he listed). Files carry no EXIF, so capture data
cannot be verified from the files themselves. Copyright notice in the footer:
"All photographs Isaiah Bernard".

| Plate | Master in RC | Owner's larger export (PR #2 branch) | Largest need @2× (px) | Status |
| --- | --- | --- | --- | --- |
| 01 fingers-closeup | 2000×3000 (owner export) | in use | 1440 | Adequate |
| 02 cathedral | 1365×2048 (owner export) | in use | 1120 | Adequate |
| 03 earring-portrait | 1333×2000 | identical | 1044 | Adequate |
| 04 hands-portrait | 1365×2048 (owner export) | in use | 1044 | Adequate |
| 05 record-store | 1365×2048 (owner export) | in use | 1280 | Adequate |
| 06 mesh-pair | 1365×2048 (owner export) | in use | 1044 | Adequate |
| Film 01 chrome-glasses | 1080×1920 H.264/VP9 | — | — | Adequate |

Largest need = widest `sizes` slot (homepage stream at ≥1536px, or the plate
room at a 900px-tall window) × 2. Taller windows ask for more.
Same-frame check: downscaled pixel difference < 2/255 for every pair.
The owner's larger exports replaced the earlier masters on approval
(Oct 15); earring-portrait was already the same file.

**Likeness / publication permission: confirmed by the owner (Oct 15) for
every sitter in the six plates and the film.** Keep the signed releases on file.

**Barbican architectural image (flagged separately).** Not present on any
branch. It appears only as an Unsplash URL in the Oct 15 brief
(`photo-1727685655787-84be2e0ce9a0`). It is third-party stock, not LVXE work,
and is excluded under the standing rule against stock imagery. The other brief
links (Unsplash, Pexels) are excluded for the same reason. If Isaiah made the
Barbican photograph himself, he must supply the original file before it can
be considered.

## 4. Fixes in this pass

- **Booking form**: endpoint now comes from `PUBLIC_BOOKING_ENDPOINT` (host
  env, not code). With JS it sends by `fetch` with `Accept: application/json`:
  sending state, button locked against double submit, success resets the form,
  server or network failure keeps every typed value and says so; status is
  focused and announced. Honeypot `_gotcha` field. No-JS falls back to native
  POST. Unconnected state still says plainly that nothing was sent.
- **Ledger**: whole-row focus outline; row click fallback for engines that
  cannot position table rows; filter names "Architecture — 1 work" (was
  "All , 7 works" / "1 works"); empty series read as "No series", not "dash".
- **404 page** (`src/pages/404.astro`), branded, with Index / Ledger / Book.
- **Label in Name (2.5.3)**: header home link name now contains its visible text.
- **Performance**: preload only the roman serif and body sans (4 → 2 font
  preloads); film poster attached only as the film nears the viewport
  (`<noscript>` keeps it without JS); page-head lede no longer fades in, so it
  no longer holds LCP.
- **Mobile fold**: tighter panel rhythm below `sm`; the lead plate now enters
  the first screen at 390×844 (221px visible; previously none).

## 5. Evidence

- `astro check`: 0 errors, 0 warnings. `astro build`: 12 pages, no errors.
- Responsive audit, 14 routes × 6 viewports (1440, 1280, 1024, 768, 390, 360):
  0 horizontal overflow, 0 elements past the edge, 0 clipped boxes, 0 media
  rendered off their native ratio, 0 console errors, 0 failed requests;
  internal links all 200; unknown path returns the 404 page with status 404.
- Ledger: Tab / Enter / Space operate view toggle, filters and rows; touch tap
  anywhere on a row opens it; targets ≥ 44px on touch; table exposes caption,
  column headers and named row links; inactive view is removed from the
  accessibility tree; no-JS renders both views.
- Form (simulated provider): 12/12 checks — empty send, invalid email,
  unconnected notice, success, JSON accept header, commercial-only payload,
  HTTP 500, offline, sending lock, single request on double submit, no-JS
  POST, `?type=` presets.
- axe-core 4.10 (WCAG 2.0/2.1/2.2 A/AA + best practice): only finding is
  `color-contrast` on three `aria-hidden` decorative numerals/wordmarks
  (Charcoal on Obsidian). Their content is repeated in readable text; WCAG
  1.4.3 exempts pure decoration. No other violations.
- Lighthouse 12.6, mobile, devtools throttling (lab):

  | Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |
  | --- | --- | --- | --- | --- | --- | --- | --- |
  | / | 96 | 96 | 96 | 100 | 2.2 s | 0.012 | 170 ms |
  | /?view=ledger | 99 | 96 | 100 | 100 | 1.7 s | 0.009 | 60 ms |
  | /work | 97 | 95 | 100 | 100 | 2.0 s | 0 | 30 ms |
  | /work/fingers-closeup | 97 | 96 | 100 | 100 | 2.3 s | 0 | 20 ms |
  | /book | 98 | 96 | 96 | 100 | 2.0 s | 0 | 10 ms |

  Desktop: 100 performance on all four measured routes, LCP 0.5–0.7 s.
  Before this pass mobile LCP was 2.8–2.9 s (/) and 4.0 s (/work).
  A11y < 100 = the decorative contrast item; BP 96 = 11px mono metadata
  (spec-mandated, 4.7% of text).

## 6. Outstanding before production

1. ~~Model / likeness releases~~ — confirmed by the owner, Oct 15.
2. **Booking provider**: set the `PUBLIC_BOOKING_ENDPOINT` Actions variable
   and run one real submission. Until then the live form says plainly that
   inquiries are not connected.
3. **Field Core Web Vitals**: no production traffic yet; lab only. Measure
   with CrUX / RUM after launch. INP not measurable in lab.
4. **Browsers / AT**: tested in Chromium only. Safari (iOS/macOS) and Firefox,
   and a manual VoiceOver / TalkBack pass, are still required.
5. Owner data: contact email and Instagram, titles, years, series, discipline
   tags (draft), slogan and proposition (draft), production domain
   (`site: https://lvxe.studio/`).
6. Optionally, approve the 4:5 red portrait from PR #2.
7. Choose the merge path to `main` (this branch vs the PR #1 → #2 stack).
