import Link from 'next/link';
import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import { ArrowRight, Phone } from 'lucide-react';

const commitments = [
  'Honest hourly pricing — no surprise charges on move day',
  'COI issued to your building within 24 hours of booking, no charge',
  'Russian and English — your choice of language',
  'WhatsApp goes to me directly when you ask for the owner',
];

export default function FounderBlock() {


  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />

      <div className="container-max relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Photo with pulse ring */}
          <AnimateIn direction="none" className="relative w-20 h-20 mx-auto mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30">
              <Image
                src="/images/founder.jpg"
                alt="Evgenii Romanov, founder of Easy Move Florida"
                fill
                sizes="80px"
                className="object-cover object-[center_20%]"
              />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-gold/25 pointer-events-none pulse-ring-a" />
            <div className="absolute inset-0 rounded-full border border-gold/10 pointer-events-none pulse-ring-b" />
          </AnimateIn>

          {/* Eyebrow */}
          <AnimateIn delay={0.2} className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Who&rsquo;s running this
          </AnimateIn>

          {/* Quote — word reveal */}
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
            {['Hi,', "I'm", 'Evgenii', 'Romanov.'].flatMap((word, i, arr) => [
              <span key={i} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.07}s` }}>
                {word}
              </span>,
              i < arr.length - 1 ? ' ' : null,
            ])}
          </h2>

          <AnimateIn delay={0.5} className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            I run Easy Move Florida out of Hollywood. I started this because I kept seeing the same problems —
            late crews, surprise charges, broken items, language mismatches with building managers. Built it to fix that.
            Crew is small and accountable. Pricing is honest. WhatsApp goes to me directly when you ask for the owner.
            Russian + English. Hollywood-based, working all of South Florida.
          </AnimateIn>

          {/* Commitments grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-lg mx-auto mb-8">
            {commitments.map((item, i) => (
              <AnimateIn
                key={item}
                direction="left"
                delay={0.55 + i * 0.1}
                className="flex items-start gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-gold mt-[7px] shrink-0" />
                <p className="text-white/60 text-sm leading-snug">{item}</p>
              </AnimateIn>
            ))}
          </div>

          {/* Attribution + CTA */}
          <AnimateIn direction="none" delay={1.0}>
            <p className="text-gold/60 text-sm font-semibold mb-5">
              Evgenii Romanov &middot; Founder &amp; Owner &middot; Hollywood, FL
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/about">
                <span className="inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] hover:text-white/70 transition-colors duration-200 border-b border-white/20 pb-px hover:border-white/50">
                  Our story <ArrowRight size={11} />
                </span>
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] hover:text-white/70 transition-colors duration-200 border-b border-white/20 pb-px hover:border-white/50"
              >
                <Phone size={11} /> Direct: 786-305-1844
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
