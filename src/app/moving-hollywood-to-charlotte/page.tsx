import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePage } from '@/lib/data/routePages';

const page = getRoutePage('moving-hollywood-to-charlotte')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Moving from Hollywood to Charlotte: Cost & How It Works | Easy Move Florida" },
  description: page.metaDescription,
  alternates: { canonical: `${siteUrl}/moving-hollywood-to-charlotte` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: "Moving from Hollywood to Charlotte: Cost & How It Works | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/moving-hollywood-to-charlotte`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Moving from Hollywood to Charlotte — Easy Move Florida" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Moving from Hollywood to Charlotte: Cost & How It Works | Easy Move Florida",
    description: page.metaDescription,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

export default function MovingHollywoodToCharlottePage() {
  return <RoutePage page={page} />;
}
