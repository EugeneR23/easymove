import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';
import { Phone, Shield, Award, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import type { CityData } from '@/lib/data/cities';

const SERVICES = [
  { href: '/services/residential-moving',  label: 'High-Rise & Residential', desc: 'Condos, apartments, and homes of every size.' },
  { href: '/services/long-distance-moving', label: 'Long-Distance',           desc: 'Interstate moves with full coordination.' },
  { href: '/services/office-commercial',   label: 'Office & Commercial',     desc: 'Minimal downtime, maximum precision.' },
  { href: '/services/specialty-items',     label: 'Fine Art & Specialty',    desc: 'Museum-grade handling for high-value items.' },
  { href: '/services/storage-solutions',   label: 'Premium Storage',         desc: 'Short-term and monthly storage options.' },
  { href: '/services/international-moving', label: 'International',          desc: 'Customs coordination and overseas shipping.' },
];

const TRUST = [
  { icon: Shield, label: 'Fully Licensed & Insured' },
  { icon: Award,  label: 'Founder-Led — No Subcontractors' },
  { icon: CheckCircle, label: 'COI Issued Within 24 Hours' },
  { icon: MapPin, label: 'South Florida Team' },
];

interface Props {
  city: CityData;
}

export default function CityMoversPage({ city }: Props) {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'EasyMove Elite',
    description: city.metaDescription,
    url: `https://easy-move-florida.com/${city.slug}`,
    telephone: '+17863051844',
    email: 'romanov@easy-move-florida.com',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${city.name}, ${city.state}`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2130 Stirling Rd',
      addressLocality: 'Hollywood',
      addressRegion: 'FL',
      postalCode: '33020',
      addressCountry: 'US',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Sa 08:00-19:00',
  });

  const faqSchemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden bg-charcoal">
          <Image
            src={city.heroImage}
            alt={`Professional movers in ${city.name}, ${city.state} — EasyMove Elite`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/70 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {city.county} County · {city.state}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
              {city.heroHeadline}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">{city.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="gap-2">
                  Get a FREE Estimate <ArrowRight size={15} />
                </Button>
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/70 transition-colors duration-200"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust strip ───────────────────────────────────────────────── */}
        <section className="relative bg-charcoal py-6">
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400">
                  <Icon size={14} className="text-gold shrink-0" />
                  <span className="text-xs tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro + local facts ───────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Local Expertise
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                We Know {city.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{city.intro}</p>
              <p className="text-gray-600 leading-relaxed">
                Every move is assigned a dedicated coordinator. The crew arrives briefed on your
                building, your timeline, and everything that needs protecting — before a single
                box is loaded.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {['Founder-Led', 'COI Available', 'No Subcontractors', 'Direct: 786-305-1844'].map((tag) => (
                  <span key={tag} className="text-[11px] border border-gold/25 text-gold/75 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {city.localFacts.map((fact) => (
                <div key={fact.title} className="p-6 bg-cream border-l-2 border-gold">
                  <h3 className="font-semibold text-charcoal mb-2">{fact.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{fact.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">
                Moving Services in {city.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-start gap-4 bg-white p-6 border border-gray-100 hover:border-gold/40 hover:shadow-card transition-all duration-200"
                >
                  <div className="w-1 h-1 rounded-full bg-gold mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <p className="font-semibold text-charcoal text-sm mb-1 group-hover:text-gold transition-colors">{s.label}</p>
                    <p className="text-gray-400 text-xs leading-snug">{s.desc}</p>
                  </div>
                  <ArrowRight size={13} className="text-gold/0 group-hover:text-gold/60 ml-auto shrink-0 mt-0.5 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Neighborhoods ─────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl mx-auto text-center">
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Service Area</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Neighborhoods We Serve in {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {city.neighborhoods.map((n) => (
                <span key={n} className="text-sm border border-gray-200 text-gray-500 px-4 py-2 hover:border-gold/30 hover:text-charcoal transition-colors duration-150">
                  {n}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Don&rsquo;t see your neighborhood?{' '}
              <a href="tel:+17863051844" className="text-gold hover:underline">Call us</a>
              {' '}— we likely cover your area.
            </p>
          </div>
        </section>

        {/* ── Mid-page CTA ──────────────────────────────────────────────── */}
        <section className="bg-charcoal py-14">
          <div className="container-max text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Free Estimate</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-7">
              Ready to Move in {city.name}?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="gap-2">
                  Get a FREE Estimate <ArrowRight size={15} />
                </Button>
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/70 transition-colors duration-200"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Common Questions</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
                {city.name} Moving FAQs
              </h2>
            </div>
            <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
              {city.faqs.map((faq) => (
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
