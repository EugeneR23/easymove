import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('hallandale-beach-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: 'https://www.easy-move-florida.com/hallandale-beach-movers',
    languages: {
      en: 'https://www.easy-move-florida.com/hallandale-beach-movers',
      ru: 'https://www.easy-move-florida.com/ru/hallandale-beach-movers',
      'x-default': 'https://www.easy-move-florida.com/hallandale-beach-movers',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/hallandale-beach-movers',
    images: [
      {
        url: `https://www.easy-move-florida.com${city.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'Easy Move Florida — Premium Movers in Hallandale Beach, FL',
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

export default function HallandaleBeachMoversPage() {
  return <CityMoversPage city={city} />;
}
