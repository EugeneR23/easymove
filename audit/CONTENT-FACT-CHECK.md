# Content Fact-Check — easy-move-florida.com

Audit date: 2026-07-29. Every commercial claim found in the repo (and on the live site where it differs from the repo) marked **TRUE / FALSE / UNVERIFIABLE** against the owner-supplied Source of Truth.

**Verdict key**
- **TRUE** — matches the Source of Truth.
- **FALSE** — contradicts the Source of Truth, or contradicts another part of the site so directly that one of the two must be false.
- **UNVERIFIABLE** — a specific factual claim the Source of Truth neither confirms nor denies. These must be confirmed by Evgenii or removed; several (building policies, insurance, license status) are liabilities if wrong.

**Scope note — repo vs production.** The live site (built ~2026-07-02) serves content that does not exist in this repo, including the 15% cap. Claims found only in production are marked `[LIVE-ONLY]`. See SITE-AUDIT.md §0 for the divergence analysis.

---

## 1. FALSE claims (fix every instance)

### 1.1 The 15% cap `[LIVE-ONLY]`
Not present anywhere in this repo (replaced by "Same Rate Promise", [src/app/pricing/page.tsx:482](../src/app/pricing/page.tsx#L482)). But **live production serves it 23 times on /pricing and 5 times on /**, including inside JSON-LD:
- Live /pricing: "15% Hard Cap, In Writing … your final bill cannot exceed it by more than 15%, period."
- Live home: "hard cap, the final bill will not exceed the estimate by more than 15%."
- Live sitewide JSON-LD OfferCatalog: "…hard cap … not exceed the estimate by more than 15%…"

AI crawlers are ingesting this right now. Killing it requires a production deploy, not just a repo edit.

### 1.2 Truck fee: $90 (should be $99 flat/day) — systemic, 15+ locations
| Location | Text |
|---|---|
| [src/lib/pricing.ts:9](../src/lib/pricing.ts#L9) | `TRUCK_BASE = 90` — drives calculator, quote wizard, all derived totals |
| [src/lib/pricing.ts:10](../src/lib/pricing.ts#L10), [261-268](../src/lib/pricing.ts#L261-L268) | `TRUCK_MAX` / `getDistanceTruckFee()` — truck fee **scales with distance up to $129–$229**. FALSE twice: not $99, not flat |
| [src/app/pricing/page.tsx:16](../src/app/pricing/page.tsx#L16), [307](../src/app/pricing/page.tsx#L307) | "Truck fee from $90 may apply on the first hour" — wrong amount AND wrong shape ("may apply" — it always applies, as a separate line) |
| [src/lib/data/serviceContent.ts:62](../src/lib/data/serviceContent.ts#L62) | "Truck fee: from $90 (varies by distance and truck size)" |
| [src/lib/data/serviceContent.ts:72](../src/lib/data/serviceContent.ts#L72) | "…plus $90 truck fee" |
| [src/lib/data/cities.ts:403](../src/lib/data/cities.ts#L403), [462](../src/lib/data/cities.ts#L462), [533](../src/lib/data/cities.ts#L533), [612](../src/lib/data/cities.ts#L612) | "$90 truck fee" in Hollywood / Coconut Grove / Doral / Hallandale FAQ answers (→ FAQPage JSON-LD) |
| [src/lib/data/citiesRu.ts:44](../src/lib/data/citiesRu.ts#L44), [103](../src/lib/data/citiesRu.ts#L103), [158](../src/lib/data/citiesRu.ts#L158), [213](../src/lib/data/citiesRu.ts#L213), [268](../src/lib/data/citiesRu.ts#L268), [327](../src/lib/data/citiesRu.ts#L327) | "подача $90" — all six RU city pages |
| [src/app/ru/pricing/page.tsx:16](../src/app/ru/pricing/page.tsx#L16), [286](../src/app/ru/pricing/page.tsx#L286) | RU pricing |
| [src/lib/data/blog.ts:498](../src/lib/data/blog.ts#L498) | RU blog post: "грузовик — от $90" |
| [public/llms.txt:29](../public/llms.txt#L29), [103](../public/llms.txt#L103) | "Truck fee: from $90" — served directly to AI engines |
| [src/app/layout.tsx:199](../src/app/layout.tsx#L199) | Sitewide JSON-LD OfferCatalog: "Truck fee from $90" |

### 1.3 "Truck / fuel / tolls included in the hourly rate"
Contradicts "truck is a separate $99/day line item" — and contradicts the site's own truck fee on the same pages.
| Location | Text |
|---|---|
| [src/components/home/FAQSection.tsx:12](../src/components/home/FAQSection.tsx#L12) | "a box truck with fuel and tolls covered, furniture pads… included" — **also emitted as FAQPage JSON-LD** |
| [src/app/pricing/page.tsx:66](../src/app/pricing/page.tsx#L66) | INCLUDED list: "Box truck with fuel and tolls" |
| [src/app/pricing/page.tsx:27](../src/app/pricing/page.tsx#L27) | OG description: "Everything included in the hourly rate" |
| [src/app/pricing/page.tsx:109](../src/app/pricing/page.tsx#L109) | "The minimum covers truck dispatch, fuel, mileage" |
| [src/app/pricing/page.tsx:283](../src/app/pricing/page.tsx#L283) | Rate cards: "Truck, pads, wrap… included" |
| [src/app/services/page.tsx:38-39](../src/app/services/page.tsx#L38-L39) | "truck always included", "Truck & equipment included" |
| [src/components/home/HeroSection.tsx:330-333](../src/components/home/HeroSection.tsx#L330-L333) | Price reveal: "· truck included" |
| [src/components/home/PricingTransparency.tsx:10-19](../src/components/home/PricingTransparency.tsx#L10-L19) | Cards titled "2 Movers + Truck" / "3 Movers + Truck" with no separate truck disclosure |
| [src/app/ru/pricing/page.tsx:32](../src/app/ru/pricing/page.tsx#L32), [55](../src/app/ru/pricing/page.tsx#L55), [262](../src/app/ru/pricing/page.tsx#L262) | RU mirror: "Всё включено в почасовую ставку", "Грузовик с топливом и платными дорогами" |
| [src/components/v2/V2Calculator.tsx:139](../src/components/v2/V2Calculator.tsx#L139) | "truck included" (noindex /v2, still wrong) |
| [src/components/home/HomepageCalculator.tsx:374](../src/components/home/HomepageCalculator.tsx#L374) | Dead component, would be wrong if wired up |

Note the self-contradiction: [pricing/page.tsx:66](../src/app/pricing/page.tsx#L66) says the truck is included; [pricing/page.tsx:307](../src/app/pricing/page.tsx#L307) charges a separate truck fee. Both cannot be true — a customer already caught this.

### 1.4 Stairs fee actually charged while marketing says "no stairs fees"
- [src/lib/pricing.ts:349](../src/lib/pricing.ts#L349) — `if (inventory.hasStairs) accessFee += flights * 50` — **the live quote calculator charges $50 per flight**.
- [src/components/quote/QuoteSummary.tsx:47-52](../src/components/quote/QuoteSummary.tsx#L47-L52) — visible line item "Stairs — 3rd floor ($50 per flight)".
- Contradicted by: [PricingTransparency.tsx:38-41](../src/components/home/PricingTransparency.tsx#L38-L41) "No fuel surcharges, no stairs fees", [WhyChooseUs.tsx:23](../src/components/home/WhyChooseUs.tsx#L23), [pricing/page.tsx:125](../src/app/pricing/page.tsx#L125) "No stairs fee for normal flights".
- Source of truth: stairs cost **time, not fees**. The calculator must price stairs as hours, not a fee.

### 1.5 Long-distance deposit
- [src/app/pricing/page.tsx:117](../src/app/pricing/page.tsx#L117) — "Long-distance moves require a small deposit (typically 10%)".
- [src/app/ru/pricing/page.tsx:106](../src/app/ru/pricing/page.tsx#L106) — RU mirror.
- Source of truth: **no deposit required to book.** FALSE.

### 1.6 Long-distance starting price $1,200
- [data/services.json](../data/services.json) — long-distance `startingPrice: 1200`, rendered as "Starting From $1,200" and emitted into Offer JSON-LD via [src/app/services/[slug]/page.tsx:72-105](../src/app/services/[slug]/page.tsx#L72-L105).
- Below the $1,500 floor; contradicts the site's own "$1,500" copy elsewhere. FALSE.

### 1.7 "4.9★" rating
- [src/app/packing-services/page.tsx:152](../src/app/packing-services/page.tsx#L152) — "4.9★ Top-Rated".
- [src/app/ru/page.tsx:305](../src/app/ru/page.tsx#L305) — "4.9 ★ Рейтинг".
- [src/components/home/StatsBar.tsx:13](../src/components/home/StatsBar.tsx#L13) — dead component, same figure.
- Verified figure is 5.0 (32 Thumbtack reviews). FALSE.

### 1.8 COI timing drift
- [src/components/home/FounderBlock.tsx:12](../src/components/home/FounderBlock.tsx#L12) — "COI sent 24 hours **before move day**". Source: within 24 hours **of booking**. Minor but fix.

### 1.9 Payment timing
- [src/lib/data/serviceContent.ts:57](../src/lib/data/serviceContent.ts#L57) — "Payment processed only after you confirm everything is in order"; same in [blog.ts:626](../src/lib/data/blog.ts#L626).
- Source: payment collected on site ~45–60 minutes **before** the job wraps. FALSE as written.

### 1.10 Hurricane promise vs actual terms
- [src/lib/data/blog.ts:860](../src/lib/data/blog.ts#L860), [912-918](../src/lib/data/blog.ts#L912-L918) — "no reschedule fee, ever, for a named storm. **This is in writing in our terms.**"
- [src/app/terms/page.tsx:97-103](../src/app/terms/page.tsx#L97-L103) — contains no storm clause; says "Cancellation fees may apply." The blog cites a document that doesn't say what it claims. FALSE.

### 1.11 Reviews page placeholders shipped to production
- [src/app/reviews/page.tsx:43-80](../src/app/reviews/page.tsx#L43-L80) — six review cards whose visible text is literally "[Paste exact review text from Google Business Profile dashboard]" by "[Client Name from GBP]".
- [reviews/page.tsx:110-135](../src/app/reviews/page.tsx#L110-L135) — the same placeholders serialized as Review JSON-LD (fabricated-looking structured data).
- [reviews/page.tsx:14](../src/app/reviews/page.tsx#L14) — leave-review CTA is a literal `https://g.page/r/[GBP_REVIEW_LINK]/review`.
- Not "false facts" but false content — the most damaging single page on the site.

### 1.12 OG "Local moves from $376"
- [src/app/services/page.tsx:19](../src/app/services/page.tsx#L19) — contradicts the $477 floor on /pricing (and both rest on the $90 truck). FALSE/inconsistent.

---

## 2. TRUE claims (keep, and keep exact)

| Claim | Where |
|---|---|
| $129/hr 2 movers, $179/hr 3 movers | pricing.ts:6, HeroSection.tsx:163, PricingTransparency.tsx:10-19, cities.ts (all), citiesRu.ts (all), llms.txt |
| 3-hour minimum | pricing.ts:7 and everywhere |
| Long distance from $1,500, written estimate within 24h | pricing.ts:111,326; pricing/page.tsx:137; FAQSection.tsx:36; citiesRu.ts:60,115,229,280,321 |
| COI within 24h of booking, free, building named as required | FAQSection.tsx:20, BuildingHOASection.tsx:9, pricing/page.tsx:70, cities.ts:43 |
| No deposit; free cancel/reschedule >48h | FAQSection.tsx:48, pricing/page.tsx:133 (except the LD deposit contradiction, §1.5) |
| 5.0 · 32 reviews on Thumbtack | HeroSection.tsx:130, TestimonialsSection.tsx:10-11, Footer.tsx:112-118, reviews/page.tsx:278 |
| Owner Evgenii Romanov; Russian + English | FounderBlock, FAQSection.tsx:32, layout JSON-LD `knowsLanguage:['en','ru']` |
| Hollywood FL base; Mon–Sat 8:00–19:00 EST; 786-305-1844; romanov@easy-move-florida.com | Footer.tsx:16-17,95; contact/page.tsx:104,131-134; JSON-LD openingHours |
| Loaner pads, stretch wrap, basic disassembly included in hourly rate | WhyChooseUs.tsx:18 |
| Rate locked if the job runs long ("Same Rate Promise") | HeroSection.tsx:170, pricing/page.tsx:482 — this is the seed of the new four-part guarantee |
| Packing materials quoted as packages, not per-item markup | packing-services/page.tsx:77,191,248-250 (roughly consistent) |

---

## 3. UNVERIFIABLE claims (confirm with Evgenii or delete)

### 3.1 High-liability — remove unless confirmed in writing
| Claim | Locations | Risk |
|---|---|---|
| "Licensed & Fully Insured" / "fully insured" / "general liability and cargo insurance" | ≈15 locations: pricing/page.tsx:481; about/page.tsx:13,40,192,231; contact/page.tsx:162; quote/page.tsx:31-33; QuoteSummary.tsx:175; packing-services/page.tsx:151; services/[slug]/page.tsx:260,315; CityMoversPage.tsx:33; services meta descriptions | FL Chapter 507 requires FDACS registration; claiming "licensed" without publishing the IM number invites a complaint. TODO: FDACS number from Evgenii |
| Named-building move experience & rules: Trump Towers I/II/III, Acqualina, Porsche Design, "Williams Island $2M GL", "Beach Club $2M + waiver of subrogation", "Gables Estates $1M-$2M", "Hollywood Beach $1M minimum", "SLS, ICON, Brickell Heights" dock rules, "100+ towers" | serviceContent.ts:78,130,232; cities.ts:224,230,285,317-321,407,566,596; blog.ts:99,457,470-474,503-512,1059-1066; services/page.tsx:50; llms.txt:130 | Fabricated building policies are worse than no content (owner's own words). Each named rule needs confirmation or a [TODO] |
| Insurance claim SLA "resolved within 14 business days" | FAQSection.tsx:24 | Unkeepable promise territory |
| "Damage is made right before payment" `[LIVE-ONLY]` | live home page | Same |
| 2130 Stirling Rd, Hollywood FL 33020 (address in JSON-LD + map embed) | layout.tsx:115, GoogleMapEmbed.tsx:23, CityMoversPage.tsx:122-125 | Publishing a wrong/virtual address breaks GBP NAP consistency |
| Google rating "5.0 (6 verified reviews)" | reviews/page.tsx:19,164-165; layout.tsx:183-189 JSON-LD; llms.txt:19 | TODO item — GBP URL + real count required |

### 3.2 Pricing-adjacent — confirm or remove (each contradicts "the lines on your estimate are the only lines on your invoice" or the locked-rate guarantee)
| Claim | Locations |
|---|---|
| Weekend +10% surcharge | pricing/page.tsx:149,307; cities.ts:403,533,612; citiesRu.ts:335; llms.txt:30,103; layout.tsx:199 JSON-LD. **Directly contradicts the new guarantee "rate does not go up because the job lands on a weekend"** |
| Peak season May–Sep +5% (and it "stacks") | pricing/page.tsx:153,307; llms.txt:31,103; layout JSON-LD. Contradicted by blog.ts:1030 which says peak = **Nov–Jan** |
| 4 movers at $229/hr | pricing.ts:6; HeroSection.tsx:315; pricing/page.tsx:90; both pricing JSON-LD blocks; cities.ts:533,612; citiesRu.ts:268; llms.txt:28,103 |
| Packing rates $79/$119/$159/hr; "From $237"; packing table to $952 | pricing.ts:8; pricing/page.tsx:98; packing-services/page.tsx:12,29,53,66-72,235; citiesRu.ts:64,225 |
| Apartment totals: $477–$606 studio … $2,380 4BR (built on the $90 truck: 129×3+90=477) | pricing/page.tsx:55-62; FAQSection.tsx:12; ru/pricing/page.tsx:44-51. Three competing price universes: $477 base (pricing), $376 base (serviceContent.ts:63-66, blog.ts:137-145, services OG), RU drift $480/$610/$670 (citiesRu.ts:44,103,158,213) |
| Long-distance route price tables (8 routes × 4 sizes, Miami→Orlando $1,400 studio…) | pricing/page.tsx:42-51,141,145 + FAQPage JSON-LD; serviceContent.ts:113-121; llms.txt:46-52; citiesRu.ts:280. Several cells sit below the $1,500 floor |
| Grandfathered rates "$99/$139, truck $79 before May/June 2026" | pricing.ts:4-5,14; pricing/page.tsx:157; ru/pricing/page.tsx:138 |
| Storage from $200/mo; intl $2,500 vs $4,500 (self-contradiction: services.json says 2500, serviceContent.ts:165 and pricing.ts:330 say 4500); auto transport $1,200; art $150/item; piano $750–$4,500; office moves to $24,000 | pricing.ts:353-359,330; serviceContent.ts:165-172,215-223,266-273,315-324; citiesRu.ts:97,262 |
| Quarter-hour vs 15-min vs 30-min billing increments | FAQSection.tsx:16 vs pricing/page.tsx:121 vs serviceContent.ts:76 — pick one |

### 3.3 Operations / marketing claims — confirm or soften
| Claim | Locations |
|---|---|
| Arrival window: "15-minute window" vs "two-hour arrival window" | WhyChooseUs.tsx:13 vs pricing/page.tsx:71 and serviceContent.ts:56 — three-way contradiction |
| Response time: "5 minutes" vs "30 minutes" vs "2 business hours" vs RU "30 минут" | PricingTransparency.tsx:95; FAQSection.tsx:28; contact/page.tsx:119; citiesRu.ts:162 |
| "Dedicated truck, never consolidated" vs snowbird post "coordinate with consolidated truck" | FAQSection.tsx:36, services vs blog.ts:1090 |
| GPS tracking, daily status updates | services/page.tsx:60-61; data/services.json |
| "Manages export permits, customs declarations" vs "international transport requires an FMC-licensed freight forwarder… handled by specialists" | data/services.json vs serviceContent.ts:175 — one page claims what the other disclaims |
| "500+ переездов", "founded 2021", "no subcontractors", "100% repeat or refer", "most quotes within $50 of final bill", "15–20% of capacity held for rush jobs", "we do NY→Miami every month", "replaced our entire truck fleet seal kits", executives/athletes/collectors clientele, Doral "weekly executive relocations from Caracas/Bogotá", hurricane no-fee reschedule, Tier-1 "30-minute base radius", same-day-cancellation 3-hr-minimum charge | ru/page.tsx:304; layout.tsx:172,263; about/page.tsx:45,55; reviews/page.tsx:189; pricing/page.tsx:404; citiesRu.ts:162; blog.ts:349,949; cities.ts:85,491; ServiceAreasSection.tsx:38; FAQSection.tsx:48 |
| llms.txt-only: "What buildings have you moved in?" answered with a named list as fact | public/llms.txt:129-130 |

---

## 4. Internal contradictions summary (site vs itself)

1. Truck included ([pricing:66](../src/app/pricing/page.tsx#L66)) vs truck fee charged ([pricing:307](../src/app/pricing/page.tsx#L307)) — the customer-facing contradiction that started this project.
2. Three apartment-total price universes: $477-base vs $376-base vs RU $480-base.
3. LD: $1,500 floor (copy) vs $1,200 (services.json + JSON-LD) vs $1,300–1,400 route cells (llms.txt/pricing tables).
4. International: $2,500 vs $4,500; "we handle customs" vs "we don't do freight".
5. Billing increments: 15-min vs quarter-hour vs 30-min.
6. Arrival window: 15 min vs 2 hours.
7. Peak season: May–Sep vs Nov–Jan.
8. Never consolidated vs consolidated snowbird loads.
9. Rating: 5.0 vs 4.9; review count 32 (Thumbtack, visible) vs 6 (Google, JSON-LD).
10. Brand: "Easy Move Florida" vs "EasyMove Elite" (titles on /services, /quote, /blog, about, contact, JSON-LD providers, blog publisher) vs legal "EasyMove Elite LLC"; founder "Evgenii" vs "Eugene" vs "Евгений".
11. Response time: 5 min vs 30 min vs 2 business hours.
12. Hurricane promise "in writing in our terms" vs terms saying no such thing.
13. Repo says "Same Rate Promise"; production says "15% hard cap". The two live realities disagree.

---

## 5. Dead code carrying false claims

Unused components (no imports) that still contain FALSE/stale claims and will regress the site if ever re-wired:
[StatsBar.tsx](../src/components/home/StatsBar.tsx) (4.9★), [HomepageCalculator.tsx](../src/components/home/HomepageCalculator.tsx) ("truck included"), [QuoteTeaser.tsx](../src/components/home/QuoteTeaser.tsx), [ProcessSection.tsx](../src/components/home/ProcessSection.tsx), [WorkGallery.tsx](../src/components/home/WorkGallery.tsx), [HeroCallbackForm.tsx](../src/components/home/HeroCallbackForm.tsx). Recommend deleting in Stage 2.
