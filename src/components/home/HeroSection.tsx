import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import HeroCallbackForm from '@/components/home/HeroCallbackForm';
import { ChevronDown, Shield, Star, Phone } from 'lucide-react';

function getNextAvailableLabel(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = d.getDay();
  if (day === 0) d.setDate(d.getDate() + 1); // Sunday → Monday
  if (day === 6) d.setDate(d.getDate() + 2); // Saturday → Monday
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function HeroSection() {
  const nextDate = getNextAvailableLabel();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background — local hero image, animates with Ken Burns slow zoom */}
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src="/images/Real/8.jpg"
          alt="EasyMove Elite crew during a residential move in South Florida"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      {/* Base darkening layer — lightened so photo reads through */}
      <div className="absolute inset-0 bg-charcoal/50" />
      {/* Gradient: heavy at bottom for text legibility, light at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-charcoal/35" />
      {/* Radial vignette — subtle */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(28,28,30,0.35) 100%)' }}
      />
      {/* Film grain — cinematic depth */}
      <div className="absolute inset-0 grain-overlay z-[2]" />
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold z-[3]" />
      {/* Subtle gold bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px gold-separator z-[3]" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 border border-gold/40 bg-black/20 backdrop-blur-[2px] px-4 py-1.5 mb-8 max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shrink-0" />
          <span className="text-gold text-xs font-semibold tracking-[0.08em] sm:tracking-[0.2em] uppercase">
            Miami · Fort Lauderdale · Boca Raton
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
          South Florida Moving<br />
          <span className="gold-text">You Can Count On</span>
        </h1>

        <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          500+ completed moves. Licensed &amp; insured. No hidden fees, no surprises —
          just a crew that shows up on time and handles your home with care.
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

        {/* Quick callback form */}
        <div className="max-w-md mx-auto mb-5 w-full px-1">
          <p className="text-white/35 text-[10px] uppercase tracking-[0.15em] mb-2.5 text-center">Or get a callback — just leave your number:</p>
          <HeroCallbackForm />
        </div>

        <p className="text-white/50 text-xs mb-8 md:mb-12">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 align-middle animate-pulse" />
          Next available: <span className="text-white/70 font-semibold">{nextDate}</span> &nbsp;·&nbsp; Responds within 2 hours
        </p>

        {/* Trust row — with a subtle top separator */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-white/60">
              <Shield size={14} className="text-gold shrink-0" />
              <span className="text-xs tracking-widest uppercase">Licensed &amp; Insured</span>
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
