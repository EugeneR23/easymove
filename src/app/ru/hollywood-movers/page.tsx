import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataRu } from '@/lib/data/citiesRu';

const city = getCityDataRu('ru/hollywood-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/hollywood-movers`,
    languages: {
      en: `${siteUrl}/hollywood-movers`,
      ru: `${siteUrl}/ru/hollywood-movers`,
      'x-default': `${siteUrl}/hollywood-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ru/hollywood-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: 'Русскоязычные грузчики в Голливуде, Флорида — Easy Move Florida' }],
  },
};

export default function HollywoodMoversPageRu() {
  return <CityMoversPage city={city} locale="ru" />;
}
