import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('coral-gables-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: { canonical: 'https://www.easy-move-florida.com/coral-gables-movers' },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/coral-gables-movers',
    images: [
      {
        url: `https://www.easy-move-florida.com${city.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Premium Movers in Coral Gables, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    images: [`https://www.easy-move-florida.com${city.heroImage}`],
  },
};

export default function CoralGablesMoversPage() {
  return <CityMoversPage city={city} />;
}
