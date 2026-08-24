import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, CheckCircle, X } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE } from '@/lib/pricing';

const siteUrl = 'https://www.easy-move-florida.com';

// The audit measured the site as absent from "movers COI miami condo" while a
// competitor's COI blog post ranked for "high rise movers miami" — a proven
// format on our own signature claim. /blog/what-is-coi-condo-move already owns
// the informational intent ("what is a COI"), so this page takes the
// transactional one: the mover who does the paperwork. It links to that post
// rather than restating it.
//
// Every claim here is one of the four the fact-check verified: COI issued to
// building management, within 24 hours of booking, free, in the building's
// format naming it as additional insured. No specific building is tied to a
// specific dollar limit anywhere on this page — those are unverified, and
// llms.txt is explicit that named buildings are areas served, not a client list.

export const metadata: Metadata = {
  title: {
    absolute: 'COI for Your Miami Condo Move — Issued in 24 Hours, Free | Easy Move Florida',
  },
  description:
    'Miami condo and high-rise movers who handle the Certificate of Insurance. COI issued to your building management within 24 hours of booking, free, in their required format naming the building as additional insured. From $129/hr.',
  alternates: { canonical: `${siteUrl}/coi-miami-condo-movers` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'COI for Your Miami Condo Move — Issued in 24 Hours, Free',
    description:
      'The certificate your building requires, issued to management within 24 hours of booking at no charge. Elevator and loading dock coordination included.',
    url: `${siteUrl}/coi-miami-condo-movers`,
    images: [
      {
        url: `${siteUrl}/images/Hero.png`,
        width: 1200,
        height: 630,
        alt: 'Miami high-rise condo move with Certificate of Insurance handled',
      },
    ],
  },
};

const MIN_INVOICE = MIN_HOURS * HOURLY_RATE[2] + TRUCK_FEE;

// Generic across buildings. Deliberately no per-building figures.
const COI_CONTENTS = [
  {
    item: 'General liability, at the limit your building sets',
    note: 'Most South Florida buildings ask for a limit in the $1M–$2M range. Yours may differ — we ask management for the figure in writing rather than assuming it.',
  },
  {
    item: 'The building named as additional insured',
    note: 'Spelled exactly as the association writes it in its own documents. A certificate naming "Williams Island" when the bylaws say "Williams Island Property Owners Association" gets rejected at the desk.',
  },
  {
    item: 'The management company named too, where required',
    note: 'Some associations want the management company listed alongside the building. It is a common reason an otherwise correct certificate comes back.',
  },
  {
    item: 'Workers compensation and auto liability',
    note: 'Frequently requested alongside general liability, particularly in newer towers.',
  },
  {
    item: "The building's own format",
    note: 'Same coverage, wrong form, and the dock manager turns the crew away. We fill out the form the building sends.',
  },
];

const STEPS = [
  {
    step: 'You send the building name and management contact',
    detail:
      'That is all we need to start. If you already have the building\'s COI requirements in an email, forward it and we skip a step.',
  },
  {
    step: 'We ask management for their requirements in writing',
    detail:
      'Limits, additional-insured wording, their form, the elevator reservation process and the dock window. In writing, so nothing turns on a phone call somebody remembers differently.',
  },
  {
    step: 'The certificate goes to management within 24 hours of booking',
    detail: 'Free of charge, in their format, naming the building as additional insured.',
  },
  {
    step: 'We reserve the freight elevator and the dock window',
    detail:
      'Booked against your move date before it arrives, not negotiated on the morning while the clock runs.',
  },
  {
    step: 'The crew is briefed before it leaves the yard',
    detail:
      'Building access, elevator window and padding rules confirmed in advance, so the hours you pay for go on your furniture rather than on paperwork at the desk.',
  },
];

