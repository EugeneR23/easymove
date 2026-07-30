import Link from 'next/link';
import { localStartingPrice, LD_MINIMUM } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';

export default function V2CTA() {
  return (
    <section className="bg-[#060608] border-t border-gold/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,168,76,0.10),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
        <p className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-6">The estimate is the easy part</p>
        <h2 className="text-white font-sans font-extrabold leading-[0.95] tracking-[-0.03em] text-5xl sm:text-7xl mb-8">
          YOUR MOVE,<br /><span className="text-stroke-gold">TO THE MINUTE.</span>
        </h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed mb-4">
          Local moves from {formatCurrency(localStartingPrice('studio'))} · long-distance from {formatCurrency(LD_MINIMUM)}.
          A real coordinator confirms every number in writing — before the truck rolls.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/quote" className="bg-gold hover:bg-gold-dark text-white text-xs font-bold tracking-[0.25em] uppercase px-10 py-5 transition-colors">
            Get My Private Quote
          </Link>
          <a href="tel:7863051844" className="border border-white/25 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.25em] uppercase px-10 py-5 transition-all">
            Call 786-305-1844
          </a>
        </div>
        <p className="text-white/25 text-xs mt-10 tracking-wide">
          COI within 24h · Owner-led crews · Miami-Dade — Broward — Palm Beach
        </p>
      </div>
    </section>
  );
}
