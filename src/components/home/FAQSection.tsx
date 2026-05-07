'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Plus } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

const FAQS = [
  {
    q: "What's actually included in the hourly rate?",
    a: '2 movers (or 3) plus the truck, furniture pads, stretch wrap, and basic disassembly and reassembly. No fuel surcharge, no stairs fee, no heavy item fee unless explicitly quoted upfront for piano-style items.',
  },
  {
    q: 'What if the move runs longer than the estimate?',
    a: 'Same hourly rate continues. No panic markup. If we see risk of going over while we are working, we tell you upfront so you can decide.',
  },
  {
    q: 'COI for my building?',
    a: 'Yes. Send us the building name and management contact. We send the Certificate of Insurance naming the building as additional insured 24 hours before move-day. No charge.',
  },
  {
    q: 'Insurance for damage?',
    a: 'Standard coverage is included. Upgraded coverage is available for high-value items (art, antiques, electronics) and is disclosed upfront in the estimate.',
  },
  {
    q: 'Last-minute booking?',
    a: 'Often yes. Send us what and when via WhatsApp — we check availability and reply within 30 minutes during business hours.',
  },
  {
    q: 'Russian-speaking crew?',
    a: 'Yes. Crew leader or dispatcher communicates in Russian. If you need a fully Russian-speaking crew, ask and we confirm availability for your specific date.',
  },
  {
    q: 'Long-distance moves?',
    a: 'Custom estimate based on miles, weight, and complexity. Send origin, destination, and inventory list. Written estimate back to you within 24 hours.',
  },
  {
    q: 'Handyman work alongside the move?',
    a: 'Yes — TV mounting, furniture assembly, picture hanging, small fixes. Bundle with a move and the handyman portion is discounted. We do not do licensed plumbing or electrical.',
  },
  {
    q: 'Tip expected?',
    a: 'Optional. 15–20% is standard if you are happy with the service. Not required.',
  },
  {
    q: 'Cancellation policy?',
    a: 'Free cancellation 48+ hours ahead. Inside 48 hours, depends on already-allocated crew time — we work with you on a case-by-case basis. No deposits.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <>
      <section ref={ref} className="section-padding bg-white border-t border-gray-100">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Left — sticky header */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: easeLuxury }}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-28">
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">FAQ</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-5">
                  Common Questions
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Still have a question not answered here? Call or text us directly — a real person picks up.
                </p>
                <a
                  href="tel:7863051844"
                  className="inline-flex items-center gap-2 border border-charcoal/20 px-5 py-3 text-charcoal text-sm font-semibold hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  786-305-1844
                </a>
                <div className="mt-4">
                  <Link
                    href="/quote"
                    className="text-gold text-sm font-semibold underline-offset-2 hover:underline"
                  >
                    Or calculate my move →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right — accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: easeLuxury }}
              className="lg:col-span-2 divide-y divide-gray-100"
            >
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                    >
                      <span className={`font-semibold text-sm leading-snug transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                        {faq.q}
                      </span>
                      {/* Plus icon rotates 45° to become × */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="shrink-0 mt-0.5 block"
                      >
                        <Plus size={16} className={isOpen ? 'text-gold' : 'text-gray-400 group-hover:text-gold transition-colors duration-200'} />
                      </motion.span>
                    </button>

                    {/*
                      SEO/GEO: answer text is always rendered in the DOM so Googlebot
                      and AI search crawlers (ChatGPT, Perplexity, Claude) can read it
                      without executing JS. Visual collapse is handled via animated
                      max-height + opacity, not conditional render.
                    */}
                    <motion.div
                      initial={false}
                      animate={{
                        maxHeight: isOpen ? 600 : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{
                        maxHeight: { duration: 0.3, ease: easeLuxury },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                      <div className="pb-5 pr-6">
                        <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="lg:hidden pt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:7863051844"
                  className="flex-1 flex items-center justify-center gap-2 border border-charcoal/20 px-5 py-3 text-charcoal text-sm font-semibold hover:border-gold hover:text-gold transition-colors"
                >
                  786-305-1844
                </a>
                <Link
                  href="/quote"
                  className="flex-1 flex items-center justify-center gap-2 bg-gold text-white text-sm font-bold px-5 py-3 hover:bg-gold/90 transition-colors"
                >
                  Calculate My Move
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </>
  );
}
