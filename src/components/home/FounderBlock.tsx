'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { easeLuxury, containerVariants, wordVariants } from '@/lib/motion';

const commitments = [
  'No subcontractors — same trained crew, start to finish',
  'COI issued within 24 hours of your request',
  'Every crew briefed on your building before arrival',
  'Founder reachable by phone throughout your move',
];

export default function FounderBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />

      <div ref={ref} className="container-max relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Photo with pulse ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: easeLuxury }}
            className="relative w-20 h-20 mx-auto mb-6"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30">
              <Image
                src="/images/founder.jpg"
                alt="Eugene Romanov, Founder of EasyMove Elite"
                fill
                sizes="80px"
                className="object-cover object-[center_20%]"
              />
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/25 pointer-events-none"
              animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/10 pointer-events-none"
              animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Founder&apos;s Commitment
          </motion.p>

          {/* Quote — word reveal */}
          <motion.h2
            variants={containerVariants(0.07, 0.3)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5"
          >
            {['&ldquo;We', 'stay', 'small', 'so', 'your', 'move', 'stays', 'right.&rdquo;'].map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                {word === '&ldquo;We' ? '“We' : word === 'right.&rdquo;' ? 'right.”' : word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto"
          >
            Most moving companies grow by taking more jobs and sending whoever is available.
            We grow by doing fewer moves exceptionally well. Every client gets a coordinator.
            Every crew knows the building. Every move is one we&rsquo;re willing to put our name on.
          </motion.p>

          {/* Commitments grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-lg mx-auto mb-8">
            {commitments.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.55 + i * 0.1, ease: 'easeOut' }}
                className="flex items-start gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-gold mt-[7px] shrink-0" />
                <p className="text-white/60 text-sm leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Attribution + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          >
            <p className="text-gold/60 text-sm font-semibold mb-5">
              &mdash; Eugene Romanov, Founder &amp; Owner
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
