import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('miami-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: { canonical: 'https://easy-move-florida.com/miami-movers' },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://easy-move-florida.com/miami-movers',
    images: [
      {
        url: 'https://easy-move-florida.com/images/Real/Miami.jpg',
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Premium Movers in Miami, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
    images: ['https://easy-move-florida.com/images/Real/Miami.jpg'],
  },
};

export default function MiamiMoversPage() {
  return <CityMoversPage city={city} />;
}
