import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, MessageCircle } from 'lucide-react';
import { CITIES_RU } from '@/lib/data/citiesRu';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * /russian-speaking-movers-miami — the English page for an English query.
 *
 * The site had sixteen Russian-language city pages and no English page saying,
 * in English, that this is a Russian-speaking company. That gap is why an
 * assistant asked "russian speaking movers in Miami" answered with a competitor
 * whose own site never uses the word: one of their Google reviews did. The
 * review is still the stronger signal, but there is no reason to also be absent
 * from the page that answers the question directly.
 */

export const metadata: Metadata = {
  title: { absolute: `Russian-Speaking Movers in Miami & South Florida | Easy Move Florida` },
  description: `Russian-speaking movers in Miami, Sunny Isles, Aventura, Hallandale and Hollywood. Owner-led crews, rates from $129/hr, free COI in 24h. Call 786-305-1844.`,
  alternates: {
    canonical: `${siteUrl}/russian-speaking-movers-miami`,
    languages: {
      en: `${siteUrl}/russian-speaking-movers-miami`,
      ru: `${siteUrl}/ru`,
      'x-default': `${siteUrl}/russian-speaking-movers-miami`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    siteName: 'Easy Move Florida',
    title: `Russian-Speaking Movers in Miami & South Florida | Easy Move Florida`,
    description: `Russian-speaking movers in Miami, Sunny Isles, Aventura, Hallandale and Hollywood. Owner-led crews, rates from $129/hr, free COI in 24h. Call 786-305-1844.`,
    url: `${siteUrl}/russian-speaking-movers-miami`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Russian-speaking movers in Miami and South Florida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Russian-Speaking Movers in Miami & South Florida | Easy Move Florida`,
    description: `Russian-speaking movers in Miami, Sunny Isles, Aventura, Hallandale and Hollywood. Owner-led crews, rates from $129/hr, free COI in 24h. Call 786-305-1844.`,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

const SECTIONS = [
  {
    title: `The whole move can run in Russian`,
    body: `Plenty of companies put "Russian speaking" in their ads and then route you to a call center. At Easy Move Florida the language is simply how the company runs. Owner Evgenii Romanov speaks Russian, the coordinator who takes your call and builds your estimate works in Russian, and most crew members speak Russian on move day. Your parents can explain which boxes hold the fragile things and hear the answer in their own language, without you standing by as interpreter. The first call, the walkthrough, the written estimate, the contract and the final bill can all happen in Russian, in English, or switching between the two, whichever your family prefers.`,
  },
  {
    title: `Where we work every day`,
    body: `Our base is Hollywood, FL, and we serve all of Miami-Dade, Broward and Palm Beach counties. Most of our work happens where South Florida's Russian-speaking community is concentrated: Sunny Isles Beach, Aventura, Hallandale Beach, Hollywood and Miami itself. The condo towers along Collins Avenue in Sunny Isles, from Winston Towers to Trump Towers, Porsche Design Tower and Jade, sit inside our regular service area, and their freight-elevator bookings and insurance paperwork are routine for us. Whether it is a one-bedroom moving two floors within the same tower or a family house going from Aventura to Boca Raton, this is home ground for our crews, not a special request.`,
  },
  {
    title: `Pricing in plain terms`,
    body: `The rate is set by crew size: $129 per hour for two movers, $179 for three, $219 for four, with a three-hour minimum on every job. The truck is billed once per day at the same rate as your crew, $129, $179 or $219, so the smallest possible invoice is $516 with a two-mover crew. There are no weekend, fuel or stairs fees. Typical totals: a studio runs $516–$645, a one-bedroom $516–$774, a two-bedroom $645–$1,253, a three-bedroom $1,253–$1,611, and larger homes $1,611–$2,327. Packing help is available from $79 per hour, or $237 for a complete studio packing package, and storage starts at $200 per month.`,
  },
  {
    title: `High-rise paperwork, handled for you`,
    body: `If your building requires a certificate of insurance, we issue it free within 24 hours of your request. Most South Florida towers ask for coverage somewhere in the $1M–$2M range; send us the requirements sheet from your management office and we confirm the certificate matches yours before move day. Where the building books freight elevators by appointment, we help reserve the window and plan the crew's start time around it. In gated communities we make sure the crew and the truck are on the gate list ahead of time, so the day does not begin with a standoff at security. You forward one email from your building, and we handle the rest.`,
  },
  {
    title: `Snowbirds and seasonal moves`,
    body: `Seasonal moves in and out of Florida are a large part of our calendar — apartments closed up for the summer, homes opened before the season, belongings moved to storage and back. We do the Florida side of that work: the local move, the packing, the storage run. We do not do the interstate leg — that needs federal authority we do not hold — but we will point you toward a licensed carrier and handle everything once your shipment is here.`,
  },
];

const FAQS = [
  {
    q: `Do the movers actually speak Russian?`,
    a: `Yes. The owner, Evgenii Romanov, is Russian-speaking, the coordinator who handles your booking works in Russian, and most crew members speak Russian. It is not a line added for reviews; the company operates in both languages every day. Your entire move, from the first phone call to the final walkthrough, can be conducted in Russian. If some family members prefer English, the crew switches without any trouble.`,
  },
  {
    q: `Can I get the estimate and contract in Russian?`,
    a: `Yes. The coordinator can go through your inventory, explain the pricing and prepare your written estimate in Russian, and walk through every line of the contract in Russian before you sign. Nothing is signed until it is understood. If an English-speaking relative is arranging the move, we run the same conversation with them in English, so both sides see the same numbers.`,
  },
  {
    q: `What areas do you cover?`,
    a: `Our base is Hollywood, FL, and we serve all of Miami-Dade, Broward and Palm Beach counties. Day to day, most of our work is in Miami, Sunny Isles Beach, Aventura, Hallandale Beach and Hollywood, including the condo towers along Collins Avenue. For moves beyond South Florida, we run long-distance moves to other states starting at $1,500 flat.`,
  },
  {
    q: `How much do Russian-speaking movers in Miami cost?`,
    a: `The rate depends on crew size: $129 per hour for two movers, $179 for three, $219 for four, with a three-hour minimum. The truck is billed once per day at the same rate as your crew. There are no weekend, fuel or stairs surcharges. A typical studio comes to $516–$645, a one-bedroom to $516–$774 and a two-bedroom to $645–$1,253.`,
  },
  {
    q: `Will you provide a COI for my condo building?`,
    a: `Yes, free of charge and within 24 hours of your request. Email us the requirements sheet from your building management and we send the certificate directly to them, correctly named, before move day. Where the building requires a freight elevator reservation, we help coordinate that as well, so the crew starts on time instead of waiting in the lobby.`,
  },
  {
    q: `Can I book a move for my Russian-speaking parents?`,
    a: `Yes, and it is a common arrangement. You handle the booking in English from wherever you live; on move day the crew works with your parents directly in Russian. The coordinator keeps you updated by phone or text while speaking with your parents in their own language, so nobody has to translate and nothing gets lost between the two conversations.`,
  },
  {
    q: `Do you handle long-distance moves out of Florida?`,
    a: `No — we are a local mover. Interstate household moves require federal operating authority that we do not hold, so we neither quote nor take them. Call 786-305-1844 anyway: we will point you toward a licensed carrier, and we can still pack your home in Russian or handle the local Florida-side move into storage.`,
  },
  {
    q: `Do I need a deposit, and what if my plans change?`,
    a: `No deposit is required to book, and cancellation is free with more than 48 hours' notice, which matters when a closing date shifts or a condo approval takes longer than promised. The written estimate you receive is what the crew works from on move day, with no weekend or fuel surcharges added later. Call 786-305-1844 and the coordinator will hold your date.`,
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Russian-Speaking Movers', item: `${siteUrl}/russian-speaking-movers-miami` },
  ],
});

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function RussianSpeakingMoversPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Russian &amp; English · South Florida</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Russian-Speaking Movers in Miami & South Florida
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">Easy Move Florida is a Russian-speaking moving company based in Hollywood, FL, run by owner Evgenii Romanov and serving Miami-Dade, Broward and Palm Beach counties. The coordinator and most crew members work in Russian, so the entire move can run in Russian from the first call to the final walkthrough, or in English, or both. Rates start at $129 per hour for two movers, with the truck billed once per day at the same crew rate and a three-hour minimum. There are no weekend, fuel or stairs fees, and if your building requires a certificate of insurance, we issue it free within 24 hours.</p>
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

        {SECTIONS.map((s, i) => (
          <section key={s.title} className={i % 2 === 0 ? 'section-padding bg-white' : 'section-padding bg-cream'}>
            <div className="container-max max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          </section>
        ))}

        {/* Russian-language pages */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">
              Prefer to read in Russian?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">If you or your parents prefer to read in Russian, the full Russian-language version of this site lives at /ru, with dedicated pages for 16 South Florida cities.</p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/ru" className="inline-block text-sm border border-gold/40 text-charcoal px-4 py-2 hover:bg-gold/5 transition-colors duration-150">
                  Сайт по-русски
                </Link>
              </li>
              {CITIES_RU.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="inline-block text-sm border border-gray-200 text-gray-600 px-4 py-2 hover:border-gold/40 hover:text-charcoal transition-colors duration-150">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              Questions about our Russian-speaking service
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8 flex items-center gap-2">
              <MessageCircle size={15} className="text-gold shrink-0" />
              Write to us in Russian on WhatsApp — 786-305-1844 — and the owner answers directly.
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
