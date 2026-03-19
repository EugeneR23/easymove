import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ChevronDown, Shield, Star, Phone } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — local hero image, animates with Ken Burns slow zoom */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat animate-kenburns"
        style={{ backgroundImage: "url('/images/Hero.png')", backgroundPosition: 'center 20%' }}
      />
      {/* Base darkening layer */}
      <div className="absolute inset-0 bg-charcoal/65" />
      {/* Gradient: heavy at bottom, moderate at top, clear in centre for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/20 to-charcoal/55" />
      {/* Radial vignette — darkens edges, keeps centre bright */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(28,28,30,0.55) 100%)' }}
      />
      {/* Film grain — cinematic depth */}
      <div className="absolute inset-0 grain-overlay z-[2]" />
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold z-[3]" />
      {/* Subtle gold bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px gold-separator z-[3]" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 border border-gold/40 bg-black/20 backdrop-blur-[2px] px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
            Miami · Fort Lauderdale · Boca Raton
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
          South Florida&rsquo;s Premier<br />
          <span className="gold-text">White-Glove</span> Movers
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Founder-led, fully insured, and built around one standard: every item handled
          as if it belongs to family. Serving Miami-Dade, Broward, and Palm Beach Counties.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Link href="/quote">
            <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[220px] shadow-[0_0_32px_rgba(201,168,76,0.25)] hover:shadow-[0_0_48px_rgba(201,168,76,0.35)]">
              Get My Estimate
            </Button>
          </Link>
          <Link href="tel:7863051844">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50 min-w-[220px] inline-flex items-center gap-2 justify-center">
              <Phone size={16} />
              786-305-1844
            </Button>
          </Link>
        </div>

        <p className="text-white/35 text-xs mb-12">No obligation &nbsp;·&nbsp; Fast response</p>

        {/* Trust row — with a subtle top separator */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-white/60">
              <Shield size={14} className="text-gold shrink-0" />
              <span className="text-xs tracking-widest uppercase">Fully Insured</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden md:block" />
            <div className="flex items-center gap-1.5 text-white/60">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-gold text-gold" />)}
              <span className="text-xs tracking-widest uppercase ml-1">Top-rated</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden md:block" />
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-xs tracking-widest uppercase">COI on Request</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden md:block" />
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-xs tracking-widest uppercase">Founder-Led</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce z-10">
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
