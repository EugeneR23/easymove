import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';

const city = getCityDataUa('ua/aventura-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/aventura-movers`,
    languages: {
      en: `${siteUrl}/aventura-movers`,
      ru: `${siteUrl}/ru/aventura-movers`,
      uk: `${siteUrl}/ua/aventura-movers`,
      'x-default': `${siteUrl}/aventura-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/aventura-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Aventura | Easy Move Florida" }],
  },
};

export default function AventuraMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
