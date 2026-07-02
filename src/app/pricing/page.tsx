import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { CheckCircle, X, Phone, Shield, Clock, AlertCircle, Truck } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS } from '@/lib/pricing';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'South Florida Moving Costs & Hourly Rates | Easy Move Florida' },
  description:
    'Hourly moving rates in South Florida: $129/hr (2 movers) or $179/hr (3 movers), 3-hour minimum. Written estimate with a hard cap: your final bill cannot exceed it by more than 15%.',
  alternates: {
    canonical: `${siteUrl}/pricing`,
    languages: { en: `${siteUrl}/pricing`, 'x-default': `${siteUrl}/pricing` },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'How much does a move cost in South Florida? | Easy Move Florida',
    description:
      'Real moving prices in South Florida: studio $477–$606, 1BR $477–$671, 2BR $671–$864, 3BR $985–$1,343. Everything included in the hourly rate.',
    url: `${siteUrl}/pricing`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida — transparent moving prices' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving Costs in South Florida — Transparent Pricing',
    description: 'From $129/hr with a 3-hour minimum. Written estimate with a 15% hard cap. No fuel surcharge, no stairs fee, no surprise charges.',
    images: [`${siteUrl}/images/Hero.png`],
  },
};

// Long-distance route price bands (dedicated truck, no shared loads).
// Ranges reflect typical inventory at each apartment size, en-route fuel/tolls,
// and standard access at both ends. Final number locked after walkthrough.
const DISTANCE_ROUTES = [
  { route: 'Miami → Orlando',       studio: '$1,400–$1,800', oneBr: '$1,600–$2,200', twoBr: '$2,200–$2,900', threeBr: '$3,000–$4,200' },
  { route: 'Miami → Tampa',         studio: '$1,300–$1,700', oneBr: '$1,500–$2,100', twoBr: '$2,100–$2,800', threeBr: '$2,800–$4,000' },
  { route: 'Miami → Jacksonville',  studio: '$1,600–$2,200', oneBr: '$1,900–$2,600', twoBr: '$2,600–$3,500', threeBr: '$3,500–$5,000' },
  { route: 'Miami → Atlanta',       studio: '$2,200–$3,000', oneBr: '$2,800–$3,800', twoBr: '$3,800–$5,200', threeBr: '$5,200–$7,500' },
  { route: 'Miami → New York',      studio: '$2,800–$3,800', oneBr: '$3,600–$4,800', twoBr: '$4,800–$6,500', threeBr: '$6,500–$9,500' },
  { route: 'Miami → Boston',        studio: '$3,000–$4,000', oneBr: '$3,800–$5,100', twoBr: '$5,100–$6,900', threeBr: '$6,900–$10,000' },
  { route: 'Miami → Washington DC', studio: '$2,500–$3,400', oneBr: '$3,100–$4,200', twoBr: '$4,200–$5,700', threeBr: '$5,700–$8,300' },
  { route: 'Hollywood → Charlotte', studio: '$2,000–$2,700', oneBr: '$2,500–$3,400', twoBr: '$3,400–$4,600', threeBr: '$4,600–$6,700' },
];

// Typical totals — derived from HOURLY_RATE × hours band + truck fee.
// These match the ranges already published in llms.txt and the homepage calculator.
const APARTMENT_TOTALS = [
  { size: 'Studio',          hours: '3–4 hours', crew: '2 movers', range: '$477–$606',  details: 'Bed, sofa, dresser, ~15 boxes' },
  { size: '1-bedroom',       hours: '3–4.5 hours', crew: '2 movers', range: '$477–$671', details: 'Bed, sofa, dresser, dining table, ~25 boxes' },
  { size: '2-bedroom',       hours: '4.5–6 hours', crew: '2 movers', range: '$671–$864', details: 'Two bedroom sets, sofa, dining, ~40 boxes' },
  { size: '3-bedroom',       hours: '5–7 hours',   crew: '3 movers', range: '$985–$1,343', details: 'Three bedrooms, living, dining, ~60 boxes' },
  { size: '4+ bedroom / house', hours: '7–10 hours', crew: '3–4 movers', range: '$1,343–$2,380+', details: 'Full house — recommend an in-person walkthrough' },
  { size: 'Office (≤20 ppl)',   hours: '6–9 hours', crew: '3 movers', range: '$1,164–$1,701', details: 'Desks, chairs, electronics, file storage' },
];

