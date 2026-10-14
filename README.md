# LVXE-Photography-website-builder
A website for the brand LVXE the photographer
# LVXE — Master Website & Technical Specification

> **Operational Directive for AI Tools (Claude Code / Cursor / ChatGPT):**  
> Read this entire specification before writing code. Inspect the repository first. Do not introduce generic template patterns, excessive motion libraries, or unverified claims. Follow the phased rollout and verify acceptance criteria before advancing.

---

## 1. Brand Identity: Confirmed vs. Proposed

### Confirmed Parameters
- **Brand Entity:** LVXE (pronounced /lʌks/ or "Luxe"), an independent photography and visual arts practice.
- **Founder & Artist:** Isaiah Bernard (artistic identity: *Lux*).
- **Core Disciplines:** Editorial fashion, intimate portraiture, cinematic visual storytelling, contemporary fine art.
- **Commercial Offerings:** Commercial/brand campaigns, corporate workplace portraiture/headshots, private commissions, and verified event coverage.
- **Existing Asset Archive:** Reference archive located at `https://luxeeditorials.mypixieset.com/`. Use authentic imagery only; never generate or substitute synthetic/AI imagery as portfolio work.
- **Positioning:** Independent creative practice with a distinctive artistic signature—not a retail photography studio or generic service vendor.

### Proposed Directions (Awaiting Isaiah's Formal Sign-Off)
- **Brand Slogan:** *"The Art of Being Seen."* (Treat as working draft; implement as an editable content field).
- **Draft Copy:** *"Portraiture, fashion, and visual narratives shaped by atmosphere, identity, and intention."*
- **Color Palette:** Proposed tokens (Obsidian `#0B0B0D`, Charcoal `#1B1B1F`, Bone `#F2EFE9`, Muted Burgundy `#54252D`).

---

## 2. Anti-Patterns & Hard Guardrails (Non-Negotiable)

1. **No "AI-Vibe" or SaaS UI Clichés:**
   - NO neon glows, cyan/purple/indigo gradients, floating pill badges, or glassy bento grids (`backdrop-blur`).
   - NO scroll-jacking, custom cursor tracking rings, or intrusive canvas particle effects.
   - NO decorative icons or emojis inside navigation, buttons, or metadata.
2. **No Image Integrity Violations:**
   - NO forced uniform cropping. `object-fit: cover` is strictly banned on full-bleed views and project showcases where subject framing is altered.
   - Maintain natural camera aspect ratios: 3:2 (35mm), 4:3 (Medium Format), 1:1 (Square), 16:9 (Cinematic stills).
3. **No Commercial Dilution:**
   - The homepage must lead with artistic credibility, not pricing packages or aggressive sales copy.
   - Do not force bright corporate headshots into moody editorial sequences. Maintain a dedicated, cleanly separated pathway for commercial/corporate clients.
4. **No Fabricated Data:**
   - Do NOT invent client logos, magazine publication laurels, quotes, awards, or phony exhibition histories.

---

## 3. Design System & Visual Tokens

### Color Tokens
```css
:root {
  /* Primary Dark Theme (Default) */
  --color-obsidian: #0B0B0D;     /* Background canvas */
  --color-charcoal: #1B1B1F;     /* Surface elevation, borders, cards */
  --color-bone: #F2EFE9;         /* Primary typography, headlines */
  --color-soft-gray: #A7A4A0;    /* Captions, metadata, secondary copy */
  --color-burgundy: #54252D;     /* Sparse accent: active indicators, keylines */
  --color-border: #1F1F24;       /* Sub-pixel hairline dividers */
}

/* Light Exhibition Mode (Applied to selected white-cube gallery pages) */
[data-theme="light-gallery"] {
  --color-obsidian: #FDFCFA;     /* High-key gallery background */
  --color-charcoal: #EDEAE4;     /* Light surface / dividers */
  --color-bone: #141416;         /* High-contrast ink text */
  --color-soft-gray: #686561;    /* Gallery notes, metadata */
  --color-burgundy: #54252D;
  --color-border: #E5E2DC;
}/* Scale & Line Height */
--font-display: 'Newsreader', serif;
--font-sans: 'Geist Sans', -apple-system, sans-serif;
--font-mono: 'Geist Mono', monospace;

/* Type Scale: Max 4 distinct levels per viewport */
.text-display  { font-family: var(--font-display); font-size: clamp(2.25rem, 6vw, 4.5rem); line-height: 1.05; letter-spacing: -0.02em; }
.text-heading  { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.15; }
.text-body     { font-family: var(--font-sans); font-size: 0.9375rem; line-height: 1.6; color: var(--color-soft-gray); }
.text-meta     { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-soft-gray); }
