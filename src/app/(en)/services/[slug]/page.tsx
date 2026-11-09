import type { Metadata } from 'next';
import type React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { readOneService, readAllServices } from '@/lib/data/services';
import { getServiceContent } from '@/lib/data/serviceContent';
import { formatCurrency } from '@/lib/utils';
import { HOURLY_RATE, MIN_HOURS } from '@/lib/pricing';
import Button from '@/components/ui/Button';
import * as LucideIcons from 'lucide-react';
import { CheckCircle, Shield, Phone } from 'lucide-react';
import { canonicalFor } from '@/lib/seo/routes';
import { lastModified } from '@/lib/seo/lastmod';
import { CITIES } from '@/lib/data/cities';
import { PHONE, telHref } from '@/lib/data/contact';
import { localStartingPrice, OFFICE_MIN_CREW, STARTING_HOURS } from '@/lib/pricing';

/**
 * What each service page is called in search. The catalogue names in
 * data/services.json ("Office & Commercial", "Storage Coordination") are menu
 * labels: as H1 and title they gave "Office Commercial" and "Long-Distance
 * Moving Within Florida in South Florida", and none of the five pages ranked
 * in the top 49 for its own query on 2026-11-09. Prices are read from the
 * pricing module, never typed here.
 */
const SEARCH_COPY: Record<string, { h1: string; title: string; description: (startingPrice: number) => string }> = {
  'residential-moving': {
    h1: 'Apartment, Condo and House Movers',
    title: 'Apartment, Condo & House Movers | Easy Move Florida',
    description: () =>
      `Apartment, condo and house moves across South Florida. From $${HOURLY_RATE[2]}/hr for 2 movers, ${MIN_HOURS}-hour minimum, truck as its own line. No deposit. Free COI.`,
  },
  'long-distance-moving': {
    h1: 'Long-Distance Movers Within Florida',
    title: 'Long-Distance Movers Within Florida | Easy Move Florida',
    description: () =>
      'Moves from South Florida to anywhere else in Florida, quoted per job in writing within 24 hours. No deposit. Out of state we refer a licensed carrier.',
  },
  'office-commercial': {
    h1: 'Office Movers in South Florida',
    title: 'Office Movers in South Florida | Easy Move Florida',
    description: () =>
      `Office moves in Miami-Dade and Broward, evenings and weekends at the same rate. From ${formatCurrency(localStartingPrice('office', OFFICE_MIN_CREW))} for ${OFFICE_MIN_CREW} movers and ${STARTING_HOURS.office} hours. Free COI.`,
  },
  'specialty-items': {
    h1: 'Fine Art and Specialty Item Movers',
    title: 'Fine Art & Specialty Item Movers | Easy Move Florida',
    description: () =>
      `Custom crating and careful handling for art, antiques and pianos in South Florida. Each job is quoted per piece before you book. Call ${PHONE.display}.`,
  },
  'storage-solutions': {
    h1: 'Moving and Storage in South Florida',
    title: 'Moving and Storage in South Florida | Easy Move Florida',
    description: (startingPrice) =>
      `Pickup, storage at a partner facility and redelivery in South Florida. From ${formatCurrency(startingPrice)} a month, month to month. Call ${PHONE.display}.`,
  },
};

const ORG_ID = 'https://www.easy-move-florida.com/#organization';

