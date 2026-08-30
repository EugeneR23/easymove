import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePageRu } from '@/lib/data/routePages';

const page = getRoutePageRu('ru/moving-miami-to-new-york')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Переезд из Майами в Нью-Йорк: цена и как это работает | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-miami-to-new-york`,
    languages: {
      en: `${siteUrl}/moving-miami-to-new-york`,
      ru: `${siteUrl}/ru/moving-miami-to-new-york`,
      'x-default': `${siteUrl}/moving-miami-to-new-york`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Переезд из Майами в Нью-Йорк: цена и как это работает | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-miami-to-new-york`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Переезд Майами — Нью-Йорк, Easy Move Florida" }],
  },
};

export default function MovingMiamiToNewYorkPageRu() {
  return <RoutePage page={page} locale="ru" />;
}
