import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/hallandale-beach-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/hallandale-beach-movers`,
    languages: {
      en: `${siteUrl}/hallandale-beach-movers`,
      ru: `${siteUrl}/ru/hallandale-beach-movers`,
      'x-default': `${siteUrl}/hallandale-beach-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/hallandale-beach-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Халландейл-Бич — Easy Move Florida' }],
  },
};

export default function HallandaleBeachMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
