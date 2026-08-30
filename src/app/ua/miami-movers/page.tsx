import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';

const city = getCityDataUa('ua/miami-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/miami-movers`,
    languages: {
      en: `${siteUrl}/miami-movers`,
      ru: `${siteUrl}/ru/miami-movers`,
      uk: `${siteUrl}/ua/miami-movers`,
      'x-default': `${siteUrl}/miami-movers`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/miami-movers`,
    images: [{ url: `${siteUrl}${city.heroImage}`, width: 1200, height: 630, alt: "Вантажники та переїзди — Miami | Easy Move Florida" }],
  },
};

export default function MiamiMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
