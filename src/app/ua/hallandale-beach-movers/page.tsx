import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';
import { alternatesFor } from '@/lib/seo/routes';

const city = getCityDataUa('ua/hallandale-beach-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('hallandale-beach-movers', 'uk'),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/hallandale-beach-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Hallandale Beach | Easy Move Florida" }],
  },
};

export default function HallandaleBeachMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
