'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Plus } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';

const FAQS = [
  {
    q: "What's actually included in the hourly rate at Easy Move Florida?",
    a: 'Every hourly booking includes two or three movers for the full duration of the job, a box truck with fuel and tolls covered, furniture pads to blanket-wrap dressers and sofas, stretch wrap for upholstered pieces, and basic disassembly and reassembly of standard items like bed frames, dining tables, and sectional sofas. There is no fuel surcharge, no stairs fee, and no heavy-item fee — unless a specialty item like a grand piano or marble slab was explicitly discussed before booking, in which case it is quoted in writing upfront. Many Miami moving companies routinely add these fees on move day; our policy is that the hourly rate you see on the pricing page is the rate that appears on the invoice. For a typical 2-bedroom apartment in Brickell or Aventura, most customers pay between $671 and $864 total with a two-person crew.',
  },
  {
    q: 'What if the move runs longer than the estimate?',
    a: 'The same hourly rate continues — there is no panic markup, no surge pricing, no penalty for going over the written estimate. Estimates are calibrated from the inventory and building details you share before move day, but real homes have surprises: an extra closet of boxes, a building with a single freight elevator that needs to be shared, a piece of furniture that has to be partially disassembled to clear a door frame. When our crew leader sees risk of going over the estimate while the job is in progress, you are told immediately, given the current hour count, and asked whether to keep going or to pause and reschedule the remainder. We bill in 15-minute increments after the 3-hour minimum, not full-hour rounding, so the final invoice reflects actual time worked. Most jobs in South Florida finish within 30 minutes of the original estimate.',
  },
  {
    q: 'Do you issue a COI (Certificate of Insurance) for my condo or high-rise building?',
    a: 'Yes — a Certificate of Insurance is a one-page document proving the moving company carries general liability and cargo insurance, and most Miami condominiums, Aventura towers, Sunny Isles beachfront buildings, and high-rises in Brickell or Fort Lauderdale require one before allowing a moving crew into the building. The management office needs to confirm the mover is insured and lists the building as an additional insured party, protecting the HOA if a mover damages a lobby, elevator, or common area. Without a valid COI, buildings will refuse elevator access or turn the crew away at the loading dock. Easy Move Florida issues COIs within 24 hours of booking confirmation at no additional cost. To request one, send the building name, management company name, and any specific insurance minimums the building requires. The certificate is emailed directly to building management and to you before move day.',
  },
  {
    q: 'What insurance coverage applies if something gets damaged during the move?',
    a: 'Standard cargo and general liability coverage is included with every Easy Move Florida booking at no additional cost — this covers accidental damage to furniture and household goods during loading, transport, and unloading, plus damage to the building itself such as scratched walls, damaged door frames, or scuffed elevator interiors. For high-value items like fine art, antiques, electronics, designer furniture, or musical instruments, upgraded valuation coverage is available and is always disclosed in the written estimate before the move. The upgraded coverage is priced based on declared replacement value, not the standard per-pound federal default that most national van lines use. Damage claims are handled directly by our team and resolved within 14 business days, not routed through a third-party claims processor. We carry both general liability and cargo insurance year-round; COI proof is available on request from any client.',
  },
  {
    q: 'Can you handle a last-minute or same-week move?',
    a: 'Often yes — same-week availability is one of the practical advantages of running an owner-led local moving company instead of a national franchise with a centralized dispatch queue. Easy Move Florida holds back roughly 15–20% of weekly crew capacity for short-notice bookings, especially for clients with building elevator slots that opened up unexpectedly or for relocations driven by job starts, lease changes, or closing dates that moved. To check availability, send the move date, the origin and destination addresses, an approximate inventory (number of bedrooms, any specialty items), and any building requirements such as COI deadlines or elevator reservation windows via WhatsApp at +1 786-305-1844. The dispatcher replies within 30 minutes during business hours (Monday through Saturday, 8 AM to 7 PM EST) with a written quote and a confirmed crew assignment.',
  },
  {
    q: 'Is the moving crew Russian-speaking?',
    a: 'Yes — the founder, the dispatch coordinator, and most of the crew at Easy Move Florida speak Russian fluently, which makes the company a practical choice for the Russian-speaking communities concentrated in Sunny Isles Beach, Aventura, Hallandale Beach, Hollywood, North Miami Beach, and parts of Miami Beach. Quotes can be issued in Russian or English, the on-site walkthrough on move day can be conducted in Russian, and any sensitive logistics conversations — about pricing, valuation, or building access — can be handled in whichever language the client prefers. The website is published in both English and Russian (`/ru/`). For clients who specifically need a fully Russian-speaking crew rather than just a Russian-speaking crew leader, ask when booking and the dispatcher will confirm availability for the requested date; this is usually available with 5+ days of notice.',
  },
  {
    q: 'How does Easy Move Florida price long-distance and out-of-state moves?',
    a: 'Long-distance moves from South Florida are priced as a flat-rate dedicated-truck service, not as an hourly local move and not as a shared-load brokerage arrangement. Pricing depends on three inputs: total mileage from origin to destination, the weight or cubic feet of the household inventory, and complexity factors like stair carries, long carries from the truck to the door, packing services, and any specialty items requiring custom crating. To get a written long-distance estimate, send the origin and destination addresses, a room-by-room inventory list (or photos of each room), the target move date window, and any building access constraints at either end. A written estimate is returned within 24 hours. Long-distance pricing starts at $1,200 for small moves on a dedicated truck — your belongings are not consolidated with anyone else’s shipment.',
  },
  {
    q: 'Can you do small handyman work alongside the move?',
    a: 'Yes — Easy Move Florida bundles small handyman services with moves so you do not have to coordinate a second visit after the truck leaves. Common requests include TV mounting (single or multi-screen, including soundbar wiring), wall-anchor picture and mirror hanging, IKEA or Wayfair furniture assembly, curtain rod installation, floating shelf installation, baby gates, and minor furniture repairs from transit. When handyman work is bundled with a same-day move, the handyman portion is discounted versus standalone pricing and is billed in the same continuous hourly window, not as a separate trip. Easy Move Florida does NOT perform licensed plumbing or electrical work, gas line installation, HVAC, or anything requiring a permit pull — for those, we refer to vetted local licensed trades. Mention any handyman needs at quote time so the right tools and anchors are loaded on the truck.',
  },
  {
    q: 'Is a tip expected for the moving crew?',
    a: 'Tips are optional and never expected as a condition of service — the hourly rate is already structured to pay the crew a competitive South Florida wage without relying on customer gratuities. If you choose to tip, the local standard for a residential move that went well is 15–20% of the labor portion of the bill, divided across the crew. For an average $700 two-bedroom move, that works out to roughly $50–$70 per mover for a typical two-to-three person crew. Tips can be added to the credit card charge at the end of the job, paid in cash directly to the crew, or sent via Zelle to the crew leader after the move; the company does not take any cut of crew tips. If the move had problems, withholding a tip is an appropriate signal — and the company asks that you also call the founder directly at +1 786-305-1844 so the issue can be addressed.',
  },
  {
    q: "What's the cancellation and rescheduling policy?",
    a: 'Cancellations made more than 48 hours before the scheduled move start time are always free of charge and Easy Move Florida does not require any deposit at booking — this is deliberate, since deposit-required policies are one of the most common red flags for moving company scams in South Florida. Reschedules made more than 48 hours ahead are also free and applied to the next mutually available date, including peak-season Saturdays subject to crew availability. For cancellations or reschedules made inside the 48-hour window, the situation is handled case-by-case based on how much crew time has already been allocated and whether the slot can be backfilled with another booking — a partial fee may apply if the crew was already committed and another job had to be declined. Same-day cancellations after the crew has been dispatched are billed at the 3-hour minimum.',
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
