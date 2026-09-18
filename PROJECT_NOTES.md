# Easy Move Florida — project notes

**Site:** easy-move-florida.com
**Stack:** Next.js 14 App Router · TypeScript · Tailwind · Vercel
**Business:** owner-led local moving company, South Florida. Evgenii Romanov, 786-305-1844.

> This file described a different company until 2026-09-18 — "EasyMove Elite, premium
> luxury moving", $150/hour, a six-step wizard, a JSON-flat-file admin as the product.
> None of that is the business or the site. A stale orientation document is worse than
> none, because the next reader believes it.

---

## What the business actually is

Local moving across **Miami-Dade, Broward and Palm Beach**, billed by the hour.
Long-distance **inside Florida** by written custom quote. **No interstate moves** —
that needs federal operating authority the company does not hold, and the site says
so rather than quietly accepting the lead. No international, no customs, no
climate-controlled fleet (that is booked with a third party when a piece needs it).

English and Russian throughout, Ukrainian on a subset of pages.

## The rate card

Hourly, per crew, with that crew's truck billed per day at the same figure:

| Crew | Labour | Truck/day | Smallest invoice (3h min) |
|---|---|---|---|
| 2 movers | $129/hr | $129 | $516 |
| 3 movers | $179/hr | $179 | $716 |
| 4 movers | $219/hr | $219 | $876 |

Packing: $79 / $119 / $159 per hour by crew. Three-hour minimum, then 15-minute
increments. No deposit. Free cancellation over 48 hours out. Nothing added for
weekends, season, fuel, stairs, elevators, long carries or heavy items.

**Every one of these numbers lives in `src/lib/pricing.ts` and nowhere else.**

---

## Where a fact lives

The repository's organising rule: a fact has one home, and the prose that repeats
it is guarded rather than templated.

| Module | Owns |
|---|---|
| `src/lib/pricing.ts` | rates, minimum, billing increment, `routeMode()` |
| `src/lib/pricingCopy.ts` | every published band and price string, derived from the above |
| `src/lib/data/hours.ts` | business hours, in three languages and in schema |
| `src/lib/data/scope.ts` | what is and is not moved, and where |
| `src/lib/data/policies.ts` | deposit, cancellation, payment, surcharges, COI |
| `src/lib/data/contact.ts` | phone, email, address, geo, owner identity |
| `src/lib/data/credentials.ts` | licence numbers, ratings, review counts |
| `src/lib/site.ts` | the origin and the three JSON-LD `@id` values |
| `src/lib/seo/routes.ts` | which paths exist in which languages |
| `src/lib/seo/schema.ts` | JSON-LD node builders |

`credentials.ts` and `policies.ts` use a **null-means-do-not-claim** convention: while
a value is null the site simply does not make that claim, and no placeholder renders.
`FDACS_NUMBER` is null today, which is why no "Licensed" badge appears anywhere.

## What guards it

`npm run build` runs three gates first (`prebuild`):

- **`scripts/claims-guard.mjs`** — 24 regex rules (13 of them added 2026-09-18) over `src/`, `data/` and the two
  submission packages. Every rule was run against the code that violated it before
  being committed; a rule that has never failed is decoration. The `ALLOW` list holds
  exact sentences that are deliberately true, each with a reason.
- **`scripts/pricing.test.ts`** — local pricing regressions, plus the rule that
  nothing crossing a state line and nothing long-distance may return a dollar figure.
- **`scripts/links.test.ts`** — orphan pages, and a three-way reconciliation of
  `seo/routes.ts` against the content arrays, the filesystem, and each page.

`scripts/pricing.audit.ts` is **not** a gate. It is a standing report of the owner
questions still open (Q2, Q5) and is expected to fail while they are.

---

## Working here

- Read `docs/EASYMOVE_REQUESTS.md` first: one line per request, its state, its commit.
  It answers "was this built?" without anyone having to remember.
- `docs/CLAIMS_TO_CONFIRM.md` lists claims removed for want of evidence, and how to
  restore one if the owner confirms it.
- `docs/EASY_MOVE_FLORIDA_V3_AUDIT.md` is the 2026-09-18 audit.
- Never state a figure the code cannot produce or a document cannot back.
- Verify against the built site, not the source. This pass alone, reading the rendered
  HTML caught a doubled locale prefix, a schema/footer rating conflict, and a guard
  regex that could never match anything.

```bash
npm run dev          # localhost:3000
npm run build        # runs all three gates first
npm run test:claims  # just the copy guard
```
