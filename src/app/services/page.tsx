import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import { readAllServices } from '@/lib/data/services';
import { ArrowRight, Shield, Star, Building2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = { title: 'Services — EasyMove Elite' };

const trustBadges = [
  { icon: Shield, label: 'Fully Insured · COI on Request' },
  { icon: Star, label: 'Highly Rated on Google & Thumbtack' },
  { icon: Building2, label: 'High-Rise & Condo Specialists' },
];

export default async function ServicesPage() {
  const services = await readAllServices();

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-charcoal py-14 md:py-20 px-4 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute inset-0 grain-overlay" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(201,168,76,0.06), transparent 70%)' }}
          />
          <div className="relative">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Every service we offer is built around one standard: the same level of care and precision,
            regardless of move size or distance.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10">
            {trustBadges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-gray-400">
                  <Icon size={14} className="text-gold shrink-0" />
                  <span className="text-xs tracking-wide">{b.label}</span>
                </div>
              );
            })}
          </div>
          </div>
        </section>

        {/* Grid */}
        <section className="relative section-padding bg-cream overflow-hidden">
          <div className="absolute inset-0 grain-overlay opacity-60" />
          <div className="relative container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col overflow-hidden bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09),_0_24px_56px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] group-hover:brightness-[1.04] transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Base overlay — always present, subtle */}
                    <div className="absolute inset-0 bg-charcoal/18 group-hover:bg-charcoal/10 transition-colors duration-400" />
                    {/* Bottom depth gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/55 via-charcoal/20 to-transparent" />
                    {/* Category badge — floated into image */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-semibold text-white/90 uppercase tracking-[0.15em] bg-black/30 backdrop-blur-[2px] border border-white/15 px-2.5 py-1">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-[#FDFCF9]">
                    <h3 className="font-display text-xl font-semibold text-charcoal mt-1 mb-3 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-[1.75] mb-5 flex-1">{service.tagline}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.05]">
                      <div>
                        {service.pricingNote ? (
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">Custom quote</span>
                        ) : (
                          <>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">From</span>
                            <span className="text-charcoal font-bold text-base">
                              {formatCurrency(service.startingPrice)}
                              {service.priceUnit === 'per-hour' && (
                                <span className="text-gray-400 font-normal text-xs ml-1">/hr</span>
                              )}
                              {service.priceUnit === 'per-month' && (
                                <span className="text-gray-400 font-normal text-xs ml-1">/mo</span>
                              )}
                            </span>
                          </>
                        )}
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group/link inline-flex items-center gap-1.5 text-gold text-[11px] font-semibold uppercase tracking-[0.12em]"
                      >
                        <span className="border-b border-gold/40 pb-px group-hover/link:border-gold transition-colors duration-200">
                          Details
                        </span>
                        <ArrowRight
                          size={12}
                          className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
