import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GOOGLE_BUSINESS } from '@/lib/data/credentials';
import './globals.css';

// SEO/CWV: trimmed font weights to reduce preloaded woff2 files (was 13 across latin+cyrillic).
// Headings use 400/600/700, body uses 400/500/700. Italics + extra weights dropped.
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Easy Move Florida — Local Moving & Small Handyman in South Florida',
    template: '%s | Easy Move Florida',
  },
  description:
    'Owner-led local movers across South Florida — Hollywood, Aventura, Miami, Fort Lauderdale. From $129/hr, 3-hour minimum. COI in 24h. Russian + English.',
  keywords: [
    'movers Hollywood FL',
    'moving company South Florida',
    'Aventura movers',
    'Sunny Isles movers',
    'Hallandale movers',
    'Fort Lauderdale movers',
    'Miami movers',
    'Boca Raton movers',
    'Russian movers Miami',
    'small handyman South Florida',
    'TV mounting Hollywood FL',
    'apartment movers South Florida',
    'COI movers Miami',
    'hourly movers Florida',
  ],
  authors: [{ name: 'Easy Move Florida' }],
  creator: 'Easy Move Florida',
  publisher: 'Easy Move Florida',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU', 'uk_UA'],
    siteName: 'Easy Move Florida',
    url: siteUrl,
    title: 'Easy Move Florida — Local Moving & Small Handyman in South Florida',
    description:
      'Owner-led local movers across South Florida. Transparent hourly pricing from $129/hr, 3-hour minimum. WhatsApp-friendly, Russian + English.',
    images: [
      {
        url: `${siteUrl}/images/Hero.png`,
        width: 1200,
        height: 630,
        alt: 'Easy Move Florida — local moving crew in South Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — Local Moving & Small Handyman',
    description:
      'Hollywood-based movers serving all of South Florida. Honest hourly pricing, COI on request, Russian + English.',
    images: [`${siteUrl}/images/Hero.png`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': siteUrl,
      'ru': `${siteUrl}/ru`,
      'uk': `${siteUrl}/ua`,
      'x-default': siteUrl,
    },
  },
  // Search Console / Webmaster Tools verification (RU + EN + Bing).
  // Fill in via env vars or paste verification codes when ready.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['MovingCompany', 'LocalBusiness'],
  // Same @id as organizationSchema on purpose: MovingCompany is a subclass of
  // Organization, so consumers merge both nodes into one entity instead of
  // reading two businesses at one address. This node carries the rating —
  // no other page may emit a second AggregateRating.
  '@id': `${siteUrl}/#organization`,
  name: 'Easy Move Florida',
  url: siteUrl,
  image: `${siteUrl}/images/Hero.png`,
  description:
    'Local moving and small handyman service across South Florida — Hollywood, Aventura, Sunny Isles, Hallandale, Fort Lauderdale, Boca Raton, Miami. Owner-led, transparent hourly pricing, building/HOA fluent.',
  telephone: '+17863051844',
  email: 'romanov@easy-move-florida.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2130 Stirling Rd',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    postalCode: '33020',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.0038,
    longitude: -80.158,
  },
  areaServed: [
    { '@type': 'City', name: 'Miami', sameAs: 'https://en.wikipedia.org/wiki/Miami' },
    { '@type': 'City', name: 'Miami Beach', sameAs: 'https://en.wikipedia.org/wiki/Miami_Beach,_Florida' },
    { '@type': 'City', name: 'North Miami', sameAs: 'https://en.wikipedia.org/wiki/North_Miami,_Florida' },
    { '@type': 'City', name: 'Coral Gables' },
    { '@type': 'City', name: 'Coconut Grove' },
    { '@type': 'City', name: 'Brickell' },
    { '@type': 'City', name: 'Doral', sameAs: 'https://en.wikipedia.org/wiki/Doral,_Florida' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Sunny Isles Beach' },
    { '@type': 'City', name: 'Hallandale Beach', sameAs: 'https://en.wikipedia.org/wiki/Hallandale_Beach,_Florida' },
    { '@type': 'City', name: 'Hollywood' },
    { '@type': 'City', name: 'Dania Beach', sameAs: 'https://en.wikipedia.org/wiki/Dania_Beach,_Florida' },
    { '@type': 'City', name: 'Fort Lauderdale', sameAs: 'https://en.wikipedia.org/wiki/Fort_Lauderdale,_Florida' },
    { '@type': 'City', name: 'Pompano Beach' },
    { '@type': 'City', name: 'Boca Raton', sameAs: 'https://en.wikipedia.org/wiki/Boca_Raton,_Florida' },
    { '@type': 'City', name: 'Delray Beach' },
    { '@type': 'City', name: 'Palm Beach' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+17863051844',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English', 'Russian'],
  },
  serviceType: [
    'Local Residential Moving',
    'Apartment Moving',
    'House Moving',
    'Office Moving (Small)',
    'Long-Distance Moving',
    'Packing Services',
    'Furniture Disassembly and Reassembly',
    'Heavy Item Handling',
    'Small Handyman Services',
  ],
  priceRange: '$$',
  // [TODO: confirm with Evgenii] foundingDate and streetAddress above are not
  // yet verified against business records.
  foundingDate: '2021',
  founder: { '@id': `${siteUrl}/#founder` },
  sameAs: [
    'https://maps.app.goo.gl/o4bkrBqVUpgvKyF97',
    'https://www.google.com/maps/place/?q=place_id:ChIJJcPs4dykvagR_uQxPaSlY_8',
    'https://www.thumbtack.com/profile/services/474342774303219734/reviews',
  ],
  // Verified against the live Google Business Profile (place_id
  // ChIJJcPs4dykvagR_uQxPaSlY_8): 5.0 from 6 reviews. Keep these two numbers in
  // step with the profile — a stale rating in schema is worse than none.
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_BUSINESS.rating,
    reviewCount: GOOGLE_BUSINESS.reviewCount,
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Moving and Handyman Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Local Residential Moving',
          description: 'Crew of 2 movers $129/hr, crew of 3 movers $179/hr, crew of 4 movers $219/hr, 3-hour minimum. The truck is a separate line charged per day at the same figure as the crew rate ($129, $179 or $219), with fuel, tolls and mileage included in it — there is no fuel surcharge. Same rate seven days a week, year-round: no weekend or seasonal surcharge. No stairs fee, heavy item fee, elevator fee or long carry fee — those cost time, so they are priced into the estimated hours. Furniture pads, stretch wrap and basic disassembly are included in the hourly rate.',
          areaServed: 'South Florida',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Building / HOA / COI coordination',
          description: 'Certificate of Insurance within 24 hours, elevator reservations, parking permits, freight elevator scheduling.',
          areaServed: ['Hollywood', 'Aventura', 'Sunny Isles Beach', 'Hallandale', 'Fort Lauderdale', 'Miami'],
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Long-Distance Moving',
          description: 'From $1,500. Custom written estimate within 24 hours, based on miles, inventory and access at both ends. Dedicated truck, no deposit required to book.',
          areaServed: 'United States',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Packing Services',
          description: 'Full or partial packing, materials supplied, unpack at destination.',
          areaServed: 'South Florida',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Small Handyman Services',
          description: 'TV mounting, picture hanging, IKEA furniture assembly, curtain rods, shelving, small fixes. Bundle with a move and the handyman portion is discounted. Not licensed plumbing or electrical.',
          areaServed: 'South Florida',
        },
      },
    ],
  },
  // Spoken languages only. The site also publishes Ukrainian pages, but no one
  // here speaks Ukrainian, so 'uk' does not belong in a spoken-language claim.
  knowsLanguage: ['en', 'ru'],
  slogan: 'Local moving and small handyman in South Florida',
};

