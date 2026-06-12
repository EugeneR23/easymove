import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('hollywood-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: 'https://www.easy-move-florida.com/hollywood-movers',
    languages: {
      en: 'https://www.easy-move-florida.com/hollywood-movers',
      ru: 'https://www.easy-move-florida.com/ru/hollywood-movers',
      'x-default': 'https://www.easy-move-florida.com/hollywood-movers',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/hollywood-movers',
    images: [
      {
        url: `https://www.easy-move-florida.com${city.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'EasyMove Elite — Premium Movers in Hollywood, FL',
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

export default function HollywoodMoversPage() {
  return <CityMoversPage city={city} />;
}
