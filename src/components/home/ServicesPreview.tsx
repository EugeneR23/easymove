import Link from 'next/link';
import { ArrowRight, Building2, Truck, Palette } from 'lucide-react';

const PREVIEW = [
  {
    icon: Building2,
    name: 'High-Rise & Condo Moving',
    tagline: 'Specialist crews trained for South Florida\'s luxury towers — elevator reservations, floor protection, and building compliance handled for you.',
    href: '/services/residential-moving',
    image: '/images/Local%20distance.png',
  },
  {
    icon: Truck,
    name: 'Long-Distance & Nationwide',
    tagline: 'Dedicated trucks, GPS tracking, and a single coordinator from Miami pickup to final placement — anywhere in the country.',
    href: '/services/long-distance-moving',
    image: '/images/Long%20distance.png',
  },
  {
    icon: Palette,
    name: 'Fine Art & Specialty Items',
    tagline: 'Custom crating, climate-controlled transport, and white-glove installation for art collections, grand pianos, and wine cellars.',
    href: '/services/specialty-items',
    image: '/images/Art%20wrap.png',
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative section-padding bg-cream overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-60" />
      <div className="relative container-max">
        <div className="text-center mb-10 md:mb-14">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
            Built for South Florida Living
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From Brickell high-rises to Boca estates, our services are designed around
            the specific demands of premium South Florida relocations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREVIEW.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group flex flex-col overflow-hidden bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09),_0_24px_56px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                {/* Image panel */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] group-hover:brightness-[1.04] transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Base overlay — always present, very subtle */}
                  <div className="absolute inset-0 bg-charcoal/18 group-hover:bg-charcoal/10 transition-colors duration-400" />
                  {/* Bottom gradient — always present for depth */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/55 via-charcoal/20 to-transparent" />
                  {/* Icon — floated over image */}
                  <div className="absolute bottom-4 left-5 w-9 h-9 border border-gold/40 bg-black/25 backdrop-blur-[2px] flex items-center justify-center group-hover:border-gold/80 group-hover:bg-black/35 transition-all duration-300">
                    <Icon className="text-gold" size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-[#FDFCF9]">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-3 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-[1.75] mb-7 flex-1">
                    {service.tagline}
                  </p>
                  <Link
                    href={service.href}
                    className="group/link inline-flex items-center gap-1.5 text-gold text-[11px] font-semibold uppercase tracking-[0.12em] self-start"
                  >
                    <span className="border-b border-gold/40 pb-px group-hover/link:border-gold transition-colors duration-200">
                      Learn More
                    </span>
                    <ArrowRight
                      size={12}
                      className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/40 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
          >
            View All Services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
