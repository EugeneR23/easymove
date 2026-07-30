# Changelog — Stage 2 implementation

Date: 2026-07-30. Basis: [SITE-AUDIT.md](SITE-AUDIT.md), [CONTENT-FACT-CHECK.md](CONTENT-FACT-CHECK.md), [AI-VISIBILITY.md](AI-VISIBILITY.md), approved by Evgenii.

Eleven commits, one concern each. Verified after every commit with `npx tsc --noEmit`; the pricing engine has a regression test (`npx tsx scripts/pricing.test.ts`, all pass); a full `next build` succeeds with every route static or SSG.

**Rate change made during implementation:** Evgenii set the truck fee at **$129 flat per day**, superseding the $99 in the audit brief. Every derived number on the site was recomputed from that.

---

## What changed and why

### 1. `docs(audit)` — Stage-1 audit committed
The three audit documents, so the reasoning behind every change below is in the repo rather than in a chat log.

### 2. `fix(pricing-engine)` — the calculator was contradicting the marketing
[src/lib/pricing.ts](../src/lib/pricing.ts)

- `TRUCK_BASE = 90` with distance scaling up to $229 → `TRUCK_FEE = 129`, flat, never scaled. Fuel, tolls and mileage are inside it.
- **`accessFee += flights * 50` deleted.** The quote calculator was charging $50 per flight of stairs while the home page and pricing page both promised "no stairs fees". Stairs now add carry time (0.5h per flight) to the estimate, which is what the guarantee actually says.
- Weekend and peak-season surcharge constants removed. They were declared, never applied, and contradicted the locked-rate promise.
- Grandfather-rate constants removed.
- Regression test updated and extended: flat truck fee at any distance, stairs raise hours not fees, local 2BR total $710.

**Why:** an invoice line the site denies existing is the single most damaging kind of error — it proves the guarantee false to the one customer who reads carefully.

### 3. `feat(pricing)` — /pricing rewritten
[src/app/pricing/page.tsx](../src/app/pricing/page.tsx)

- H1 answer now leads with numbers ($129/$179 per hour + $129/day truck, 3-hour minimum, 1BR $516–$774, long distance from $1,500) instead of a policy paragraph.
- **The 15% cap is gone and the four-part guarantee is in**, including the closing paragraph on what the business deliberately does not promise.
- Truck stated as a separate flat daily line everywhere, including in the `AggregateOffer` schema, which previously omitted it entirely and implied $129/hr was the whole price.
- New worked example: an itemised 2BR Hallandale→Hollywood invoice totalling $1,024, with the arithmetic shown and what happens if the crew finishes early. This is the format LLMs quote.
- Apartment totals recomputed as hours × rate + $129; included-vs-billed lists rebuilt around loaner versus kept materials.
- FAQ rewritten answer-first; no-deposit, 15-minute increments, payment 45–60 minutes before wrap, stairs-cost-time.

### 4. `fix(services)` — service pages and the served JSON
- Long-distance `startingPrice` **1200 → 1500** in [data/services.json](../data/services.json) and the seed. The old number was below our own stated floor and was being emitted into `Offer` JSON-LD.
- International aligned to one figure ($4,500) and the description no longer claims we run customs clearance and export permits — the same page elsewhere correctly said that is an FMC-licensed forwarder's job.
- Removed "Full insurance coverage", "Real-time GPS tracking", "Premium packing materials included", "Gallery-standard installation".
- [serviceContent.ts](../src/lib/data/serviceContent.ts): truck line corrected, stale apartment totals recomputed, 15-minute increments, payment timing, building lists reworded from claimed history to areas served.

### 5. `fix(packing)` — /packing-services
"4.9★ Top-Rated" → the only verified figure, 5.0 from 32 Thumbtack reviews. "Fully Licensed & Insured" badge and "covered under our full liability policy" replaced with what we can evidence.

### 6. `fix(facts)` — the $129 sweep across all content data
[cities.ts](../src/lib/data/cities.ts), [citiesRu.ts](../src/lib/data/citiesRu.ts), [blog.ts](../src/lib/data/blog.ts)

