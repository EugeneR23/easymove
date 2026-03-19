import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = { title: 'Contact Us — EasyMove Elite' };

const areas = [
  'Miami', 'Coral Gables', 'Coconut Grove', 'Brickell',
  'Aventura', 'Sunny Isles Beach', 'Hollywood',
  'Fort Lauderdale', 'Boca Raton', 'Palm Beach',
];

export default function ContactPage() {
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
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-6xl font-bold text-white mb-4">
              Let&rsquo;s Plan Your Move
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              A real coordinator responds within a few hours — not an automated system.
              Call, email, or fill out the form below.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="relative section-padding bg-cream overflow-hidden">
          <div className="absolute inset-0 grain-overlay opacity-60" />
          <div className="relative container-max">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14 items-start">

              {/* Form column — elevated card */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.04),_0_8px_32px_rgba(0,0,0,0.08)]">
                  {/* Gold accent top bar */}
                  <div className="h-0.5 bg-gradient-gold" />
                  <div className="p-8 md:p-10">
                    <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">Send a Message</p>
                    <h2 className="font-display text-2xl font-semibold text-charcoal mb-1">
                      Tell Us About Your Move
                    </h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                      Fill in your details and we&rsquo;ll get back to you within a few hours with availability and a starting price.
                    </p>
                    <ContactForm />
                  </div>
                </div>
              </div>

              {/* Info sidebar */}
              <div className="lg:col-span-2 space-y-3">

                {/* Primary — phone (dark, prominent) */}
                <div className="bg-charcoal relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
                  <div className="absolute inset-0 grain-overlay" />
                  <div className="relative p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <Phone size={13} className="text-gold shrink-0" />
                      <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Fastest Response</p>
                    </div>
                    <a
                      href="tel:7863051844"
                      className="font-display text-3xl font-bold text-white hover:text-gold transition-colors duration-200 block mb-1"
                    >
                      786-305-1844
                    </a>
                    <p className="text-gray-400 text-xs">Mon – Sat, 8:00 AM – 7:00 PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start gap-4 p-5">
                    <div className="w-9 h-9 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Email</p>
                      <a href="mailto:hello@easymoveelite.com" className="text-charcoal text-sm font-medium hover:text-gold transition-colors">
                        hello@easymoveelite.com
                      </a>
                      <p className="text-gray-400 text-xs mt-0.5">Replies within 2 business hours</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start gap-4 p-5">
                    <div className="w-9 h-9 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Hours</p>
                      <p className="text-charcoal text-sm font-medium">Monday – Saturday</p>
                      <p className="text-gray-400 text-xs mt-0.5">8:00 AM – 7:00 PM Eastern</p>
                    </div>
                  </div>
                </div>

                {/* Service area */}
                <div className="bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.05)] p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-9 h-9 border border-gold/20 flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Service Area</p>
                      <p className="text-charcoal text-sm font-medium">Miami-Dade · Broward · Palm Beach</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-[52px]">
                    {areas.map((a) => (
                      <span key={a} className="text-[10px] bg-cream border border-gray-200 text-gray-500 px-2.5 py-0.5 tracking-wide">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Insurance badge */}
                <div className="flex items-center gap-3 px-5 py-4 border border-gold/15 bg-white/60">
                  <Shield size={14} className="text-gold shrink-0" />
                  <p className="text-gray-500 text-xs leading-snug">
                    <span className="text-charcoal font-semibold">Fully licensed &amp; insured.</span>{' '}
                    COI available on request for building and HOA management.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
