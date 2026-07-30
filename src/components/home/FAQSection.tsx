'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Plus } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

const FAQS = [
  {
    q: 'How much does a local move cost with Easy Move Florida?',
    a: 'A crew of two movers is $129/hour and a crew of three is $179/hour, with a three-hour minimum, plus a flat $129 per day for the truck. Fuel, tolls and mileage are inside that $129 — there is no separate fuel surcharge. The smallest possible invoice is therefore $516: three hours with two movers plus the truck. A typical 1-bedroom runs $516–$774 all-in, a 2-bedroom $645–$1,203, and a 3-bedroom $1,203–$1,561. The rate is the same seven days a week, year-round: it does not go up for weekends or peak season.',
  },
  {
    q: 'What is included in the hourly rate, and what is billed separately?',
    a: 'The hourly rate covers your crew, furniture pads, stretch wrap and mattress bags on loan, dollies and straps, and basic disassembly and reassembly of standard items like bed frames, dining tables and sectional sofas. Billed as their own lines on the estimate: the truck at $129 per day, packing materials you keep (boxes, TV cartons, corner protectors, mattress bags left in storage) as flat packages rather than per-item markups, specialty items such as a piano, safe or marble slab, and upgraded valuation coverage if you want it. Loaner pads and wrap return with the truck at no charge; anything left permanently in storage is billed.',
  },
  {
    q: 'Do stairs, elevators or a long carry cost extra?',
    a: 'No. There is no stairs fee, no heavy item fee, no elevator fee and no long carry fee. On an hourly job those things cost time, not extra fees, so they are priced into the hours we estimate. Tell us about stairs, long carries and freight elevator rules up front and the estimate will be accurate. If we find out on move day the hours go up, but the rate and the fee structure never change.',
  },
  {
    q: 'What happens if the job runs longer than the estimate?',
    a: 'The same hourly rate continues and you pay for the hours actually worked — no surge pricing, no penalty for going past the estimate. We bill in 15-minute increments after the three-hour minimum, so finishing early makes the invoice smaller rather than rounding up to the next hour. If the crew leader sees the job heading past the estimate, you are told at that moment with the current hour count so you can decide whether to continue. And if something turns up that is not on the estimate at all — a garage nobody mentioned, an extra room, a piece that needs crating — work pauses until you approve the revised number.',
  },
  {
    q: 'What is a COI and why does my building need one?',
    a: 'A Certificate of Insurance is a one-page document proving the moving company carries insurance and naming your building as an additional insured party, which protects the HOA if a mover damages a lobby, elevator or common area. Most condominiums in Miami, Aventura, Sunny Isles Beach, Brickell and Fort Lauderdale will refuse elevator access or turn a crew away at the dock without one. We issue COIs within 24 hours of booking at no charge — send the building name, the management company and any coverage minimums they specify, and the certificate goes straight to management with a copy to you.',
  },
  {
    q: 'How do freight elevator reservations work?',
    a: 'Your building assigns a fixed window — commonly two to four hours on a weekday — and only one move can use the elevator in that window, so it books out first at the end and beginning of each month. We call your management office once the date is set, reserve the window, and schedule the crew to arrive before it opens so the clock starts on loading rather than on waiting. Buildings that require elevator padding or floor protection tell us at reservation time and we bring it. If your building only allows moves on weekdays, tell us early: those slots are the constraint, not our availability.',
  },
  {
    q: 'How is a move into or out of storage handled?',
    a: 'It is billed the same way as any other hourly move, with the storage facility as one of the addresses. Two things are worth knowing before you book. First, drive time between your home, the facility and the destination is on the clock, so a move that goes home-to-storage-to-home costs more hours than a direct move. Second, anything left permanently in the unit is billed rather than loaned: pads or blankets that stay wrapped around your furniture in storage are charged, because they do not come back on the truck. If you want your goods padded in storage, say so and we will put the materials on the estimate up front.',
  },
  {
    // [TODO: Evgenii — confirm insurance carrier, coverage limits and claim
    // turnaround, then state them here. Do not publish specifics until verified.]
    q: 'How does valuation coverage work if something is damaged?',
    a: 'Every move carries our standard liability terms at no extra cost, and for high-value pieces — fine art, antiques, designer furniture, instruments, electronics — you can add upgraded valuation coverage priced on the declared replacement value and quoted in writing before the move, rather than the per-pound federal default most national van lines apply. Damage claims come directly to the owner, not to a third-party claims processor: call 786-305-1844 and you are talking to the person who can settle it.',
  },
  {
    q: 'Can you handle a last-minute or same-week move?',
    a: 'Often yes — being owner-run rather than a franchise with a central dispatch queue means short-notice jobs get answered directly. Send the move date, both addresses, an approximate inventory (bedrooms, any specialty items) and any building requirements such as COI deadlines or elevator windows to WhatsApp at +1 786-305-1844. We reply during business hours, Monday through Saturday, 8 AM to 7 PM EST, with a written quote and a confirmed crew.',
  },
  {
    q: 'Is the moving crew Russian-speaking?',
    a: 'Yes — the founder, the dispatch coordinator, and most of the crew at Easy Move Florida speak Russian fluently, which makes the company a practical choice for the Russian-speaking communities concentrated in Sunny Isles Beach, Aventura, Hallandale Beach, Hollywood, North Miami Beach, and parts of Miami Beach. Quotes can be issued in Russian or English, the on-site walkthrough on move day can be conducted in Russian, and any sensitive logistics conversations — about pricing, valuation, or building access — can be handled in whichever language the client prefers. The website is published in both English and Russian (`/ru/`). For clients who specifically need a fully Russian-speaking crew rather than just a Russian-speaking crew leader, ask when booking and the dispatcher will confirm availability for the requested date; this is usually available with 5+ days of notice.',
  },
  {
    q: 'How does Easy Move Florida price long-distance and out-of-state moves?',
    a: 'Long-distance is a flat rate per job starting at $1,500, with a custom written estimate back to you within 24 hours and no deposit required to book. It is not billed hourly and it is not a shared-load brokerage arrangement — you get a dedicated truck. The number depends on three inputs: total mileage, the volume of the household inventory, and complexity at both ends (stair carries, long carries, packing, anything needing custom crating). To get the estimate, send both addresses, a room-by-room inventory or photos of each room, your date window, and any building access constraints.',
  },
  {
    q: 'Can you do small handyman work alongside the move?',
    a: 'Yes — Easy Move Florida bundles small handyman services with moves so you do not have to coordinate a second visit after the truck leaves. Common requests include TV mounting (single or multi-screen, including soundbar wiring), wall-anchor picture and mirror hanging, IKEA or Wayfair furniture assembly, curtain rod installation, floating shelf installation, baby gates, and minor furniture repairs from transit. When handyman work is bundled with a same-day move, the handyman portion is discounted versus standalone pricing and is billed in the same continuous hourly window, not as a separate trip. Easy Move Florida does NOT perform licensed plumbing or electrical work, gas line installation, HVAC, or anything requiring a permit pull — for those, we refer to vetted local licensed trades. Mention any handyman needs at quote time so the right tools and anchors are loaded on the truck.',
  },
  {
    q: 'Is a tip expected for the moving crew?',
    a: 'No — tips are optional and never a condition of service, because the hourly rate already pays the crew a competitive South Florida wage. If you do tip, the local standard for a move that went well is 15–20% of the labour portion split across the crew: on a $900 two-bedroom move that is roughly $45–$60 per mover on a three-person crew. Tips can go on the card at the end of the job, in cash to the crew, or by Zelle to the crew leader; the company takes no cut. If the move had problems, skipping the tip is fair signal — and call the owner directly at +1 786-305-1844 so it gets fixed.',
  },
  {
    q: "What's the cancellation and rescheduling policy?",
    a: 'Free — cancel or reschedule at no charge any time more than 48 hours before the start time, and there is no deposit to book in the first place (deposit-required policies are one of the most common red flags among South Florida movers). A reschedule moves to the next date that works for both of us. Inside 48 hours we handle it case by case depending on whether the slot can be filled; if the crew has already been dispatched to your address, the three-hour minimum applies.',
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
                        maxHeight: isOpen ? 1400 : 0,
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
