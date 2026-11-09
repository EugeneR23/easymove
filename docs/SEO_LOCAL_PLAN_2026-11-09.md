# Easy Move Florida — SEO / Local / GEO / Conversion plan

Audit date 2026-11-09. Nothing in production was changed. Every figure below came from a tool response or a file in the repo; where a thing could not be measured it says so.

## Context

The request: grow qualified organic leads in Hollywood, Aventura, Sunny Isles Beach, Hallandale Beach, Fort Lauderdale and parts of Miami, with evidence instead of a checklist.

What the evidence says, in one paragraph: **the website is not the bottleneck.** All 102 sitemap URLs return 200, canonicals and hreflang are correct, the GEO audit scores 89, the last Lighthouse run on record is 94. Organic search never carried the phone: ~1 click a day (GSC, 2026-10-18 review). Calls came from the Google Maps listing, which was deleted on 2026-10-14 and is still absent today. Google is now asking for licences and proof the owner does not have, because the business has not filed its Florida mover registration (FDACS, Chapter 507). That single missing document sits upstream of the Maps profile, of Local Services Ads, of BBB, of the aggregators that feed AI answers, and of the licence line every ranking competitor prints. More pages, more schema or more GEO files will not move inquiries until it exists.

So the plan has two tracks. The **owner track** (registration → profile → reviews) is where the leads are. The **code track** makes the site true, consistent and measurable so that the traffic it does get converts and nothing on it contradicts what Google or a customer is told.

Owner answers recorded today (to be logged in `docs/EASYMOVE_REQUESTS.md` as the first step of execution):
- Google support asked for licences and confirmations; the owner has only estimates and the website.
- A crew operates in Florida; 2130 Stirling Rd is **not** a place that can be filmed for verification.
- FDACS registration: **not filed**.
- Contradictions: align stray copy to decisions already recorded; bring only undecided items back.

## 1. Baseline (2026-11-09)

| Metric | Value | Source |
|---|---|---|
| Sitemap URLs / returning 200 | 102 / 102 | curl over live sitemap |
| Indexed / not indexed | 95 / 51 | GSC report of 2026-10-15, read 2026-10-22 (not re-measured) |
| Organic clicks | ~1 per day | GSC, 2026-10-18 review (not re-measured) |
| GEO audit, homepage | 89 | geo-optimizer |
| Lighthouse mobile, homepage | 94, LCP 3.0 s | on record 2026-10-11 (PageSpeed API quota error today) |
| Google Maps, brand query, Hollywood | not in top 20; Easy Florida Moving LLC #1 (5.0 / 262) | DataForSEO Maps |
| Google Maps, city queries (Aventura, Sunny Isles, Hallandale) | not in top 20 | DataForSEO Maps |
| Brand query "easy move florida", organic | not in top 50; competitor holds knowledge panel, AI overview and ~20 of 48 results | DataForSEO |
| "russian speaking movers miami" | #1 and #6 | DataForSEO |
| "movers sunny isles beach" | #8, #12 — result titled "Miami Beach Movers" | DataForSEO |
| "apartment movers hollywood fl" / "movers hallandale beach" / "packing services hollywood fl" | #20 / #21 / #36 | DataForSEO |
| "movers hollywood fl" / aventura / fort lauderdale / office FTL / COI condo | not in top 20 / 50 / 50 / 49 / 38 | DataForSEO |
| Inbound contacts | 1–2 per week | owner, 2026-10-18 |
| Florida registration number published | none (`FDACS_NUMBER = null`) | `src/lib/data/credentials.ts:23` |

**Could not confirm:** current GSC data (the `gsc` server did not connect; OpenRush has no credits), field Core Web Vitals, GA4 (not connected), what tags the GTM container `GTM-K7PHS2LP` actually holds, lead-to-booking rate (Airtable statuses not filled).

## 2. Issues, ranked

### P0 — blocks leads or exposes the business

