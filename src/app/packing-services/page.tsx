import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { Phone, Shield, CheckCircle, Package, Clock, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Packing Services Miami | Easy Move Florida' },
  description:
    'Packing services in Miami, Fort Lauderdale & Boca Raton. Full or partial pack, fragile-only, fully insured. From $237. Call 786-305-1844.',
  keywords: [
    'packing company Miami',
    'packing services Miami',
    'professional packers Miami',
    'house packers Miami',
    'packing company near me',
    'packing services South Florida',
    'packing company Fort Lauderdale',
    'professional packing services Florida',
    'moving packers Miami',
    'home packing service Miami',
  ],
  alternates: { canonical: 'https://www.easy-move-florida.com/packing-services' },
  openGraph: {
    title: 'Packing Services Miami | Easy Move Florida',
    description:
      'Packing in Miami, Fort Lauderdale & Boca Raton. Full or partial pack, fully insured. From $237.',
    url: 'https://www.easy-move-florida.com/packing-services',
  },
};

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Packing Services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'EasyMove Elite',
    telephone: '+17863051844',
    url: 'https://www.easy-move-florida.com',
    areaServed: 'Miami-Dade, Broward, Palm Beach Counties, Florida',
  },
  description:
    'Full-home and partial packing services in Miami, Fort Lauderdale, and Boca Raton. Experienced packers, quality materials, fully insured.',
  serviceType: 'Packing Service',
  areaServed: 'South Florida',
  offers: {
    '@type': 'Offer',
    price: '237',
    priceCurrency: 'USD',
    description: 'Starting from $237 for a studio (2 packers, 3-hour minimum)',
  },
});

const WHAT_WE_PACK = [
  { label: 'Kitchen & Fragile Items', desc: 'Plates, glassware, cookware, and small appliances — wrapped individually, boxed to industry standard.' },
  { label: 'Bedrooms & Closets', desc: 'Clothing, linens, and personal items packed efficiently. Wardrobes hung directly into wardrobe boxes.' },
  { label: 'Living Room & Artwork', desc: 'Electronics, décor, books, and framed artwork. Mirror boxes and picture protection on request.' },
  { label: 'Fine Art & Antiques', desc: 'Museum-grade wrapping for high-value and irreplaceable items. Custom crating available.' },
  { label: 'Office & Home Office', desc: 'Equipment, files, and electronics packed and labeled by room for easy unpacking.' },
  { label: 'Garage & Storage Areas', desc: 'Tools, sports equipment, and bulk items efficiently sorted and boxed.' },
];

const PRICING = [
  { size: 'Studio', packers: 2, hours: 3, price: 237, note: '2 packers · 3-hr min' },
  { size: '1 Bedroom', packers: 2, hours: 4, price: 316, note: '2 packers · ~4 hrs' },
  { size: '2 Bedrooms', packers: 2, hours: 6, price: 474, note: '2 packers · ~6 hrs' },
  { size: '3 Bedrooms', packers: 3, hours: 6, price: 714, note: '3 packers · ~6 hrs' },
  { size: '4+ Bedrooms', packers: 3, hours: 8, price: 952, note: '3 packers · ~8 hrs' },
];

const FAQS = [
  {
    q: 'Do you provide the packing materials?',
    a: "You can supply your own boxes, tape, and bubble wrap — or we can bring everything. If you'd like us to provide materials, we'll confirm the cost based on your home size before the appointment. Materials are quoted separately.",
  },
  {
    q: 'Can you pack only part of my home?',
    a: 'Absolutely. Many clients have us pack just the kitchen, fragile items, or artwork while they handle the rest themselves. Just let us know in your quote request.',
  },
  {
    q: 'Is packing-only available without a full move?',
    a: "Yes — packing only is a standalone service. You arrange your own truck and transport; we handle the packing. It's popular with clients moving with a freight service or doing a self-move.",
  },
  {
    q: 'How far in advance do I need to book?',
    a: 'We recommend 3–5 days in advance for most packing jobs. Same-week availability is often possible — call 786-305-1844 to confirm.',
  },
  {
    q: 'Are your packers insured?',
    a: 'Yes — all packing work is covered under our full liability policy. COI is available within 24 hours for buildings that require it.',
  },
  {
    q: 'Do you serve Fort Lauderdale and Boca Raton?',
    a: 'Yes — packing services are available throughout Miami-Dade, Broward, and Palm Beach Counties. Travel time may apply for locations outside Miami.',
  },
];