export async function generateStaticParams() {
  const services = readAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = readOneService(params.slug);
  if (!service) return { title: 'Service | Easy Move Florida' };

  const copy = SEARCH_COPY[service.slug];
  const title = copy?.title ?? `${service.name} | Easy Move Florida`;
  // A service added later without an entry above falls back to its own tagline,
  // with no suffix: the old suffix repeated the cities the tagline already named.
  const description = copy ? copy.description(service.startingPrice) : service.tagline;

  return {
    title: { absolute: title },
    description,
    alternates: canonicalFor(`/services/${service.slug}`),
    openGraph: {
      title,
      description,
      url: `https://www.easy-move-florida.com/services/${service.slug}`,
      images: [{ url: service.imageUrl, alt: `${service.name} — Easy Move Florida South Florida` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.imageUrl],
    },
  };
}

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  type IconType = React.ComponentType<{ size?: number; className?: string }>;
  const Icon = ((LucideIcons as unknown as Record<string, IconType>)[name] ?? CheckCircle) as IconType;
  return <Icon {...props} />;
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = readOneService(params.slug);
  if (!service) notFound();
  const content = getServiceContent(service.slug);

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.easy-move-florida.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.easy-move-florida.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://www.easy-move-florida.com/services/${service.slug}` },
    ],
  });

  const serviceJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.name,
    // A reference to the one business node in RootShell, not a second,
    // unlinked "MovingCompany" that reads as a different business.
    provider: { '@id': ORG_ID },
    areaServed: CITIES.map((c) => ({ '@type': 'City', name: c.name })),
    // A service quoted per job has no published figure. Emitting one anyway put
    // a number in the knowledge graph that no rate card backs.
    //
    // An hourly service publishes the crew rates from lib/pricing, the same
    // numbers /pricing shows. Residential said "from $450 flat-rate" here
    // until 2026-10-01; the company has never sold a flat-rate local move.
    ...(service.priceUnit === 'custom' ? {} : service.priceUnit === 'per-hour' ? {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: HOURLY_RATE[2],
        highPrice: HOURLY_RATE[4],
        offerCount: 3,
        priceSpecification: ([2, 3, 4] as const).map((crew) => ({
          '@type': 'UnitPriceSpecification',
          price: HOURLY_RATE[crew],
          priceCurrency: 'USD',
          unitText: 'HUR',
          name: `Crew of ${crew} movers — hourly labour rate`,
          eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
        })),
      },
    } : {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: service.startingPrice,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: service.startingPrice,
          unitText: service.priceUnit,
        },
      },
    }),
  });

  const faqJson = content
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        dateModified: lastModified(`/services/${service.slug}`),
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJson }}
      />
      {faqJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJson }}
        />
      )}
      <Header />
      <main className="pt-20">
        {/* Hero */}
        {/* min-h, not h: the hero now carries two buttons, and a fixed height
            would clip the heading on a 375px screen. */}
        <section className="relative min-h-[20rem] md:min-h-[440px] flex items-end overflow-hidden">
          <Image
            src={service.imageUrl}
            alt={`${service.name} — Easy Move Florida South Florida`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 w-full">
            <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30 px-3 py-1 mb-4">
              {service.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{SEARCH_COPY[service.slug]?.h1 ?? service.name}</h1>
            <p className="text-gray-300 mt-3 max-w-xl">{service.tagline}</p>
            {/* The only calls to action used to sit in the sidebar, which on a
                phone is below the whole article. */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/quote">
                <Button size="lg" variant="primary">Get Your Quote</Button>
              </Link>
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                <Phone size={15} />
                {PHONE.display}
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-cream">
          <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 text-lg leading-relaxed mb-10">{service.description}</p>

              <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">What&rsquo;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {service.features.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 bg-white p-4 border border-gray-100 group hover:border-gold transition-colors duration-200">
                    <DynamicIcon name={f.icon} className="text-gold shrink-0" size={18} />
                    <span className="text-charcoal text-sm font-medium">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Long-form intro: unique per service, ~150-300 words */}
              {content && (
                <div className="mb-12 space-y-5">
                  {content.longIntro.map((para, i) => (
                    <p key={i} className="text-gray-700 text-base leading-relaxed">{para}</p>
                  ))}
                </div>
              )}

              {/* Why us — service-specific reasoning */}
              {content && content.whyUs.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">
                    Why Easy Move Florida for {service.name}
                  </h2>
                  <div className="space-y-5">
                    {content.whyUs.map((item) => (
                      <div key={item.title} className="bg-white border border-gray-100 p-5">
                        <p className="font-semibold text-charcoal text-sm mb-2">{item.title}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process steps */}
              {content && content.process.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">How It Works</h2>
                  <ol className="space-y-5">
                    {content.process.map((step) => (
                      <li key={step.step} className="flex gap-4">
                        <span className="shrink-0 w-9 h-9 flex items-center justify-center bg-gold/10 border border-gold/30 text-gold font-bold text-sm">
                          {step.step}
                        </span>
                        <div>
                          <p className="font-semibold text-charcoal text-sm mb-1">{step.title}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Pricing breakdown */}
              {content && content.pricingBreakdown.length > 0 && (
                <div className="mb-12 bg-cream border border-gold/20 p-6">
                  <h2 className="font-display text-xl font-semibold text-charcoal mb-4">Pricing Breakdown</h2>
                  <ul className="space-y-2">
                    {content.pricingBreakdown.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-charcoal">
                        <CheckCircle size={14} className="text-gold shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {content && content.faqs.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">Common Questions</h2>
                  <div className="divide-y divide-gray-200">
                    {content.faqs.map((faq, i) => (
                      <div key={i} className="py-5">
                        <p className="font-semibold text-charcoal text-sm mb-2">{faq.q}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Local context */}
              {content && (
                <div className="mb-12 border-l-2 border-gold pl-5 italic">
                  <p className="text-gray-600 text-sm leading-relaxed">{content.localContext}</p>
                </div>
              )}

              {/* Service pages linked to no city page at all; city pages already
                  link here. */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">Cities We Serve</h2>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {CITIES.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-charcoal underline underline-offset-2 hover:text-gold transition-colors">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signals */}
              <div className="bg-charcoal p-8">
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">Our Guarantee</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: 'Owner-led on every job', desc: 'The owner answers the phone himself. COI sent to building management within 24 hours of booking, free.' },
                    { title: 'Arrival Windows', desc: 'One-hour arrival window. The crew calls 30 to 40 minutes before arriving. No all-day waiting.' },
                    { title: 'Transparent Pricing', desc: 'Written estimate before any work begins. No surprise fees on moving day.' },
                  ].map((g) => (
                    <div key={g.title}>
                      <div className="w-0.5 h-6 bg-gold mb-4" />
                      <p className="text-white font-semibold text-sm mb-1">{g.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6 lg:sticky lg:top-24">
                {service.pricingNote ? (
                  <div className="mb-7">
                    {service.pricingNote.split('\n').map((line, i) =>
                      line.startsWith('•') ? (
                        <p key={i} className="text-sm text-gray-500 leading-relaxed pl-3">{line}</p>
                      ) : (
                        <p key={i} className={`text-sm text-charcoal font-medium leading-relaxed ${i > 0 ? 'mt-3' : 'mb-2'}`}>{line}</p>
                      )
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Starting From</p>
                    <p className="font-display text-4xl font-bold text-charcoal mb-1">
                      {formatCurrency(service.priceUnit === 'per-hour' ? HOURLY_RATE[2] : service.startingPrice)}
                    </p>
                    <p className="text-sm text-gray-400 mb-7">
                      {service.priceUnit === 'per-hour' ? 'per hour' : service.priceUnit === 'flat-rate' ? 'flat rate' : service.priceUnit === 'per-month' ? 'per month' : service.priceUnit}
                    </p>
                  </>
                )}

                <Link href="/quote">
                  <Button size="lg" variant="primary" className="w-full mb-3">Get Your Quote</Button>
                </Link>
                <p className="text-xs text-gray-400 text-center mb-3">No obligation · Fast response</p>
                <a href="tel:+17863051844">
                  <Button size="lg" variant="ghost" className="w-full mb-5 inline-flex items-center justify-center gap-2">
                    <Phone size={15} />
                    786-305-1844
                  </Button>
                </a>

                <div className="border-t border-gray-100 pt-5 space-y-3">
                  {[
                    'No commitment to get a quote',
                    'Written estimate provided',
                    'COI available on request',
                    'Owner-led on every move',
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2">
                      <Shield size={12} className="text-gold shrink-0" />
                      <span className="text-xs text-gray-500">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
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
