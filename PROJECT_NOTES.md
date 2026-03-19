# EasyMove Elite — Project Notes

**Project:** Premium luxury moving company website
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS
**Data:** Local JSON files (no database)
**Status:** MVP scaffold complete — awaiting first `npm install` + run

---

## Architecture Overview

### Rendering strategy

| Area | Strategy | Reason |
|---|---|---|
| Public pages (`/`, `/about`, `/services`, `/services/[slug]`) | Server Components | SEO-friendly, data fetched at request time from JSON |
| Quote wizard (`/quote`) | Client Component tree | Multi-step form with interactive state |
| Admin pages | Server Components for data fetch, Client Components for interactive tables/forms | Initial data from JSON, mutations via fetch |
| API routes | Next.js Route Handlers | REST-style API consumed by client components |

### Data flow

```
User fills form (client)
  → fetch POST /api/quotes  or  /api/leads
  → Route Handler reads JSON file, creates record, writes back
  → Admin opens /admin/quotes or /admin/leads
  → Server Component reads JSON directly (no fetch needed)
  → Admin edits status → fetch PATCH /api/quotes/[id]
```

### Auth

Mock session stored as a base64-encoded JSON cookie (`admin-session`, HttpOnly, 8h).
Credentials: `admin@easymove.com` / `luxury2024` — hardcoded in `src/lib/auth.ts`.
`requireSession()` is called at the top of `src/app/admin/layout.tsx`; it redirects to `/admin/login` if the cookie is absent.

---

## Folder Map

```
easymove-elite/
├── data/                        JSON flat-file database
│   ├── quotes.json              submitted quote records
│   ├── leads.json               contact form submissions
│   └── services.json            service catalog (auto-seeded on first run)
│
├── src/
│   ├── types/index.ts           all shared TypeScript interfaces
│   ├── lib/
│   │   ├── utils.ts             cn(), formatCurrency(), formatDate(), generateId()
│   │   ├── pricing.ts           quote pricing engine (base rate + fees + add-ons)
│   │   ├── auth.ts              mock session cookie helpers
│   │   └── data/
│   │       ├── quotes.ts        readAll / readOne / create / update / delete
│   │       ├── leads.ts         same pattern
│   │       └── services.ts      same pattern + seed data
│   │
│   ├── components/
│   │   ├── ui/                  Button, Input, Select, Textarea, Badge
│   │   ├── layout/              Header, Footer, AdminSidebar
│   │   ├── home/                HeroSection, StatsBar, ServicesPreview,
│   │   │                        ProcessSection, TestimonialsSection, CTABanner
│   │   ├── quote/               QuoteWizard + Step1–Step6 + QuoteSummary
│   │   └── contact/             ContactForm
│   │
│   └── app/
│       ├── page.tsx             / (homepage)
│       ├── about/               /about
│       ├── services/            /services + /services/[slug]
│       ├── contact/             /contact
│       ├── quote/               /quote
│       ├── admin/               /admin/** (protected by layout.tsx)
│       │   ├── login/           public login page
│       │   ├── leads/           table + [id] detail
│       │   ├── quotes/          table + [id] detail
│       │   └── services/        catalog overview
│       └── api/
│           ├── quotes/          GET, POST, [id] GET/PATCH/DELETE
│           ├── leads/           GET, POST, [id] GET/PATCH/DELETE
│           ├── services/        GET
│           └── auth/            login (POST), logout (POST)
```

---

## Key Data Models

### Quote
Fields: `id, createdAt, updatedAt, status, moveType, from*/to* address fields, estimatedDistance, inventory{bedrooms, bathrooms, hasGarage, hasStorage, estimatedBoxes, specialItems[]}, addons{packingService, unpackingService, furnitureAssembly, storageMonths, autoTransport, artHandling, climateControlled}, preferredDate, flexibleDates, firstName/lastName/email/phone, pricing{baseRate, distanceFee, inventoryFee, addonsFee, discount, total}, adminNotes, assignedTo`

### Lead
Fields: `id, createdAt, updatedAt, status, source, firstName/lastName/email/phone, message, moveType?, moveDate?, fromCity?, toCity?, adminNotes, followUpDate?, assignedTo, quoteId?`

### Service
Fields: `id, slug, category, name, tagline, description, features[]{icon, label}, startingPrice, priceUnit, imageUrl, isActive, sortOrder`

---

