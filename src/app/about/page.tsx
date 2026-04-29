import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import AnimateIn from '@/components/ui/AnimateIn';
import { Award, Users, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About EasyMove Elite — Founder-Led Movers in South Florida',
  description:
    'EasyMove Elite is a founder-led, fully insured moving company built in South Florida. Meet the crew behind every move in Miami, Fort Lauderdale & Boca Raton.',
  alternates: {
    canonical: 'https://easy-move-florida.com/about',
  },
  openGraph: {
    title: 'About EasyMove Elite — Founder-Led Movers in South Florida',
    description:
      'Founder-led and crew-driven. Built for South Florida. Meet Eugene Romanov and the team behind EasyMove Elite.',
    url: 'https://easy-move-florida.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EasyMove Elite — Founder-Led Movers in South Florida',
    description:
      "Meet the founder-led crew behind South Florida's premier white-glove moving company. Miami · Fort Lauderdale · Boca Raton.",
  },
};

const values = [
  {
    icon: Award,
    title: 'Craftsmanship',
    description: 'Every carry, every wrap, every placement is treated as a reflection of who we are. We hold ourselves to a standard our clients never have to ask for.',
  },
  {
    icon: Shield,
    title: 'Accountability',
    description: 'Licensed, insured, and fully transparent. Detailed estimates in writing. Arrival windows honored. No surprises on moving day.',
  },
  {
    icon: Users,
    title: 'Discretion',
    description: 'Our clients include executives, athletes, collectors, and families who value privacy. We operate with the professionalism and confidentiality that requires.',
  },
  {
    icon: MapPin,
    title: 'Local Depth',
    description: 'We know South Florida — its buildings, its HOA requirements, its traffic, its heat. That local expertise translates into smoother moves.',
  },
];

const howWeWork = [
  { title: 'No subcontractors', description: 'Every move is handled by our own trained crew — not a third-party app crew hired for the day.' },
  { title: 'Direct accountability', description: "Eugene is the person you call if anything needs attention. Not a support line. Not a dispatcher." },
  { title: 'Quality control on every job', description: "The same standards apply whether you're moving a studio or a full estate. No 'easy' jobs treated carelessly." },
  { title: 'Crew briefed before arrival', description: 'Building access, elevator windows, COI requirements — all confirmed before the crew ever shows up.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-72 md:h-[420px] flex items-center justify-center overflow-hidden bg-charcoal">
          <Image
            src="/images/Real/8.jpg"
            alt="EasyMove Elite crew during a South Florida move"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/75 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <AnimateIn className="relative z-10 text-center px-4">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h1 className="font-display text-3xl md:text-6xl font-bold text-white">About EasyMove Elite</h1>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Founder-led. Crew-driven. Built for South Florida.
            </p>
          </AnimateIn>
        </section>

        {/* Story */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimateIn direction="left">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Founder-Led</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
                Built in South Florida.<br />Run by the Person You Call.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                I started EasyMove Elite because I couldn&rsquo;t find a moving company I would trust with
                my own things. Too many crews sent by a dispatcher who&rsquo;d never visited the building.
                Too many quotes that ballooned on moving day. Too little accountability when something went wrong.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                So I built the company I wished existed. One where the person you talk to on the phone
                is the same person responsible for your move. Where the crew arrives knowing the building,
                the timeline, and exactly what needs protecting. Where a COI isn&rsquo;t an afterthought —
                it&rsquo;s ready before you ask.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work with homeowners, renters, collectors, and small businesses across Miami-Dade,
                Broward, and Palm Beach County. Some moves are straightforward. Some aren&rsquo;t. The
                standard of care is the same for both.
              </p>
              <p className="text-gold text-sm font-semibold mt-6">— Eugene Romanov, Founder</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Owner-led', 'Present on every complex move', 'Direct: 786-305-1844'].map((tag) => (
                  <span key={tag} className="text-[11px] border border-gold/25 text-gold/75 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.15}>
              <div className="relative w-full h-56 sm:h-80 lg:h-[420px] overflow-hidden">
                <Image
                  src="/images/about.png"
                  alt="EasyMove Elite premium moving crew, South Florida"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center sm:object-top"
                />
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <AnimateIn className="text-center mb-10 md:mb-14">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">What Drives Us</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">Our Commitments</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <AnimateIn key={v.title} delay={i * 0.1}>
                    <div className="bg-cream p-6 sm:p-8 h-full">
                      <div className="w-10 h-10 flex items-center justify-center mb-5">
                        <Icon className="text-gold" size={22} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-charcoal mb-3">{v.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder-led */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <AnimateIn>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start bg-cream border border-gray-100 p-6 sm:p-8 mb-12">
                  <div className="shrink-0">
                    <div className="relative w-48 h-48 overflow-hidden bg-gray-200">
                      <Image
                        src="/images/founder-2.png"
                        alt="Eugene Romanov, Founder of EasyMove Elite"
                        fill
                        sizes="192px"
                        className="object-cover object-[center_20%]"
                      />
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-xs text-gray-400">South Florida</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-charcoal text-xl">Eugene Romanov</h3>
                    <p className="text-gold text-xs uppercase tracking-widest mt-1 mb-4">Founder &amp; Owner</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Eugene built EasyMove Elite from the ground up after years of watching clients get let down
                      by large, impersonal moving companies. His standard: you speak directly with the owner,
                      the crew knows the building before they arrive, and every item is handled as if it belongs
                      to family. He is present on every high-value and complex move.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                      {['Licensed & Insured', 'Hands-on leadership', 'Direct: 786-305-1844'].map((badge) => (
                        <span key={badge} className="text-xs border border-gray-200 px-3 py-1 text-gray-500">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">How We Work</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
                  Your Move is Personally Managed
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  When you book with EasyMove Elite, you&rsquo;re not working with a dispatcher or a call center.
                  Eugene takes your call, coordinates the crew, and is reachable throughout your move.
                  No subcontractors. No strangers sent by an app.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
                  {howWeWork.map((item) => (
                    <div key={item.title} className="bg-white p-5 sm:p-6">
                      <p className="font-semibold text-charcoal text-sm mb-2">{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-charcoal py-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative container-max">
            <AnimateIn className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
              {[
                { label: 'Fully Insured', sub: 'Every move we take on' },
                { label: 'COI on Request', sub: 'For building & HOA management' },
                { label: 'Experienced with High-Rises', sub: 'Condos, elevators & loading docks' },
                { label: 'Founder-Led', sub: 'Eugene is involved in every move' },
              ].map((c) => (
                <div key={c.label} className="max-w-[160px]">
                  <p className="text-white text-sm font-semibold mb-1">{c.label}</p>
                  <p className="text-gray-500 text-xs leading-snug">{c.sub}</p>
                </div>
              ))}
            </AnimateIn>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
