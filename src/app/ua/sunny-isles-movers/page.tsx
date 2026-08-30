import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';

const city = getCityDataUa('ua/sunny-isles-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/sunny-isles-movers`,
    languages: {
      en: `${siteUrl}/sunny-isles-movers`,
      ru: `${siteUrl}/ru/sunny-isles-movers`,
      uk: `${siteUrl}/ua/sunny-isles-movers`,
      'x-default': `${siteUrl}/sunny-isles-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/sunny-isles-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Sunny Isles Beach | Easy Move Florida" }],
  },
};

export default function SunnyIslesMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
