import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { CheckCircle, X, Phone, Shield, Clock, AlertCircle, Truck } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE, minInvoice } from '@/lib/pricing';
import { DISTANCE_ROUTES } from '@/lib/data/routes';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'South Florida Moving Costs & Hourly Rates | Easy Move Florida' },
  description:
    'Moving in South Florida costs $129/hr for 2 movers or $179/hr for 3, plus a truck fee per day that matches the crew rate. 3-hour minimum. See typical totals by home size and a worked example.',
  alternates: {
    canonical: `${siteUrl}/pricing`,
    languages: {
      en: `${siteUrl}/pricing`,
      ru: `${siteUrl}/ru/pricing`,
      'x-default': `${siteUrl}/pricing`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'How much does a move cost in South Florida? | Easy Move Florida',
    description:
      'Local moves: $129/hr (2 movers) or $179/hr (3 movers) plus a matching truck fee per day, 3-hour minimum. Typical 1BR total $516–$774, 2BR $645–$1,253. Long distance from $1,500.',
    url: `${siteUrl}/pricing`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida — transparent moving prices' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving Costs in South Florida — Transparent Pricing',
    description: 'From $129/hr with a 3-hour minimum plus a matching truck fee per day. No fuel surcharge, no stairs fee.',
    images: [`${siteUrl}/images/Hero.png`],
  },
};

// Typical totals — hours band × hourly rate + that crew's truck fee. The truck
// is charged at the crew rate: 2 movers $129, 3 movers $179, 4 movers $219.
// Math: studio 3–4h × $129 + $129 = $516–$645; 1BR 3–5h × $129 + $129 = $516–$774;
// 2BR low 4h × $129 + $129 = $645, high 6h × $179 + $179 = $1,253;
// 3BR 6–8h × $179 + $179 = $1,253–$1,611; 4BR+ 8–12h × $179 + $179 = $1,611–$2,327;
// office 6–9h × $179 + $179 = $1,253–$1,790.
const APARTMENT_TOTALS = [
  { size: 'Studio',          hours: '3–4 hours',  crew: '2 movers',   range: '$516–$645',      details: 'Bed, sofa, dresser, ~15 boxes' },
  { size: '1-bedroom',       hours: '3–5 hours',  crew: '2 movers',   range: '$516–$774',      details: 'Bed, sofa, dresser, dining table, ~25 boxes' },
  { size: '2-bedroom',       hours: '4–6 hours',  crew: '2–3 movers', range: '$645–$1,253',    details: 'Two bedroom sets, sofa, dining, ~40 boxes' },
  { size: '3-bedroom',       hours: '6–8 hours',  crew: '3 movers',   range: '$1,253–$1,611',  details: 'Three bedrooms, living, dining, ~60 boxes' },
  { size: '4+ bedroom / house', hours: '8–12 hours', crew: '3–4 movers', range: '$1,611–$2,327+', details: 'Full house — recommend an in-person walkthrough' },
  { size: 'Office (≤20 ppl)',   hours: '6–9 hours', crew: '3 movers',  range: '$1,253–$1,790',  details: 'Desks, chairs, electronics, file storage' },
];

const INCLUDED = [
  'Your crew (2 or 3 movers) for the entire job',
  'Furniture pads, stretch wrap, and mattress bags on loan — they return with the truck',
  'Dollies, straps, and the crew’s tools',
  'Standard disassembly and reassembly (beds, tables, basic IKEA)',
  'Certificate of Insurance (COI) for your building — issued within 24 hours of booking, no charge',
  'A two-hour arrival window with a 30-minute heads-up call',
  'Written estimate before any work begins',
];

// Every one of these appears on the estimate as its own line before you book.
const NOT_INCLUDED = [
  `The truck: $${TRUCK_FEE[2]} per day with two movers, $${TRUCK_FEE[3]} with three, $${TRUCK_FEE[4]} with four — it matches the crew rate. Fuel, tolls and mileage are inside it; there is no fuel surcharge.`,
  'Packing materials (boxes, TV cartons, mattress bags you keep, corner protectors) — billed as flat packages, not per-item markups',
  'Specialty items: piano, safe, marble slab — a flat line on the estimate, never a surprise fee',
  'Storage between move-out and move-in — coordinated with our storage partner; blankets left in storage are billed',
  'Upgraded valuation coverage for high-value art / antiques / electronics — quoted upfront',
];

