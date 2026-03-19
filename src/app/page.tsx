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
