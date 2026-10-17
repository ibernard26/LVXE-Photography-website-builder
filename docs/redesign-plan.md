# LVXE Redesign — Visual Implementation Plan

> **Superseded (17 Oct 2026).** The homepage contact strip, WebGL darkroom
> light and gallery wall described here were replaced by the exhibition
> rooms (one work per room, lights up, rolling room counter) and have been
> removed from the code. They remain in git history. The tokens, type and
> integrity rules below still apply.

Issue 01 · October 2026 · Branch `claude/laughing-ptolemy-vww0ug`

The goal: in the first five seconds a visitor should meet a photographer, not a template.
The site is staged as **an issue of a fashion publication hung as a cinematic exhibition**.

---

## 1. What we take from the references (principles, not layouts)

| Reference | Principle extracted | LVXE translation |
|---|---|---|
| Siena Film Foundation (G-NS Studio) | Filmic structure: large visuals, ambient transitions, editorial type, a WebGL filmstrip with light parallax; navigation styled after cinema tickets | The homepage opens on a **full-bleed contact strip** of real frames. A WebGL "darkroom light" plays over it. Menu items carry ticket-like index numbers |
| Obys Agency | A custom neo-grotesque doing both functional and expressive work; motion that **connects** layouts and guides page transitions; a dark→light shift as narrative | One neo-grotesque (Geist) carries both the 22vw wordmark and the 12px metadata. Shared-element **view transitions** move a plate from the gallery into its exhibition room. Sections alternate obsidian rooms and bone gallery walls |
| Mathijs Hanenkamp portfolio (Hon Tran / Huy Phan) | A documentary photographer's site where the images lead and the interface recedes | Chrome stays thin, hairline and monochrome. Photographs are never cropped, carded or rounded |
| Sirnik Studio | Section-level craft: every block (works, about, footer) is a composed spread, not a repeated module | Each homepage section is a distinct spread with its own grid. No two adjacent sections share a layout |

The case-study pages themselves could not be opened from the build environment (network policy). These principles come from published write-ups and award listings for each site.

---

## 2. Graphic system

- **Issue masthead:** `ISSUE 01 — 2026 · NEW JERSEY / NEW YORK` in mono above the fold. Plates carry plate numbers (`PL. 03`). Series carry catalogue numbers (`S—02`). Numbers encode real order, never decoration.
- **Editorial rules:** 1px hairlines in `--color-border` divide spreads. One 2px burgundy rule per screen marks the active or booking element.
- **Vertical labels:** rotated mono labels in the outer margins (`PORTRAITURE / EDITORIAL / FINE ART`, `PLATE 03 OF 05`). Desktop only.
- **Grain:** a static SVG noise layer over the whole page at 4% opacity, in CSS with no runtime cost. The hero adds animated WebGL grain when allowed.
- **Burgundy** `#54252D`: booking links, the active menu index, the wordmark's full stop. Never body text, which would fail contrast.
- **Light gallery walls:** bone `#F2EFE9` sections with obsidian ink and `#686561` notes. Used for the plate spread and the packages table.

### Tokens

Obsidian `#0B0B0D` · Charcoal `#1B1B1F` · Bone `#F2EFE9` · Gray `#A7A4A0` · Burgundy `#54252D`
(+ hairline `#1F1F24`, gallery note `#686561` from README §3)

---

## 3. Typography — Neo-Swiss meets editorial serif

| Role | Face | Setting |
|---|---|---|
| Mega (wordmark) | Geist 800 | `clamp(6rem, 25vw, 26rem)`, tracking −0.06em, uppercase, line-height 0.78 |
| Display | Geist 500 | `clamp(2.75rem, 8vw, 7.5rem)`, tracking −0.045em, line-height 0.92 |
| Display serif (counter-voice) | Newsreader italic 300 | Same size as Display, staggered against the grotesk lines |
| Heading | Newsreader italic 400 | `clamp(1.5rem, 3vw, 2.5rem)` |
| Body | Geist 400 | 15–16px, 1.6, max 60ch |
| Meta | Geist Mono 400 | 11–12px, uppercase, +0.08em |

The staggered headline sets grotesk and italic serif on alternating lines, each indented on its own column of the 12-column grid. Max four type levels per viewport (README §3).

---

## 4. Motion system (300–800ms, cinematic, no motion library)

Easing: `--ease-cine: cubic-bezier(0.7, 0, 0.2, 1)` for reveals, `--ease-out: cubic-bezier(0.2, 0, 0, 1)` for hovers.

