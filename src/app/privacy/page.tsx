import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy — EasyMove Elite' },
  description:
    'How EasyMove Elite collects, uses, and protects your personal information when you request a moving estimate or contact us.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://easy-move-florida.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-cream">

        {/* Hero */}
        <div className="bg-charcoal py-14 px-4 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">Effective Date: September 21, 2021</p>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="prose-legal">

            <p className="text-gray-600 text-sm leading-relaxed mb-10">
              EasyMove Elite (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is
              committed to protecting your personal information. This policy explains how we collect,
              use, and safeguard the data you provide when using our services.
            </p>

            <Section title="1. Information We Collect">
              <p>We may collect the following information:</p>
              <ul>
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Move details — origin, destination, home size, and services requested</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>Your information is used solely to:</p>
              <ul>
                <li>Provide moving estimates and confirm final pricing</li>
                <li>Contact you regarding your request</li>
                <li>Schedule and coordinate your move</li>
                <li>Improve our services</li>
              </ul>
            </Section>

            <Section title="3. Communication">
              <p>
                By submitting your information, you agree to be contacted by phone call, text message
                (SMS), or email. Standard message and data rates may apply.
              </p>
              <p>
                You can opt out at any time by replying <strong>STOP</strong> to any SMS or by
                contacting us directly at{' '}
                <a href="mailto:romanov@easy-move-florida.com" className="text-gold hover:underline">
                  romanov@easy-move-florida.com
                </a>.
              </p>
            </Section>

            <Section title="4. Data Protection">
              <p>
                We take reasonable technical and organizational measures to protect your information
                from unauthorized access, loss, or disclosure. No system is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="5. Sharing Your Information">
              <p>
                We do <strong>not</strong> sell your personal data. We may share your information
                only with:
              </p>
              <ul>
                <li>Internal team members involved in your move</li>
                <li>Service providers required to complete your relocation</li>
              </ul>
              <p>All third parties are required to handle your data with the same level of care.</p>
            </Section>

            <Section title="6. Cookies">
              <p>
                Our website may use cookies to improve your browsing experience and analyze site
                traffic. You can disable cookies in your browser settings at any time.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal data we hold about you</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for communication at any time</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:romanov@easy-move-florida.com" className="text-gold hover:underline">
                  romanov@easy-move-florida.com
                </a>.
              </p>
            </Section>

            <Section title="8. Updates to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Changes will be reflected on
                this page with a revised effective date. Continued use of our services constitutes
                acceptance of the updated policy.
              </p>
            </Section>

            {/* Contact block */}
            <div className="mt-12 border border-gold/20 bg-white px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Contact Us</p>
              <p className="text-sm text-gray-600">
                EasyMove Elite LLC<br />
                <a href="tel:7863051844" className="hover:text-gold transition-colors">786-305-1844</a>
                <br />
                <a href="mailto:romanov@easy-move-florida.com" className="hover:text-gold transition-colors">
                  romanov@easy-move-florida.com
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
