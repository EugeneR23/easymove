import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { CheckCircle, X, Phone, MessageCircle, Clock, AlertCircle, Shield } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_BASE, WEEKEND_SURCHARGE_PCT, PEAK_SEASON_SURCHARGE_PCT } from '@/lib/pricing';
import { whatsappUrl } from '@/lib/utils';

const siteUrl = 'https://www.easy-move-florida.com';
const pageUrl = `${siteUrl}/moving-cost-miami`;

export const metadata: Metadata = {
  title: { absolute: 'How Much Do Movers Cost in Miami? (2026 Prices) | Easy Move Florida' },
  description:
    'Miami movers cost $120-180/hr for a 2-mover crew in 2026. Easy Move Florida charges $129/hr (2 movers), $179 (3), $229 (4), 3-hour minimum, truck fee from $90. Typical totals: studio $477-$606, 1BR $477-$671, 2BR $671-$864, 3BR $985-$1,343.',
  alternates: {
    canonical: pageUrl,
    languages: { en: pageUrl, 'x-default': pageUrl },
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'How Much Do Movers Cost in Miami? (2026 Prices)',
    description:
      'Real 2026 numbers: $129-229/hr by crew size, 3-hour minimum, truck fee from $90. Typical totals by home size, the hidden fees competitors add, and how to get a capped written estimate.',
    url: pageUrl,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida - Miami moving cost guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Do Movers Cost in Miami? (2026 Prices)',
    description:
      'Licensed Miami movers run $120-180/hr for 2 movers in 2026. Full cost guide: hourly rates, typical totals by apartment size, hidden fees to avoid.',
    images: [`${siteUrl}/images/Hero.png`],
  },
};

// Hourly rates by crew size. Values come from src/lib/pricing.ts (the single
// source of truth for rates) - rendered here, never redefined.
const CREW_RATES = [
  { crew: '2 movers + truck', rate: HOURLY_RATE[2], bestFor: 'Studios and 1-bedroom apartments with standard inventory' },
  { crew: '3 movers + truck', rate: HOURLY_RATE[3], bestFor: '2-3 bedroom homes, walk-ups, bigger inventory - finishes roughly 30% faster' },
  { crew: '4 movers + truck', rate: HOURLY_RATE[4], bestFor: '4+ bedroom houses and tight freight-elevator windows' },
];

// Typical all-in totals by home size. Ranges match src/lib/data/serviceContent.ts
// (residential-moving pricingBreakdown) and the /pricing page - do not edit here
// without updating those sources.
const TYPICAL_TOTALS = [
  { size: 'Studio', hours: '3-4 hours', crew: '2 movers', range: '$477-$606' },
  { size: '1-bedroom', hours: '3-4.5 hours', crew: '2 movers', range: '$477-$671' },
  { size: '2-bedroom', hours: '4.5-6 hours', crew: '2 movers', range: '$671-$864' },
  { size: '3-bedroom', hours: '5-7 hours', crew: '3 movers', range: '$985-$1,343' },
  { size: '4+ bedroom / house', hours: '7-10 hours', crew: '3-4 movers', range: '$1,343-$2,380+' },
];

const HIDDEN_FEES = [
  { fee: 'Fuel surcharge', note: 'Often $25-50 added at the end. Easy Move: none - fuel and tolls are in the hourly rate.' },
  { fee: 'Stairs fee', note: 'Some companies bill per flight. Easy Move: no stairs fee for normal flights.' },
  { fee: 'Materials fee (tape, shrink wrap, blankets)', note: 'Billed per roll or per pad by budget movers. Easy Move: pads, stretch wrap, and mattress bags are included.' },
  { fee: 'Heavy-item fee sprung on move day', note: 'Pianos, safes, and marble should be quoted upfront as a flat add-on - which is what we do - not discovered at the truck.' },
  { fee: 'COI processing fee', note: 'Miami condo buildings require a Certificate of Insurance. Some movers charge $50+ for it. Easy Move: COI to your building 24 hours ahead, free.' },
];

const QUOTE_STEPS = [
  { title: 'Count rooms and big pieces', body: 'Bedrooms, sofas, appliances, and anything oversized (piano, safe, marble table). This sets crew size and hours.' },
  { title: 'Note building access at both ends', body: 'Freight elevator windows, loading dock rules, walk-up floors, and parking distance all change the clock. Miami high-rises also need a COI on file.' },
  { title: 'Send 5 photos on WhatsApp', body: 'Photos of each room beat any online form. You get a written estimate in about 30 minutes during business hours.' },
  { title: 'Get the cap in writing', body: 'A serious estimate is written and capped. Ours cannot be exceeded by more than 15%, period - that is the No-Surprise Move guarantee.' },
];

