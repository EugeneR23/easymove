import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityDataRu('ru/delray-beach-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('delray-beach-movers', 'ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/delray-beach-movers`,
    images: [ogImage(`${siteUrl}${city.heroImage}`, 'Русскоязычные грузчики — Delray Beach | Easy Move Florida')],
  },
};

export default function DelrayBeachMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
