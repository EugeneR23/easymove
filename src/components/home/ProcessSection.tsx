'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'motion/react';
import { ClipboardList, MessageSquare, Package, Home, ArrowRight } from 'lucide-react';
import { easeLuxury, easeBounce } from '@/lib/motion';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Get an Estimate',
    description: 'Complete our online calculator or call us directly. We return a detailed, transparent quote within 2 hours — no hidden fees, no vague ranges.',
  },
  {
    icon: MessageSquare,
    number: '02',
    title: 'Your Dedicated Coordinator',
    description: 'A single point of contact handles everything — building approvals, elevator reservations, timeline, and any special requirements specific to your move.',
  },
  {
    icon: Package,
    number: '03',
    title: 'Professional Pack & Load',
    description: 'Our trained crew arrives on time with premium materials. Floors, walls, and elevator interiors are protected. Every item is wrapped, inventoried, and verified.',
  },
  {
    icon: Home,
    number: '04',
    title: 'Placed & Settled',
    description: 'We position furniture exactly where you want it, reassemble pieces, and remove every bit of packing material. You walk into a ready home.',
  },
];

function AnimatedConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <svg
      className="hidden md:block absolute top-5 left-full w-full overflow-visible pointer-events-none z-0"
      style={{ height: 1, transform: 'translateX(-50%)' }}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`goldGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.line
        x1="0" y1="0.5" x2="100" y2="0.5"
        stroke={`url(#goldGrad-${delay})`}
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function ProcessSection() {
  const headerRef = useRef(null);
  const stepsRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10% 0px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="section-padding bg-cream border-t border-gray-100 border-b border-gray-200">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            className="h-px bg-gold mx-auto mb-6"
            initial={{ width: 0 }}
            animate={headerInView ? { width: 32 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">How It Works</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
            A Move Without the Stress
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Every detail managed from first call to final placement — across Miami-Dade, Broward, and Palm Beach County.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15, ease: easeLuxury }}
                className="relative group"
              >
                {/* Animated connector */}
                {i < steps.length - 1 && (
                  <AnimatedConnector inView={stepsInView} delay={0.4 + i * 0.3} />
                )}

                <div className="relative z-10">
                  {/* Large decorative number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={stepsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2, ease: easeBounce }}
                    className="absolute -top-3 -left-2 font-display text-7xl font-bold text-gold/[0.07] leading-none select-none pointer-events-none"
                  >
                    {step.number}
                  </motion.div>

                  <div className="relative flex items-center gap-3 mb-5">
                    <motion.div
                      initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                      animate={stepsInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.3, ease: easeBounce }}
                      className="w-10 h-10 bg-white border border-gold/20 flex items-center justify-center shrink-0 shadow-sm group-hover:border-gold/50 group-hover:shadow-luxury transition-all duration-300"
                    >
                      <Icon className="text-gold" size={18} />
                    </motion.div>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent hidden sm:block md:hidden" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
          className="text-center mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/quote">
            <Button variant="primary" size="lg" className="gap-2">
              Get My Free Estimate <ArrowRight size={14} />
            </Button>
          </Link>
          <a
            href="tel:7863051844"
            className="inline-flex items-center gap-2 border border-charcoal/30 text-charcoal text-sm font-semibold px-8 py-4 hover:border-gold hover:text-gold transition-colors"
          >
            Or call 786-305-1844
          </a>
        </motion.div>
      </div>
    </section>
  );
}