const COST_FAQS = [
  {
    q: 'How much do movers cost per hour in Miami?',
    a: `Licensed Miami movers typically charge $120-180 per hour for a 2-mover crew in 2026. Easy Move Florida charges $${HOURLY_RATE[2]}/hour for 2 movers, $${HOURLY_RATE[3]}/hour for 3, and $${HOURLY_RATE[4]}/hour for 4, with a ${MIN_HOURS}-hour minimum and a truck fee from $${TRUCK_BASE}. Pads, stretch wrap, mattress bags, basic disassembly, and the COI for your building are included in the rate.`,
  },
  {
    q: 'How much does it cost to move a 1-bedroom apartment in Miami?',
    a: 'A typical 1-bedroom move in Miami runs $477-$671 all-in: 3-4.5 hours with a 2-mover crew at $129/hour plus a truck fee from $90. A studio is usually $477-$606, a 2-bedroom $671-$864, and a 3-bedroom $985-$1,343 with a 3-mover crew.',
  },
  {
    q: 'What hidden fees do moving companies add in Miami?',
    a: 'The common ones are fuel surcharges, stairs fees, per-roll charges for tape and shrink wrap, heavy-item fees revealed on move day, and COI processing fees for condo buildings. Companies that advertise $89-99/hour often land at an effective $140+/hour after those add-ons. Easy Move Florida includes pads, wrap, mattress bags, basic disassembly, and the COI, and every written estimate carries a hard cap of +15%.',
  },
  {
    q: 'Is hourly or flat-rate pricing better for a Miami move?',
    a: 'For local moves inside South Florida, hourly is usually cheaper and more transparent, as long as the estimate is written and capped. Flat rate makes sense for long-distance moves: Easy Move Florida quotes those as a flat price per job starting at $1,500, with a dedicated truck and no shared loads.',
  },
  {
    q: 'Do Miami movers charge more on weekends or in summer?',
    a: `Yes. At Easy Move Florida, Saturday and Sunday moves carry a +${WEEKEND_SURCHARGE_PCT}% surcharge, and peak season (May through September) adds +${PEAK_SEASON_SURCHARGE_PCT}%. Both are disclosed in the written estimate before booking, never added afterward.`,
  },
  {
    q: 'Can the final bill be higher than the moving estimate?',
    a: 'With Easy Move Florida, no more than 15% higher, ever. Every written estimate comes with a hard cap: the final bill cannot exceed the estimate by more than 15%, in writing. The hourly rate also stays the same if the job runs longer than estimated.',
  },
  {
    q: 'Why do movers have a 3-hour minimum?',
    a: 'The minimum covers truck dispatch, fuel, mileage to and from your address, and the crew\'s guaranteed earnings for the slot. Most licensed movers in Miami carry a 2-4 hour minimum. Easy Move Florida bills in quarter-hour increments after the 3-hour minimum is met - no rounding up to the next full hour.',
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Moving Cost in Miami', item: pageUrl },
  ],
});

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: COST_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

// Article node tied to the sitewide Organization (@id defined in layout.tsx)
// so AI engines can attribute the cost data to the brand entity.
const articleJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${pageUrl}#article`,
  headline: 'How Much Do Movers Cost in Miami? (2026 Prices)',
  description:
    'Complete 2026 cost guide for hiring movers in Miami and South Florida: hourly rates by crew size, typical all-in totals by home size, hidden fees to avoid, and how to get a capped written estimate.',
  datePublished: '2026-07-02',
  dateModified: '2026-07-02',
  inLanguage: 'en-US',
  author: { '@id': `${siteUrl}/#organization` },
  publisher: { '@id': `${siteUrl}/#organization` },
  image: `${siteUrl}/images/Hero.png`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@type': 'Service', serviceType: 'Local Moving', areaServed: { '@type': 'City', name: 'Miami' } },
});

