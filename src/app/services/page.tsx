import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import AnimateIn from '@/components/ui/AnimateIn';
import { ArrowRight, Building2, Truck, Palette, Package, MapPin, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Moving Services — EasyMove Elite South Florida',
  description:
    'Local, long-distance, high-rise, packing, and specialty moving services in Miami, Fort Lauderdale & Boca Raton. Fully insured, transparent pricing.',
  alternates: { canonical: 'https://easy-move-florida.com/services' },
  openGraph: {
    title: 'Moving Services — EasyMove Elite South Florida',
    description: 'Full-service movers in Miami-Dade, Broward & Palm Beach. Local moves from $376, long-distance nationwide.',
    url: 'https://easy-move-florida.com/services',
    images: [
      {
        url: 'https://easy-move-florida.com/images/Real/9.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional moving services in Miami, Fort Lauderdale & Boca Raton',
      },
    ],
  },
};

const SERVICES = [
  {
    icon: MapPin,
    name: 'Local Moving',
    sub: 'Miami-Dade · Broward · Palm Beach',
    description:
      'Flat hourly rate, 3-hour minimum, truck always included. No hidden fuel surcharges. We protect floors, wrap every piece of furniture, and have you settled by end of day.',
    highlights: ['$99/hr · 2-mover crew', '$139/hr · 3-mover crew', 'Truck & equipment included', 'Floor runners & furniture pads', 'Same-week availability'],
    image: '/images/Real/8.jpg',
    href: '/quote?type=local',
    cta: 'Get a FREE Local Move Quote',
  },
  {
    icon: Building2,
    name: 'High-Rise & Condo Moving',
    sub: 'Brickell · Aventura · Sunny Isles · Boca',
    description:
      "South Florida's luxury towers require more than a regular crew. We manage elevator reservations, COI submissions, loading dock coordination, and building compliance — so you don't have to.",
    highlights: ['COI issued within 24 hours', 'Elevator & dock coordination', 'Building-approved materials', 'Floor & wall protection', 'Experience in 100+ towers'],
    image: '/images/Real/9.jpg',
    href: '/quote?type=local',
    cta: 'Get a FREE High-Rise Quote',
  },
  {
    icon: Truck,
    name: 'Long-Distance & Nationwide',
    sub: 'From Miami to anywhere in the U.S.',
    description:
      "Dedicated truck, no shared loads, GPS tracking. A single coordinator manages your move from Miami pickup to final placement — wherever you're going.",
    highlights: ['Dedicated truck (no shared loads)', 'GPS-tracked transport', 'Single point of contact', 'Full inventory before loading', 'Delivery window confirmed upfront'],
    image: '/images/Long distance.png',
    href: '/quote?type=long-distance',
    cta: 'Get a FREE Long-Distance Quote',
  },
  {
    icon: Package,
    name: 'Packing & Unpacking',
    sub: 'We pack — you relax',
    description:
      'Professional packers wrap and box everything using premium materials. We label by room, protect fragile items individually, and can unpack and organize at your new home.',
    highlights: ['$79/hr · 2-packer crew', '$119/hr · 3-packer crew', 'Premium boxes & materials', 'Fragile item wrapping', 'Unpack & organize available'],
    image: '/images/Real/6.png',
    href: '/quote?type=packing-only',
    cta: 'Get a FREE Packing Quote',
  },
  {
    icon: Palette,
    name: 'Fine Art & Specialty Items',
    sub: 'Pianos · Art Collections · Wine Cellars',
    description:
      'Grand pianos, original art, wine cellars, and oversized safes require a different level of care. Custom crating, climate-controlled transport, and white-glove placement at destination.',
    highlights: ['Custom wooden crating', 'Climate-controlled options', 'White-glove installation', 'Coordinated with building', 'Quoted individually'],
    image: '/images/Real/10.png',
    href: '/quote?type=specialty',
    cta: 'Request a Specialty Quote',
  },
  {
    icon: Shield,
    name: 'Office & Commercial',
    sub: 'Minimal downtime · Professional crew',
    description:
      'Office relocations planned around your schedule — evenings, weekends, or phased moves. We handle IT equipment, workstations, filing systems, and furniture with full inventory documentation.',
    highlights: ['After-hours & weekend moves', 'IT equipment handling', 'Full inventory documentation', 'COI & building compliance', 'Quoted after site review'],
    image: '/images/Real/4.png',
    href: '/quote?type=specialty',
    cta: 'Get a FREE Office Quote',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/Real/8.jpg"
              alt="South Florida movers"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%] opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/95" />
          <AnimateIn className="relative container-max text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">What We Offer</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Moving Services<br />
              <span className="text-gold">Built for South Florida</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
              From Brickell high-rises to Boca Raton estates — local, long-distance, packing, and specialty moves
              with transparent pricing and no surprises.
            </p>
            <Link href="/quote">
              <Button variant="primary" size="lg" className="gap-2">
                Get My Free Estimate <ArrowRight size={16} />
              </Button>
            </Link>
          </AnimateIn>
        </section>

        {/* Services list */}
        <section className="section-padding bg-cream">
          <div className="container-max space-y-20">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const flip = i % 2 === 1;
              return (
                <AnimateIn key={s.name} delay={0.1}>
                  <div className={`flex flex-col ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
                    {/* Image */}
                    <div className="relative w-full lg:w-[45%] h-64 lg:h-80 overflow-hidden shrink-0">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-charcoal/15" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={15} className="text-gold" />
                        <p className="text-gold text-[11px] font-bold uppercase tracking-[0.2em]">{s.sub}</p>
                      </div>
                      <h2 className="font-display text-3xl font-bold text-charcoal mb-4">{s.name}</h2>
                      <p className="text-gray-500 leading-relaxed mb-6">{s.description}</p>
                      <ul className="space-y-2 mb-7">
                        {s.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2.5 text-sm text-charcoal">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white text-sm font-bold px-6 py-3.5 transition-colors"
                      >
                        {s.cta} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