| # | Issue | Evidence |
|---|---|---|
| P0-1 | **No Florida mover registration.** Blocks Google's proof request, Ads/LSA, BBB, moveBuddha/FreightWaves, and the licence line competitors show. Advertising as a mover without it is the legal exposure already noted in the repo. | `credentials.ts:23`; `docs/FDACS_REGISTRATION_PACKAGE.md`; competitor pages print "Fla. Mover Reg. No. IM3018", "IM2434"; the brand-query AI overview quotes the competitor's IM, USDOT and MC numbers |
| P0-2 | **No Google Business Profile.** The channel that produced the calls is gone and the brand search sends people to a different company. | Maps and brand SERP rows above; `docs/EASYMOVE_REQUESTS.md` 2026-10-14…10-26 |
| P0-3 | **The quote wizard advertises a fee the company does not charge.** "$50 per floor carried without an elevator", tiles +$50/+$100, on the step right before contact details. `/pricing`, `/terms` and the FAQ say there is no stair fee. | `src/components/quote/Step2_HomeSize.tsx:283-319` vs `src/lib/data/policies.ts:52`, `src/lib/data/faq.ts:19` |
| P0-4 | **Manual-quote submissions show "$0".** A custom quote (unknown city or leg over 50 miles) prints "Preliminary Starting Price $0" to the customer and "~$0" to the owner's Telegram. | `src/components/quote/QuoteSummary.tsx:101-105`, `src/app/api/quotes/route.ts:308` |
| P0-5 | **The site vouches for a Google profile that no longer exists.** Review links, the "On Google 5.0★" block on city pages, `/reviews` title, footer, `sameAs` and `llms.txt` all point at the dead place ID; the 5.0/9 feeds a site-wide `aggregateRating` of 4.8/42 that blends Google and Thumbtack. | `credentials.ts:43-108`, `RootShell.tsx:47-48,201-211`, `CityMoversPage.tsx:609-629`, `Footer.tsx:284` |
| P0-6 | **Insurance and premises statements with nothing behind them in the repo.** "Insured movers" in three meta descriptions, "standard liability on every move", "cargo insurance is included", "every move is covered" while `INSURANCE` is all `null`; "our shop and trucks live on Stirling Rd", "наш склад и офис" for an address that is not that. | `cities.ts:30,106,246,478`; `faq.ts:41,107`; `serviceContent.ts:218`; `services/[slug]/page.tsx:293`; `citiesRu.ts:268`; `citiesUa.ts:160` |
| P0-7 | **No way to tell where a lead came from.** No landing page, referrer, UTM or gclid is captured; quote submits and wizard steps reach only GTM, whose contents are unknown. Any before/after claim about this plan would be a guess. | `src/app/api/leads/route.ts:86-105`, `src/app/api/quotes/route.ts:118-144` |

### P1 — costs rankings or bookings

| # | Issue | Evidence |
|---|---|---|
| P1-1 | 33 self-contradictions across pages and languages (travel fee, seasonal +5%, truck "included" on `/ru/pricing`, long carry, interstate implied in RU/UA, cancellation inside 48 h in three versions, arrival window, office and storage prices). Full list in the audit; grouped in section 4. | audit list, e.g. `ru/pricing/page.tsx:82,263`, `blog.ts:1036`, `citiesUa.ts:367` |
| P1-2 | ~20 building-familiarity claims the owner already ruled out ("We work in Williams Island and Porto Vita regularly", "knows each building's process by heart"), plus the same in titles and H1/H2 ("Miami Movers Who Know the Building First", "We Know Hollywood", "Building-fluent crews"). | `cities.ts:67,257,293,382,391,421,429,470,693`; `serviceContent.ts:79,166,172`; live probe |
| P1-3 | Calculator and wizard disagree: 2BR from $645 vs $710+; packing 1BR $297 vs $396 on `/packing-services`; a "Long Dist." choice is dropped on the way into the wizard; the wizard's city list omits Hallandale, Miami Beach and others; specialty shows $800 where step 1 says "quoted individually". | `pricing.ts:116-124,355-361`; `packing-services/page.tsx:77-84`; `QuoteWizard.tsx:134`; `Step2_HomeSize.tsx:19-23` |
| P1-4 | City pages share most of their words: same trust strip, same three Thumbtack quotes on every page, near-verbatim pricing FAQ in four cities, no city-specific photo, no job evidence. | `CityMoversPage.tsx:64-86,593`; `cities.ts:140,208,508,724` |
| P1-5 | For "movers sunny isles beach" Google returns a result titled "Miami Beach Movers" rather than the Sunny Isles page; no page titled for Aventura ranks for Aventura. | DataForSEO (URLs hidden in mobile results — confirm in GSC) |
| P1-6 | Service pages: H1 "Office Commercial" then straight to H3, no hero CTA, titles like "Long-Distance Moving Within Florida in South Florida", descriptions of 185–235 characters, a raw 2.5 MB CSS background on `/packing-services`. | `services/[slug]/page.tsx:165-269`; `packing-services/page.tsx:126`; live probe |
| P1-7 | Machine-readable facts are stale or wrong: `llms.txt` says "3 × 5 × $179 = $895" and "rates current as of 2026-08-24"; `lastmod` was not bumped after the 22 Oct price change; `areaServed` lists two cities without pages and omits three with pages; four inline business entities without `@id`. | `llms.txt/route.ts:76,297`; `lastmod.ts:25-91`; `RootShell.tsx:138-165`; `services/[slug]/page.tsx:80-85` |
| P1-8 | Directory names still disagree (Yelp/Yahoo "Easy Move Elite", MapQuest "Apt 204", GreatGuysMove Oakland Park) — the same confusion Google shows on the brand query. | `docs/AI_VISIBILITY_RESEARCH_2026-10-04.md`, `docs/DIRECTORY_FIX_PROMPTS.md` |