const FACTORS = [
  {
    title: 'Distance between pickup and drop-off',
    body: 'The drive between your two addresses is on the clock at the same hourly rate — there is no separate travel fee and no per-mile charge. It shows on your estimate as hours, not as a line you find later: a move across Hollywood adds a quarter of an hour, Miami to Boca Raton two hours. Drive time is rounded the same way the rest of the job is, in 15-minute increments. The rate itself never changes with distance.',
  },
  {
    title: 'Crew size',
    body: `Two movers ($${HOURLY_RATE[2]}/hr) is the right call for most studios and 1-bedrooms. Three movers ($${HOURLY_RATE[3]}/hr) finishes a 2-bedroom roughly 30% faster, so the total often comes out similar once the extra hour is saved — note the truck line rises with the crew too. For 4+ bedroom houses or tight elevator windows we scope a larger crew when quoting.`,
  },
  {
    title: 'Building access',
    body: 'Stairs, long carries and freight elevators cost time, not fees. A high-rise with a single freight elevator and a 2-hour window takes more hours than a walk-up with a driveway — we put those hours in the estimate before move day, not after. Tell us about access up front and the estimate will be accurate.',
  },
  {
    title: 'Packing scope',
    body: 'Full pack adds 2–6 hours depending on apartment size, at the packing rate ($79/hr for 2 packers, $119/hr for 3). Partial pack — just kitchen and breakables — typically adds 2–3 hours.',
  },
  {
    title: 'Specialty inventory',
    body: 'Upright pianos, gun safes, marble dining tables, and oversize art are quoted as a flat add-on, not by the hour. The price is in your written estimate before the job is booked.',
  },
];

