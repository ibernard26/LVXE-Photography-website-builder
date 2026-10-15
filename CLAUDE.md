# LVXE — working rules for Claude

Precedence: Isaiah's own instructions → `README.md` (master spec) → `docs/` →
the design skills in `.claude/skills/`. The skills are generic references;
when one suggests a palette, typeface, layout or pattern that conflicts with
LVXE's tokens or guardrails, LVXE wins.

## Never, for LVXE content

- Use stock or AI-generated imagery as work, backgrounds or placeholders. In
  particular, do not run `design-system/scripts/fetch-background.py` (Pexels
  stock) or `design/scripts/logo/generate.py` (AI image generation) for this
  site.
- Crop, stretch or re-ratio a photograph; invent projects, clients, credits,
  awards or quotes; publish a person's likeness without confirmation.
- Replace the LVXE tokens (Obsidian, Charcoal, Bone, Gray, Burgundy) or add
  icon/emoji decoration, glass blur, gradients or pill badges.

## Component generators (21st.dev MCP over HTTP, `.mcp.json`, key in `API_KEY_21ST`)

Magic returns generic UI components. Treat its output as raw material: strip
anything off-brand (rounded cards, gradients, glass, icons, stock imagery)
and restyle with LVXE tokens before it touches the site.

## Where things live

- Photographs: `src/assets/work/`, listed in `src/data/plates.ts`
- Films: `public/film/`, listed in `src/data/films.ts`
- Copy, nav, scopes and rates: `src/data/site.ts`, `src/data/commissions.ts`, `src/data/series.ts`
- Plans and audit briefs: `docs/`

## Checks before pushing

`npx astro check` (0 errors), `npm run build`, then desktop and 390px
screenshots with no layout shift and no horizontal scroll.
