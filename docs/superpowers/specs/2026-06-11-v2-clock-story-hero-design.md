# /v2 — Cinematic Noir "Clock Story" Hero — Design Spec

Date: 2026-06-11 · Status: approved by Eugene (chat) · Scope: new page only, production homepage untouched

## Goal

A separate "most expensive moving website" experience page at `/v2`: scroll-driven
giant-clock storytelling hero with deep parallax, cinematic typography, luxury
noir aesthetic. Conversion paths (quote wizard, phone) preserved. Serves as a
candidate future homepage; lives at its own URL until promoted.

## Decisions made during brainstorming

- Direction: **B · Cinematic Noir** (over Private Bank and Hermès Editorial)
- Hero composition: **B3 · scroll-driven clock storytelling** (over clock-backdrop B1, mega-countdown B2)
- Lives at `/v2`, `noindex`, not in sitemap. Production `/` untouched.
- Real photos only (project rule): 8.jpg (truck arrival), 10.png (wrapping),
  2.png (loaded truck), 9.jpg (high-rise delivery, Miami skyline).
- No new dependencies: `motion/react` (already installed) drives scroll animation.

## Page structure (`src/app/v2/page.tsx`, components in `src/components/v2/`)

1. **V2Header** — fixed, transparent → blurred dark on scroll. Logo, live Miami
   clock (ticks every second), phone 786-305-1844, gold CTA "Get Private Quote" → `/quote`.
2. **ClockStoryHero** — sticky 100vh stage inside a ~500vh scroll container.
   - Giant SVG clock (thin gold strokes #C9A84C, roman numerals) anchored
     left/behind content; hand angle bound to scroll progress via
     `useScroll` + `useTransform`.
   - Intro frame: kinetic type "ONE DAY." (solid white) / "ZERO CHAOS."
     (gold outline, `-webkit-text-stroke`), clock at 08:00, hint "Scroll the day".
   - 4 scenes (crossfade + scale + multi-speed vertical parallax of photo/copy):
     | Clock | Scene | Photo | Headline |
     |---|---|---|---|
     | 08:00 | Arrival | Real/8.jpg | The crew arrives. On the minute. |
     | 09:30 | Protection | Real/10.png | Every edge wrapped like it's ours. |
     | 13:00 | Loading | Real/2.png | Loaded like a vault. |
     | 18:00 | Home | Real/9.jpg | Same day. New address. (+ CTA) |
   - Scene progress indicator "SCENE n / 4" with gold bars.
   - Film-grain CSS overlay, background #060608.
3. **V2CTA** — "Your move, planned to the minute": starting price from
   `localStartingPrice()` (real pricing.ts), buttons → `/quote` and tel:, trust
   row (Fully insured · COI · owner-led).
4. Reuse existing `Footer`.

## Technical constraints

- Animations: transform/opacity only (GPU-composited), no layout thrash.
- `next/image`; scene-1 photo `priority`, rest lazy.
- Mobile 375px: same scroll story, smaller clock behind text, reduced parallax
  amplitude; no horizontal overflow; no `xs:` prefix (project rule).
- `prefers-reduced-motion`: scenes render as static stacked sections.
- Fonts: existing Playfair Display (serif accents) + Inter; mega headings use
  Inter 800+ with tight tracking.
- Metadata: `robots: { index: false, follow: false }`.

## Verification

- `npx next build` clean; Playwright screenshots at 1440px and 375px;
  manual scroll-through on dev server. Preview deploy (`vercel`, not `--prod`)
  for Eugene's review. Production untouched until explicit approval.