const PRICING_FAQS = [
  {
    q: 'How much does a local move cost in South Florida?',
    a: `Two movers with a truck cost $${HOURLY_RATE[2]}/hour, three movers $${HOURLY_RATE[3]}/hour, with a ${MIN_HOURS}-hour minimum. The truck is a separate line per day charged at the same figure as the crew rate — $${TRUCK_FEE[2]} with two movers, $${TRUCK_FEE[3]} with three — and fuel, tolls and mileage are inside it. A typical 1-bedroom runs $516–$774 all-in; a 2-bedroom $645–$1,253.`,
  },
  {
    q: 'What does the truck fee cover?',
    a: `The truck fee covers the truck itself, fuel, tolls and mileage. It is charged per day at the crew rate — $${TRUCK_FEE[2]} with two movers, $${TRUCK_FEE[3]} with three, $${TRUCK_FEE[4]} with four — because a bigger crew brings a bigger truck. It appears as its own line on every estimate before you book. There is no separate fuel surcharge and it does not grow with distance on local moves.`,
  },
  {
    q: 'Is the 3-hour minimum charged even if the move is faster?',
    a: `Yes — ${MIN_HOURS} hours of labour is the smallest booking we take, so the smallest possible invoice is ${MIN_HOURS} hours × your rate + that crew's truck fee: $${minInvoice(2)} with two movers, $${minInvoice(3)} with three. Past the minimum you pay for hours actually worked.`,
  },
  {
    q: 'Will the price change on move day?',
    a: 'The hourly rate never changes — not for weekends, not if the job runs long. If something turns up that is not on the estimate (a garage nobody mentioned, an extra room, a piece that needs crating), the crew stops, you get the revised number, and work continues only after you say yes.',
  },
  {
    q: 'Do you charge a deposit?',
    a: 'No. No deposit on any move, local or long-distance. You can cancel or reschedule free of charge more than 48 hours before the move.',
  },
  {
    q: 'How do you bill — by the minute, quarter-hour, or hour?',
    a: '15-minute increments after the 3-hour minimum is hit. We do not round up to the next hour, and if we finish early the invoice is smaller.',
  },
  {
    q: 'Are there fuel, stairs, or heavy-item fees?',
    a: 'No. There is no stairs fee, no heavy item fee, no elevator fee and no long carry fee. On an hourly job those things cost time, not extra fees, so they are priced into the hours we estimate. Tell us about stairs, long carries and freight elevator rules up front and the estimate will be accurate. If we find out on move day, the hours go up — but the rate and the fee structure never change.',
  },
  {
    q: 'When and how do I pay?',
    a: 'Payment is collected on site roughly 45–60 minutes before the job wraps, once the final hour count is clear. We take card (Visa, MasterCard, Amex, Discover), Zelle, Apple Pay, and cash — no card surcharge.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'Yes — free cancellation or reschedule when made more than 48 hours before the move. Inside 48 hours, we ask for a partial reschedule fee only if we cannot fill the slot.',
  },
  {
    q: 'How much does long-distance moving cost?',
    a: 'Long-distance is a flat rate per job, not hourly, starting at $1,500. It depends on miles, inventory, and access at both ends. We send a custom written estimate within 24 hours of receiving your inventory — no deposit required to book.',
  },
  {
    q: 'How much does it cost to move from Miami to Orlando?',
    a: 'A Miami → Orlando move typically runs $1,500–$1,800 for a studio, $1,600–$2,200 for a 1-bedroom, $2,200–$2,900 for a 2-bedroom, and $3,000–$4,200 for a 3-bedroom. Dedicated truck, no shared loads. Written estimate within 24 hours.',
  },
  {
    q: 'How much does it cost to move from Miami to New York?',
    a: 'A Miami → NYC move typically runs $2,800–$3,800 for a studio, $3,600–$4,800 for a 1-bedroom, $4,800–$6,500 for a 2-bedroom, and $6,500–$9,500 for a 3-bedroom. Dedicated truck and en-route updates.',
  },
  {
    q: 'Do you charge extra for moving on a weekend?',
    a: 'No. The hourly rate is the same seven days a week — it does not go up because your move lands on a Saturday. Weekend slots fill first, so book those earlier.',
  },
  {
    q: 'Is there a peak-season surcharge?',
    a: 'No. The rate is the same year-round. Snowbird season (roughly November through April) is our busiest window, so the earlier you book, the better your choice of dates.',
  },
  {
    q: 'Does the price include tip?',
    a: 'No. Tipping is at your discretion. Crews typically receive 15–20% for standard moves, more for tough conditions (heavy rain, 5th-floor walk-up, lots of fragile pieces).',
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${siteUrl}/pricing` },
  ],
});

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

// Pricing-page-level Offer/AggregateOffer so AI assistants can quote the
// authoritative price band when asked "how much do movers in South Florida cost".
const offerJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/pricing#service`,
  name: 'Local Moving Service — South Florida',
  serviceType: 'Local Moving',
  provider: { '@type': 'MovingCompany', name: 'Easy Move Florida', telephone: '+17863051844', url: siteUrl },
  areaServed: { '@type': 'AdministrativeArea', name: 'South Florida (Miami-Dade, Broward, Palm Beach Counties)' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: HOURLY_RATE[2],
    highPrice: HOURLY_RATE[3],
    offerCount: 2,
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[2],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: 'Crew of 2 movers — hourly labour rate',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[3],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: 'Crew of 3 movers — hourly labour rate',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: TRUCK_FEE[2],
        priceCurrency: 'USD',
        unitText: 'DAY',
        name: 'Truck fee — per day at the crew rate, separate line item; fuel, tolls and mileage included',
      },
    ],
  },
});

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: offerJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Pricing</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              How much does a move cost in <span className="gold-text">South Florida</span>?
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              ${HOURLY_RATE[2]}/hour for 2 movers or ${HOURLY_RATE[3]}/hour for 3, with a 3-hour minimum, plus a truck fee per day at the same figure as the crew rate. A typical 1-bedroom runs $516–$774 all-in. Long distance from $1,500.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
              The rate is locked before we start and never changes on move day. No fuel surcharge, no stairs fee, nothing on the invoice you didn&rsquo;t approve first.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="primary">Get a Written Estimate</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Headline rates */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max">
            <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
              <div className="w-8 h-px bg-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
                The headline rates
              </h2>
              <p className="text-gray-500 leading-relaxed">
                These are the published rates for every local job in South Florida. Long-distance and specialty jobs are quoted separately — see below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
              <div className="border border-gray-200 bg-white p-7">
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">2 Movers + Truck</p>
                <div className="mb-2">
                  <span className="text-gray-400 text-sm align-top mr-1">from</span>
                  <span className="font-display text-5xl font-bold text-charcoal">${HOURLY_RATE[2]}</span>
                  <span className="text-gray-400 text-sm ml-1">/hr</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">{MIN_HOURS}-hour minimum + ${TRUCK_FEE[2]}/day truck</p>
                <p className="text-gray-500 text-sm leading-relaxed">Best for studios and 1-bedroom apartments. Pads, wrap and basic disassembly included in the rate; the truck is its own ${TRUCK_FEE[2]} line.</p>
              </div>
              <div className="relative border border-gold bg-cream p-7">
                <div className="absolute -top-3 left-7 bg-gold px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.15em]">Most common</div>
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">3 Movers + Truck</p>
                <div className="mb-2">
                  <span className="text-gray-400 text-sm align-top mr-1">from</span>
                  <span className="font-display text-5xl font-bold text-charcoal">${HOURLY_RATE[3]}</span>
                  <span className="text-gray-400 text-sm ml-1">/hr</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">{MIN_HOURS}-hour minimum + ${TRUCK_FEE[3]}/day truck</p>
                <p className="text-gray-500 text-sm leading-relaxed">Best for 2BR+, walk-ups, and larger inventory. Often the same total cost as 2 movers because the job finishes faster.</p>
              </div>
              <div className="border border-gray-200 bg-white p-7">
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">Long Distance</p>
                <div className="mb-2">
                  <span className="font-display text-3xl font-bold text-charcoal">From $1,500</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">Flat rate per job</p>
                <p className="text-gray-500 text-sm leading-relaxed">Dedicated truck, no shared loads. Custom estimate within 24 hours of receiving your inventory.</p>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              The truck is its own line on every estimate, charged per day at the crew rate — ${TRUCK_FEE[2]} with two movers, ${TRUCK_FEE[3]} with three, ${TRUCK_FEE[4]} with four. Fuel, tolls and mileage are inside it. Same rate seven days a week, year-round. Rates verified August 24, 2026.
            </p>
          </div>
        </section>

        {/* Typical totals by apartment size */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-5xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Typical totals</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                What you actually pay, by apartment size
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl">
                Ranges below reflect the bottom and top of a normal move for each size — easy access, standard inventory, no specialty items. Send photos via WhatsApp for a tighter estimate.
              </p>
            </div>

            <div className="bg-white border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-charcoal text-white text-xs font-semibold tracking-[0.2em] uppercase px-6 py-4">
                <div className="col-span-3">Home size</div>
                <div className="col-span-2">Typical time</div>
                <div className="col-span-2">Recommended crew</div>
                <div className="col-span-2">Typical total</div>
                <div className="col-span-3">What fits</div>
              </div>
              {APARTMENT_TOTALS.map((row) => (
                <div
                  key={row.size}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 border-b border-gray-100 last:border-b-0 gap-y-1 md:gap-y-0"
                >
                  <div className="md:col-span-3 font-semibold text-charcoal text-sm md:text-base">{row.size}</div>
                  <div className="md:col-span-2 text-gray-600 text-sm flex items-center gap-1.5">
                    <Clock size={13} className="text-gold shrink-0 md:hidden" />
                    <span>{row.hours}</span>
                  </div>
                  <div className="md:col-span-2 text-gray-600 text-sm">{row.crew}</div>
                  <div className="md:col-span-2 text-gold font-bold text-sm md:text-base">{row.range}</div>
                  <div className="md:col-span-3 text-gray-500 text-xs leading-relaxed">{row.details}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 text-xs text-gray-500 max-w-3xl">
              <AlertCircle size={14} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Every range is the same arithmetic: hours × hourly rate, plus the truck at that same crew rate. Buildings with strict elevator windows, 4th-floor walk-ups, or heavy specialty pieces add hours and push the upper end of the band. We put those hours in your written estimate before booking.
              </p>
            </div>
          </div>
        </section>

        {/* Worked example — a real itemised invoice */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max max-w-3xl">
            <div className="mb-8">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Worked example</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                What a real invoice looks like
              </h2>
              <p className="text-gray-500 leading-relaxed">
                A 2-bedroom apartment moving from Hallandale Beach to Hollywood. Three movers, freight elevator at the origin, 5 hours door to door.
              </p>
            </div>
            <div className="bg-cream border border-gray-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-charcoal">Labour — 3 movers × 5 hours × ${HOURLY_RATE[3]}/hr</td>
                    <td className="px-6 py-4 text-right font-semibold text-charcoal whitespace-nowrap">$895</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-charcoal">Truck — per day at the crew rate (fuel, tolls, mileage included)</td>
                    <td className="px-6 py-4 text-right font-semibold text-charcoal whitespace-nowrap">${TRUCK_FEE[3]}</td>
                  </tr>
                  <tr className="bg-charcoal">
                    <td className="px-6 py-4 font-semibold text-white">Total</td>
                    <td className="px-6 py-4 text-right font-bold text-gold whitespace-nowrap">$1,074</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              Those two lines are the whole invoice. If the crew finishes in 4.5 hours instead of 5, the labour line drops to $805.50 and the total is $984.50 — you pay for hours worked, not for the estimate. If the job needs something that is not on the estimate, work pauses until you approve the revised number.
            </p>
          </div>
        </section>

        {/* What's included / not included */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Included in the hourly rate</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
                  Everything you need, no upsell
                </h2>
                <ul className="space-y-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal text-sm leading-relaxed">
                      <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-charcoal/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Quoted separately</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
                  What you&rsquo;ll see upfront, not on move day
                </h2>
                <ul className="space-y-3">
                  {NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal text-sm leading-relaxed">
                      <X size={16} className="text-charcoal/40 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Factors that move the price */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-4xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">What moves the price</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3 leading-tight">
                Five factors we look at when quoting
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl">
                Here is the short list of what shifts the number up or down — all of it lands in the written estimate before you book, not on the invoice after.
              </p>
            </div>
            <div className="space-y-4">
              {FACTORS.map((f, i) => (
                <div key={f.title} className="bg-white border border-gray-100 p-6 flex gap-5">
                  <span className="shrink-0 font-display text-2xl text-gold/40 font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base mb-2">{f.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Long-Distance Pricing */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Long-Distance Pricing</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                Routes from South Florida
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Flat-rate, dedicated truck moves out of Miami-Dade and Broward. Ranges below cover the typical inventory for each apartment size on each route. Heavy specialty pieces or 4+ bedroom houses are quoted on top.
              </p>
            </div>

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs font-semibold tracking-[0.2em] uppercase">
                    <th className="px-6 py-4 font-semibold">Route</th>
                    <th className="px-6 py-4 font-semibold">Studio</th>
                    <th className="px-6 py-4 font-semibold">1BR</th>
                    <th className="px-6 py-4 font-semibold">2BR</th>
                    <th className="px-6 py-4 font-semibold">3BR</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTANCE_ROUTES.map((r) => (
                    <tr key={r.route} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 font-semibold text-charcoal text-sm md:text-base">
                          <Truck size={14} className="text-gold shrink-0" />
                          <Link href={`/${r.slug}`} className="hover:text-gold transition-colors">{r.route}</Link>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gold font-semibold text-sm md:text-base whitespace-nowrap">{r.studio}</td>
                      <td className="px-6 py-5 text-gold font-semibold text-sm md:text-base whitespace-nowrap">{r.oneBr}</td>
                      <td className="px-6 py-5 text-gold font-semibold text-sm md:text-base whitespace-nowrap">{r.twoBr}</td>
                      <td className="px-6 py-5 text-gold font-semibold text-sm md:text-base whitespace-nowrap">{r.threeBr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mt-6 max-w-3xl">
              Dedicated truck, no shared loads. Written estimate within 24 hours. Final price depends on exact inventory, distance, and access at both ends.
            </p>
          </div>
        </section>

        {/* Guarantee — four promises the business fully controls */}
        <section className="bg-charcoal py-16 md:py-20">
          <div className="container-max max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our guarantee</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                Four things we promise on every job
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  title: 'The rate is locked.',
                  desc: 'It does not go up because the job runs long, lands on a weekend, or turns out harder than expected.',
                },
                {
                  title: 'The lines on your estimate are the only lines on your invoice.',
                  desc: 'No fuel surcharge, no stairs fee, no heavy item fee, no elevator fee, no long carry fee. Nothing appears that you did not already see and approve.',
                },
                {
                  title: 'You pay for hours worked.',
                  desc: 'Not the estimate, not a rounded-up block. Finish early and the invoice is smaller.',
                },
                {
                  title: 'Nothing is charged before you approve it.',
                  desc: 'If something turns up that is not on the estimate — a garage nobody mentioned, an extra room, a piece that needs crating — the crew stops, you get the revised number, and work continues only on a yes.',
                },
              ].map((g, i) => (
                <div key={g.title} className="flex gap-4">
                  <span className="shrink-0 font-display text-2xl text-gold/50 font-bold leading-none">{i + 1}</span>
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base mb-1.5">{g.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-8 flex gap-4 max-w-3xl mx-auto">
              <Shield size={18} className="text-gold shrink-0 mt-1" />
              <p className="text-gray-300 text-sm leading-relaxed">
                What we do not promise is an exact final total on an hourly job. Traffic, freight elevators, loading docks and building staff are not under our control, and any mover who gives you a guaranteed final number on an hourly move is guessing. What we do promise is that the price of an hour never changes and nothing lands on your bill that you did not agree to first.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Frequent questions</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                Straight answers about pricing
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {PRICING_FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-charcoal text-base mb-2">{faq.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
