import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, CheckCircle, Truck } from 'lucide-react';
import { LD_MINIMUM } from '@/lib/pricing';
import { bandForSlug } from '@/lib/data/routes';
import type { RoutePageData } from '@/lib/data/routePages';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * Long-distance route page — /moving-miami-to-new-york and friends.
 *
 * The price band table reads from lib/data/routes.ts, the same array /pricing
 * renders, so a band can never say one thing on the route page and another on
 * the pricing page. A route with no published band (Florida → California)
 * renders the flat-minimum framing instead — no band is ever invented here.
 */

// Verified service facts, identical on every route.
const INCLUDED = [
  'A dedicated truck — your belongings ride alone, never combined with another household’s load',
  'Flat rate per job: the number on the written estimate is the number on the invoice',
  'Written estimate within 24 hours of receiving your inventory',
  'No deposit to book, and free cancellation more than 48 hours out',
  'Packing available from $79/hour for two packers',
];

export default function RoutePage({ page }: { page: RoutePageData }) {
  const url = `${siteUrl}/${page.slug}`;
  const band = page.hasBand ? bandForSlug(page.slug) : undefined;
  const routeLabel = `${page.fromCity} to ${page.toCity}`;

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: `Moving ${routeLabel}`, item: url },
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
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Long-distance moving</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Moving from {page.fromCity} to {page.toCity}: Cost &amp; How It Works
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">{page.answer}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{page.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">Get a Written Estimate in 24h</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Price band or flat-minimum framing */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              {page.fromCity} → {page.toCity} price bands, 2026
            </h2>
            {band ? (
              <>
                <div className="overflow-x-auto border border-gray-200">
                  <table className="w-full text-left text-sm min-w-[520px]">
                    <thead>
                      <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                        <th className="px-5 py-3 font-semibold">Studio</th>
                        <th className="px-5 py-3 font-semibold">1 bedroom</th>
                        <th className="px-5 py-3 font-semibold">2 bedrooms</th>
                        <th className="px-5 py-3 font-semibold">3 bedrooms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.studio}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.oneBr}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.twoBr}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.threeBr}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mt-5">
                  These bands are estimates from our published rate table, not booked-job averages — your written
                  estimate, inside 24 hours of the inventory, is the number that counts. Every job on this route is a
                  flat rate with a dedicated truck, starting at the ${LD_MINIMUM.toLocaleString('en-US')} interstate minimum.
                </p>
              </>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                This route is priced individually — long-distance jobs start at{' '}
                <strong className="text-charcoal">${LD_MINIMUM.toLocaleString('en-US')} flat</strong> and the exact
                figure depends on inventory volume, access at both ends and timing. Send your inventory (photos of
                every room are enough) and the written estimate arrives within 24 hours. No deposit to book.
              </p>
            )}
          </div>
        </section>

        {/* What's included */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
              How a {routeLabel} move works here
            </h2>
            <ul className="space-y-4">
              {INCLUDED.map((line) => (
                <li key={line} className="flex gap-3 items-start">
                  <CheckCircle size={17} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What moves the price */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
              What moves the price on this route
            </h2>
            <div className="space-y-6">
              {page.whatAffects.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <Truck size={17} className="text-gold shrink-0 mt-1" />
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
              {routeLabel} moving FAQ
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
              Related: <Link href="/services/long-distance-moving" className="text-gold hover:underline">long-distance moving service</Link>
              {' · '}
              <Link href="/pricing" className="text-gold hover:underline">all routes and pricing</Link>
              {' · '}
              <Link href="/quote" className="text-gold hover:underline">start your estimate</Link>
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