### P2 — hygiene

Admin pages inherit `index,follow` and the homepage canonical (`RootShell.tsx:83-87,108`); `/faq` redirects to `/#faq` with no such id (`next.config.mjs:42`); two Russian blog posts render under the English root with `lang="en"` (`blog.ts:447,1017`); UA city pages list themselves under "nearby" (`CityMoversPage.tsx:142`); five served cities are plain text on the homepage (`ServiceAreasSection.tsx:10-24`); `/ru` has a 16-character title; exit-intent form has no honeypot (`ExitIntent.tsx:43`); `/privacy` and `/terms` have no contact bar; dead wizard files (`Step3_Locations.tsx`, `Step4_*.tsx`) still carry the stair-fee text.

### Recommendations I am rejecting

- **More city pages.** 25 English + 16 Russian + 6 Ukrainian exist; 51 URLs were not indexed at the last count. The gap is evidence on the pages, not their number.
- **More GEO files or a higher geo_audit score.** `llms.txt`, `llms-full.txt`, `ai.txt`, `/ai/*.json` and RSS already exist. The remaining GEO problem is that some of what they say is wrong.
- **FAQ schema for rich results, SearchAction, WebMCP attributes, EXIF geo-tagging of photos, self-asked Q&A on the profile, keywords in the business name, a virtual office or a second address.** None is eligible, honest or effective here.
- **Chasing the 308/301 or duplicate-redirect notes.** Live behaviour is one 301 hop to www.

## 3. Owner track — the critical path

Ordered; each step unlocks the next. Nothing here can be done from the repo.

1. **File the Florida mover registration** using `docs/FDACS_REGISTRATION_PACKAGE.md` (it lists the fee, the insurance the statute requires and the advertising wording). The insurance bought for this is also what makes the COI promise and any "insured" wording true.
2. **Answer Google once, in the existing case thread**, when the registration certificate and insurance certificate exist. No new forms meanwhile: duplicates slow the case.
3. **Verify the service-area profile already created** (`01913971062364188184`): hidden address, service areas as set. The Florida crew lead is added as a manager and films the verification with the truck, equipment and paperwork at a job in the service area. No storefront, no address pin, no second profile.
4. **Then, and only then:** correct the profile's hours/description from `docs/GBP_COPY_PASTE_PACKAGE.md` (prices in the older `GBP_OPTIMIZATION_PLAN.md` are stale), ask every past customer for a review using the admin "Ask for review" button, and fix Yelp / MapQuest / Yahoo / GreatGuysMove with `docs/DIRECTORY_FIX_PROMPTS.md`.
5. **After the number exists:** moveBuddha, FreightWaves and BBB submissions (`docs/AGGREGATOR_SUBMISSION_PACKAGE.md`), and a decision on Local Services Ads using three weeks of source data from step A4 below.

Review targets come from today's Maps data, not a guess: top-3 median is 71 reviews in Aventura, 115 in Sunny Isles Beach, 162 in Hallandale Beach. Aventura is the first reachable market.

## 4. Code track

Each batch is one branch, `npm run build` green (four guards), merged and pushed to `main`, then verified on the live URL after the deploy lands. Section order on the homepage, font sizes and brand styling are not touched.

### Batch A — make the site true (pre-approved: aligns to decisions already recorded)

