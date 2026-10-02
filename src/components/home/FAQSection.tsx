'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { HOME_FAQS as FAQS } from '@/lib/data/faq';
import { Plus } from 'lucide-react';
import { lastModified } from '@/lib/seo/lastmod';


export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);


  return (
    <>
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Left — sticky header */}
            <AnimateIn direction="left" className="lg:col-span-1">
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
                  href="tel:+17863051844"
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
            </AnimateIn>

            {/* Right — accordion */}
            <AnimateIn delay={0.15} className="lg:col-span-2 divide-y divide-gray-100">
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
                      <span
                        className={`shrink-0 mt-0.5 block transition-transform duration-[250ms] ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                      >
                        <Plus size={16} className={isOpen ? 'text-gold' : 'text-gray-400 group-hover:text-gold transition-colors duration-200'} />
                      </span>
                    </button>

                    {/*
                      SEO/GEO: answer text is always rendered in the DOM so Googlebot
                      and AI search crawlers (ChatGPT, Perplexity, Claude) can read it
                      without executing JS. Visual collapse is handled via animated
                      max-height + opacity, not conditional render.
                    */}
                    <div
                      className="overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ maxHeight: isOpen ? 1400 : 0, opacity: isOpen ? 1 : 0 }}
                      aria-hidden={!isOpen}
                    >
                      <div className="pb-5 pr-6">
                        <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="lg:hidden pt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+17863051844"
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
            </AnimateIn>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            dateModified: lastModified('/'),
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
