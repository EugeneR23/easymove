import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityDataUa('ua/hollywood-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('hollywood-movers', 'uk'),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/hollywood-movers`,
    images: [ogImage(`${siteUrl}${city.heroImage}`, "Вантажники та переїзди — Hollywood | Easy Move Florida")],
  },
};

export default function HollywoodMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
