# Site Audit — easy-move-florida.com

Audit date: 2026-07-29. Stage 1 deliverable — no site files were modified.
Method: full repo read, live-site fetches (raw HTML as GPTBot UA), curl timing/weight measurement, live SERP snapshots. Companion documents: [CONTENT-FACT-CHECK.md](CONTENT-FACT-CHECK.md) (every claim, marked), [AI-VISIBILITY.md](AI-VISIBILITY.md) (query results + citation plan).

---

## §0 — P0 BLOCKER: this repo is not what production is running

Before any content finding matters, this must be resolved:

| Evidence | Repo | Production (live) |
|---|---|---|
| 15% cap | **Absent** — replaced by "Same Rate Promise" ([pricing/page.tsx:482](../src/app/pricing/page.tsx#L482)) | **Present 23× on /pricing, 5× on /, and inside JSON-LD** |
| llms.txt "Last Updated" | 2026-06-12 | 2026-07-01 |
| Last commit | 2026-06-12 (`6553b30`, local main ahead of origin/main by 1) | Build stamp 2026-07-02, HTML cached 27.5 days (`Age: 2374299`) |

Explanation: this project has **no git auto-deploy** — production is published manually via `npx vercel --prod` from whatever working tree the deployer has at that moment. The ~July 2 deploy contained content (15% cap wording, llms.txt dated 07-01) that was never committed to this repo, while this repo contains a later fix ("Same Rate Promise") that was never deployed. Consequences:

1. Repo fixes (like the 15% cap removal) never reached users or AI crawlers.
2. Any Stage 2 work done here may silently miss or resurrect production content we can't see in the repo.

**Required before Stage 2:** pull the currently-deployed build source from Vercel (`vercel pull` / dashboard → deployment → source), diff it against this checkout, fold any July-2-only content in or consciously discard it, and deploy Stage 2 from this repo only. Known local gotcha: `next build` fails locally on /icon and /twitter-image OG routes (Cyrillic path + @vercel/og) — move the 3 files out temporarily to build.

**Side P0 (security, not SEO):** hardcoded admin credentials in [src/lib/auth.ts:6-10](../src/lib/auth.ts#L6-L10) (`admin@easymove.com` / plaintext password), documented in PROJECT_NOTES.md. Rotate to env vars in Stage 2.

---

## Priority summary

| # | Finding | Priority | Impact |
|---|---|---|---|
| 0 | Repo ≠ production; deploy pipeline broken | **P0** | Blocks everything; false promises stay live regardless of repo edits |
| 1 | 15% cap live in copy + JSON-LD `[LIVE-ONLY]` | **P0** | Legally/operationally unkeepable promise being ingested by AI crawlers now |
| 2 | Truck fee $90 + distance scaling + "truck/fuel/tolls included" (15+ locations incl. calculator engine, JSON-LD, llms.txt) | **P0** | The exact customer-facing contradiction that already cost trust; poisons every derived price on the site |
| 3 | Calculator charges $50/flight stairs fee while marketing says "no stairs fees" | **P0** | Site provably contradicts its own guarantee in the booking flow |
| 4 | /reviews ships literal "[Paste exact review text…]" placeholders in visible copy AND Review JSON-LD | **P0** | Looks like fabricated reviews to users, Google, and LLMs |
| 5 | LD "$1,200" in services.json + Offer JSON-LD; "10% deposit" claim | **P0** | Below $1,500 floor; contradicts no-deposit policy |
| 6 | AggregateRating 5.0/**6** sitewide (third-party sourced) vs visible "32 reviews" | **P1** | Google review-snippet policy risk + entity confusion |
| 7 | Conflicting hreflang on every page ([layout.tsx:306-308](../src/app/layout.tsx#L306-L308)) + `<html lang="en">` on RU pages + non-reciprocal pairs | **P1** | Undermines the entire /ru investment |
| 8 | Raw 2.43 MB Hero.png preloaded on every page (measured: 72% of page weight) | **P1** | Dominant LCP problem; one-line fix |
| 9 | 6 RU city pages are complete internal-link orphans; /reviews orphaned; doral+hallandale missing from footer; no service↔city mesh | **P1** | Crawl/equity starvation of the highest-leverage pages |
| 10 | Brand split "Easy Move Florida" vs "EasyMove Elite" across titles/JSON-LD/legal + "Easy Florida Moving" competitor collision | **P1** | Entity dilution exactly where a same-named competitor is stronger |
| 11 | Weekend +10% / peak +5% surcharges everywhere incl. llms.txt & JSON-LD — contradict the new locked-rate guarantee | **P1** | Must be confirmed-or-killed before the guarantee ships |
| 12 | Internal contradictions: 3 price universes, billing increments, arrival windows, peak season months, consolidation | **P1** | LLMs quote whichever version they retrieve; some are wrong |
| 13 | Thin city pages (Fort Lauderdale, Boca Raton ~65% boilerplate); unverifiable named-building "rules" on the good ones | **P1** | Near-duplicates are liabilities; fabricated building policies worse |
| 14 | No FDACS/USDOT number on site (competitors display theirs) | **P1** | #1 trust filter for movers; TODO from Evgenii |
| 15 | Shallow indexation (site: sample surfaced 4 of 48 URLs) | **P1** | Verify in GSC; likely tied to #9 + freshness |
| 16 | llms.txt stale (07-01), contradicts source of truth; /llms-full.txt 404 | **P2** | The AI channel's primary artifact needs a rewrite anyway |
| 17 | sitemap lastmod: 31 URLs share one build-time millisecond | **P2** | Weak freshness signal, not fake-date-level bad |
| 18 | Metadata nits: 232-char description on /pricing, home title = layout default, "Fully insured" in every service meta, H1→H3 skip on service pages, bogus WebSite SearchAction | **P2** | Cleanup batch |
| 19 | JS 667 KB (91 KB legacy polyfills), 4 font files 124 KB, GTM 152 KB | **P2** | After the hero fix |
| 20 | Dead components with stale claims (StatsBar 4.9★, HomepageCalculator "truck included") | **P2** | Delete to prevent regression |

---

## §1 AI / LLM discoverability (primary objective)

### 1.1 Crawler access — GOOD, already done
Live robots.txt (fetched 2026-07-29) explicitly **allows every AI crawler on the checklist**: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot (+Claude-Web, anthropic-ai), PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot, Meta-ExternalAgent, Amazonbot, Bytespider, CCBot — plus Diffbot, cohere-ai, YouBot. Blocked: only SEO scrapers (AhrefsBot, SemrushBot, MJ12bot, DotBot, BLEXBot, PetalBot). Source: [src/app/robots.ts](../src/app/robots.ts).
Two nits: `Claude-User` / `Claude-SearchBot` (current Anthropic UA names) aren't explicitly listed (covered by `*` allow, fine); robots allows `/es/` which doesn't exist yet.

### 1.2 llms.txt — EXISTS (rare; no competitor checked has one) but is now a liability
[public/llms.txt](../public/llms.txt) is dense, fact-structured, has citation guidance — the right shape. But it currently feeds AI engines: truck "from $90", weekend +10%, peak +5%, a $229 4-mover rate, route tables starting below $1,500, a Google 5.0/6 review claim, an address and founding date that are TODO-unverified, and a named-building history stated as fact. **The best AI-visibility asset on the site is confidently wrong.** /llms-full.txt referenced by convention is a 404. Repo root has a duplicate copy of llms.txt (identical hash) that isn't served — remove to avoid dual-maintenance drift.

### 1.3 Rendering — GOOD
Every route was fetched raw with a GPTBot UA: all prices, FAQ answers, and city copy are present in initial HTML. All city/RU wrappers are server components with metadata exports. Exceptions to note: `/quote`'s wizard is entirely client-side (nothing extractable — acceptable for a tool page, but the trust strip is all a bot sees); `/ru` homepage is `'use client'` ([ru/page.tsx:1](../src/app/ru/page.tsx#L1)) — still prerendered but can't export its own metadata (inherits from ru/layout.tsx — works, fragile). Home-page sections are all client components with framer-motion; content is in the prerendered HTML but the H1 renders as fragmented motion `<span>`s — extractable but ugly.

### 1.4 Extractability per page (answer-first test)
| Page | Opening | Verdict |
|---|---|---|
| / | H1 + "From $129/hour with 3-hour minimum" in first screen | GOOD |
| /pricing | H1 asks "How much does a move cost?" but first paragraph answers with policy, not numbers; $129/$179 arrive 2 sections down | FIX: numbers first |
| /services | "From Brickell high-rises to Boca Raton estates…" — pure atmosphere | FIX |
| /services/[slug] | Tagline + marketing prose; prices in a bullet list that should be a table; **H1→H3 heading skip** ([services/[slug]/page.tsx:162,184,201](../src/app/services/[slug]/page.tsx#L162)) | FIX |
| /about | "Founder-led. Crew-driven." — atmosphere, zero numbers | FIX |
| /reviews | Numbers first — but they're placeholders | REBUILD |
| /packing-services | H1 good; first para atmosphere; rates mid-page as divs | FIX |
| City pages | Hero + intro generally concrete; FAQ-rich | GOOD (content quality varies, §4) |
| Blog | Strongest extractable content — and the biggest reservoir of stale prices | FIX facts |

Tables: /pricing's route table is a real `<table>` (good); the apartment-totals grid is CSS divs ([pricing/page.tsx:325-348](../src/app/pricing/page.tsx#L325-L348)) — make it a real table. Rate tiers, included-vs-billed, materials packages are all prose/cards today — all should be tables.

### 1.5 Freshness
Live homepage HTML served from a 27.5-day-old cache; sitemap lastmod build-stamped (31 URLs share `2026-07-02T12:29:09.808Z` — [sitemap.ts uses `new Date()`](../src/app/sitemap.ts#L42)); llms.txt dated 4 weeks back; no visible dateModified on money pages (blog posts do have article dates). Needs: real per-page lastmod, a deploy/revalidate cadence, and a visible "rates verified <date>" line on /pricing (both a human trust signal and an LLM freshness signal).

---

## §2 Structured data

Inventory (16 emitters found — full detail in [CONTENT-FACT-CHECK.md](CONTENT-FACT-CHECK.md) §JSON-LD):

| Exists | Assessment |
|---|---|
| MovingCompany + LocalBusiness sitewide ([layout.tsx:103-243](../src/app/layout.tsx#L103-L243)) | ✔ name/phone/email/geo/openingHours/priceRange/areaServed (17 cities)/knowsLanguage ['en','ru']/founder — right skeleton, wrong facts inside (truck $90, surcharges, `[LIVE-ONLY]` 15% cap, rating 5.0/6, unverified address + foundingDate) |
| Organization + WebSite/SearchAction ([layout.tsx:248-299](../src/app/layout.tsx#L248-L299)) | SearchAction points to `/blog?q=` — **no search exists**; remove. alternateName "EasyMove Elite" |
| FAQPage: home ×10, pricing ×14, per-service, per-city, RU | ✔ present — but serializes the FALSE answers (fuel/tolls included, $90, 10% deposit, surcharges). FAQ rich-results are restricted for commercial sites since 2023 — value here is LLM citation, which makes factual correctness the whole point |
| AggregateOffer /pricing ([pricing/page.tsx:186-227](../src/app/pricing/page.tsx#L186-L227)) | ✔ UnitPriceSpecification $129/$179 with 3-hr minValue — good pattern; but includes unverified $229 tier and **omits the truck fee entirely** (schema implies $129 is the whole price) |
| Service + Offer per service page | LD emits `price: 1200` (FALSE); intl `2500` vs $4,500 copy; provider name "EasyMove Elite" |
| BreadcrumbList: pricing, services, reviews, cities | ✔ mostly OK; RU breadcrumb item 2 mislabeled ("Города" → links /ru/services) |
| Review/ItemList on /reviews | **Placeholder authors/dates/bodies as live structured data** — remove until real GBP reviews exist |
| Article on blog posts | ✔ but publisher = second Organization entity "EasyMove Elite" competing with the sitewide org @id |

Missing vs the target list: Person entity for Evgenii Romanov with sameAs (exists only as a name string in founder); AggregateRating tied to **Thumbtack 32** (current one asserts Google/6); consistent single Organization @id graph; BreadcrumbList on about/contact/blog index.

Contradiction summary (schema vs copy vs truth): rating 6 vs 32; LD 1200 vs 1500; truck $90 vs "included" vs $99 truth; two org names; `[LIVE-ONLY]` 15% cap inside production OfferCatalog.

---

## §3 Technical SEO

### Healthy (verified live)
- Redirects: apex→www 301, http→https 308, trailing-slash normalization, single-hop for the common cases; vercel.json + next.config.mjs both enforce canonical host; legacy Wix 301s in place.
- Real 404s (X-Next-Error-Status: 404, noindex on 404 page); case-sensitive paths (fine).
- Canonicals self-referencing on all checked routes; no stray noindex (privacy/terms/v2 deliberately noindex); /quote and blog posts indexable.
- HSTS preload, nosniff, X-Frame-Options, Permissions-Policy; images/_next/static immutable-cached; robots/sitemap/llms 1h cache.
- Sitemap: 48 URLs, all sampled URLs 200, hreflang alternates embedded for the 22 paired entries.
- One `<h1>` per page everywhere checked.

### Broken / weak
1. **hreflang (P1):** [layout.tsx:306-308](../src/app/layout.tsx#L306-L308) hardcodes `en→/`, `ru→/ru`, `x-default→/` into every page's head → every inner page carries two conflicting hreflang sets (or only the wrong one: /quote, /services, /blog). EN /pricing omits `ru` while /ru/pricing points to it (non-reciprocal = ignored by Google); RU about/services/contact omit x-default; EN about/services/contact have no languages block at all; `<html lang="en">` wraps all RU pages ([layout.tsx:303](../src/app/layout.tsx#L303)); two Russian-language blog posts sit untagged under EN /blog; language switcher always sends to `/`↔`/ru` roots ([Header.tsx:41-43](../src/components/layout/Header.tsx#L41-L43)). The camelCase `hrefLang` rendering also signals these are React `<link>` props, not Metadata API output.
2. **Internal linking (P1):** RU city pages: zero inbound links (sitemap-only); RU pages' service links and CTAs point to EN targets ([CityMoversPage.tsx:21-28](../src/components/city/CityMoversPage.tsx#L21-L28)); /reviews: zero inbound links; footer lists 8 of 10 EN city pages (doral, hallandale-beach missing — [Footer.tsx:57-65](../src/components/layout/Footer.tsx#L57-L65)); header has no Blog/Reviews/city links; no service→city or city→city links anywhere. No hub-and-spoke.
3. **Performance (P1, measured):** TTFB excellent (93–126 ms, Vercel edge HIT). But `<link rel="preload" as="image" href="/images/Hero.png">` in the shared layout forces a **2,545 KB raw PNG** onto every page (measured on /, /pricing, /sunny-isles-movers) while the rendered hero is a 46–65 KB AVIF via next/image — the preload is pure waste, ~72% of the 3.43 MB initial weight. Then: 667 KB JS (15 chunks; 91 KB legacy polyfills), 124 KB fonts (4 files), GTM 152 KB. PageSpeed API was quota-blocked (HTTP 429) — Lighthouse/CrUX numbers pending an API key; all figures above are direct curl measurements. Also [services/[slug]/page.tsx:140](../src/app/services/[slug]/page.tsx#L140) uses raw `<img>` for the hero (violates the project's own CLAUDE.md rule).
4. **Indexation (P1):** `site:easy-move-florida.com` surfaced only ~4 pages (/, /contact, /coconut-grove-movers, /aventura-movers). Not authoritative — verify in GSC — but consistent with orphaned pages + frozen freshness.
5. **Metadata (P2):** /pricing description 232 chars (truncates); home title/description identical to layout default; "Fully insured" (unverifiable) inside every service meta description; /reviews title thin (27 chars); brand split in titles (§4); sitewide canonical fallback to homepage in layout ([layout.tsx:82-89](../src/app/layout.tsx#L82-L89)) — safe today only because every page overrides it.
6. **Sitemap (P2):** `lastModified: new Date()` on static/city/RU routes = build-time stamp (31 identical values). Services/blog use real updatedAt — extend that pattern to everything. /moving-cost-miami is in the live sitemap but not in [sitemap.ts](../src/app/sitemap.ts) (repo≠prod again).

---

## §4 Content & E-E-A-T

Full claim-by-claim inventory: [CONTENT-FACT-CHECK.md](CONTENT-FACT-CHECK.md). Summary:

- **FALSE (systemic):** truck $90 + distance-scaled (incl. the pricing engine itself); truck/fuel/tolls "included in hourly rate" (11+ locations incl. home FAQ JSON-LD); $50/flight stairs fee actually charged by the calculator vs "no stairs fees" marketing; LD $1,200 + "10% deposit"; 4.9★; payment-after-confirmation; hurricane clause citing terms that don't contain it; reviews placeholders; `[LIVE-ONLY]` 15% cap.
- **UNVERIFIABLE (high liability):** "Licensed & Fully Insured" ≈15×  with no FDACS number anywhere; named-building rules with dollar COI limits (Williams Island $2M, Beach Club $2M+waiver, Acqualina, Trump Towers…) stated as fact in copy, FAQ JSON-LD, and llms.txt; 2130 Stirling Rd address; founded 2021; Google 5.0/6.
- **Internal contradictions:** three separate price universes ($376 / $477 / RU $480 bases), 15-min vs 30-min billing, 15-min vs 2-hour arrival, May–Sep vs Nov–Jan peak, never-consolidated vs consolidated.
- **City pages:** one shared template ([CityMoversPage.tsx](../src/components/city/CityMoversPage.tsx)) + [cities.ts](../src/lib/data/cities.ts). Genuinely local and citation-worthy: Miami (~80% unique; dock windows, permit lead times), Hallandale (~85%; per-building COI detail), Sunny Isles, Aventura, Doral, Coconut Grove. Thin near-templates: **Fort Lauderdale, Boca Raton** (~550 words, no named buildings, generic luxury copy). The pricing FAQ answer is copy-pasted across 4+ cities. RU pages are deliberately separate copy (good idea) but make MORE monetary promises than EN (packing от $79/hr, storage $200/mo, "ответим за 30 минут") — drift in the dangerous direction.
- **Owner identity:** Evgenii is a real name with a photo (founder.jpg/founder-2.png) and a founder block — better than stock — but spelled three ways (Evgenii/Eugene/Евгений), with no Person schema, no credentials (FDACS #, years, count of moves verifiable), no sameAs links. The "no marketing fluff" claim sits two pages from "white-glove atelier" filler (worst-filler list in CONTENT-FACT-CHECK).
- **Brand entity:** "Easy Move Florida" (home/layout) vs "EasyMove Elite" (7+ titles, JSON-LD providers, blog publisher, legal pages). With a stronger competitor named "Easy Florida Moving" one city over, entity ambiguity is a real cost.

---

## §5 Competitive gap (summary — full data in [AI-VISIBILITY.md](AI-VISIBILITY.md))

Visible for 1 of 5 customer queries: **#1 for "russian speaking movers aventura"** — proof the named-buildings+language template works. Absent for: movers sunny isles beach; high rise movers miami; movers COI miami condo (the signature differentiator!); moving company hollywood fl hourly.

What cited competitors have that we don't: FDACS IM# + USDOT displayed (Biscayne: IM 4191/USDOT 5292075); 100–560 reviews across Google/Yelp vs our 32 on Thumbtack only; presence on the aggregator lists LLMs quote (moveBuddha, Yelp, Angi, GreatGuysMove) — we're on none; blog/guide content ranking for high-rise/COI queries; years-in-business on page. Unique strengths nobody else has: published hourly rates, llms.txt, RU pages, named-building city content.

---

## Recommended Stage 2 order (for approval)

1. **Fix the pipeline** (§0): reconcile repo↔production, restore deploys. Nothing else matters until a repo edit reaches users.
2. **Commercial-facts commit series:** truck $99 flat separate line (engine + all copy + JSON-LD + llms.txt); kill 15% cap in whatever source production uses → four-part guarantee; stairs-as-time in calculator; LD $1,500/no-deposit; 5.0/32 only; payment timing; COI at booking.
3. **Purge/TODO the unverifiables:** licensed-and-insured → FDACS TODO placeholder; building rules → [TODO: confirm with Evgenii]; surcharges → confirm or delete (they contradict the new guarantee); route tables → rebuild from $1,500 floor or mark as market ranges.
4. **Reviews page rebuild** (needs GBP TODO inputs) — placeholders out same-day even if the page temporarily shrinks to Thumbtack-only.
5. **hreflang/lang fixes + internal-link mesh** (RU nav/footer, city↔service hub-and-spoke, footer completeness, /reviews links).
6. **llms.txt rewrite + llms-full.txt** from the corrected source of truth.
7. **Schema pass:** single org graph, Person for Evgenii, Thumbtack-based AggregateRating (on /reviews only), truck fee inside AggregateOffer, remove SearchAction + placeholder Reviews.
8. **Performance:** delete Hero.png preload (one line, −2.5 MB/page), raw `<img>` → next/image, font/polyfill diet.
9. **Content rewrite** per the answer-first rules; city-page depth for FTL/Boca or consolidation; About rewrite in first person.
10. **Metadata/sitemap cleanup** batch.

TODO inputs required from Evgenii before the affected commits: FDACS number, GBP URL + review count, insurance carrier/limits (if public), confirm/deny: weekend & peak surcharges, 4-mover $229 rate, packing rates, storage/intl/piano pricing, address publication, founding year, building-rule specifics, arrival-window and response-time SLAs, billing increment.
