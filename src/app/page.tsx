import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PricingTransparency from '@/components/home/PricingTransparency';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BuildingHOASection from '@/components/home/BuildingHOASection';
import ServiceAreasSection from '@/components/home/ServiceAreasSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import FounderBlock from '@/components/home/FounderBlock';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';

export const metadata: Metadata = {
  title: { absolute: 'Easy Move Florida — Local Moving & Small Handyman in South Florida' },
  description:
    'Local moving and small handyman across Hollywood, Aventura, Sunny Isles, Hallandale, Fort Lauderdale, Boca Raton, and Miami. From $99/hr with 3-hour minimum. Owner-led, transparent pricing, building/HOA fluent. Russian + English.',
  alternates: {
    canonical: 'https://www.easy-move-florida.com',
  },
  openGraph: {
    title: 'Easy Move Florida — Local Moving & Small Handyman in South Florida',
    description:
      'Owner-led local movers in South Florida. Transparent hourly pricing from $99/hr, 3-hour minimum. WhatsApp-friendly, Russian + English.',
    url: 'https://www.easy-move-florida.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — Local Moving & Small Handyman',
    description:
      'Hollywood-based movers serving all of South Florida. Honest hourly pricing, COI on request, Russian + English.',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <PricingTransparency />
        <ServicesPreview />
        <WhyChooseUs />
        <BuildingHOASection />
        <ServiceAreasSection />
        <TestimonialsSection />
        <FAQSection />
        <FounderBlock />
        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
