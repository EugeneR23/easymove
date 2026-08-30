import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';

const city = getCityDataUa('ua/hollywood-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/hollywood-movers`,
    languages: {
      en: `${siteUrl}/hollywood-movers`,
      ru: `${siteUrl}/ru/hollywood-movers`,
      uk: `${siteUrl}/ua/hollywood-movers`,
      'x-default': `${siteUrl}/hollywood-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/hollywood-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Hollywood | Easy Move Florida" }],
  },
};

export default function HollywoodMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