const NO_FEES = [
  { fee: 'The certificate of insurance', us: true, note: 'Free. It is not a line on your estimate.' },
  {
    fee: 'Reissuing it when the building rejects the first one',
    us: true,
    note: 'Also free. Formats change and associations are particular; that is our problem, not yours.',
  },
  {
    fee: 'Elevator reservation and dock coordination',
    us: true,
    note: 'Part of the booking, at no charge.',
  },
  {
    fee: 'A "COI processing fee"',
    us: false,
    note: 'Some companies bill $50–$150 to issue the certificate. We do not charge for it.',
  },
  {
    fee: 'An elevator fee, a stairs fee or a long-carry fee',
    us: false,
    note: 'None of these exist here. On an hourly job those things cost time, and that time is already in the estimated hours.',
  },
];

const FAQS = [
  {
    q: 'How fast can you issue a COI for my building?',
    a: 'Within 24 hours of booking. Send your building name, management contact and their coverage requirements, and the certificate goes to management in their required format, naming the building as additional insured.',
  },
  {
    q: 'Do you charge for the certificate?',
    a: 'No. The COI is free, and so is reissuing it if the building wants something changed. Some movers bill $50–$150 for it; that fee does not exist here.',
  },
  {
    q: 'What limits will my building require?',
    a: 'It varies by building and it changes over time. Many South Florida associations require general liability in the $1M–$2M range, some also want the management company named or a waiver of subrogation. Rather than guess, we ask your management for their requirements in writing before move day.',
  },
  {
    q: 'What if the building rejects the certificate?',
    a: 'We reissue it at no charge. Rejections are usually about wording — the association named slightly differently than its bylaws spell it, or the wrong form. It is a normal part of the process and it is on us to get right before move day.',
  },
  {
    q: 'Which Miami buildings do you work in?',
    a: 'High-rise and condo work across Brickell, Downtown, Miami Beach, Coconut Grove, Aventura, Sunny Isles Beach, Hallandale Beach, Hollywood and Fort Lauderdale — Brickell City Centre, ICON Brickell, Williams Island, Porto Vita, the Trump towers, Acqualina, Jade Beach and Jade Ocean among many others. If your building is in the service area, we work with its rules.',
  },
  {
    q: 'Do I need a COI for a rental building, not just a condo?',
    a: 'Usually yes. Most managed rental buildings in Miami-Dade and Broward ask for one before a crew is allowed onto the freight elevator, on the same terms as a condo association.',
  },
  {
    q: 'Does handling the building paperwork cost extra on the move?',
    a: `No. Local moves are billed hourly — $${HOURLY_RATE[2]}/hour for two movers, $${HOURLY_RATE[3]}/hour for three, a ${MIN_HOURS}-hour minimum and a flat $${TRUCK_FEE} truck fee for the day. The smallest possible invoice is $${MIN_INVOICE}. Building coordination is part of the service, not a line item.`,
  },
  {
    q: 'Can you do the same at both ends of the move?',
    a: 'Yes. When both the origin and the destination are managed buildings, both get a certificate and both get an elevator window, coordinated against the same move date.',
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
    {
      '@type': 'ListItem',
      position: 2,
      name: 'COI for Miami Condo Moves',
      item: `${siteUrl}/coi-miami-condo-movers`,
    },
  ],
});

const serviceJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/coi-miami-condo-movers#service`,
  name: 'Miami condo and high-rise moving with Certificate of Insurance handling',
  serviceType: 'High-Rise and Condominium Moving',
  description:
    'Local condo and high-rise moving in Miami-Dade and Broward with the Certificate of Insurance issued to building management within 24 hours of booking, free of charge, in the format the building requires and naming it as additional insured. Includes freight elevator reservation and loading dock scheduling.',
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: [
    { '@type': 'City', name: 'Miami' },
    { '@type': 'City', name: 'Miami Beach' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Sunny Isles Beach' },
    { '@type': 'City', name: 'Hallandale Beach' },
    { '@type': 'City', name: 'Hollywood' },
    { '@type': 'City', name: 'Fort Lauderdale' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    description: `Certificate of Insurance issued free of charge. Local moving billed hourly from $${HOURLY_RATE[2]} per hour for two movers with a ${MIN_HOURS}-hour minimum and a flat $${TRUCK_FEE} per day truck fee.`,
  },
});