- Every truck-fee mention, every unit-size total, in both languages.
- Weekend +10% / peak +5% removed everywhere (they contradicted the new guarantee).
- Building COI dollar limits softened to "many buildings here require $1M–$2M — we confirm your building's exact requirements before move day", with source TODOs. **Fabricated building rules would have been worse than no content**, and these were being served inside FAQPage schema.
- **Fort Lauderdale and Boca Raton** expanded from ~550-word near-templates with move-type patterns, access realities and HOA/dock guidance — no invented building policies.
- RU pages no longer make promises the EN pages don't ("ответим в течение 30 минут", "15–20% расписания").
- Hurricane blog post no longer cites a terms clause that [/terms](../src/app/terms/page.tsx) does not contain.

### 7. `fix(schema,perf)` — entity graph and the 2.4 MB image
[src/app/layout.tsx](../src/app/layout.tsx)

- **Sitewide `AggregateRating` (5.0 from 6 Google reviews) removed.** It contradicted the visible "32 reviews" and a self-serving rating on every page breaches Google's review-snippet guidelines. The rating now lives on /reviews only, tied to Thumbtack.
- `OfferCatalog` description rewritten with the correct truck fee, no surcharges, the fees-that-don't-exist list and the $1,500 floor.
- Added a single `Person` node for Evgenii Romanov (`#founder`) with both name spellings and `knowsLanguage`, referenced by both LocalBusiness and Organization instead of two duplicate inline objects.
- Removed the `WebSite` `SearchAction` — it pointed at `/blog?q=` and no search endpoint exists.
- **Removed the hardcoded homepage hreflang triple** injected into every route's head, which made each inner page declare the homepage as its own alternate.
- **Removed `<link rel="preload" href="/images/Hero.png">`**: measured 2,545 KB fetched on every page, including pages that never display it, while the rendered hero is a 46–65 KB AVIF whose own preload next/image already emits. Verified in the build: zero raw image preloads remain.

### 8. `feat(home)` — home page and its FAQ schema
- Pricing cards renamed from "2 Movers + Truck" to "Crew of 2" so the label stops implying the truck is in the rate; each card states "+ $129/day truck".
- **The "box truck with fuel and tolls covered … included" FAQ answer is deleted.** It was the flagship contradiction and it was being served to AI crawlers inside FAQPage JSON-LD.
- FAQ rewritten answer-first with the questions the site never covered: included vs billed separately, do stairs/elevators/long carries cost extra, what a COI is and why the building needs one, how freight elevator reservations work, how storage moves are handled and what happens to blankets left in storage, how valuation coverage works.
- Six unused components deleted (StatsBar, QuoteTeaser, ProcessSection, HomepageCalculator, WorkGallery, HeroCallbackForm) — they still carried "4.9★" and "truck included" and would regress the site if re-wired. Recoverable from git.

### 9. `fix(reviews)` — the worst page on the site
[src/app/reviews/page.tsx](../src/app/reviews/page.tsx) shipped six cards reading `[Paste exact review text from Google Business Profile dashboard]` by `[Client Name from GBP]` — as visible copy **and** as `Review` JSON-LD plus microdata. To Google and to AI assistants that reads as fabricated review markup on a trust page.

- `REVIEWS` is now an empty typed array; grid and Review schema render only when it holds real verbatim reviews.
- `AggregateRating` switched to the Thumbtack figures with `sameAs` to the public profile.
- Broken `g.page/r/[GBP_REVIEW_LINK]/review` CTA falls back to the working Thumbtack link.
- Dropped "100% repeat or refer". Added an honest section on why we link to the verifying platform instead of reprinting selected quotes.

Verified in the build: no placeholders, `reviewCount: 32`, zero Review schema blocks.

### 10. `fix(trust)` — one brand, checkable claims, a real founder
- **"EasyMove Elite" → "Easy Move Florida"** in every title, meta description, JSON-LD provider and body reference (legal entity kept on /terms and /privacy, and as schema `alternateName`). One name matters because a stronger competitor trades as "Easy Florida Moving" one city north.
- Every visible "Licensed & Fully Insured" / "fully insured" badge (~15 places) replaced with something a customer can verify: COI within 24 hours, owner-led, 5.0 from 32 Thumbtack reviews. Source comments mark where the FDACS number goes; **no TODO text renders to users**.
- [/about](../src/app/about/page.tsx) rewritten in Evgenii's voice with the specifics that make him identifiable — owns the company, runs dispatch, writes the estimates, calls the building, answers WhatsApp, works in Russian and English, both spellings of his name stated so the entity resolves. Replaced the "craftsmanship / discretion / executives, athletes, collectors" filler.

