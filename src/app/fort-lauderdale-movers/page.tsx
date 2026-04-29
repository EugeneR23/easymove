import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('fort-lauderdale-movers')!;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: { canonical: 'https://easy-move-florida.com/fort-lauderdale-movers' },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://easy-move-florida.com/fort-lauderdale-movers',
    images: [
      {
        url: 'https://easy-move-florida.com/images/Real/Fort-Lauderdale.jpg',
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Professional Movers in Fort Lauderdale, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
    images: ['https://easy-move-florida.com/images/Real/Fort-Lauderdale.jpg'],
  },
};

export default function FortLauderdaleMoversPage() {
  return <CityMoversPage city={city} />;
}