| Step | Change | Files |
|---|---|---|
| A1 | Remove stair-fee copy and tiles from the wizard; stairs stay as time, as `pricing.ts:53` already bills them. Delete the dead step files that repeat it. | `src/components/quote/Step2_HomeSize.tsx`, `Step3_Locations.tsx`, `Step4_*.tsx` |
| A2 | Custom quotes show "Your coordinator will send a written figure" instead of $0, to the customer and in Telegram. | `QuoteSummary.tsx`, `api/quotes/route.ts` |
| A3 | Align stray copy to recorded decisions: no travel fee, no seasonal surcharge, truck as a separate line, no long-carry line, Florida only (RU/UA Fort Lauderdale cards, NY excerpt), same-day only via `sameDayCopy()`, languages en/ru, 50-mile threshold, `alternateName`, tips. Remove the building-familiarity and brand-familiarity sentences and the matching titles/H1/H2. | `src/app/ru/pricing/page.tsx`, `src/lib/data/cities.ts`, `citiesRu.ts`, `citiesUa.ts`, `costPages.ts`, `serviceContent.ts`, `blog.ts`, `packing-services/page.tsx`, `Footer.tsx`, `RootShell.tsx`, `BuildingHOASection.tsx`, `WhyChooseUs.tsx` |
| A4 | Capture `landingPage`, `referrer`, `utm_*`, `gclid` in sessionStorage on first load, send with every lead and quote, write to Airtable and print one "Source:" line in the Telegram alert. Mirror `quote_submitted` and contact-form submits to Vercel Analytics so they do not depend on GTM. | new `src/lib/attribution.ts`; `QuoteWizard.tsx`, `QuickLeadForm.tsx`, `ContactForm.tsx`, `ExitIntent.tsx`, `api/leads/route.ts`, `api/quotes/route.ts`, `src/types/index.ts` |
| A5 | Fix machine-readable facts: `llms.txt` arithmetic and "current as of" date computed from `pricing.ts`; `lastmod` entries for pages touched on 22 Oct and by this batch; `areaServed` generated from the city list; inline business entities reference `/#organization`. | `src/app/llms.txt/route.ts`, `src/lib/seo/lastmod.ts`, `RootShell.tsx`, `services/[slug]/page.tsx`, `ru/pricing/page.tsx`, `packing-services/page.tsx`, `reviews/page.tsx` |
| A6 | Guards, each run first against today's code to prove it fails: stair-fee wording, travel/seasonal surcharge wording, "insured" or coverage wording while `INSURANCE` is null, a hand-typed sum that does not equal its factors in `llms.txt`. | `scripts/claims-guard.mjs`, `scripts/pricing.test.ts` |

### Batch B — needs the owner's answer first

| # | Decision | Why it cannot be assumed |
|---|---|---|
| D1 | Is there an active liability policy that issues certificates today? | The "free COI within 24 hours" promise is on ~80 pages and is the site's main condo-market offer. If there is no policy yet, it has to come down until the registration's insurance is in place. |
| D2 | What is 2130 Stirling Rd, in one honest phrase? | "Shop and trucks", "warehouse and office" and the map pin must be rewritten. My recommendation: keep it as the mailing address in footer and schema (changing it would split the citations), remove the map pin and the premises claims. |
| D3 | Ratings: drop the blended 4.8/42 from schema and footer, show Thumbtack 4.7/33 with its link, keep the nine Google reviews verbatim labelled "captured 2026-10-02" without a live link until a profile exists? | Recommended. Google does not show stars for self-published business ratings, and a reader cannot verify the blend. |
| D4 | Cancelling inside 48 hours: no fee (`/terms`), a partial fee (`/pricing`), or the 3-hour minimum once dispatched (FAQ)? | Three live versions. |
| D5 | Two-hour arrival window with a 30-minute call: promise it or remove it (six places)? | `policies.ts:73-74` says it was never confirmed. |
| D6 | Office: "from $1,253" (calculator) or "$800 minimum" with the ranges and the 25–40% after-hours premium on the service page? | Conflicts with "nothing added for weekends". |
| D7 | Storage ($200/month vs $275–$975), climate-control wording, specialty minimum $800 vs piano from $750. | Carry `TODO: confirm` in code. |
| D8 | Heavy items: "no heavy item fee" or "a flat add-on for piano, safe, marble"? | Both on `/pricing`. |
| D9 | Is the drive from the yard to the first address billed? | Code says no; five cost pages say yes. |
| D10 | Written estimate "within 24 hours" or "same day"? | Module says 24; eight places say same day. |
| D11 | Who answers the phone now, and how many of the crew speak Russian ("crew leader and dispatcher" vs "most of the crew")? | "The number on this website rings my phone" was written before the move to California. |
| D12 | Blog price ranges for Miami→Orlando and Miami↔New York, presented as "our own quotes". | Interstate is not offered; in-state long distance is "no figure". |

