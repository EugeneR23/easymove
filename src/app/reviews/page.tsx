import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Star, ExternalLink, MessageSquare, Award } from 'lucide-react';

const siteUrl = 'https://www.easy-move-florida.com';
const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/o4bkrBqVUpgvKyF97';
const THUMBTACK_URL = 'https://www.thumbtack.com/profile/services/474342774303219734/reviews';
// TODO: Replace with g.page review link from GBP dashboard
const GOOGLE_LEAVE_REVIEW_URL = 'https://g.page/r/[GBP_REVIEW_LINK]/review';

export const metadata: Metadata = {
  title: { absolute: 'Reviews — Easy Move Florida' },
  description:
    '5.0★ on Google (6 verified reviews) and Thumbtack (32 verified). Read real reviews from South Florida moving clients. Brickell, Aventura, Sunny Isles, Hollywood, Fort Lauderdale.',
  alternates: {
    canonical: `${siteUrl}/reviews`,
    languages: { en: `${siteUrl}/reviews`, 'x-default': `${siteUrl}/reviews` },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: 'Client Reviews — Easy Move Florida',
    description:
      '5.0★ on Google and Thumbtack. Verified reviews from South Florida moving clients in Brickell, Aventura, Sunny Isles, Hollywood, and Fort Lauderdale.',
    url: `${siteUrl}/reviews`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida — client reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews — Easy Move Florida',
    description: '5.0★ on Google (6 reviews) and Thumbtack (32 reviews). Real South Florida moving clients.',
    images: [`${siteUrl}/images/Hero.png`],
  },
};

// TODO: Replace REVIEWER_NAME and reviewBody with exact GBP text. Do not fabricate.
const REVIEWS = [
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
  {
    name: '[Client Name from GBP]',
    date: '[YYYY-MM-DD]',
    text: '[Paste exact review text from Google Business Profile dashboard]',
    source: 'Google' as const,
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${siteUrl}/reviews` },
  ],
});

// AggregateRating uses Google verified reviews only (Thumbtack count is shown
// in the UI but kept out of schema to avoid double-counting per Google guidelines).
const aggregateRatingJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  '@id': `${siteUrl}/#organization`,
  name: 'Easy Move Florida',
  url: siteUrl,
  telephone: '+17863051844',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    reviewCount: 6,
  },
});

// TODO: Replace REVIEWER_NAME and reviewBody with exact GBP text. Do not fabricate.
const reviewArrayJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: REVIEWS.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      itemReviewed: {
        '@type': 'MovingCompany',
        name: 'Easy Move Florida',
        url: siteUrl,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      publisher: { '@type': 'Organization', name: 'Google' },
    },
  })),
});

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: aggregateRatingJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: reviewArrayJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Client Reviews</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              What Our Clients <span className="gold-text">Say</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              5.0 <span className="text-gold">★</span> on Google — 6/6 reviews.
              {' '}5.0 <span className="text-gold">★</span> on Thumbtack — 32 reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                  Read on Google <ExternalLink size={14} />
                </Button>
              </a>
              <Link href="/quote">
                <Button size="lg" variant="ghost" className="text-white border-white/20">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-cream border-b border-gray-100">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {[
                { value: '5.0 ★', label: 'Google' },
                { value: '5.0 ★', label: 'Thumbtack' },
                { value: '100%', label: 'Repeat or refer' },
                { value: '6 + 32', label: 'Verified reviews' },
              ].map((s) => (
                <div key={s.label} className="bg-cream p-6 md:p-8 text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-1">{s.value}</p>
                  <p className="text-gold text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Verified Reviews</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                Real moves. Real clients. South Florida.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Every review below is pulled from a verified Google Business Profile review. No filters, no edits — exactly what our clients wrote after their move.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REVIEWS.map((r, i) => (
                <article
                  key={i}
                  itemScope
                  itemType="https://schema.org/Review"
                  className="bg-cream border border-gray-100 p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <StarRow />
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold border border-gold/40 px-2 py-1">
                      {r.source}
                    </span>
                  </div>
                  <meta itemProp="reviewRating" content="5" />
                  <p
                    itemProp="reviewBody"
                    className="text-charcoal text-sm leading-relaxed mb-5 flex-1"
                  >
                    {r.text}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p itemProp="author" className="font-semibold text-charcoal text-sm">
                      {r.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      <time itemProp="datePublished" dateTime={r.date}>{r.date}</time>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Leave a review CTA */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl text-center">
            <Award size={28} className="text-gold mx-auto mb-4" />
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Recently moved with us?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
              Leave a Google review
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Was your move smooth? A quick Google review takes 60 seconds and helps other South Florida families find a trustworthy mover.
            </p>
            {/* TODO: Replace with g.page review link from GBP dashboard */}
            <a href={GOOGLE_LEAVE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                <Star size={16} className="fill-white" /> Leave a review on Google
              </Button>
            </a>
          </div>
        </section>

        {/* Thumbtack section */}
        <section className="bg-charcoal py-16">
          <div className="container-max max-w-3xl text-center">
            <MessageSquare size={24} className="text-gold mx-auto mb-4" />
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">More reviews</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              32 more verified reviews on Thumbtack
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-xl mx-auto">
              Easy Move Florida has earned a perfect 5.0 average across 32 verified Thumbtack reviews — see the full history of jobs and client feedback.
            </p>
            <a
              href={THUMBTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-gold/80 transition border-b border-gold/40 pb-1"
            >
              32 more verified reviews on Thumbtack <ExternalLink size={14} />
            </a>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
