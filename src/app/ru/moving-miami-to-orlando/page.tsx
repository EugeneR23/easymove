import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePageRu } from '@/lib/data/routePages';

const page = getRoutePageRu('ru/moving-miami-to-orlando')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Переезд из Майами в Орландо: цена и как это работает | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-miami-to-orlando`,
    languages: {
      en: `${siteUrl}/moving-miami-to-orlando`,
      ru: `${siteUrl}/ru/moving-miami-to-orlando`,
      'x-default': `${siteUrl}/moving-miami-to-orlando`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Переезд из Майами в Орландо: цена и как это работает | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-miami-to-orlando`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Переезд Майами — Орландо, Easy Move Florida" }],
  },
};

export default function MovingMiamiToOrlandoPageRu() {
  return <RoutePage page={page} locale="ru" />;
}
