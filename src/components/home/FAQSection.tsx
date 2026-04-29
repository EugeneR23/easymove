'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

const FAQS = [
  {
    q: 'How much does a local move cost in South Florida?',
    a: "Local moves are billed hourly. Our rate is $99/hr for a 2-mover crew or $139/hr for 3 movers, with a 3-hour minimum. Truck fee starts at $79 and varies by distance. A studio typically runs $376–$496; a 2-bedroom $525–$705 depending on access and distance. You'll see your exact estimate before booking.",
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve all of Miami-Dade, Broward, and Palm Beach Counties — including Miami, Coral Gables, Brickell, Coconut Grove, Aventura, Sunny Isles Beach, Hollywood, Fort Lauderdale, Pompano Beach, Boca Raton, Delray Beach, Boynton Beach, and West Palm Beach. We also handle long-distance moves nationwide.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. EasyMove Elite is fully licensed and insured for every move we take on. We carry general liability and cargo insurance. A Certificate of Insurance (COI) naming your building or HOA is available on request — typically issued within 24 hours.',
  },
  {
    q: 'Do you provide a COI for my condo building?',
    a: 'Absolutely. Most South Florida condo buildings require a COI before allowing any moving company to operate in the building. We issue COIs within 24 hours of your request, with the building named as additional insured. Just let your coordinator know the building requirements.',
  },
  {
    q: 'How far in advance do I need to book?',
    a: "We recommend booking 5–10 days in advance for weekend moves, and 2–5 days for weekday moves. That said, we often have same-week availability — call or get a quote online and we'll let you know what's open. Last-minute moves are handled when scheduling allows.",
  },
  {
    q: 'What if something gets damaged during my move?',
    a: 'We handle everything with care — every item is wrapped, padded, and secured. In the rare event of damage, we are fully insured and will make it right. Our coordinator documents the move and is reachable throughout the entire process. We have completed 500+ moves with an exceptional damage-free record.',
  },
  {
    q: 'Do you disassemble and reassemble furniture?',
    a: "Yes. Basic disassembly and reassembly (bed frames, desks, dining tables) is included at no extra charge. For complex items — murphy beds, modular wall units, heavy safes — we'll note it in your estimate. You won't have a truck full of parts and no help putting things back together.",
  },
  {
    q: 'What is your cancellation policy?',
    a: "We understand plans change. Cancellations made more than 48 hours before your scheduled move are always free. Last-minute cancellations are handled case by case — just call us and we'll work something out. We don't charge deposits, so there's nothing at risk when you get a quote.",
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
                    Or get a FREE estimate →
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

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: easeLuxury },
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pr-6">
                            <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                  Get a FREE Estimate
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
