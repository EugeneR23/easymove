import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/sunny-isles-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/sunny-isles-movers`,
    languages: {
      en: `${siteUrl}/sunny-isles-movers`,
      ru: `${siteUrl}/ru/sunny-isles-movers`,
      'x-default': `${siteUrl}/sunny-isles-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/sunny-isles-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Sunny Isles Beach — EasyMove Elite' }],
  },
};

export default function SunnyIslesMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
