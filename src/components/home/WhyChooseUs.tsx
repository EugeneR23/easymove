'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Clock, Package, DollarSign, ShieldCheck, Building2, Languages, MessageCircle, UserCircle2, ArrowRight } from 'lucide-react';
import { easeLuxury, containerVariants, wordVariants } from '@/lib/motion';

const reasons = [
  {
    icon: Clock,
    title: 'Punctual',
    description: 'You get a two-hour arrival window and a call 30 minutes before the crew reaches you — not "sometime in the morning."',
  },
  {
    icon: Package,
    title: 'Careful with belongings',
    description: 'Furniture pads, stretch wrap, mattress bags, basic disassembly — included in the hourly rate, not upsold on move day.',
  },
  {
    icon: DollarSign,
    title: 'Transparent pricing',
    description: 'Hourly rate locked before we start. From $129/hr for 2 movers, $179/hr for 3, with a 3-hour minimum. No fuel surcharges, no stairs fees.',
  },
  {
    icon: ShieldCheck,
    title: 'No surprise charges',
    description: 'Same hourly rate if the job runs longer than estimated. We tell you upfront if there is risk of going over.',
    href: '#pricing',
    cta: 'See pricing',
  },
  {
    icon: Building2,
    title: 'Building / HOA fluent',
    description: 'COI within 24 hours, elevator reservations, parking permits, freight elevator hours — we know what most South Florida buildings ask for.',
  },
  {
    icon: Languages,
    title: 'Russian + English',
    description: 'Crew leader or dispatcher communicates in either language. Big advantage in Sunny Isles, Aventura, and Hollywood.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp + Telegram',
    description: 'Send photos and addresses on the channel you already use. Estimate back in 5 minutes during business hours.',
  },
  {
    icon: UserCircle2,
    title: 'Owner-led',
    description: 'Evgenii Romanov runs Easy Move Florida personally. WhatsApp goes to the owner when you ask for the owner — real accountability.',
  },
];

export default function WhyChooseUs() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10% 0px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-5% 0px' });

  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="container-max">
        {/* Header */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: easeLuxury }}
            className="lg:col-span-1"
          >
            <motion.div
              className="h-px bg-gold mb-6"
              initial={{ width: 0 }}
              animate={headerInView ? { width: 32 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            />
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Why Easy Move Florida</p>
            <motion.h2
              variants={containerVariants(0.08, 0.2)}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight"
            >
              {'Why customers'.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              ))}
              <br />
              {'pick us.'.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: easeLuxury }}
            className="lg:col-span-2 flex flex-col justify-center gap-6"
          >
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Eight things that make a real difference on move day. No marketing fluff,
              no fake awards — just the operational habits we keep so you do not get
              the typical mover experience.
            </p>
            <Link
              href="/quote"
              className="group/link self-start inline-flex items-center gap-1.5 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/30 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
            >
              Calculate My Move
              <ArrowRight size={14} className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 32 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: easeLuxury }}
                className="relative bg-white p-8 group hover:bg-cream transition-all duration-300 overflow-hidden"
              >
                {/* Gold left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" />
                <div className="w-10 h-10 bg-gold/[0.07] flex items-center justify-center mb-5 group-hover:bg-gold/[0.13] group-hover:rotate-3 group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-gold" size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-3">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
                {r.href && (
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-1 text-gold text-[11px] font-semibold uppercase tracking-wider mt-4 group/card-link hover:opacity-80 transition-opacity duration-200"
                  >
                    <span className="border-b border-gold/40 pb-px">{r.cta ?? 'Learn more'}</span>
                    <ArrowRight size={11} className="translate-x-0 group-hover/card-link:translate-x-[2px] transition-transform duration-200" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