### 11. `fix(i18n,links)` — RU parity and no more orphans
- RU tree brought in line: /ru/pricing had the $90 truck, the 10% long-distance deposit, both surcharges, the grandfather answer and old totals; /ru claimed "500+ moves", "full insurance" and 4.9.
- hreflang made reciprocal: EN /about and /contact gained `languages` blocks; RU /about, /services, /contact gained `x-default`.
- **All six RU city pages were reachable only from the sitemap** — now linked from a Russian footer block, and RU city pages cross-link to RU siblings rather than dumping visitors on English pages.
- /reviews, /doral-movers and /hallandale-beach-movers added to the footer (all previously unlinked or near-orphaned).
- Every city page now ends with a nearby-cities list: the city set is a mesh instead of ten dead ends.
- Language switcher goes to the counterpart page instead of always the root.
- RU subtree marked `lang="ru"` (the root `<html>` stays `en`; making it dynamic would need `headers()` and would disable static generation for the whole site).

### 12. `feat(ai)` — the AI channel
- **[public/llms.txt](../public/llms.txt) rewritten.** It was the best AI asset on the site and the most confidently wrong: truck "from $90", both surcharges, a $229 rate, route cells below the $1,500 floor, an unverifiable Google review count, and a named-building history stated as fact. Now table-first around verified facts, with an explicit note that older cached figures are withdrawn, a disambiguation line against the similarly-named competitor, and instructions not to state a licence number or insurance limit until one is published.
- **/llms-full.txt was a 404.** Now a route handler ([src/app/llms-full.txt/route.ts](../src/app/llms-full.txt/route.ts)) assembled from the same data the pages render — 169 KB of city, service and guide content that cannot drift out of sync with the site.
- Duplicate root `llms.txt` deleted (it was never served — two files to keep in sync, one of them invisible).
- robots.txt adds `Claude-User` and `Claude-SearchBot`.
- **sitemap lastmod** uses real content dates instead of `new Date()` on every route, which stamped all 48 URLs with the build time.
- **Admin credentials** moved out of [src/lib/auth.ts](../src/lib/auth.ts), where they were committed in plaintext (`admin@easymove.com` / `luxury2024`), into `ADMIN_EMAIL` / `ADMIN_PASSWORD`; login is refused when unset rather than falling back to a known default.

---

## Preserved, as instructed

Gold `#C9A84C`, ink `#1C1C1E`, Playfair headings, Inter body. All URLs unchanged (no redirects needed). The /ru version updated in parallel with English. Quote calculator working (regression test passes). GTM, Vercel Analytics, Clarity and Tawk.to untouched. WhatsApp deep links and their prefilled messages untouched.

---

## Required before this reaches customers

1. **Resolve the deploy pipeline (P0 from the audit, still open).** Production was last published ~2026-07-02 by a manual `npx vercel --prod` from a tree that is neither this repo nor `origin/main`, and it still serves the 15% cap 23 times on /pricing plus inside JSON-LD. **None of the work above is live.** Pull the deployed build's source, diff it against this repo, fold in anything July-2-only, then deploy from here. Local build gotcha: `next build` fails on /icon and /twitter-image (Cyrillic path + @vercel/og) — move those three files aside, build, restore.
2. **Rotate the admin password** and set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in Vercel. The old password is in git history.
3. **Send the TODO inputs.** Grep for `[TODO:` in `src/` — each marks a claim that is currently softened or omitted because it is unverified:
   - FDACS mover registration number (Florida Chapter 507). Competitors publish theirs; this is the cheapest trust gain available.
   - Google Business Profile URL + live review count (re-enables the Google blocks on /reviews).
   - Insurance carrier and coverage limits, if they should be public.
   - Confirm or kill: the 4-mover $229 rate, packing rates ($79/$119/$159), storage $200/mo, international $4,500, piano and office bands, the published street address, founding year 2021, and the per-building COI limits on the city pages.
4. **Off-site work, which the audit found matters more than anything on the site:** claim the Google Business Profile and move the review ask there, and get listed on the aggregators AI assistants actually quote (moveBuddha, Yelp, Angi, GreatGuysMove). The site is currently visible for 1 of 5 customer queries; the on-site fixes above make it citable, but the aggregators are what get it cited.
