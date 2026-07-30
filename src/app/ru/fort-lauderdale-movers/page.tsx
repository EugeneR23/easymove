import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/fort-lauderdale-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/fort-lauderdale-movers`,
    languages: {
      en: `${siteUrl}/fort-lauderdale-movers`,
      ru: `${siteUrl}/ru/fort-lauderdale-movers`,
      'x-default': `${siteUrl}/fort-lauderdale-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/fort-lauderdale-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Форт-Лодердейле — Easy Move Florida' }],
  },
};

export default function FortLauderdaleMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
