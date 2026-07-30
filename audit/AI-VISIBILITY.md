# AI Visibility — easy-move-florida.com

Measured 2026-07-29. Companion to [SITE-AUDIT.md](SITE-AUDIT.md).

## Methodology (honest about limits)

- **Measured:** live SERP snapshots (Google-backed web search, US, single-run — positions approximate), page-level audits of 4 competitor sites, directory/citation searches, Claude's own brand recall (this audit was performed by Claude — one of the three target assistants, answering from its actual training data).
- **Approximated:** ChatGPT Search and Perplexity citations could not be queried directly (no logged-in access from this environment). Their behavior is inferred from what dominates the SERPs they retrieve from — a standard inference, flagged wherever used. Recommendation: Evgenii runs the 5 queries manually in ChatGPT/Perplexity monthly (5 minutes) and logs which brands get named; that becomes the real KPI.

---

## 1. Where the site stands per query

| Query | Google organic | Easy Move Florida | Who wins instead |
|---|---|---|---|
| movers sunny isles beach | Yelp, All My Sons, Thumbtack list, American VL, Solomon & Sons, Biscayne Moving, EMD sunnyislesbeachmovers.com | **ABSENT** | Aggregators + Biscayne (names Jade Signature, Trump Towers, St. Tropez on page) |
| high rise movers miami | Suddath, Brickell Movers, Elite Movers (/high-rise-moving/), FlatRate list, A Class, Do It Now, **Brickell M&P blog "COIs, Elevators & Rules"** | **ABSENT** | A blog post ranks — content format proven |
| russian speaking movers aventura | **easy-move-florida.com #1**, aventuramoving.com, Solomon & Sons ×3 | **#1** | — (this is our proof the template works) |
| movers COI miami condo | FlatRate, Do It Now (free COI), United Prime blog, Preferred (COI concierge), miamimove.co, A Plus | **ABSENT** | COI-specific pages/blogs — our signature claim, their traffic |
| moving company hollywood fl hourly | U-Haul MovingHelp, moveBuddha, HireAHelper, GoLoadUp, Two Men, Lugg | **ABSENT** | Marketplaces own this almost completely |

## 2. LLM-layer reality

**Parametric memory (what models "know" without searching):** Claude, answering honestly from training data — Easy Move Florida is **not a recallable brand** for any of the 5 queries; it would name Solomon & Sons, All My Sons, Suddath, FlatRate, Piece of Cake, or point to marketplaces. A 2021-founded company with 32 reviews on one platform will not be in any current model's weights. **Implication: every AI referral must come from search-augmented answers** (ChatGPT Search, Perplexity, Claude with web search, AI Overviews) — which is exactly how the Sunny Isles $2.6M lead happened: the crawler hit the site directly (robots open + SSR + llms.txt made that possible).

**What search-augmented assistants quote:** for "best movers sunny isles beach", 7 of 8 top results are aggregator listicles (moveBuddha, Thumbtack, Angi, Yelp ×2, Today's Homeowner, GreatGuysMove). LLM answers to "who should I hire" questions are largely assembled from those lists. Easy Move Florida appears on **none** of them. The companies they name get repeated — including **"Easy Florida Moving"** (easyfloridamoving.com, Hallandale Beach, since 2017, 168 reviews, 855-EEZ-MOVE): a near-identically-named, better-cited competitor that will absorb brand-confused queries in both directions.

**Directory footprint (measured):** Thumbtack profile only (5.0/32). Not found: Yelp, BBB, Angi, moveBuddha, GreatGuysMove, MovingAPT. Google Business Profile produced no visible results in any query (needs verification by owner — this is the single most anomalous gap).

## 3. What cited competitors have that we don't

| Element | They | We |
|---|---|---|
| FDACS IM# / USDOT on site | Biscayne: IM 4191, USDOT 5292075 | **Nothing** (and ~15 unverified "Licensed & Insured" badges) |
| Reviews | 100–560 across Google/Yelp | 32, Thumbtack only; /reviews page ships placeholders |
| Aggregator list presence | On the lists LLMs quote | Zero |
| Blog/guide content | COI/high-rise guides that rank | 11 posts exist but carry stale/contradictory prices; none rank |
| Years in business on page | "since 2009/2017" | "founded 2021" only in llms.txt/schema, not visible copy |
| **Our unique assets** | — | Published hourly rates (rare), llms.txt (nobody has one), RU pages (#1 ranking proves it), named-building city content, SSR everything, all AI crawlers allowed |

## 4. Plan to increase citation frequency (priority order)

**Fix truth first (Stage 2 core):** everything below amplifies whatever the site says. Today it would amplify a false 15% cap and a $90 truck fee. The commercial-facts correction is a prerequisite, not a parallel track.

1. **FDACS IM# + USDOT in footer, /about, /pricing, llms.txt, LocalBusiness schema** (TODO: numbers from Evgenii). Cheapest legitimacy delta; the #1 filter aggregators and models apply to movers. If registration is missing, that is the actual blocker — resolve before promoting anything.
2. **Google Business Profile: verify/claim, publish URL, migrate the review ask from Thumbtack to Google** (target 50+ Google reviews in 6 months; the payment-collection moment 45–60 min before wrap is the natural ask point). GBP is the entity anchor LLMs and Maps-grounded answers cite most.
3. **Get listed on the aggregators LLMs quote:** moveBuddha, GreatGuysMove, Angi, Yelp, MovingAPT city pages for Sunny Isles/Aventura/Hollywood all have claim/submission flows. Being 1 of 10 names on those pages beats any on-site optimization for AI answer inclusion.
4. **Ship a /coi-miami-condo-movers page + high-rise COI content cluster** (what a COI is, per-building requirements where confirmed, freight-elevator playbook). A competitor's COI blog post already ranks for "high rise movers miami" — proven format, and it's our actual differentiator. Answer-first, tables, FAQPage schema.
5. **Rebuild llms.txt from corrected facts + add llms-full.txt**; add "rates verified <date>"; keep the citation-guidance section (good invention — including the disambiguation line: "Easy Move Florida (Hollywood, 786-305-1844) is not Easy Florida Moving").
6. **Brand disambiguation everywhere:** one name — "Easy Move Florida" — in every title, JSON-LD provider, and legal footer ("Easy Move Florida (EasyMove Elite LLC)"); an FAQ entry disambiguating from Easy Florida Moving; consistent NAP on every directory.
7. **Replicate the Aventura winner:** its pattern (named buildings + language + neighborhoods) is the one page that ranks #1. Bring Sunny Isles, Hallandale, Hollywood EN pages to the same depth with verified building facts ([TODO] blocks where unverified — fabricated rules would poison the well).
8. **Surface "founded 2021, owner on every move, 5.0/32 Thumbtack" in visible homepage copy** — retrieval-augmented models discount llms.txt claims that the human-visible pages don't corroborate.
9. **Monthly manual check** (Evgenii, 5 min): the 5 queries in ChatGPT + Perplexity + Google AI Overviews; log cited brands. This is the channel's real scoreboard.

## 5. Expected trajectory

Honest expectation: items 1–2 unlock trust, 3 is the visibility multiplier for AI answers, 4+7 win the two queries closest to the money (COI, Sunny Isles). The Russian-speaker niche is already won — defend it by keeping RU pages linked (currently orphaned) and factually in sync. Parametric-memory presence (models knowing the brand without searching) follows citation volume with a lag of model-training cycles; it is a 12–24 month outcome, not a quarter.
