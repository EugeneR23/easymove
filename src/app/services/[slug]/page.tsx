import type { Metadata } from 'next';
import type React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { readOneService, readAllServices } from '@/lib/data/services';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import * as LucideIcons from 'lucide-react';
import { CheckCircle, Shield, Phone } from 'lucide-react';

export async function generateStaticParams() {
  const services = readAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = readOneService(params.slug);
  if (!service) return { title: 'Service | EasyMove Elite' };

  const title = `${service.name} in South Florida | EasyMove Elite`;
  // Trim tagline at sentence boundary and append a short, keyword-rich suffix (~155 chars total)
  const tagline = service.tagline.replace(/\.$/, '');
  const description = `${tagline} — Miami, Fort Lauderdale & Boca Raton. Fully insured, founder-led. Free written estimate.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.easymoveelite.com/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.easymoveelite.com/services/${service.slug}`,
      images: [{ url: service.imageUrl, alt: `${service.name} — EasyMove Elite South Florida` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.imageUrl],
    },
  };
}

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  type IconType = React.ComponentType<{ size?: number; className?: string }>;
  const Icon = ((LucideIcons as unknown as Record<string, IconType>)[name] ?? CheckCircle) as IconType;
  return <Icon {...props} />;
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = readOneService(params.slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-80 md:h-[440px] flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={service.imageUrl} alt={`${service.name} — EasyMove Elite South Florida`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
            <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30 px-3 py-1 mb-4">
              {service.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{service.name}</h1>
            <p className="text-gray-300 mt-3 max-w-xl">{service.tagline}</p>
            <p className="text-gold/55 text-[11px] font-semibold tracking-[0.2em] uppercase mt-4">
              Miami · Fort Lauderdale · Boca Raton
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-cream">
          <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 text-lg leading-relaxed mb-10">{service.description}</p>

              <h3 className="font-display text-2xl font-semibold text-charcoal mb-6">What&rsquo;s Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {service.features.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 bg-white p-4 border border-gray-100 group hover:border-gold transition-colors duration-200">
                    <DynamicIcon name={f.icon} className="text-gold shrink-0" size={18} />
                    <span className="text-charcoal text-sm font-medium">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="bg-charcoal p-8">
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">Our Guarantee</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: 'Fully Insured', desc: 'Every move is covered. COI available for building management on request.' },
                    { title: 'Arrival Windows', desc: 'Two-hour arrival window. We call 30 min before. No all-day waiting.' },
                    { title: 'Transparent Pricing', desc: 'Written estimate before any work begins. No surprise fees on moving day.' },
                  ].map((g) => (
                    <div key={g.title}>
                      <div className="w-0.5 h-6 bg-gold mb-4" />
                      <p className="text-white font-semibold text-sm mb-1">{g.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6 lg:sticky lg:top-24">
                {service.pricingNote ? (
                  <div className="mb-7">
                    {service.pricingNote.split('\n').map((line, i) =>
                      line.startsWith('•') ? (
                        <p key={i} className="text-sm text-gray-500 leading-relaxed pl-3">{line}</p>
                      ) : (
                        <p key={i} className={`text-sm text-charcoal font-medium leading-relaxed ${i > 0 ? 'mt-3' : 'mb-2'}`}>{line}</p>
                      )
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Starting From</p>
                    <p className="font-display text-4xl font-bold text-charcoal mb-1">
                      {formatCurrency(service.startingPrice)}
                    </p>
                    <p className="text-sm text-gray-400 mb-7">
                      {service.priceUnit === 'per-hour' ? 'per hour' : service.priceUnit === 'flat-rate' ? 'flat rate' : service.priceUnit === 'per-month' ? 'per month' : service.priceUnit}
                    </p>
                  </>
                )}

                <Link href="/quote">
                  <Button size="lg" variant="primary" className="w-full mb-3">Get Your Quote</Button>
                </Link>
                <p className="text-xs text-gray-400 text-center mb-3">No obligation · Fast response</p>
                <a href="tel:7863051844">
                  <Button size="lg" variant="ghost" className="w-full mb-5 inline-flex items-center justify-center gap-2">
                    <Phone size={15} />
                    786-305-1844
                  </Button>
                </a>

                <div className="border-t border-gray-100 pt-5 space-y-3">
                  {[
                    'No commitment to get a quote',
                    'Written estimate provided',
                    'COI available on request',
                    'Fully insured for every move',
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2">
                      <Shield size={12} className="text-gold shrink-0" />
                      <span className="text-xs text-gray-500">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
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
