import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import HomepageCalculator from '@/components/home/HomepageCalculator';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FounderBlock from '@/components/home/FounderBlock';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';

export const metadata: Metadata = {
  title: 'EasyMove Elite — Premium Moving Company in South Florida',
  description:
    'South Florida\'s premier white-glove moving company. Residential, high-rise, long-distance, fine art, and office moves in Miami, Fort Lauderdale, Boca Raton, and across Miami-Dade, Broward & Palm Beach Counties. Fully insured, founder-led.',
  alternates: {
    canonical: 'https://www.easymoveelite.com',
  },
  openGraph: {
    title: 'EasyMove Elite — Premium Moving Company in South Florida',
    description:
      'Founder-led, fully insured white-glove movers serving Miami, Fort Lauderdale, Boca Raton, and all of South Florida. Transparent pricing, no surprises.',
    url: 'https://www.easymoveelite.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <StatsBar />
        <HomepageCalculator />
        <WhyChooseUs />
        <FounderBlock />
        <ServicesPreview />
        <ProcessSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