const INCLUDED = [
  'Two movers (or three) for the entire job',
  'Box truck with fuel and tolls',
  `Furniture pads, stretch wrap, and mattress bags`,
  'Standard disassembly and reassembly (beds, tables, basic IKEA)',
  'Standard liability coverage on every move',
  'Certificate of Insurance (COI) to your building 24 hours ahead, no charge',
  '15-minute arrival window or 10% off',
  'Written estimate with a hard cap before any work begins',
];

const NOT_INCLUDED = [
  'Packing materials beyond pads and stretch wrap (boxes, paper, tape) — quoted separately or you supply',
  'Specialty items: piano, safe, marble slab — quoted upfront, not a surprise fee',
  'Long carry / shuttle service for buildings without close truck access — disclosed when quoting',
  'Storage between move-out and move-in dates — coordinated with our storage partner',
  'Upgraded valuation coverage for high-value art / antiques / electronics — quoted upfront',
];

const FACTORS = [
  {
    title: 'Distance between pickup and drop-off',
    body: 'Inside Miami-Dade or Broward: usually no impact on rate, just adds travel time inside the hourly clock. Cross-county or to Palm Beach: a one-time travel-time fee may apply, disclosed before booking.',
  },
  {
    title: 'Crew size',
    body: 'Two movers ($129/hr) is the right call for most studios and 1-bedrooms. Three movers ($179/hr) finishes a 2-bedroom roughly 30% faster, so the total often comes out similar. Four movers ($229/hr) is reserved for 4+ bedroom houses or tight elevator windows.',
  },
  {
    title: 'Building access',
    body: 'High-rise condos with a single freight elevator and a 2-hour move-in window take longer than a walk-up with a driveway. We factor this into the estimate before move day, not after.',
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
    q: 'Is the 3-hour minimum charged even if the move is faster?',
    a: 'Yes. The minimum covers truck dispatch, fuel, mileage to and from your address, and the crew\'s guaranteed earnings for the slot. If we finish in 2 hours 10 minutes, the bill is still 3 hours.',
  },
  {
    q: 'Will the price change on move day?',
    a: 'Your written estimate comes with a hard cap: the final bill will not exceed the estimate by more than 15%, period. Same rate continues if the work runs longer than estimated - no panic markup. If we see risk of going over while working, we tell you so you can decide.',
  },
  {
    q: 'Do you charge a deposit?',
    a: 'No deposit for local moves. Long-distance moves require a small deposit (typically 10%) to lock in the truck, fully credited toward your final bill.',
  },
  {
    q: 'How do you bill — by the minute, quarter-hour, or hour?',
    a: 'Quarter-hour increments after the 3-hour minimum is hit. We do not round up to the next hour.',
  },
  {
    q: 'Are there fuel, stairs, or heavy-item fees?',
    a: 'No fuel surcharge. No stairs fee for normal flights. Heavy specialty items (piano, safe, marble) are quoted as a flat add-on upfront, never sprung on you at the end.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'Card (Visa, MasterCard, Amex, Discover), Zelle, Apple Pay, and cash. No surcharge for card.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'Free cancellation or reschedule when made more than 48 hours before the move. Inside 48 hours, we ask for a partial reschedule fee only if we cannot fill the slot.',
  },
  {
    q: 'How much does long-distance moving cost?',
    a: 'Long-distance is a flat rate per job, not hourly. It starts at $1,500 and depends on miles, weight, and complexity. We send a written estimate within 24 hours of receiving your inventory.',
  },
  {
    q: 'How much does it cost to move from Miami to Orlando?',
    a: 'A Miami → Orlando move typically runs $1,400–$1,800 for a studio, $1,600–$2,200 for a 1-bedroom, $2,200–$2,900 for a 2-bedroom, and $3,000–$4,200 for a 3-bedroom. Dedicated truck, no shared loads. Written estimate within 24 hours.',
  },
  {
    q: 'How much does it cost to move from Miami to New York?',
    a: 'A Miami → NYC move typically runs $2,800–$3,800 for a studio, $3,600–$4,800 for a 1-bedroom, $4,800–$6,500 for a 2-bedroom, and $6,500–$9,500 for a 3-bedroom. Dedicated truck, white-glove handling, en-route updates.',
  },
  {
    q: 'Do you charge extra for moving on a weekend?',
    a: 'Saturday and Sunday moves carry a 10% surcharge over the weekday hourly rate, disclosed in your written estimate (not added later). Sundays and major holidays have limited capacity and should be booked in advance.',
  },
  {
    q: 'Is there a peak-season surcharge?',
    a: 'Yes. May through September (Florida\'s peak moving window) carries a 5% seasonal surcharge over the standard hourly rate. It is disclosed in writing before booking and stacks with the weekend surcharge for Saturday or Sunday moves in that window.',
  },
  {
    q: 'What happens if the crew is late or something gets damaged?',
    a: 'Late by 30+ minutes: 10% off. Something breaks: we make it right before we cash the check. Both promises are part of every written estimate.',
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
    highPrice: HOURLY_RATE[4],
    offerCount: 3,
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[2],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '2 movers + truck',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[3],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '3 movers + truck',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[4],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '4 movers + truck',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
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
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">The No-Surprise Move</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              How much does a move cost in <span className="gold-text">South Florida</span>?
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Written estimate with a hard cap: your final bill will not exceed the estimate by more than 15%, period. No fuel surcharge, no stairs fee, no surprise charges on move day.
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
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto mt-6">
              Late by 30+ minutes: 10% off. Something breaks: we make it right before we cash the check.
            </p>
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
              <p className="text-charcoal leading-relaxed mt-4 font-medium">
                $129 an hour, everything included: pads, wrap, disassembly, COI to your building. The $89 guys get to $140+ by the time they add the fees.
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
                <p className="text-gold text-xs font-semibold mb-4">{MIN_HOURS}-hour minimum</p>
                <p className="text-gray-500 text-sm leading-relaxed">Best for studios and 1-bedroom apartments. Truck, pads, wrap, basic disassembly — included.</p>
              </div>
              <div className="relative border border-gold bg-cream p-7">
                <div className="absolute -top-3 left-7 bg-gold px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.15em]">Most common</div>
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">3 Movers + Truck</p>
                <div className="mb-2">
                  <span className="text-gray-400 text-sm align-top mr-1">from</span>
                  <span className="font-display text-5xl font-bold text-charcoal">${HOURLY_RATE[3]}</span>
                  <span className="text-gray-400 text-sm ml-1">/hr</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">{MIN_HOURS}-hour minimum</p>
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
              Truck fee from $90 may apply on the first hour. 3-hour minimum on every job. Weekend +10%. Peak season (May–September) +5%. All disclosed in your written estimate, not at the end.
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
                Ranges below reflect the bottom and top of a normal move for each size — easy access, standard inventory, no specialty items. Send 5 photos on WhatsApp, get a written estimate in 30 minutes - and your final bill cannot exceed it by more than 15%. In writing.
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
                These are field-tested ranges from real South Florida moves — not internet averages. Buildings with strict elevator windows, 4th-floor walk-ups, or heavy specialty pieces will push the upper end of the band. We disclose all of that in your written estimate before booking.
              </p>
            </div>
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
                Most quotes land within $50 of the final bill. Here is the short list of what shifts the number up or down.
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
                          <span>{r.route}</span>
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

        {/* Trust band */}
        <section className="bg-charcoal py-16">
          <div className="container-max max-w-4xl text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">The No-Surprise Move guarantee</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
              Written estimate with a hard cap: your final bill will not exceed the estimate by more than 15%, period.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: '15% Hard Cap, In Writing', desc: 'The estimate you approve is the ceiling. The final bill cannot exceed it by more than 15%.' },
                { title: 'On Time or 10% Off', desc: 'Late by 30+ minutes: 10% off. 15-minute arrival window on every job.' },
                { title: 'We Make It Right', desc: 'Something breaks: we make it right before we cash the check. COI to your building 24 hours ahead.' },
              ].map((g) => (
                <div key={g.title}>
                  <Shield size={18} className="text-gold mx-auto mb-3" />
                  <p className="text-white font-semibold text-sm mb-1">{g.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{g.desc}</p>
                </div>
              ))}
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
