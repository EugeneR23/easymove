import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('coral-springs-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: 'https://www.easy-move-florida.com/coral-springs-movers',
    languages: {
      en: 'https://www.easy-move-florida.com/coral-springs-movers',
      ru: 'https://www.easy-move-florida.com/ru/coral-springs-movers',
      'x-default': 'https://www.easy-move-florida.com/coral-springs-movers',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/coral-springs-movers',
    images: [
      {
        url: `https://www.easy-move-florida.com${city.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'Easy Move Florida — Movers in Coral Springs, FL',
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

export default function CoralSpringsMoversPage() {
  return <CityMoversPage city={city} />;
}
