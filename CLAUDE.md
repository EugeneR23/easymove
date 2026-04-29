# EasyMove Elite — Claude Rules & Project Context

## Project
- **Site**: easy-move-florida.com — luxury moving company, Miami / South Florida
- **Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS, Vercel
- **Goal**: Maximum conversion. Every change should either increase leads or improve trust.

---

## Core Rules (Never Break)

### Mobile
- **Never change font sizes on mobile** — text sizes are set for readability, don't reduce them for desktop-to-mobile "fit"
- **All inputs/textareas must have font-size ≥ 16px** — enforced via globals.css `max(16px, 1em)` rule outside `@layer` so it beats Tailwind utilities
- **No `xs:` breakpoint** — it doesn't exist in Tailwind. Use `sm:` (640px) as the smallest responsive prefix
- **Test at 375px (iPhone SE)** — this is the minimum viewport width to validate layouts
- **No horizontal overflow** — `overflow-x: hidden` is on html and body. Never introduce elements that break this
- **Sticky/fixed elements z-index** — QuoteWizard sticky CTA is z-40, header is z-50. Don't layer new fixed elements without checking conflicts

### Images
- **Always use `next/image` (`<Image>`)** — never plain `<img>` or CSS `backgroundImage` for content images
- **Real photos > AI-generated** — the target audience (luxury Miami clients) can tell the difference. AI images hurt trust
- **Hero photo**: currently `8.jpg` — do not use this image again anywhere else on the page (duplicates look cheap)
- **Available real photos**: `/public/images/Real/` — 1.jpg through 10.png (7.jpg is deleted/missing)
- **ALT tags must be descriptive** — SEO-optimized, not just "photo"
- **`priority={true}`** on first 2-3 images in any gallery/grid

### Design
- **Gold color**: `#C9A84C` (CSS var `--gold`) — use for accents, CTAs, borders. Don't approximate with yellow
- **Charcoal**: `#1C1C1E` — main dark background
- **Font**: Playfair Display for headings, Inter for body
- **No emojis** in UI unless user explicitly requests
- **Tailwind only** — no inline styles except for special cases like `max(16px, 1em)` or dynamic values

### Code
- **Never use `Math.random()` in pricing** — causes inconsistent quotes, destroys trust. All pricing must be deterministic
- **Rate limit all API routes** — callback and quote endpoints have in-memory Map rate limiting (3 req/min per IP)
- **sessionStorage for form state** — QuoteWizard saves progress on every change, restores on mount, clears after submit
- **No `xs:` Tailwind prefix** — always starts from `sm:`

---

## Conversion Priorities (in order)

1. **Social proof above the fold** — Testimonials must appear before WhyChooseUs and Services
2. **Price transparency** — Calculator shows real prices, no email gate
3. **CTAs everywhere** — Every section should have a path to `/quote` or phone call
4. **Trust signals** — "Fully insured", response time, real photos, coordinator (not algorithm)
5. **Mobile-first** — Most traffic is mobile, test on iPhone SE first

---

## Section Order (page.tsx — do not reorder without reason)
1. HeroSection
2. StatsBar
3. HomepageCalculator
4. TestimonialsSection ← social proof right after price reveal
5. WhyChooseUs
6. ServicesPreview
7. FounderBlock
8. WorkGallery
9. ProcessSection
10. FAQSection
11. CTABanner

---

## Phone & Contact
- **Phone**: 786-305-1844
- **Quote page**: `/quote`
- **Callback API**: `POST /api/callback` → Telegram notification
- **Quote API**: `POST /api/quotes` → Telegram + Airtable (when connected)

---

## Available Agents (slash commands)
Use these instead of doing full-page analysis inline:

- `/seo-agent` — SEO audit: H1/H2 structure, meta tags, schema.org, slugs
- `/conversion-agent` — Conversion audit: CTAs, form friction, trust signals, FOMO
- `/mobile-agent` — Mobile audit: 375px viewport, breakpoints, touch targets, overflow
- `/ux-agent` — UX/UI audit: visual hierarchy, copy clarity, section flow, micro-copy

---

## Known Issues (resolved)
- ~~`Math.random()` in `estimateDistance()` for unknown state pairs~~ → fixed to `600`
- ~~Callback API returning success before Telegram message sent~~ → fixed with `await`
- ~~8.jpg used in both hero and Services card~~ → Services card now uses `4.png`
- ~~AI image in High-Rise card~~ → replaced with real `9.jpg`
- ~~iOS zoom on textarea~~ → fixed via `max(16px, 1em)` outside `@layer`
- ~~`xs:inline` breakpoint in Header~~ → does not exist in Tailwind, needs fix to `sm:`

---

## What NOT to Do
- Don't add features not requested
- Don't refactor working code while fixing a bug
- Don't add docstrings/comments to code you didn't change
- Don't create new files unless absolutely necessary
- Don't use AI stock photos in trust-critical sections
- Don't change section order without explicit user approval
- Don't reduce text sizes on mobile to "fit" more content
