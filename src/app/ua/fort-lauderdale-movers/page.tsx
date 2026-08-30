import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';

const city = getCityDataUa('ua/fort-lauderdale-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/fort-lauderdale-movers`,
    languages: {
      en: `${siteUrl}/fort-lauderdale-movers`,
      ru: `${siteUrl}/ru/fort-lauderdale-movers`,
      uk: `${siteUrl}/ua/fort-lauderdale-movers`,
      'x-default': `${siteUrl}/fort-lauderdale-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/fort-lauderdale-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Fort Lauderdale | Easy Move Florida" }],
  },
};

export default function FortLauderdaleMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
