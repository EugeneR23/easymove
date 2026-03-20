import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://www.easymoveelite.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EasyMove Elite — Premium Movers in Miami, Fort Lauderdale & Boca Raton',
    template: '%s | EasyMove Elite',
  },
  description:
    'EasyMove Elite offers white-glove moving services across South Florida — Miami, Fort Lauderdale, Boca Raton, and surrounding areas. Fully insured, founder-led, with transparent pricing and no surprises.',
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
  '@type': 'MovingCompany',
  name: 'EasyMove Elite',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/Hero.png`,
  description:
    'Premium white-glove moving company serving Miami-Dade, Broward, and Palm Beach Counties. Residential, high-rise, long-distance, fine art, office, and storage services.',
  telephone: '+17863051844',
  email: 'hello@easymoveelite.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Miami' },
    { '@type': 'City', name: 'Coral Gables' },
    { '@type': 'City', name: 'Coconut Grove' },
    { '@type': 'City', name: 'Brickell' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Sunny Isles Beach' },
    { '@type': 'City', name: 'Hollywood' },
    { '@type': 'City', name: 'Fort Lauderdale' },
    { '@type': 'City', name: 'Pompano Beach' },
    { '@type': 'City', name: 'Boca Raton' },
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
  priceRange: '$$',
  foundingDate: '2021',
  founder: {
    '@type': 'Person',
    name: 'Eugene Romanov',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