| Sequence | Mechanism | Timing |
|---|---|---|
| **Opening** (home, first paint) | Wordmark letters rise from a mask, staggered; triptych frames unveil top-down with `clip-path: inset()`; the masthead rail fades in last | Letters 800ms, +70ms each; frames 800ms, +120ms; rail 400ms at 700ms |
| **Masked image reveal** | `clip-path: inset(100% 0 0 0)` → `inset(0)` when 15% visible (IntersectionObserver). The frame is never cropped at rest | 800ms |
| **Staggered headings** | Each line wraps in a mask span and translates from 105% → 0 | 700ms, +90ms per line |
| **Project hover** | Siblings dim to 35%; caption slides 8px; burgundy rule grows 0 → 100% | 400ms |
| **Full-screen nav** | Panel wipes down (`clip-path`); index links rise staggered; closing reverses | 600ms panel, links 500ms +60ms |
| **Page transitions** | Astro `<ClientRouter />` (native View Transitions API): root cross-fade; **shared element** morph of a plate from gallery to exhibition room via `transition:name` | 500–700ms |
| **Scroll choreography** | CSS scroll-driven animations (`animation-timeline: view()`): wordmark drifts, cinema frame scales 0.94 → 1. Native scrolling, no scroll-jacking | Tied to scroll |
| **Darkroom light (WebGL)** | One fragment shader: animated film grain, vignette, and a soft light that follows the pointer, revealing the frames from a dimmed veil | 60fps; paused offscreen |

**Fallbacks**
- `prefers-reduced-motion`: every reveal is instant, scroll animations are off, and WebGL doesn't start (static CSS grain and veil instead). View transitions cross-fade only.
- No WebGL, `Save-Data`, or a failed context: the CSS veil mask follows the pointer instead.
- No JavaScript: all content is visible. Hidden start states only apply under `html.js`.
- Touch: the light drifts slowly on its own instead of tracking a pointer.

---

## 5. Page-by-page strategy

### Home — "Issue 01"
1. **Masthead rail:** issue number, region, menu button. Thin and mono.
2. **Hero, full-bleed contact strip:** three real frames edge-to-edge (3 × 2:3 = a 2:1 strip at 100vw, uncropped). On phones: one full-width frame, then a pair. The WebGL darkroom light plays over the strip. The **oversized LVXE wordmark** sits across the bottom edge in `mix-blend-mode: difference`.
3. **Staggered introduction:** "The Art of / *Being* / Seen." in alternating grotesk and italic lines with column offsets, plus the proposition and two links (View the work · Book a session).
4. **Series index (dark):** catalogue rows `S—01…04` with hover transitions. Draft concept lines appear on hover and focus.
5. **Gallery wall (light):** an asymmetric magazine spread of the five plates on bone, each linking to its exhibition room. Masked reveals and the hover-dim set.
6. **Cinema frame (dark, full-width band):** one plate hung at native ratio, up to 88vh tall, on a full-bleed obsidian band with letterbox rules and a vertical label. Scales in with scroll.
7. **Paired composition:** two plates, offset, with a short italic line.
8. **Commercial pathway (charcoal):** "For brands and companies." Campaigns, corporate portraiture, events, linking to the commercial booking path.
9. **Booking band + footer.**

### Work
Oversized "Work" title, the series index with concepts, then the full plate wall alternating dark and light rows. Every plate links to its room.

### Plate exhibition rooms — `/work/[plate]`
A curated single-image exhibition per real photograph (the series have no confirmed plates yet, so none are invented):
- Dark room. The image is centred at native ratio, max 86vh, with a shared-element transition from the wall.
- Wall label: plate number, colour or monochrome, orientation and ratio, and the descriptive text. Verified title and series only once supplied.
- Vertical `PLATE 03 OF 05`, previous/next plates, back to the wall, and the booking band.

When Isaiah assigns plates to series, the same template renders `/series/[slug]` rooms.

### Packages
A bone gallery wall with the rate table as a Swiss index, and a separate dark commercial block.

### Book
Two clear paths as a segmented choice: **Portrait session** or **Commercial / corporate**. Shared fields first. Commercial adds company, deliverables, usage and timeline. Progressive enhancement: without JS, every field shows. Generous targets, visible focus, labelled controls, and an honest status if no endpoint is configured.

---

## 6. Performance and accessibility budget
- JS: ClientRouter, about 8 KB for motion and navigation, and a WebGL module about 3 KB, lazy-loaded only on the home hero when allowed.
- The LCP image is the first hero frame, eager with `fetchpriority=high`. Everything else is lazy.
- CLS 0: intrinsic width and height on every image, metric-matched font fallbacks.
- Full-screen menu: `aria-expanded`, focus moved in and trapped, `Esc` closes, the page behind is `inert`.
- AA contrast for all text. Burgundy is used only for rules and underlines.