export default function PackingServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden bg-charcoal"
          style={{ backgroundImage: "url('/images/Hero.png')", backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/70 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Miami-Dade · Broward · Palm Beach
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
              Professional Packing Services in South Florida
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              We pack your home so you don&rsquo;t have to. Experienced packers, quality materials, fully insured.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/quote?type=packing-only"
                className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-gold-light transition-colors duration-200"
              >
                Get a Packing Estimate <ArrowRight size={15} />
              </Link>
              <a
                href="tel:7863051844"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-200"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust strip ───────────────────────────────────────────────────── */}
        <section className="bg-charcoal border-t border-white/5 py-7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, label: 'Fully Licensed & Insured' },
                { icon: Star, label: '4.9★ Top-Rated' },
                { icon: Clock, label: 'Same-Week Availability' },
                { icon: CheckCircle, label: '$0 Hidden Fees' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400">
                  <Icon size={14} className="text-gold shrink-0" />
                  <span className="text-xs tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Packing Only Service</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                The Hardest Part of Moving — Done for You
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Packing is time-consuming, stressful, and easy to do wrong. Broken plates, wrinkled clothes, and boxes that collapse mid-move are the result of rushed packing. Our crews pack every item methodically — the way it should be done.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our packing service is available as a standalone — you don&rsquo;t need to use us for the move itself. Many clients use us to pack and then move with a freight service, a pod, or family help.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {['Fragile-Item Specialists', 'Labeled by Room', 'COI Available', 'No Subcontractors'].map((tag) => (
                  <span key={tag} className="text-[11px] border border-gold/25 text-gold/75 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Fragile Items Handled Correctly', body: 'Every glass, plate, and delicate item is individually wrapped in packing paper or bubble wrap before boxing. We use double-walled boxes for fragile loads.' },
                { title: 'Labeled & Organized by Room', body: "Every box is labeled with room and contents. Your new home is organized from the moment the truck arrives — you won't be hunting for the coffee maker." },
                { title: 'Materials on Request', body: 'Need us to bring boxes, tape, bubble wrap, and packing paper? We can. Materials are quoted separately based on your home size — no surprises.' },
              ].map((fact) => (
                <div key={fact.title} className="p-6 bg-cream border-l-2 border-gold">
                  <h3 className="font-semibold text-charcoal mb-2">{fact.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{fact.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we pack ──────────────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Full Coverage</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">What We Pack</h2>
              <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
                We handle every room — or just the areas you need help with.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHAT_WE_PACK.map((item) => (
                <div key={item.label} className="bg-white p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Package size={16} className="text-gold shrink-0" />
                    <p className="font-semibold text-charcoal text-sm">{item.label}</p>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Transparent Pricing</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">
                Packing Service Rates
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
                $79/hr · 2 packers &nbsp;|&nbsp; $119/hr · 3 packers &nbsp;|&nbsp; 3-hour minimum. Final price confirmed in writing.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {PRICING.map((p) => (
                <div key={p.size} className="border border-gray-200 p-6 text-center hover:border-gold/40 transition-colors">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{p.size}</p>
                  <p className="font-display text-3xl font-bold text-gold mb-1">from ${p.price}</p>
                  <p className="text-gray-400 text-xs">{p.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs text-center leading-relaxed bg-cream p-4 border border-gray-100">
              Prices are preliminary estimates. Final quote is confirmed in writing before your appointment.
              Materials (boxes, tape, bubble wrap) are quoted separately if requested.
              Travel surcharge may apply for locations outside Miami.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Common Questions</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
                Packing Service FAQs
              </h2>
            </div>
            <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-charcoal mb-2">{faq.q}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
