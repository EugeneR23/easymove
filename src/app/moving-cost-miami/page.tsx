import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, CheckCircle, X } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE, LD_MINIMUM, minInvoice } from '@/lib/pricing';

const siteUrl = 'https://www.easy-move-florida.com';

// This URL was live and indexed before the 2026-07-30 rewrite. Title and H1 are
// kept verbatim so the page keeps whatever ranking it has; the numbers inside
// are corrected to the real rate card.
export const metadata: Metadata = {
  title: { absolute: 'How Much Do Movers Cost in Miami? (2026 Prices) | Easy Move Florida' },
  description:
    'Miami movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum plus a truck fee per day that matches the crew rate. A 1-bedroom runs $516–$774 all-in. Full 2026 cost breakdown.',
  alternates: { canonical: `${siteUrl}/moving-cost-miami` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'How Much Do Movers Cost in Miami? (2026 Prices)',
    description:
      'Real 2026 Miami moving costs: $129/hr for 2 movers, $179/hr for 3, 3-hour minimum, truck billed per day at the crew rate. Studio $516–$645, 1BR $516–$774, 2BR $645–$1,253.',
    url: `${siteUrl}/moving-cost-miami`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Miami moving costs 2026' }],
  },
};

const MIN_INVOICE = minInvoice(2);

// Every cell is hours × that crew's hourly rate + that crew's truck fee. The
// upper bound of the 4+ row uses a 3-mover crew, as the lower one does — a
// 4-mover crew finishes sooner rather than costing that much more.
//   Studio  3–4h × $129 + $129   1BR  3–5h × $129 + $129
//   2BR     4h × $129 + $129  →  6h × $179 + $179
//   3BR     6–8h × $179 + $179   4+   8–12h × $179 + $179
const TOTALS = [
  { size: 'Studio',        hours: '3–4 hours',  crew: '2 movers',   total: '$516–$645' },
  { size: '1 bedroom',     hours: '3–5 hours',  crew: '2 movers',   total: '$516–$774' },
  { size: '2 bedrooms',    hours: '4–6 hours',  crew: '2–3 movers', total: '$645–$1,253' },
  { size: '3 bedrooms',    hours: '6–8 hours',  crew: '3 movers',   total: '$1,253–$1,611' },
  { size: '4+ bedrooms',   hours: '8–12 hours', crew: '3–4 movers', total: '$1,611–$2,327+' },
];

const HIDDEN_FEES = [
  { fee: 'Fuel surcharge', us: false, note: 'Fuel, tolls and mileage are inside the truck fee.' },
  { fee: 'Stairs fee per flight', us: false, note: 'Stairs cost time, so they are priced into the estimated hours.' },
  { fee: 'Elevator fee', us: false, note: 'Same — a freight elevator window costs hours, not a fee.' },
  { fee: 'Long carry fee', us: false, note: 'Same. Tell us the distance up front and the estimate is accurate.' },
  { fee: 'Heavy item fee', us: false, note: 'Specialty pieces (piano, safe, marble) are a flat line quoted before you book.' },
  { fee: 'Weekend surcharge', us: false, note: 'The rate is the same seven days a week.' },
  { fee: 'Peak season surcharge', us: false, note: 'The rate is the same year-round.' },
  { fee: 'Truck fee', us: true, note: `Per day at the crew rate — $${TRUCK_FEE[2]} with two movers, $${TRUCK_FEE[3]} with three — stated as its own line on every estimate.` },
];

