'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
import { Phone, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { localStartingPrice } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';
import { containerVariants, wordVariants, easeLuxury } from '@/lib/motion';
import type { HomeSize, CrewSize, MoveType } from '@/types';

const SIZES: { value: HomeSize; label: string; hrs: number }[] = [
  { value: 'studio', label: 'Studio', hrs: 3 },
  { value: '1br', label: '1 BR', hrs: 3 },
  { value: '2br', label: '2 BR', hrs: 4.5 },
  { value: '3br', label: '3 BR', hrs: 6 },
  { value: '4br+', label: '4+ BR', hrs: 8 },
  { value: 'office', label: 'Office', hrs: 5 },
];

const PACKING_RATE: Record<CrewSize, number> = { 2: 79, 3: 119 };

function packingPrice(size: HomeSize, crew: CrewSize): number {
  const hrs = Math.max(3, SIZES.find(s => s.value === size)?.hrs ?? 3);
  return Math.round(PACKING_RATE[crew] * hrs);
}

const PARTICLES = [
  { top: '18%', left: '8%',  size: 3, cls: 'animate-float-a' },
  { top: '62%', left: '5%',  size: 2, cls: 'animate-float-b' },
  { top: '35%', left: '48%', size: 2, cls: 'animate-float-c' },
  { top: '75%', left: '72%', size: 3, cls: 'animate-float-a' },
  { top: '22%', left: '90%', size: 2, cls: 'animate-float-b' },
  { top: '55%', left: '85%', size: 3, cls: 'animate-float-c' },
];

export default function HeroSection() {
  const [moveType, setMoveType] = useState<MoveType>('local');
  const [homeSize, setHomeSize] = useState<HomeSize | null>(null);
  const [crew, setCrew] = useState<CrewSize>(2);

  const showSizeGrid = moveType === 'local' || moveType === 'packing-only';
  const sizeData = homeSize ? SIZES.find(s => s.value === homeSize) : null;
  const price =
    homeSize && moveType === 'local'
      ? localStartingPrice(homeSize, crew)
      : homeSize && moveType === 'packing-only'
        ? packingPrice(homeSize, crew)
        : null;

  const quoteHref = `/quote${moveType ? `?type=${moveType}` : ''}${homeSize ? `&size=${homeSize}` : ''}${crew ? `&crew=${crew}` : ''}`;

  // min-h-[100dvh] (not min-h-screen) prevents iOS Safari layout jump
  // when the URL bar shows/hides. Critical for mobile hero sections.
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-charcoal">
      {/* Background */}
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src="/images/Hero.png"
          alt="EasyMove Elite crew during a residential move in South Florida"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-charcoal/35" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(28,28,30,0.35) 100%)' }}
      />
      <div className="absolute inset-0 grain-overlay z-[2]" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-separator z-[3]" />

      {/* Ambient glow orb */}
      <motion.div
        className="absolute -left-32 top-1/3 w-[560px] h-[560px] rounded-full pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute rounded-full bg-gold/30 pointer-events-none z-[2] ${p.cls}`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ── Left: Headline ─────────────────────────────────────── */}
          <div className="lg:col-span-6">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="inline-flex items-center gap-2 border border-gold/40 bg-black/20 backdrop-blur-[2px] px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shrink-0" />
              <span className="text-gold text-xs font-semibold tracking-[0.08em] sm:tracking-[0.2em] uppercase">
                Miami · Fort Lauderdale · Boca Raton
              </span>
            </motion.div>

            {/* Word-by-word headline reveal */}
            <motion.h1
              variants={containerVariants(0.09, 0.3)}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mb-5 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
            >
              {'South Florida Moving'.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              ))}
              <br />
              <span className="gold-text">
                {'You Can Count On'.split(' ').map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: easeLuxury }}
              className="text-gray-300 text-base lg:text-lg max-w-lg mb-8 leading-relaxed"
            >
              500+ completed moves. Licensed &amp; insured. No hidden fees —
              just a crew that shows up on time and handles your home with care.
            </motion.p>

            {/* Key selling points */}
            <div className="space-y-2.5 mb-8 hidden lg:block">
              {[
                'Transparent pricing — see your cost before you call',
                'Founder-led crew, no subcontractors',
                'COI issued within 24 hours',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 1.0 + i * 0.1, ease: 'easeOut' }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle size={14} className="text-gold shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Phone + availability — desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.35, ease: 'easeOut' }}
              className="hidden lg:flex items-center gap-5"
            >
              <a
                href="tel:+17863051844"
                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-gold transition-colors"
              >
                <Phone size={15} className="text-gold" />
                786-305-1844
              </a>
              <span className="text-white/20">|</span>
              <p className="text-white/40 text-xs">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 align-middle animate-pulse" />
                Responds within 2 hours
              </p>
            </motion.div>
          </div>

          {/* ── Right: Calculator Card ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: easeLuxury, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="bg-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] w-full overflow-hidden">

              {/* Card header — dark with rates */}
              <div className="bg-charcoal px-5 sm:px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-display text-base font-bold">Instant Price Calculator</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-gold text-gold" />)}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                  <span><span className="text-gold font-semibold">$99</span>/hr · 2 movers</span>
                  <span className="text-white/20">|</span>
                  <span><span className="text-gold font-semibold">$139</span>/hr · 3 movers</span>
                  <span className="text-white/20">|</span>
                  <span>3-hr min</span>
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 sm:px-6 py-5">

                {/* Move type */}
                <p className="text-charcoal text-[11px] font-semibold uppercase tracking-wider mb-2">Type of move</p>
                <div className="grid grid-cols-4 gap-1.5 mb-5">
                  {([
                    { v: 'local' as MoveType, l: 'Local' },
                    { v: 'long-distance' as MoveType, l: 'Long Dist.' },
                    { v: 'packing-only' as MoveType, l: 'Packing' },
                    { v: 'specialty' as MoveType, l: 'Specialty' },
                  ]).map(t => (
                    <button
                      key={t.v}
                      onClick={() => { setMoveType(t.v); setHomeSize(null); }}
                      className={`py-2 px-1 text-[11px] font-semibold border transition-all duration-150 text-center ${
                        moveType === t.v
                          ? 'border-gold bg-gold text-white'
                          : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'
                      }`}
                    >
                      {t.l}
                    </button>
                  ))}
                </div>

                {/* Home size grid */}
                {showSizeGrid && (
                  <>
                    <p className="text-charcoal text-[11px] font-semibold uppercase tracking-wider mb-2">Home size</p>
                    <div className="grid grid-cols-3 gap-1.5 mb-5">
                      {SIZES.map(s => {
                        const sizePrice = moveType === 'local'
                          ? localStartingPrice(s.value, crew)
                          : packingPrice(s.value, crew);
                        return (
                          <button
                            key={s.value}
                            onClick={() => setHomeSize(s.value)}
                            className={`py-2.5 px-2 text-center border transition-all duration-150 ${
                              homeSize === s.value
                                ? 'border-gold bg-gold text-white'
                                : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'
                            }`}
                          >
                            <span className={`block text-xs font-bold ${homeSize === s.value ? 'text-white' : 'text-charcoal'}`}>
                              {s.label}
                            </span>
                            <span className={`block text-[10px] mt-0.5 ${homeSize === s.value ? 'text-white/80' : 'text-gray-400'}`}>
                              from {formatCurrency(sizePrice)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Crew toggle */}
                {homeSize && showSizeGrid && (
                  <div className="grid grid-cols-2 gap-1.5 mb-5">
                    {([2, 3] as CrewSize[]).map(c => {
                      const isActive = crew === c;
                      const crewPrice = moveType === 'local'
                        ? localStartingPrice(homeSize, c)
                        : packingPrice(homeSize, c);
                      return (
                        <button
                          key={c}
                          onClick={() => setCrew(c)}
                          className={`py-3 text-center border transition-all duration-150 ${
                            isActive
                              ? 'border-gold bg-gold/10'
                              : 'border-gray-200 hover:border-gold/40'
                          }`}
                        >
                          <span className="block text-xs font-bold text-charcoal">
                            {c} {moveType === 'packing-only' ? 'Packers' : 'Movers'}
                          </span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">
                            ${moveType === 'packing-only' ? (c === 2 ? 79 : 119) : (c === 2 ? 99 : 139)}/hr · {formatCurrency(crewPrice)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Price reveal */}
                {price !== null && (
                  <div className="bg-charcoal p-5 text-center mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 grain-overlay opacity-50" />
                    <div className="relative">
                      <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">Your starting price</p>
                      <p className="font-display text-4xl font-bold text-white mb-1">{formatCurrency(price)}</p>
                      <p className="text-gray-400 text-xs">
                        {sizeData?.hrs} hrs · {crew} {moveType === 'packing-only' ? 'packers' : 'movers'}
                        {moveType === 'local' ? ' · truck included' : ''}
                      </p>
                    </div>
                  </div>
                )}

                {/* Specialty / Long-distance message */}
                {(moveType === 'specialty' || moveType === 'long-distance') && (
                  <div className="bg-cream p-5 text-center mb-5">
                    <p className="font-display text-lg font-bold text-charcoal mb-1">Custom Quote</p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {moveType === 'specialty'
                        ? 'Every specialty move is unique — a coordinator will provide your estimate.'
                        : 'Long-distance pricing depends on distance and volume. Get a free quote below.'}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <Link href={quoteHref} className="block">
                  <Button variant="primary" size="lg" className="w-full gap-2 shadow-[0_0_24px_rgba(201,168,76,0.3)]">
                    Get My FREE Estimate <ArrowRight size={15} />
                  </Button>
                </Link>

                {/* Microcopy */}
                <div className="flex items-center justify-center gap-3 mt-3 text-gray-400 text-[10px]">
                  <span>No obligation</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                  <span>Fast response</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                  <span>Fully insured</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Trust badges — mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 lg:hidden"
        >
          <div className="flex items-center gap-2 text-white/60">
            <Shield size={13} className="text-gold shrink-0" />
            <span className="text-[11px] tracking-wider uppercase">Licensed &amp; Insured</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-gold text-gold" />)}
            <span className="text-[11px] tracking-wider uppercase ml-1">Top-rated</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <span className="text-[11px] tracking-wider uppercase">Founder-Led</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
