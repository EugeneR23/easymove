import Link from 'next/link';
import { Shield, Building2, Clock, FileText, Package, Headphones, ArrowRight } from 'lucide-react';

const reasons = [
  {
    icon: Building2,
    title: 'High-Rise Expertise',
    description: 'We manage elevator reservations, COI submissions, loading dock coordination, and floor/wall protection — everything your condo association requires.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & Insured',
    description: 'Fully insured for every move we take on. Certificate of Insurance available on request — standard for condo and HOA buildings across South Florida.',
  },
  {
    icon: Clock,
    title: 'Defined Arrival Windows',
    description: 'We give you a two-hour arrival window and call 30 minutes before we arrive. No all-day waiting. No vague "sometime in the morning."',
  },
  {
    icon: Package,
    title: 'White-Glove Protection',
    description: 'Premium furniture blankets, floor runners, door jamb covers, and elevator pads used on every move. Your space leaves exactly as we found it.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Coordinator',
    description: 'One person, one number. Your coordinator manages every detail from first contact through delivery — no call centers, no handoffs.',
  },
  {
    icon: FileText,
    title: 'Transparent Pricing',
    description: 'Detailed written estimates before any work begins. No surprise fees, no "fuel surcharges" discovered on moving day. What we quote is what you pay.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="container-max">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-1">
            <div className="w-8 h-px bg-gold mb-6" />
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Why EasyMove Elite</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              The Standard<br />Others Aspire To
            </h2>
          </div>
          <div className="lg:col-span-2 flex flex-col justify-center gap-6">
            <p className="text-gray-500 text-lg leading-relaxed">
              South Florida&rsquo;s luxury real estate market demands a moving company that understands
              building requirements, values discretion, and delivers without drama. That is what we do — every move, every time.
            </p>
            <Link
              href="/quote"
              className="group/link self-start inline-flex items-center gap-1.5 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/30 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
            >
              Check Starting Price
              <ArrowRight size={14} className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="relative bg-white p-8 group hover:bg-cream transition-all duration-300 overflow-hidden"
              >
                {/* Gold left accent — slides in on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" />
                <div className="w-10 h-10 bg-gold/[0.07] flex items-center justify-center mb-5 group-hover:bg-gold/[0.13] transition-colors duration-300">
                  <Icon className="text-gold" size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-3">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