const FAQS = [
  {
    q: 'How much do movers charge per hour in Miami?',
    a: `Two movers with a truck cost $${HOURLY_RATE[2]} per hour and three movers $${HOURLY_RATE[3]} per hour, with a ${MIN_HOURS}-hour minimum. The truck is a separate line at $${TRUCK_FEE[2]} per day with two movers and $${TRUCK_FEE[3]} with three — it matches the crew rate, because a bigger crew brings a bigger truck. Market rates across Miami-Dade generally run $100–$180 per hour for a two-mover crew, so this sits mid-range — the difference is usually in what gets added at the end, not in the headline rate.`,
  },
  {
    q: 'How much does moving a 1-bedroom apartment cost in Miami?',
    a: `A 1-bedroom typically takes 3 to 5 hours with two movers, which works out to $516–$774 all-in: hours × $${HOURLY_RATE[2]} plus the $${TRUCK_FEE[2]} truck fee. A Brickell or Edgewater high-rise sits at the upper end because the freight elevator window controls the pace; a ground-floor walk-up with parking at the door lands at the lower end.`,
  },
  {
    q: 'What is the cheapest a Miami move can cost?',
    a: `$${MIN_INVOICE}. That is the ${MIN_HOURS}-hour minimum with two movers ($${MIN_HOURS * HOURLY_RATE[2]}) plus the $${TRUCK_FEE[2]} truck fee. Nothing books below it, because a crew and a truck have to leave the yard either way.`,
  },
  {
    q: 'What hidden fees do moving companies add in Miami?',
    a: 'The common ones are a fuel surcharge, a per-flight stairs fee, an elevator or long-carry fee, a heavy-item fee, and weekend or peak-season percentage uplifts. None of those exist here: the only two lines on a local invoice are labour and the truck fee. Ask any mover you are comparing to send the estimate in writing with every line named — the ones that add fees on move day are usually the ones who will not.',
  },
  {
    q: 'Do movers charge more on weekends or in summer in Miami?',
    a: 'Many do — 10% weekend and 5% seasonal uplifts are common in this market. We do not: the hourly rate is identical seven days a week and year-round. Weekend and end-of-month slots do book out first, so the constraint is availability rather than price.',
  },
  {
    q: 'Is hourly or flat rate better for a Miami move?',
    a: `Hourly is better for local moves, where the job is a few hours and the variables are small; you pay for the time actually used, billed in 15-minute increments after the minimum. Flat rate is better for long distance, where the truck is committed for days — those start at $${LD_MINIMUM.toLocaleString('en-US')} here with a written estimate inside 24 hours. Be careful with a flat rate quoted for a local move sight-unseen: it is usually padded to protect the mover.`,
  },
  {
    q: 'What is included in the hourly rate?',
    a: `Your crew for the whole job, furniture pads, stretch wrap and mattress bags on loan, dollies and straps, and basic disassembly and reassembly of standard items. Billed separately and shown on the estimate before you book: the truck at $${TRUCK_FEE[2]}–$${TRUCK_FEE[4]} per day depending on crew size, packing materials you keep, specialty items, and upgraded valuation coverage if you want it.`,
  },
  {
    q: 'How do I get an accurate moving quote in Miami?',
    a: 'Send photos of every room, including closets, the garage and the balcony, plus your building rules — freight elevator window, COI requirements, dock access, how far the truck can park from the door. Those four building details are what actually move the hour count. Anyone who quotes you a firm total without asking about them is guessing.',
  },
];

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Miami Moving Costs', item: `${siteUrl}/moving-cost-miami` },
  ],
});

