import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';
import { alternatesFor } from '@/lib/seo/routes';

const city = getCityDataRu('ru/hallandale-beach-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('hallandale-beach-movers', 'ru'),
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
