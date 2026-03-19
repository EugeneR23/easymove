import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = { title: 'Terms of Service — EasyMove Elite' };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-cream">

        {/* Hero */}
        <div className="bg-charcoal py-14 px-4 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm">Effective Date: September 21, 2021</p>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div>

            <p className="text-gray-600 text-sm leading-relaxed mb-10">
              By using EasyMove Elite services — including our website, quote form, and moving
              services — you agree to the following terms and conditions. Please read them carefully.
            </p>

            <Section title="1. Estimates & Pricing">
              <p>
                All quotes provided online or over the phone are <strong>preliminary estimates</strong>.
                Final pricing may vary based on:
              </p>
              <ul>
                <li>Actual inventory on moving day</li>
                <li>Access conditions — stairs, elevators, parking, building restrictions</li>
                <li>Additional services requested on-site</li>
                <li>Distance between locations</li>
              </ul>
              <p>
                A written confirmation of your final price will be provided before the move begins.
              </p>
            </Section>

            <Section title="2. Minimum Charges">
              <p>
                Local moves may be subject to a minimum service charge. This will be communicated
                clearly at the time of booking.
              </p>
            </Section>

            <Section title="3. Payment">
              <p>Payment is due upon completion of services unless otherwise agreed in writing.</p>
              <p>We accept:</p>
              <ul>
                <li>Cash</li>
                <li>Credit and debit cards</li>
                <li>Other approved payment methods confirmed at booking</li>
              </ul>
            </Section>

            <Section title="4. Customer Responsibilities">
              <p>Customers are responsible for:</p>
              <ul>
                <li>Providing accurate information about inventory and locations</li>
                <li>Ensuring clear access to all pickup and delivery locations</li>
                <li>Securing valuables, personal documents, and irreplaceable items prior to the move</li>
                <li>Informing us of any building-specific requirements (COI, elevator reservations, etc.)</li>
              </ul>
            </Section>

            <Section title="5. Liability">
              <p>EasyMove Elite is not liable for:</p>
              <ul>
                <li>Items packed by the customer</li>
                <li>Pre-existing damage to furniture or property</li>
                <li>Delays caused by building restrictions, traffic, or external factors beyond our control</li>
                <li>Items of extraordinary value unless declared and agreed upon in advance</li>
              </ul>
              <p>
                For high-value or specialty items (art, antiques, safes), please inform us in advance
                so appropriate measures can be arranged.
              </p>
            </Section>

            <Section title="6. Rescheduling & Cancellation">
              <p>
                We require advance notice for any rescheduling or cancellation. Cancellation fees
                may apply depending on timing and proximity to the scheduled move date. Details will
                be communicated at the time of booking.
              </p>
            </Section>

            <Section title="7. Storage Services">
              <p>If storage services are requested:</p>
              <ul>
                <li>Monthly fees apply and are agreed upon before storage begins</li>
                <li>Access to stored items must be scheduled in advance</li>
                <li>Items are stored at the customer&apos;s risk unless additional coverage is arranged</li>
              </ul>
            </Section>

            <Section title="8. Changes to Services">
              <p>
                Any additional services requested on moving day — beyond what was originally quoted
                — may affect final pricing. Our team will communicate any changes before proceeding.
              </p>
            </Section>

            <Section title="9. Governing Law">
              <p>
                These terms are governed by the laws of the State of Florida. Any disputes shall be
                resolved in Miami-Dade County, Florida.
              </p>
            </Section>

            {/* Contact block */}
            <div className="mt-12 border border-gold/20 bg-white px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Contact Us</p>
              <p className="text-sm text-gray-600">
                EasyMove Elite LLC<br />
                <a href="tel:7863051844" className="hover:text-gold transition-colors">786-305-1844</a>
                <br />
                <a href="mailto:hello@easymoveelite.com" className="hover:text-gold transition-colors">
                  hello@easymoveelite.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-lg font-semibold text-charcoal mb-4">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3 [&_ul]:mt-2 [&_ul]:ml-4 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:text-gray-500">
        {children}
      </div>
    </div>
  );
}