export default function MovingCostMiamiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero — the answer sits in the first paragraph */}
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Miami moving costs</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              How Much Do Movers Cost in Miami? (2026 Prices)
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              Movers in Miami cost <strong className="text-white">${HOURLY_RATE[2]} per hour for a crew of two</strong> or{' '}
              <strong className="text-white">${HOURLY_RATE[3]} per hour for a crew of three</strong>, with a {MIN_HOURS}-hour
              minimum, plus <strong className="text-white">a truck fee per day that matches the crew rate</strong> — ${TRUCK_FEE[2]} with two movers, ${TRUCK_FEE[3]} with three. That makes the
              smallest possible invoice ${MIN_INVOICE}. A 1-bedroom apartment typically lands at $516–$774 all-in and a
              2-bedroom at $645–$1,253.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Those are our published rates, verified July 30, 2026. Below: what drives the hour count in Miami buildings,
              which fees other movers add that we do not, and how to get a number you can rely on.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
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

        {/* Rate table */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              Miami hourly moving rates, 2026
            </h2>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                    <th className="px-5 py-3 font-semibold">What you book</th>
                    <th className="px-5 py-3 font-semibold">Rate</th>
                    <th className="px-5 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">2 movers</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${HOURLY_RATE[2]}/hour</td>
                    <td className="px-5 py-4 text-gray-500">Studios and 1-bedrooms</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">3 movers</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${HOURLY_RATE[3]}/hour</td>
                    <td className="px-5 py-4 text-gray-500">2 bedrooms and up, or a tight elevator window</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">Truck</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${TRUCK_FEE[2]}/day</td>
                    <td className="px-5 py-4 text-gray-500">Flat, its own line. Fuel, tolls and mileage included</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">Minimum</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{MIN_HOURS} hours</td>
                    <td className="px-5 py-4 text-gray-500">Then 15-minute increments — no rounding up</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-charcoal font-semibold">Long distance</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">from ${LD_MINIMUM.toLocaleString('en-US')}</td>
                    <td className="px-5 py-4 text-gray-500">Flat per job, written estimate within 24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Totals by size */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              What a Miami move actually costs, by apartment size
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Every figure is the same arithmetic: hours × hourly rate, plus the truck at that same
              crew rate.
            </p>
            <div className="overflow-x-auto bg-white border border-gray-200">
              <table className="w-full text-left text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                    <th className="px-5 py-3 font-semibold">Home size</th>
                    <th className="px-5 py-3 font-semibold">Typical time</th>
                    <th className="px-5 py-3 font-semibold">Crew</th>
                    <th className="px-5 py-3 font-semibold">All-in total</th>
                  </tr>
                </thead>
                <tbody>
                  {TOTALS.map((r) => (
                    <tr key={r.size} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-5 py-4 text-charcoal font-semibold">{r.size}</td>
                      <td className="px-5 py-4 text-gray-600">{r.hours}</td>
                      <td className="px-5 py-4 text-gray-600">{r.crew}</td>
                      <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              What pushes a Miami move to the upper end is almost never the furniture — it is the building. A shared freight
              elevator on a two-hour window, a loading dock you have to book a week out, or a truck that cannot park closer
              than the next block all add hours. Those hours belong in the estimate before move day, not on the invoice after.
            </p>
          </div>
        </section>

        {/* Hidden fees */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              The fees other Miami movers add
            </h2>
            <ul className="divide-y divide-gray-100 border-y border-gray-100">
              {HIDDEN_FEES.map((f) => (
                <li key={f.fee} className="py-4 flex gap-4 items-start">
                  {f.us ? (
                    <CheckCircle size={17} className="text-gold shrink-0 mt-0.5" />
                  ) : (
                    <X size={17} className="text-charcoal/30 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-charcoal font-semibold text-sm">
                      {f.fee}
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        {f.us ? 'we charge this' : 'we do not charge this'}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{f.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm leading-relaxed mt-6">
              What we do not promise is an exact final total on an hourly job. Traffic, freight elevators, loading docks and
              building staff are not under our control, and any mover who gives you a guaranteed final number on an hourly
              move is guessing. What we do promise is that the price of an hour never changes and nothing lands on your bill
              that you did not agree to first.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              Miami moving cost FAQ
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8">
              Related: <Link href="/pricing" className="text-gold hover:underline">full pricing page with a worked example</Link>
              {' · '}
              <Link href="/miami-movers" className="text-gold hover:underline">Miami movers</Link>
              {' · '}
              <Link href="/blog/miami-moving-cost-2026" className="text-gold hover:underline">2026 cost guide</Link>
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
