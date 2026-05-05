import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('boca-raton-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: { canonical: 'https://www.easy-move-florida.com/boca-raton-movers' },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/boca-raton-movers',
    images: [
      {
        url: 'https://www.easy-move-florida.com/images/Real/Boca-Raton.jpg',
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Luxury Movers in Boca Raton, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
    images: ['https://www.easy-move-florida.com/images/Real/Boca-Raton.jpg'],
  },
};

export default function BocaRatonMoversPage() {
  return <CityMoversPage city={city} />;
}
