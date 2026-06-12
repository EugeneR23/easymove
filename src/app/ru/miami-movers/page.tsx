import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/miami-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/miami-movers`,
    languages: {
      en: `${siteUrl}/miami-movers`,
      ru: `${siteUrl}/ru/miami-movers`,
      'x-default': `${siteUrl}/miami-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'EasyMove Elite',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/miami-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Майами — EasyMove Elite' }],
  },
};

export default function MiamiMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
