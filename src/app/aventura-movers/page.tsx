import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('aventura-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: { canonical: 'https://easy-move-florida.com/aventura-movers' },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://easy-move-florida.com/aventura-movers',
    images: [
      {
        url: `https://easy-move-florida.com${city.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Premium Movers in Aventura, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    images: [`https://easy-move-florida.com${city.heroImage}`],
  },
};

export default function AventuraMoversPage() {
  return <CityMoversPage city={city} />;
}
