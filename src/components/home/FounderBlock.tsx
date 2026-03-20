import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const commitments = [
  'No subcontractors — same trained crew, start to finish',
  'Certificate of Insurance issued within 24 hrs of your request',
  'Every crew briefed on your building before they arrive',
  'Founder reachable by phone throughout your move',
];

export default function FounderBlock() {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[460px]">

        {/* Photo panel */}
        <div className="relative lg:w-[40%] aspect-[3/4] sm:aspect-auto sm:h-96 lg:h-auto overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Founder%202.jpg"
            alt="Eugene Romanov, Founder of EasyMove Elite"
            className="w-full h-full object-cover object-[center_30%] lg:object-[center_20%]"
          />
          {/* Blend edge into text panel on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/60 hidden lg:block" />
          {/* Darken on mobile */}
          <div className="absolute inset-0 bg-charcoal/35 lg:hidden" />
          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold lg:hidden" />
        </div>

        {/* Text panel */}
        <div className="flex-1 bg-charcoal px-5 sm:px-8 md:px-14 lg:px-16 py-12 lg:py-20 flex flex-col justify-center relative overflow-hidden">
          {/* Grain + gold top border */}
          <div className="absolute inset-0 grain-overlay" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)' }}
          />

          <div className="relative max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-gold" />
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Founder&apos;s Commitment</p>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              We Stay Small<br />So Your Move Stays Right
            </h2>

            {/* Statement */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Most moving companies grow by taking more jobs and sending whoever is available.
              We grow by doing fewer moves exceptionally well. Every client has a coordinator.
              Every crew knows the building. Every move is one we&rsquo;re willing to put our name on.
            </p>

            {/* Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
              {commitments.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-gold mt-[7px] shrink-0" />
                  <p className="text-white/65 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>

            {/* Attribution + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-gold/70 text-sm font-semibold">
                &mdash; Eugene Romanov, Founder &amp; Owner
              </p>
              <Link
                href="/about"
                className="group/link inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] hover:text-white/70 transition-colors duration-200"
              >
                <span className="border-b border-white/20 pb-px group-hover/link:border-white/50 transition-colors duration-200">
                  Our story
                </span>
                <ArrowRight
                  size={11}
                  className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out"
                />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