### Batch C — win the queries within reach (after A; uses B answers)

Keyword-to-page map. One page per intent; no new city pages.

| Intent | Query (monthly volume where known, Miami DMA, 2026-10-11) | Page | Position today | Work |
|---|---|---|---|---|
| Local mover, Hollywood | movers hollywood fl (140) | `/hollywood-movers` | not in top 20 | C1, C2 |
| Local mover, Aventura | movers aventura (40) | `/aventura-movers` | not in top 50 | C1, C2 |
| Local mover, Sunny Isles | movers sunny isles beach (30) | `/sunny-isles-movers` | #8/#12 via another page | C1, C3 |
| Local mover, Hallandale | movers hallandale beach (10) | `/hallandale-beach-movers` | #21 | C1, C2 |
| Local mover, Fort Lauderdale | movers fort lauderdale (1,000) | `/fort-lauderdale-movers` | not in top 50 | Maps-led; C1 only |
| Local mover, Miami | movers miami (3,600), local movers miami (260) | `/miami-movers` | not measured | Maps-led; C1 only |
| Apartment / condo | apartment movers hollywood fl; apartment movers miami (20) | `/services/residential-moving` | #20 (homepage ranks) | C4 |
| COI / condo requirements | condo movers miami certificate of insurance | `/coi-miami-condo-movers` | not in 38 | C5 — weakest SERP of the set (social posts and checklists) |
| Packing | packing services hollywood fl | `/packing-services` | #36 (city page ranks) | C4, C6 |
| Office | office movers fort lauderdale | `/services/office-commercial` | not in 49 | C4 after D6 |
| In-state long distance | long distance movers within Florida | `/services/long-distance-moving` | not measured | C4 |
| Price | how much do movers cost in Florida (People Also Ask on 4 of 10 SERPs) | `/pricing`, `/moving-cost-*` | not measured | C6 |
| Russian-speaking | russian speaking movers miami; русские грузчики майами | `/russian-speaking-movers-miami`, `/ru/russkie-gruzchiki-miami` | #1 | hold; no changes |
| Brand | easy move florida | `/` | not in top 50 | owner track; C7 |