## Pricing Engine (`src/lib/pricing.ts`)

| Move Type | Base Rate |
|---|---|
| local | $150/hr × estimated hours |
| long-distance | max($1,200, $0.85 × miles) |
| international | $4,500 flat |
| office | $200/hr × estimated hours |
| specialty | $800 minimum |

Add-ons: packing +$350, unpacking +$250, furniture assembly +$180, storage +$200/mo, auto transport +$1,200, art handling +$500, climate control +$300.

Inventory fee: bedrooms × $120, garage +$200, storage +$150, each specialty item +$250.

---

## Design System

**Colors:**
- `gold` (#C9A84C) — primary accent, CTAs, active states
- `charcoal` (#1C1C1E) — dark backgrounds, headings
- `cream` (#FAF8F3) — page backgrounds for public sections

**Typography:**
- `font-display` → Playfair Display (headings, brand name)
- `font-body` → Inter (body text, UI)

**UI conventions:** Zero border-radius on buttons/cards (sharp luxury aesthetic). Gold focus rings. Uppercase tracking-wide labels.

---

## Current Status

### Done
- [x] Project scaffold (package.json, tsconfig, tailwind, postcss, next.config)
- [x] TypeScript types (`src/types/index.ts`)
- [x] Utility functions (`src/lib/utils.ts`)
- [x] Pricing engine (`src/lib/pricing.ts`)
- [x] Auth helpers (`src/lib/auth.ts`)
- [x] JSON data layer — quotes, leads, services with CRUD helpers
- [x] Service catalog seed data (6 services)
- [x] UI primitives — Button, Input, Select, Textarea, Badge
- [x] Layout — Header (scroll-aware, mobile menu), Footer, AdminSidebar
- [x] Homepage — Hero, StatsBar, ServicesPreview, ProcessSection, Testimonials, CTABanner
- [x] `/about` page — story, values, team
- [x] `/services` page — grid from live data
- [x] `/services/[slug]` page — dynamic detail with features + pricing sidebar
- [x] `/contact` page + ContactForm (posts to `/api/leads`)
- [x] `/quote` page + full 6-step QuoteWizard
  - [x] Step 1: Move type selection (5 options)
  - [x] Step 2: From/To locations with state dropdowns
  - [x] Step 3: Inventory (bedrooms, bathrooms, boxes, special items)
  - [x] Step 4: Add-on services (7 options + storage months)
  - [x] Step 5: Date picker + flexible toggle
  - [x] Step 6: Contact details + submit
  - [x] Quote summary with price breakdown
- [x] API routes — quotes (GET/POST/PATCH/DELETE), leads, services, auth
- [x] Admin login page (mock credentials)
- [x] Admin layout with session guard (redirects to `/admin/login`)
- [x] Admin dashboard — KPI stats, recent leads + quotes
- [x] Admin leads — table + detail/edit page
- [x] Admin quotes — table + detail/edit page with pricing breakdown
- [x] Admin services — catalog overview

### Not yet started (post-MVP)
- [ ] Install Node.js + run `npm install` to verify build
- [ ] Email notifications on new quote/lead submission
- [ ] Quote PDF export
- [ ] Admin: edit/create services
- [ ] Admin: discount field on quotes
- [ ] Admin: assign leads/quotes to staff members
- [ ] Real distance calculation (Google Maps API or similar)
- [ ] Auth upgrade: NextAuth.js with multi-user support
- [ ] Replace Unsplash placeholder images with real brand photography
- [ ] Testimonials: dynamic from database instead of hardcoded
- [ ] Blog / resources section
- [ ] Analytics integration

---

## How to Run Locally

```bash
# 1. Install Node.js from https://nodejs.org (LTS v20+)

# 2. Install dependencies
cd "d:\Работа\Moving\Автоматизация\easymove-elite"
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

Admin: http://localhost:3000/admin/login
Credentials: `admin@easymove.com` / `luxury2024`

---

## Upgrade Path (when ready)

| Current (MVP) | Production upgrade |
|---|---|
| JSON flat files | PostgreSQL via Prisma or Supabase |
| Hardcoded mock auth | NextAuth.js + database sessions |
| Unsplash images | Self-hosted or Cloudinary |
| No email | Resend or SendGrid on form submit |
| Client-side distance estimate | Google Maps Distance Matrix API |
| `npm run dev` | Vercel (zero-config, just push to GitHub) |
