import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Phone } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="relative py-14 md:py-24 bg-charcoal overflow-hidden">
      {/* Gold gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay" />
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Decorative cross-mark */}
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Get a Written Quote<br className="hidden sm:block" /> in 2 Minutes
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
          500+ moves completed across South Florida. A real coordinator — not an algorithm —
          calls you back within 2 hours to confirm everything. Licensed, insured, no surprises.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote">
            <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[220px] shadow-[0_0_32px_rgba(201,168,76,0.2)] hover:shadow-[0_0_48px_rgba(201,168,76,0.3)]">
              Get My Estimate
            </Button>
          </Link>
          <Link href="tel:7863051844">
            <Button
              size="lg"
              className="border border-white/20 bg-transparent text-white hover:bg-white/[0.06] hover:border-white/35 w-full sm:w-auto min-w-[220px] inline-flex items-center gap-2 justify-center transition-all duration-200"
            >
              <Phone size={16} />
              786-305-1844
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <span className="text-white/45 text-xs">No obligation</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">Fully insured</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">COI available</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">South Florida team</span>
        </div>
      </div>
    </section>
  );
}
