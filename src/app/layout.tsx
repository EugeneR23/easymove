import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://www.easymoveelite.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EasyMove Elite — Premium Movers in Miami, Fort Lauderdale & Boca Raton',
    template: '%s | EasyMove Elite',
  },
  description:
    'Premium white-glove movers in Miami, Fort Lauderdale & Boca Raton. Founder-led, fully insured, no surprise fees. Residential, high-rise, long-distance & specialty moves.',
  keywords: [
    'movers Miami',
    'moving company Miami',
    'white glove movers South Florida',
    'luxury moving company Miami',
    'high-rise movers Miami',
    'condo movers Miami',
    'long distance movers Florida',
    'Fort Lauderdale movers',
    'Boca Raton movers',
    'Broward County moving company',
    'Palm Beach County movers',
    'premium moving company South Florida',
    'fine art movers Miami',
    'office movers Miami',
    'fully insured movers Florida',
  ],
  authors: [{ name: 'EasyMove Elite' }],
  creator: 'EasyMove Elite',
  publisher: 'EasyMove Elite',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'EasyMove Elite',
    url: siteUrl,
    title: 'EasyMove Elite — Premium Movers in Miami, Fort Lauderdale & Boca Raton',
    description:
      'White-glove moving services across South Florida. Founder-led, fully insured, no surprise fees. Serving Miami-Dade, Broward, and Palm Beach Counties.',
    images: [
      {
        url: '/images/Hero.png',
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Premium White-Glove Movers in South Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMove Elite — Premium Movers in Miami & South Florida',
    description:
      'White-glove moving services across South Florida. Founder-led, fully insured, transparent pricing.',
    images: ['/images/Hero.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['MovingCompany', 'LocalBusiness'],
  name: 'EasyMove Elite',
  url: siteUrl,
  image: `${siteUrl}/images/Hero.png`,
  description:
    'Premium white-glove moving company serving Miami-Dade, Broward, and Palm Beach Counties. Residential, high-rise, long-distance, fine art, office, and storage services.',
  telephone: '+17863051844',
  email: 'romanov@easy-move-florida.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Miami',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33101',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: [
    { '@type': 'City', name: 'Miami', sameAs: 'https://en.wikipedia.org/wiki/Miami' },
    { '@type': 'City', name: 'Coral Gables' },
    { '@type': 'City', name: 'Coconut Grove' },
    { '@type': 'City', name: 'Brickell' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Sunny Isles Beach' },
    { '@type': 'City', name: 'Hollywood' },
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
    contactOption: 'TollFree',
  },
  serviceType: [
    'Residential Moving',
    'High-Rise Moving',
    'Condo Moving',
    'Long-Distance Moving',
    'International Moving',
    'Office Moving',
    'Fine Art Moving',
    'Storage Coordination',
  ],
  priceRange: '$$$',
  foundingDate: '2021',
  founder: {
    '@type': 'Person',
    name: 'Eugene Romanov',
    jobTitle: 'Founder & Owner',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preload hero image — critical LCP resource */}
        <link rel="preload" as="image" href="/images/Hero.png" />
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K7PHS2LP');`,
          }}
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
