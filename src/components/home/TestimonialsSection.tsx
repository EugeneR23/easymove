'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, ExternalLink, ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

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
  {
    id: '5',
    name: 'Rachel M.',
    city: 'Aventura, FL',
    initials: 'RM',
    color: '#E07B54',
    date: 'February 2025',
    rating: 5,
    moveType: 'Packing & Unpacking',
    quote: 'I hired them just for packing — best decision I made. Two packers did my entire 2-bedroom in under five hours. Every glass, every frame, every lamp was individually wrapped. When I unpacked at the new place, not a single thing was damaged.',
  },
  {
    id: '6',
    name: 'Mark S.',
    city: 'Doral, FL',
    initials: 'MS',
    color: '#5B8FBF',
    date: 'December 2024',
    rating: 5,
    moveType: 'Office Move',
    quote: 'We relocated our 12-person office over a weekend — zero downtime on Monday. The crew labeled every cable, moved server racks with care, and even reassembled all the desks. Our IT guy was amazed nothing needed reconfiguring.',
  },
  {
    id: '7',
    name: 'Camila & Diego P.',
    city: 'Hollywood, FL',
    initials: 'CP',
    color: '#9B6FB0',
    date: 'October 2024',
    rating: 5,
    moveType: 'Local Move',
    quote: 'Moved from Hollywood to Pembroke Pines with a toddler and a dog — absolute chaos on our end. The crew was calm, fast, and worked around the mess without missing a beat. Three hours, everything placed exactly where we wanted it. Worth every dollar.',
  },
  {
    id: '8',
    name: 'Andrew T.',
    city: 'Weston, FL',
    initials: 'AT',
    color: '#3D8B6E',
    date: 'August 2024',
    rating: 5,
    moveType: 'Storage & Move',
    quote: 'I needed a month of storage between selling and closing on my new house. They picked everything up, stored it, then delivered on my exact date. Nothing was dusty, nothing was damaged. Seamless from start to finish.',
  },
  {
    id: '9',
    name: 'Lisa & Robert K.',
    city: 'Brickell, FL',
    initials: 'LK',
    color: '#C2724F',
    date: 'March 2025',
    rating: 5,
    moveType: 'Same-Week Move',
    quote: "Our closing date moved up by a week and I panicked. Called EasyMove on Tuesday, they had a crew at our Brickell condo by Thursday. COI was ready overnight. I still don't know how they pulled it off that fast — but everything was perfect.",
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
      <blockquote className="font-display text-base md:text-lg text-white/80 italic leading-relaxed flex-1 mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
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

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <div className="perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="border border-white/10 bg-white/[0.03] p-7 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(201,168,76,0.12)] transition-shadow duration-300"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' });

  const desktopPairs: (typeof testimonials[0])[][] = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    const pair = [testimonials[i]];
    if (testimonials[i + 1]) pair.push(testimonials[i + 1]);
    desktopPairs.push(pair);
  }
  const [pairIdx, setPairIdx] = useState(0);

  function prevPair() {
    setDirection(-1);
    setPairIdx((i) => (i === 0 ? desktopPairs.length - 1 : i - 1));
  }
  function nextPair() {
    setDirection(1);
    setPairIdx((i) => (i === desktopPairs.length - 1 ? 0 : i + 1));
  }
  function prevSingle() {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  }
  function nextSingle() {
    setDirection(1);
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  }

  return (
    <section ref={sectionRef} className="relative section-padding bg-charcoal overflow-hidden">
      <div className="absolute inset-0 grain-overlay" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            className="h-px bg-gold mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          />
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
        </motion.div>

        {/* Desktop: 2-up grid with AnimatePresence slide */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden mb-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pairIdx}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: easeLuxury }}
                className="grid grid-cols-2 gap-6"
              >
                {desktopPairs[pairIdx].map((t) => (
                  <TiltCard key={t.id}>
                    <TestimonialCard t={t} />
                  </TiltCard>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPair}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <ChevronLeft size={15} />
            </button>
            {desktopPairs.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > pairIdx ? 1 : -1); setPairIdx(i); }}
                animate={{ width: i === pairIdx ? 32 : 16 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: 1,
                  background: i === pairIdx ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
            <button
              onClick={nextPair}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Mobile: single carousel with AnimatePresence */}
        <div className="md:hidden">
          <div className="relative overflow-hidden mb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.35, ease: easeLuxury }}
                className="border border-white/10 bg-white/[0.03] p-6"
              >
                <TestimonialCard t={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={prevSingle} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200">
              <ChevronLeft size={15} />
            </button>
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                animate={{ width: i === current ? 32 : 16 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: 1,
                  background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
            <button onClick={nextSingle} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* CTA after testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 pt-10 border-t border-white/10 text-center"
        >
          <p className="text-white/50 text-sm mb-6">
            Join 500+ South Florida families who trusted us with their move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <span className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white text-sm font-bold px-8 py-4 transition-colors">
                Get My FREE Estimate <ArrowRight size={14} />
              </span>
            </Link>
            <a
              href="tel:7863051844"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-8 py-4 hover:border-gold hover:text-gold transition-all"
            >
              <Phone size={14} />
              786-305-1844
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
