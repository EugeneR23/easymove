'use client';
import { useState } from 'react';
import { Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Valentina R.',
    city: 'Sunny Isles Beach, FL',
    initials: 'VR',
    color: '#7C6AF7',
    date: 'March 2025',
    rating: 5,
    moveType: 'High-Rise Move',
    quote: 'They handled our condo move from the 38th floor without a single issue — elevator reservations, floor protection, the COI for building management. Everything was taken care of before I had to ask. Genuinely impressive.',
  },
  {
    id: '2',
    name: 'Dr. Katherine B.',
    city: 'Coral Gables, FL',
    initials: 'KB',
    color: '#D4896A',
    date: 'January 2025',
    rating: 5,
    moveType: 'Fine Art & Specialty',
    quote: 'I have a small but valuable art collection and was very particular about how it was handled. The crew was careful, communicative, and clearly knew what they were doing. Everything arrived exactly as it left.',
  },
  {
    id: '3',
    name: 'Daniel H.',
    city: 'Boca Raton, FL',
    initials: 'DH',
    color: '#4A9E6B',
    date: 'November 2024',
    rating: 5,
    moveType: 'Long-Distance',
    quote: 'Moved from Boca up to New York. One coordinator the entire time, daily updates, and delivery exactly when they said. No surprises, no damage. I have moved seven times in my life — this was the smoothest by far.',
  },
  {
    id: '4',
    name: 'James & Sofia C.',
    city: 'Fort Lauderdale, FL',
    initials: 'JS',
    color: '#C9A84C',
    date: 'September 2024',
    rating: 5,
    moveType: 'Residential',
    quote: 'Punctual, professional, and careful with everything they touched. They wrapped every piece of furniture, protected our floors, and cleaned up completely before leaving. Exactly what you want from a moving company.',
  },
];

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex flex-col h-full">
      {/* Stars + badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-gold text-gold" />
          ))}
        </div>
        <span className="border border-gold/25 text-gold text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">
          {t.moveType}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="font-display text-base md:text-lg text-white/80 italic leading-relaxed flex-1 mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/10">
        <Avatar initials={t.initials} color={t.color} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-gray-500 text-xs mt-0.5">{t.city}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-gray-600 text-[10px]">{t.date}</p>
          <p className="text-gold/50 text-[9px] font-semibold uppercase tracking-wider mt-0.5">via Thumbtack ✓</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  // Desktop shows 2 at a time
  const desktopPairs = [
    [testimonials[0], testimonials[1]],
    [testimonials[2], testimonials[3]],
  ];
  const [pairIdx, setPairIdx] = useState(0);

  return (
    <section className="relative section-padding bg-charcoal overflow-hidden">
      <div className="absolute inset-0 grain-overlay" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative container-max">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Client Experiences</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Trusted by South Florida Residents
          </h2>
          <a
            href="https://www.google.com/search?q=EasyMove+Elite+moving+company+Miami+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white/60 text-xs group-hover:text-white transition-colors">View our Google Reviews</span>
            <ExternalLink size={10} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200" />
          </a>
        </div>

        {/* Desktop: 2-up grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {desktopPairs[pairIdx].map((t) => (
              <div key={t.id} className="border border-white/10 bg-white/[0.03] p-7">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPairIdx((i) => (i === 0 ? desktopPairs.length - 1 : i - 1))}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <ChevronLeft size={15} />
            </button>
            {desktopPairs.map((_, i) => (
              <button
                key={i}
                onClick={() => setPairIdx(i)}
                className={`h-px transition-all duration-300 ${i === pairIdx ? 'bg-gold w-8' : 'bg-white/20 w-4'}`}
              />
            ))}
            <button
              onClick={() => setPairIdx((i) => (i === desktopPairs.length - 1 ? 0 : i + 1))}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Mobile: single carousel */}
        <div className="md:hidden">
          <div className="border border-white/10 bg-white/[0.03] p-6 mb-6">
            <TestimonialCard t={testimonials[current]} />
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200">
              <ChevronLeft size={15} />
            </button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-px transition-all duration-300 ${i === current ? 'bg-gold w-8' : 'bg-white/20 w-4'}`} />
            ))}
            <button onClick={next} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
