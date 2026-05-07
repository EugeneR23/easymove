'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Truck, Package, Wrench, Hammer, X, ArrowRight } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

const COLUMNS = [
  {
    icon: Truck,
    title: 'Moving',
    items: [
      'Apartment moves (studio – 4BR)',
      'House moves',
      'Office relocations (under 20 people)',
      'Storage unit loading / unloading',
      'Single heavy items (piano, marble, safes) by quote',
      'Long-distance — custom estimate',
    ],
  },
  {
    icon: Package,
    title: 'Packing',
    items: [
      'Full-pack service',
      'Partial pack (kitchen, fragiles, art)',
      'Boxes + materials supplied',
      'Unpack service at destination',
    ],
  },
  {
    icon: Wrench,
    title: 'Furniture handling',
    items: [
      'Disassembly (beds, IKEA, sectionals)',
      'Reassembly at destination',
      'Heavy item handling (case-by-case quote)',
    ],
  },
  {
    icon: Hammer,
    title: 'Small handyman',
    items: [
      'TV mounting',
      'Picture / mirror hanging',
      'Furniture assembly (IKEA, West Elm, Wayfair)',
      'Curtain rod installation',
      'Shelving installation',
      'Small fixes (loose hinges, drawer slides, cabinet pulls)',
    ],
  },
];

const NOT_DOING = [
  'Plumbing requiring license',
  'Electrical requiring license',
  'Major renovations',
  'Roofing',
  'HVAC',
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section ref={ref} className="section-padding bg-cream border-t border-gray-100">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Services</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
            What we move. <span className="gold-text">What we don&rsquo;t.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Local moving plus a focused list of small handyman jobs. Bundle a move with handyman work and the handyman portion gets a discount.
          </p>
        </motion.div>

        {/* What we do */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {COLUMNS.map((col, i) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeLuxury }}
                className="bg-white p-7"
              >
                <div className="w-10 h-10 bg-gold/[0.07] flex items-center justify-center mb-4">
                  <Icon className="text-gold" size={18} />
                </div>
                <h3 className="font-display text-base font-semibold text-charcoal mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-500 text-sm leading-snug">
                      <span className="w-1 h-1 rounded-full bg-gold mt-[7px] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* What we don't */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: easeLuxury }}
          className="mt-8 bg-charcoal text-white p-7 md:p-9"
        >
          <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Not our scope</p>
          <h3 className="font-display text-xl md:text-2xl font-bold mb-4">
            We do not do licensed trades.
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 mb-5">
            {NOT_DOING.map((item) => (
              <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                <X size={14} className="text-gold shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/50 text-sm leading-relaxed">
            Need licensed trades? Not our scope — happy to refer you to licensed pros we trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/40 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
          >
            Full services list <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
