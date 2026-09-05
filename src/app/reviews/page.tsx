import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Star, ExternalLink, MessageSquare, Award } from 'lucide-react';
import { THUMBTACK, GOOGLE_BUSINESS } from '@/lib/data/credentials';

const siteUrl = 'https://www.easy-move-florida.com';

// Google blocks light up on their own once GOOGLE_BUSINESS is filled in at
// src/lib/data/credentials.ts. Until then the page cites Thumbtack only,
// because that is the figure we can evidence.
const THUMBTACK_URL = THUMBTACK.url;
const THUMBTACK_RATING = THUMBTACK.rating;
const THUMBTACK_REVIEW_COUNT = THUMBTACK.reviewCount;
const GOOGLE_PROFILE_URL = GOOGLE_BUSINESS.profileUrl;
const GOOGLE_LEAVE_REVIEW_URL = GOOGLE_BUSINESS.reviewUrl;

export const metadata: Metadata = {
  title: { absolute: `Client Reviews — ${THUMBTACK.rating} on Thumbtack, ${GOOGLE_BUSINESS.rating} on Google | Easy Move Florida` },
  description:
    `Easy Move Florida holds a ${THUMBTACK.rating} rating across ${THUMBTACK.reviewCount} verified Thumbtack reviews and ${GOOGLE_BUSINESS.rating} on Google. See the full review history and how we ask for feedback after every South Florida move.`,
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
      `${THUMBTACK.rating} across ${THUMBTACK.reviewCount} verified Thumbtack reviews. South Florida moving clients in Brickell, Aventura, Sunny Isles, Hollywood and Fort Lauderdale.`,
    url: `${siteUrl}/reviews`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida — client reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews — Easy Move Florida',
    description: `${THUMBTACK.rating} across ${THUMBTACK.reviewCount} verified Thumbtack reviews. Real South Florida moving clients.`,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

type ClientReview = {
  name: string;
  date: string;
  text: string;
  source: 'Google' | 'Thumbtack';
};

// Deliberately empty. This page previously shipped six cards reading
// "[Paste exact review text from Google Business Profile dashboard]" by
// "[Client Name from GBP]" — both as visible copy and as Review JSON-LD, which
// reads as fabricated review markup to Google and to AI assistants.
//
// [TODO: Evgenii] paste real reviews here, copied verbatim from the Thumbtack
// or Google dashboard: { name, date: 'YYYY-MM-DD', text, source }. The grid and
// the Review schema below render automatically once this array is non-empty.
// Never paraphrase or invent a review.
const REVIEWS: ClientReview[] = [];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${siteUrl}/reviews` },
  ],
});

// No AggregateRating here. The root layout emits one on ${siteUrl}/#organization
// for every page, this one included; a second node would put two ratings on the
// same entity. Change the rating in src/lib/data/credentials.ts, not here.

// Only emitted when REVIEWS holds real, verbatim reviews. An empty array emits
// nothing — placeholder Review markup is worse than no Review markup.
const reviewArrayJson = REVIEWS.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: REVIEWS.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Review',
          itemReviewed: { '@type': 'MovingCompany', name: 'Easy Move Florida', url: siteUrl },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          author: { '@type': 'Person', name: r.name },
          datePublished: r.date,
          reviewBody: r.text,
          publisher: { '@type': 'Organization', name: r.source },
        },
      })),
    })
  : null;

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
      {reviewArrayJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: reviewArrayJson }} />
      )}
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Client Reviews</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              {THUMBTACK_RATING} <span className="gold-text">from {(GOOGLE_BUSINESS.reviewCount ?? 0) + THUMBTACK_REVIEW_COUNT} verified reviews</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {GOOGLE_BUSINESS.rating} on Google across {GOOGLE_BUSINESS.reviewCount} reviews and {THUMBTACK_RATING} on Thumbtack across {THUMBTACK_REVIEW_COUNT}. Both platforms verify the customer hired us before they accept a review — neither lets us filter what gets published.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={THUMBTACK_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                  Read all {THUMBTACK_REVIEW_COUNT} reviews <ExternalLink size={14} />
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
                { value: `${GOOGLE_BUSINESS.rating ?? THUMBTACK_RATING} ★`, label: 'Google rating' },
                { value: `${THUMBTACK_RATING} ★`, label: 'Thumbtack rating' },
                { value: `${(GOOGLE_BUSINESS.reviewCount ?? 0) + THUMBTACK_REVIEW_COUNT}`, label: 'Verified reviews' },
                { value: 'EN · RU', label: 'Crew languages' },
              ].map((s) => (
                <div key={s.label} className="bg-cream p-6 md:p-8 text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-1">{s.value}</p>
                  <p className="text-gold text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews grid — renders only when REVIEWS holds verbatim real reviews */}
        {REVIEWS.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-max max-w-6xl">
              <div className="mb-10 max-w-2xl">
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Verified Reviews</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                  Real moves. Real clients. South Florida.
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Quoted exactly as written by the customer on the platform named on each card. No filters, no edits.
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
                    <p itemProp="reviewBody" className="text-charcoal text-sm leading-relaxed mb-5 flex-1">
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
        )}

        {/* Where the reviews live */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Where to read them</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
              All {THUMBTACK_REVIEW_COUNT} reviews are public on Thumbtack
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              We keep our review history on the platform that verifies it rather than reprinting selected quotes here. Thumbtack only accepts a review from a customer it can confirm hired us, and it shows every review — so the {THUMBTACK_RATING} average across {THUMBTACK_REVIEW_COUNT} jobs is the whole record, not a curated subset.
            </p>
            <a
              href={THUMBTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-gold/80 transition border-b border-gold/40 pb-1"
            >
              Read the full review history on Thumbtack <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Leave a review CTA */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl text-center">
            <Award size={28} className="text-gold mx-auto mb-4" />
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Recently moved with us?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
              Leave a review
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Was your move smooth? A review takes 60 seconds and it is how other South Florida families find a mover they can check up on.
            </p>
            <a href={GOOGLE_LEAVE_REVIEW_URL ?? THUMBTACK_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                <Star size={16} className="fill-white" />
                {GOOGLE_LEAVE_REVIEW_URL ? 'Leave a review on Google' : 'Leave a review on Thumbtack'}
              </Button>
            </a>
            {GOOGLE_PROFILE_URL && (
              <p className="mt-4">
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-charcoal/70 text-sm hover:text-gold transition"
                >
                  See our Google Business Profile <ExternalLink size={13} />
                </a>
              </p>
            )}
          </div>
        </section>

        {/* How we ask */}
        <section className="bg-charcoal py-16">
          <div className="container-max max-w-3xl text-center">
            <MessageSquare size={24} className="text-gold mx-auto mb-4" />
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">How we ask</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              We ask once, at the end of the job
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
              Payment is settled on site about 45 to 60 minutes before we finish, once the final hour count is clear. That is when we ask for the review — while you can still see the work. If something went wrong, call the owner directly at 786-305-1844 instead: a fixed problem is worth more to us than a five-star average.
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
