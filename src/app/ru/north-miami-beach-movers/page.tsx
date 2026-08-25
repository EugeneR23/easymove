import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/north-miami-beach-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/north-miami-beach-movers`,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/north-miami-beach-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики — North Miami Beach | Easy Move Florida' }],
  },
};

export default function NorthMiamiBeachMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