// Separate Organization node — helps brand entity reconciliation in Google
// Knowledge Graph and AI-search citations (where the bot treats Organization
// as the canonical brand surface independent of LocalBusiness location data).
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Easy Move Florida',
  // "EasyMove Elite" removed: it named an entity that does not exist in the
  // Florida Division of Corporations register, and asserting it as an alternate
  // name works against resolving this business to the right entity.
  alternateName: ['Easy Move FL'],
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/images/Hero.png`,
    width: 1200,
    height: 630,
  },
  description:
    'Owner-led moving company serving South Florida — Hollywood, Aventura, Sunny Isles, Hallandale, Fort Lauderdale, Boca Raton, Miami. English + Russian.',
  foundingDate: '2021',
  founder: { '@id': `${siteUrl}/#founder` },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+17863051844',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Russian'],
    },
  ],
  sameAs: [
    'https://maps.app.goo.gl/o4bkrBqVUpgvKyF97',
    'https://www.google.com/maps/place/?q=place_id:ChIJJcPs4dykvagR_uQxPaSlY_8',
    'https://www.thumbtack.com/profile/services/474342774303219734/reviews',
  ],
};

// Person entity for the founder — one node the whole graph references, so AI
// assistants and Google resolve "Evgenii Romanov" to this business.
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#founder`,
  name: 'Evgenii Romanov',
  alternateName: ['Eugene Romanov', 'Евгений Романов'],
  jobTitle: 'Founder & Owner',
  description:
    'Owner of Easy Move Florida. Runs dispatch and crew leadership himself in English and Russian; reachable directly on WhatsApp at +1 786-305-1844.',
  knowsLanguage: ['en', 'ru'],
  worksFor: { '@id': `${siteUrl}/#organization` },
  url: `${siteUrl}/about`,
  image: `${siteUrl}/images/founder.jpg`,
  telephone: '+17863051844',
  email: 'romanov@easy-move-florida.com',
};

// WebSite schema — provides a stable @id all child entities reference.
// No SearchAction: the site has no search endpoint, so claiming one would be
// a false capability signal.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Easy Move Florida',
  inLanguage: ['en-US', 'ru-RU'],
  publisher: { '@id': `${siteUrl}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* No hreflang here: these tags used to be hardcoded to the homepage and
            were emitted on every route, so each inner page declared the homepage
            as its own alternate. Per-page alternates now come from each route's
            metadata.alternates.languages. */}
        {/* No hero preload here either: it fetched the raw 2.4 MB Hero.png on
            every page, including pages that never render it. The hero <img> uses
            next/image, which emits its own AVIF imageSrcSet preload with
            fetchPriority="high". */}
        {/* Tawk.to live chat — replace YOUR_PROPERTY_ID/YOUR_WIDGET_ID with values from tawk.to dashboard */}
        <Script
          id="tawkto"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/69c159ee7eea2e1c39d68478/1jkdkeimn';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K7PHS2LP');`,
          }}
        />
        {/* Microsoft Clarity — session recordings & heatmaps */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
      </head>
      <body className="font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7PHS2LP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