- **C1 Titles, descriptions, H1.** For the six priority cities: title names the city and the service, description carries the rate, the 3-hour minimum and the phone, under 155 characters, no "specialists" or "insured". Data lives in `cities.ts` (`metaTitle`, `metaDescription`, `heroHeadline`).
- **C2 Replace sameness with logistics.** Per city, a section on what a move there actually involves — the pattern of the one local page that ranks on content (One Piece Delivery, #4 for Sunny Isles): access routes, what towers typically require (elevator booking, move hours, COI wording, deposits), truck size and parking. Written as "what to ask your building", sourced from public building and city pages, never as familiarity. Rotate Thumbtack quotes the way Google reviews already rotate; drop the pricing FAQ that repeats across four cities in favour of the shared `/pricing` link.
- **C3 Sunny Isles / Miami Beach overlap.** Confirm in GSC which URL serves the query; then separate the two pages' titles, intros and internal anchors so each owns its city.
- **C4 Service pages.** Real H1s ("Office Movers in South Florida"), H2 structure instead of H3, a call and quote button in the hero, descriptions under 155 characters, `next/image` for the packing hero, links from each service page to the six city pages and back. `src/app/(en)/services/[slug]/page.tsx`, `data/services.json`, `serviceContent.ts`.
- **C5 COI page.** Add the answers the SERP's questions ask ("what insurance should a moving company have", "what a condo association requires"), a downloadable request checklist, and a link from every tower-heavy city page. Depends on D1.
- **C6 One source for packing and size prices.** `/packing-services` hours table read from `PACKING_STARTING_HOURS`; wizard estimate and calculator use the same hour table or label the difference ("from" vs "typical"); wizard accepts the long-distance choice and the full city list from `cities.ts`. `src/lib/pricing.ts`, `packing-services/page.tsx`, `QuoteWizard.tsx`, `Step1_MoveType.tsx`, `Step2_HomeSize.tsx`, `HeroSection.tsx:207-209`.
- **C7 Entity clean-up.** One name everywhere on the site; `sameAs` limited to profiles that open; the "Is this the same company as Easy Florida Moving?" answer stays. The registration number, when issued, flows from `credentials.ts` to footer, schema and `llms.txt` with the statutory wording already coded.
- **C8 P2 list**, in one commit.

### Content from real moving experience (needs material from the owner)

- **Completed-move notes.** Month, from → to, home type, floor/elevator, crew size, hours, invoice total — anonymised, owner-approved, pulled with the read-only Airtable prompt already written (`docs/AI_VISIBILITY_RESEARCH_2026-10-04.md`, prompt 16). Three per priority city page; this is the only content competitors cannot copy.
- **Crew photos tied to a job** (truck, wrapped furniture, elevator padding), sent by the Florida crew. Used on the matching city page with an accurate alt.
- **Nothing is written about a building, a volume or a year count that the owner has not confirmed.**

### GEO

Already in place and working: AI crawlers allowed, `llms.txt`, discovery endpoints, #1 in AI answers for the Russian-language queries. What remains is tied to real evidence: correct the wrong figures those files state (A5), remove the dead Google references (D3), publish the registration number when it exists (C7), and get the corrected name and address onto the third-party sources AI answers cite — Yelp, MapQuest, Thumbtack, then the aggregators after registration. No new GEO files.

## 5. Roadmap

| Window | Owner | Code |
|---|---|---|
| Days 1–30 | File the registration and buy the required insurance. Answer D1–D12. Send completed-move data and crew photos. One short reminder in the existing Google thread, nothing new. Reconnect the Search Console server or add OpenRush credits. | Batch A, live-verified. Batch B items as answers arrive. Fresh GSC baseline (clicks, impressions, indexed count, query → URL for Sunny Isles). |
| Days 31–60 | Registration number → send to Google in the case thread → crew lead films verification of the service-area profile. Fix the four directories. | C1–C6. Publish the number (C7). First attribution report: leads by source for the first weeks of A4. |
| Days 61–90 | Review requests to every past and new customer. Aggregator and BBB submissions. Decide on Local Services Ads from the source report. | Completed-move notes and photos on the six city pages. C8. GSC review per URL: pages with no impressions in 90 days are listed for a keep / merge / noindex decision. Re-run the SERP and Maps sweep with the same queries. |

## 6. Success criteria

Targets are stated only where a baseline exists; no rate is invented.

- **Leads:** contacts per week with a known source, from Airtable + Telegram, against the 1–2 per week baseline. This is the measure the plan is judged on.
- **Maps:** profile verified; business appears in the top 20 for the brand query, then for "movers aventura fl" (re-run of today's sweep).
- **Brand SERP:** `easy-move-florida.com` returns to the first page for "easy move florida".
- **Organic:** the positions in the baseline table, re-measured at day 60 and day 90; GSC clicks against a fresh baseline taken in week 1.
- **Truth:** zero open contradictions from the audit list; every guard added in A6 green.

## 7. Verification and regression checks

Per batch, before reporting it done:

1. `npm run build` — all four prebuild guards green; each new guard rule shown failing on the pre-change code first.
2. After the deploy lands (confirm a new `x-vercel-id`, then check), re-run the page probe over all 102 sitemap URLs: 200, exactly one H1, self-canonical, hreflang cluster unchanged. The probe prints the fetch error for any URL it cannot read rather than a count.
3. Rendered-page checks for the specific change: grep the live HTML for the removed phrase (expect 0) **and** for a phrase that must still be there (expect ≥ 1), so an empty response cannot pass.
4. A4: submit one real test quote and one callback from a URL carrying `?utm_source=test`, marked "ТЕСТ НЕ ЗВОНИТЬ"; confirm the source line in Telegram and the fields in Airtable.
5. Wizard and service-page changes viewed at 375 px; no font-size or section-order change; no horizontal overflow.
6. `geo_audit` and Lighthouse on `/` and `/hollywood-movers` compared with 89 and 94; a drop is investigated before the next batch.
7. Each delivered item gets its line and commit in `docs/EASYMOVE_REQUESTS.md`; today's owner answers are saved to project memory.

Not automatically checkable, and will be reported as such: how the wizard reads to a customer, whether Google accepts the documents, and anything inside the GTM container.