export default function MovingCostMiamiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero + direct answer */}
        <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">2026 Cost Guide</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              How Much Do Movers Cost in <span className="gold-text">Miami</span>? (2026 Prices)
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto mb-4">
              Licensed movers in Miami charge about $120-180 per hour for a 2-mover crew in 2026, and a typical
              local move totals $477 to $1,343 depending on home size. Easy Move Florida charges ${HOURLY_RATE[2]}/hour
              for 2 movers, ${HOURLY_RATE[3]}/hour for 3, and ${HOURLY_RATE[4]}/hour for 4, with a {MIN_HOURS}-hour
              minimum and a truck fee from ${TRUCK_BASE}. Every job comes with a written estimate that carries a hard
              cap: the final bill cannot exceed the estimate by more than 15%.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
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

        {/* Hourly rates by crew size */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max max-w-5xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Hourly rates</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                How much do movers charge per hour in Miami?
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Most licensed, insured moving companies in Miami-Dade charge $120-180 per hour for a 2-mover crew.
                Easy Move Florida publishes one rate per crew size, everything included - truck, fuel, tolls, pads,
                stretch wrap, mattress bags, basic disassembly, and the COI your building requires.
              </p>
            </div>

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[560px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs font-semibold tracking-[0.2em] uppercase">
                    <th className="px-6 py-4 font-semibold">Crew</th>
                    <th className="px-6 py-4 font-semibold">Rate</th>
                    <th className="px-6 py-4 font-semibold">Minimum</th>
                    <th className="px-6 py-4 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {CREW_RATES.map((r) => (
                    <tr key={r.crew} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-6 py-5 font-semibold text-charcoal text-sm md:text-base whitespace-nowrap">{r.crew}</td>
                      <td className="px-6 py-5 text-gold font-bold text-sm md:text-base whitespace-nowrap">${r.rate}/hr</td>
                      <td className="px-6 py-5 text-gray-600 text-sm whitespace-nowrap">{MIN_HOURS} hours</td>
                      <td className="px-6 py-5 text-gray-500 text-sm leading-relaxed">{r.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 text-xs mt-6">
              Truck fee from ${TRUCK_BASE} may apply on the first hour. Weekend +{WEEKEND_SURCHARGE_PCT}%. Peak season
              (May-September) +{PEAK_SEASON_SURCHARGE_PCT}%. All disclosed in your written estimate before booking, not at the end.
            </p>
          </div>
        </section>

        {/* Typical totals by home size */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-5xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Typical totals</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                How much does moving a 1-bedroom apartment cost in Miami?
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                A 1-bedroom apartment typically costs $477-$671 all-in: 3-4.5 hours with 2 movers plus the truck fee.
                Here is the full picture by home size - ranges from real South Florida moves with standard access and
                no specialty items, at the current 2026 rates.
              </p>
            </div>

            <div className="bg-white border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-charcoal text-white text-xs font-semibold tracking-[0.2em] uppercase px-6 py-4">
                <div className="col-span-4">Home size</div>
                <div className="col-span-3">Typical time</div>
                <div className="col-span-2">Crew</div>
                <div className="col-span-3">Typical total</div>
              </div>
              {TYPICAL_TOTALS.map((row) => (
                <div
                  key={row.size}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 border-b border-gray-100 last:border-b-0 gap-y-1 md:gap-y-0"
                >
                  <div className="md:col-span-4 font-semibold text-charcoal text-sm md:text-base">{row.size}</div>
                  <div className="md:col-span-3 text-gray-600 text-sm flex items-center gap-1.5">
                    <Clock size={13} className="text-gold shrink-0 md:hidden" />
                    <span>{row.hours}</span>
                  </div>
                  <div className="md:col-span-2 text-gray-600 text-sm">{row.crew}</div>
                  <div className="md:col-span-3 text-gold font-bold text-sm md:text-base">{row.range}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 text-xs text-gray-500 max-w-3xl">
              <AlertCircle size={14} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Weekday, non-peak, standard access. Strict elevator windows, 4th-floor walk-ups, or heavy specialty
                pieces push the upper end of the band - and we tell you that in the written estimate, not on move day.
                Full rate details, long-distance routes, and surcharges are on the{' '}
                <Link href="/pricing" className="text-gold underline underline-offset-2">pricing page</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Hidden fees */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-5xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Read the fine print</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                What hidden fees do moving companies add?
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                The classic Miami pattern: a company advertises $89-99 per hour, then adds fuel, stairs, heavy-item,
                and materials fees until the effective rate lands at $140+ per hour. The advertised number is not the
                number you pay. Here is what to check before you book anyone, including us.
              </p>
            </div>

            <div className="space-y-4">
              {HIDDEN_FEES.map((f) => (
                <div key={f.fee} className="bg-cream border border-gray-100 p-6 flex gap-4">
                  <X size={16} className="text-charcoal/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base mb-1">{f.fee}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-gold bg-cream p-6 md:p-8 flex gap-4">
              <Shield size={18} className="text-gold shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-charcoal text-sm md:text-base mb-2">The one number that protects you: the cap</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Included fees are good, but the real protection is a written estimate with a hard cap. At Easy Move
                  Florida the final bill cannot exceed the estimate by more than 15%, period. Late by 30+ minutes: 10% off.
                  Something breaks: we make it right before we cash the check.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-charcoal py-14">
          <div className="container-max max-w-3xl text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Want your exact number instead of a range?
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              Send 5 photos on WhatsApp and get a written estimate in about 30 minutes - capped at +15%, in writing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={whatsappUrl("Hi, I'd like a capped written estimate - sending 5 photos now.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                  <MessageCircle size={15} /> WhatsApp 5 Photos
                </Button>
              </a>
              <Link href="/pricing">
                <Button size="lg" variant="ghost" className="text-white border-white/20">See Full Pricing</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Hourly vs flat rate */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-4xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Pricing models</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                Hourly vs flat rate - which is better?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 p-7">
                <p className="font-semibold text-charcoal text-base mb-3">Hourly: best for local Miami moves</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  For moves inside Miami-Dade, Broward, or Palm Beach, hourly billing is usually cheaper because you
                  only pay for time actually worked. The risk is an uncapped clock - which is why the estimate must be
                  written and capped. Easy Move Florida bills in quarter-hour increments after the {MIN_HOURS}-hour
                  minimum, and the bill cannot exceed the written estimate by more than 15%.
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Watch out for: low teaser rates with add-on fees, and companies that will not put a cap in writing.
                </p>
              </div>
              <div className="bg-white border border-gray-100 p-7">
                <p className="font-semibold text-charcoal text-base mb-3">Flat rate: best for long distance</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Once the truck leaves South Florida, hourly stops making sense. Long-distance moves are quoted as a
                  single flat price - Easy Move Florida starts at $1,500 with a dedicated truck and no shared loads,
                  and sends the written quote within 24 hours of receiving your inventory.
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Watch out for: flat quotes made without an inventory list or video survey - those are the ones that
                  change on move day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Surcharges */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <div className="mb-8">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Timing</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                Do movers charge more on weekends or in summer?
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Yes, and honest companies say so upfront. At Easy Move Florida, Saturday and Sunday carry a
                +{WEEKEND_SURCHARGE_PCT}% surcharge over the weekday rate, and peak season - May through September,
                when Florida leases turn over - adds +{PEAK_SEASON_SURCHARGE_PCT}%. Both stack, both are disclosed in
                the written estimate before booking, and neither appears as a surprise at the end. The cheapest slot
                in Miami is a weekday morning between October and April.
              </p>
            </div>
          </div>
        </section>

        {/* How to get an accurate quote */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-4xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Getting a real number</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                How to get an accurate moving quote in Miami
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Web-form estimates routinely come in 30-50% under the real number because they miss inventory and
                access details. Four things make a quote accurate:
              </p>
            </div>
            <div className="space-y-4">
              {QUOTE_STEPS.map((s, i) => (
                <div key={s.title} className="bg-white border border-gray-100 p-6 flex gap-5">
                  <span className="shrink-0 font-display text-2xl text-gold/40 font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base mb-2">{s.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <div className="mb-8">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">In the rate</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                What is included in the hourly rate?
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                At Easy Move Florida, the hourly rate covers everything a standard move needs - the list below is
                included, not upsold:
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Box truck with fuel and tolls',
                'Furniture pads, stretch wrap, and mattress bags',
                'Basic disassembly and reassembly (beds, tables, basic IKEA)',
                'Certificate of Insurance (COI) to your building 24 hours ahead, free',
                'Standard liability coverage on every move',
                'Written estimate with a hard cap before any work begins',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-charcoal text-sm leading-relaxed">
                  <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm leading-relaxed mt-6 max-w-3xl">
              Quoted separately and always upfront: full packing service ($79/hour for 2 packers, $119/hour for 3),
              specialty items like pianos and safes, long carries where the truck cannot park close, and storage
              between dates (from $200/month, climate-controlled).
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Quick answers</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                Miami moving cost FAQ
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {COST_FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-charcoal text-base mb-2">{faq.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-8">
              Ready for your own number? Send 5 photos on WhatsApp at{' '}
              <a href={whatsappUrl("Hi, I'd like a capped written estimate - sending 5 photos now.")} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
                +1 786-305-1844
              </a>{' '}
              for a written estimate in about 30 minutes, capped at +15%, or see the full rate table on the{' '}
              <Link href="/pricing" className="text-gold underline underline-offset-2">pricing page</Link>.
            </p>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
