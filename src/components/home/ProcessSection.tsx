import Link from 'next/link';
import { ClipboardList, MessageSquare, Package, Home, ArrowRight } from 'lucide-react';

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

export default function ProcessSection() {
  return (
    <section className="section-padding bg-cream border-t border-gray-100 border-b border-gray-200">
      <div className="container-max">
        <div className="text-center mb-10 md:mb-16">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">How It Works</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
            A Move Without the Stress
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Every detail managed from first call to final placement — across Miami-Dade, Broward, and Palm Beach County.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent z-0"
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}
                <div className="relative z-10">
                  {/* Large decorative number */}
                  <div className="absolute -top-3 -left-2 font-display text-7xl font-bold text-gold/[0.07] leading-none select-none pointer-events-none">
                    {step.number}
                  </div>
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-white border border-gold/20 flex items-center justify-center shrink-0 shadow-sm group-hover:border-gold/50 group-hover:shadow-luxury transition-all duration-300">
                      <Icon className="text-gold" size={18} />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent hidden sm:block md:hidden" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/40 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
          >
            Start with a free moving estimate <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