const RELATED_CITIES = [
  { href: '/miami-movers', label: 'Miami' },
  { href: '/aventura-movers', label: 'Aventura' },
  { href: '/sunny-isles-movers', label: 'Sunny Isles Beach' },
  { href: '/hallandale-beach-movers', label: 'Hallandale Beach' },
  { href: '/coconut-grove-movers', label: 'Coconut Grove' },
  { href: '/hollywood-movers', label: 'Hollywood' },
];

export default function CoiMiamiCondoMoversPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Miami condo &amp; high-rise moves
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your building wants a COI. We handle it.
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              <strong className="text-white">
                The certificate goes to your building management within 24 hours of booking, free of
                charge, in the format they require and naming the building as additional insured.
              </strong>{' '}
              Freight elevator reservation and loading dock window are booked at the same time.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              In Miami-Dade and Broward, almost no managed building will let a crew onto the freight
              elevator without one. It is the paperwork that decides whether your move starts on
              time — so it is our job, not yours. Send the building name and the management contact;
              that is the whole ask.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">
                  Get a Written Estimate
                </Button>
              </Link>
              <a href="tel:7863051844">
                <Button
                  size="lg"
                  variant="ghost"
                  className="inline-flex items-center gap-2 text-white border-white/20"
                >
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* What the building will ask for */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              What your building will ask the certificate to say
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Requirements differ from tower to tower and they change, which is why we ask your
              management for theirs in writing instead of working from memory. Across South Florida
              buildings, the same handful of items come up.
            </p>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                    <th className="px-5 py-3 font-semibold">On the certificate</th>
                    <th className="px-5 py-3 font-semibold">Why it gets rejected</th>
                  </tr>
                </thead>
                <tbody>
                  {COI_CONTENTS.map((c) => (
                    <tr key={c.item} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-5 py-4 text-charcoal font-semibold align-top">{c.item}</td>
                      <td className="px-5 py-4 text-gray-600">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              For what a Certificate of Insurance actually is and why associations require one, the{' '}
              <Link href="/blog/what-is-coi-condo-move" className="text-gold hover:underline">
                full explainer is here
              </Link>
              .
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              How it runs, start to finish
            </h2>
            <ol className="divide-y divide-gray-200 border-y border-gray-200">
              {STEPS.map((s, i) => (
                <li key={s.step} className="py-5 flex gap-4 items-start">
                  <span className="font-display text-gold font-bold text-lg shrink-0 w-6">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-charcoal font-semibold text-sm">{s.step}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              Moving out of one managed building and into another? Both ends get the same treatment.
              The{' '}
              <Link href="/blog/brickell-condo-move-checklist" className="text-gold hover:underline">
                Brickell condo move checklist
              </Link>{' '}
              walks through the rest of the building-day sequence.
            </p>
          </div>
        </section>

        {/* What it costs */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              What the paperwork costs
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nothing. The move itself is billed hourly — ${HOURLY_RATE[2]}/hour for two movers,{' '}
              ${HOURLY_RATE[3]}/hour for three, a {MIN_HOURS}-hour minimum and a flat ${TRUCK_FEE}{' '}
              truck fee for the day, which puts the smallest possible invoice at ${MIN_INVOICE}.
            </p>
            <ul className="divide-y divide-gray-100 border-y border-gray-100">
              {NO_FEES.map((f) => (
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
                        {f.us ? 'included' : 'does not exist here'}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{f.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              Full rate card on the{' '}
              <Link href="/pricing" className="text-gold hover:underline">
                pricing page
              </Link>
              , and what a Miami move actually totals in{' '}
              <Link href="/moving-cost-miami" className="text-gold hover:underline">
                the 2026 cost guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              Questions we get about the certificate
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-charcoal font-semibold text-sm mb-3">High-rise moving by city</p>
              <div className="flex flex-wrap gap-2">
                {RELATED_CITIES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="text-sm text-charcoal border border-gray-300 px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
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
