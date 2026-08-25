import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/boca-raton-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/boca-raton-movers`,
    languages: {
      en: `${siteUrl}/boca-raton-movers`,
      ru: `${siteUrl}/ru/boca-raton-movers`,
      'x-default': `${siteUrl}/boca-raton-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/boca-raton-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики — Boca Raton | Easy Move Florida' }],
  },
};

export default function BocaRatonMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
