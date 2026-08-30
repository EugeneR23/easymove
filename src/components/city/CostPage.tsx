import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, Clock } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE, LD_MINIMUM, minInvoice } from '@/lib/pricing';
import type { CostPageData } from '@/lib/data/costPages';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * "How much do movers cost in {city}?" — the template behind every
 * /moving-cost-<city> page.
 *
 * Modeled on /moving-cost-miami, the page ChatGPT already cites, but generic:
 * the rates and the totals table come from the pricing module and a shared
 * constant, so a rate change propagates to every cost page in one edit. What
 * differs per city — the answer paragraph, the access factors that move the
 * hour count, the FAQ — comes from lib/data/costPages.ts.
 */

// hours band × that crew's hourly rate + that crew's truck fee.
// Same arithmetic as /pricing's APARTMENT_TOTALS; kept as strings because the
// bands mix crews (2BR spans a 2-mover low and a 3-mover high).
const TOTALS = [
  { size: 'Studio',      hours: '3–4 hours',  crew: '2 movers',   total: '$516–$645' },
  { size: '1 bedroom',   hours: '3–5 hours',  crew: '2 movers',   total: '$516–$774' },
  { size: '2 bedrooms',  hours: '4–6 hours',  crew: '2–3 movers', total: '$645–$1,253' },
  { size: '3 bedrooms',  hours: '6–8 hours',  crew: '3 movers',   total: '$1,253–$1,611' },
  { size: '4+ bedrooms', hours: '8–12 hours', crew: '3–4 movers', total: '$1,611–$2,327+' },
];

export default function CostPage({ page }: { page: CostPageData }) {
  const url = `${siteUrl}/${page.slug}`;

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: `${page.cityName} Moving Costs`, item: url },
    ],
  });

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

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
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">{page.cityName} moving costs</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              How Much Do Movers Cost in {page.cityName}? (2026 Prices)
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">{page.answer}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{page.intro}</p>
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

        {/* Rate table — straight from the pricing module */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              {page.cityName} hourly moving rates, 2026
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
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${TRUCK_FEE[2]}–${TRUCK_FEE[4]}/day</td>
                    <td className="px-5 py-4 text-gray-500">Per day at the crew rate, its own line. Fuel, tolls and mileage included</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">Minimum</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{MIN_HOURS} hours</td>
                    <td className="px-5 py-4 text-gray-500">Smallest invoice ${minInvoice(2)} — then 15-minute increments</td>
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
              What a {page.cityName} move actually costs, by home size
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Every figure is the same arithmetic: hours × hourly rate, plus the truck at that same crew rate.
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
          </div>
        </section>

        {/* What moves the hour count in this city */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              What moves the price in {page.cityName}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              None of these are fees — there is no stairs fee, elevator fee, long-carry fee or fuel surcharge here.
              They cost time, and that time belongs in the written estimate before move day.
            </p>
            <div className="space-y-6">
              {page.accessFactors.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <Clock size={17} className="text-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-charcoal font-semibold text-sm mb-1">{f.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              {page.cityName} moving cost FAQ
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {page.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8">
              Related: <Link href="/pricing" className="text-gold hover:underline">full pricing page with a worked example</Link>
              {' · '}
              <Link href={`/${page.citySlug}`} className="text-gold hover:underline">{page.cityName} movers</Link>
              {' · '}
              <Link href="/moving-cost-miami" className="text-gold hover:underline">Miami moving costs</Link>
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
