import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/aventura-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/aventura-movers`,
    languages: {
      en: `${siteUrl}/aventura-movers`,
      ru: `${siteUrl}/ru/aventura-movers`,
      'x-default': `${siteUrl}/aventura-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/aventura-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Авентуре — EasyMove Elite' }],
  },
};

export default function AventuraMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
