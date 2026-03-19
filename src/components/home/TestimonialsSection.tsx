'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Valentina R.',
    city: 'Sunny Isles Beach, FL',
    rating: 5,
    moveType: 'High-Rise Move',
    quote: 'They handled our condo move from the 38th floor without a single issue — elevator reservations, floor protection, the COI for building management. Everything was taken care of before I had to ask. Genuinely impressive.',
  },
  {
    id: '2',
    name: 'Dr. Katherine B.',
    city: 'Coral Gables, FL',
    rating: 5,
    moveType: 'Fine Art & Specialty',
    quote: 'I have a small but valuable art collection and was very particular about how it was handled. The crew was careful, communicative, and clearly knew what they were doing. Everything arrived exactly as it left.',
  },
  {
    id: '3',
    name: 'Daniel H.',
    city: 'Boca Raton, FL',
    rating: 5,
    moveType: 'Long-Distance',
    quote: 'Moved from Boca up to New York. One coordinator the entire time, daily updates, and delivery exactly when they said. No surprises, no damage. I have moved seven times in my life — this was the smoothest by far.',
  },
  {
    id: '4',
    name: 'James & Sofia C.',
    city: 'Fort Lauderdale, FL',
    rating: 5,
    moveType: 'Residential',
    quote: 'Punctual, professional, and careful with everything they touched. They wrapped every piece of furniture, protected our floors, and cleaned up completely before leaving. Exactly what you want from a moving company.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section className="relative section-padding bg-charcoal overflow-hidden">
      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay" />
      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative container-max">
        <div className="text-center mb-14">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Client Experiences</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Trusted by South Florida Residents
          </h2>
          <p className="text-gray-600 mt-3 text-sm">Highly rated on Google and Thumbtack</p>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          {/* Move type badge */}
          <div className="inline-block border border-gold/30 text-gold text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1 mb-8">
            {t.moveType}
          </div>

          <div className="flex justify-center gap-1 mb-8">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
          </div>

          {/* Editorial quote mark */}
          <div className="relative">
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none text-gold/[0.09] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="relative font-display text-xl md:text-2xl text-white/85 italic leading-relaxed mb-10">
              {t.quote}
            </blockquote>
          </div>

          <div className="w-12 h-px gold-separator mx-auto mb-6" />
          <p className="text-gold font-semibold tracking-widest text-sm uppercase">{t.name}</p>
          <p className="text-gray-600 text-xs mt-1 tracking-wider">{t.city}</p>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-px transition-all duration-300 ${i === current ? 'bg-gold w-10' : 'bg-white/20 w-5'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
