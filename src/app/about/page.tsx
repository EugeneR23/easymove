import type { Metadata } from 'next';
import { THUMBTACK } from '@/lib/data/credentials';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import AnimateIn from '@/components/ui/AnimateIn';
import { Award, Users, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'About Easy Move Florida — Founder-Led Movers in South Florida' },
  description:
    'Easy Move Florida is owner-led: Evgenii Romanov runs dispatch and crew leadership himself, in English and Russian. Hollywood-based, serving Miami, Fort Lauderdale and Boca Raton.',
  alternates: {
    canonical: 'https://www.easy-move-florida.com/about',
    languages: {
      en: 'https://www.easy-move-florida.com/about',
      ru: 'https://www.easy-move-florida.com/ru/about',
      'x-default': 'https://www.easy-move-florida.com/about',
    },
  },
  openGraph: {
    title: 'About Easy Move Florida — Founder-Led Movers in South Florida',
    description:
      'Owner-operated from Hollywood, FL. Meet Evgenii Romanov, who writes the estimates, calls your building and answers the phone himself.',
    url: 'https://www.easy-move-florida.com/about',
    images: [{ url: 'https://www.easy-move-florida.com/images/Hero.png', width: 1200, height: 630, alt: 'Easy Move Florida — movers in South Florida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Easy Move Florida — Owner-Operated Movers in South Florida',
    description:
      `Evgenii Romanov owns the company, runs dispatch and answers the phone. Hollywood, FL. Russian and English. Rated ${THUMBTACK.rating} across ${THUMBTACK.reviewCount} Thumbtack reviews.`,
  },
};

const values = [
  {
    icon: Award,
    title: 'The rate never moves',
    description: '$129/hour for two movers, $179 for three, plus $129 a day for the truck. It does not go up for a weekend, a long job, or a hard one. You pay for hours worked, in 15-minute increments after the 3-hour minimum.',
  },
  {
    icon: Shield,
    title: 'Nothing on the bill you did not approve',
    description: 'No fuel surcharge, no stairs fee, no elevator fee, no long carry fee. If something turns up that is not on the estimate, we stop and get your yes before we continue.',
  },
  {
    icon: Users,
    title: 'You can do the whole move in Russian',
    description: 'The crew leader and the dispatcher both work in Russian and English — estimate, contract, move day. That matters in Sunny Isles Beach, Aventura, Hallandale Beach and Hollywood.',
  },
  {
    icon: MapPin,
    title: 'We know the buildings, not just the roads',
    description: 'Freight elevator reservations, loading dock windows, elevator padding rules, COI formats, parking and loading zone rules across the Sunny Isles, Aventura, Miami Beach and Hollywood towers.',
  },
];

const howWeWork = [
  { title: 'The owner is on the phone', description: 'The WhatsApp number reaches Evgenii, not a call centre. If something needs attention on move day, you are talking to the person who can decide.' },
  { title: 'COI within 24 hours, free', description: 'Send your building name, management company and their coverage requirements. The certificate goes to management in their format, at no charge.' },
  { title: 'No deposit to book', description: 'Nothing is charged to hold a date, and cancelling or rescheduling more than 48 hours out is free.' },
  { title: 'Crew briefed before arrival', description: 'Building access, elevator windows and COI requirements are confirmed before the crew leaves the yard, so the clock starts on your furniture rather than on paperwork.' },
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
            alt="Easy Move Florida crew during a South Florida move"
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
            <h1 className="font-display text-3xl md:text-6xl font-bold text-white">About Easy Move Florida</h1>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Owner-operated from Hollywood, FL. The number on this site reaches Evgenii Romanov directly.
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
                My name is Evgenii Romanov. I own Easy Move Florida, I run dispatch, and the number on
                this website rings my phone — not a call centre and not a lead broker who sells your
                details to three other movers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                I started the company because the quotes I was getting as a customer were fiction. The
                rate quoted on the phone was not the rate on the invoice, the truck fee appeared at the
                end, and nobody had called the building to find out that the freight elevator was booked
                until Thursday. So the way we price is deliberately boring: $129 an hour for two movers,
                $179 for three, $129 a day for the truck with fuel and tolls inside it, and a 3-hour
                minimum. That rate does not change because it is Saturday or because the job ran long.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Most of what makes a South Florida move go badly is not the furniture — it is the
                building. Freight elevator windows, loading dock schedules, COI formats, elevator
                padding rules, which streets you can actually park a 26-footer on. That is the part I
                handle before your move day, in English or in Russian, whichever you prefer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work with homeowners, renters and small businesses across Miami-Dade, Broward and
                Palm Beach County. If something goes wrong on your move, call 786-305-1844 and you are
                talking to the person who can fix it.
              </p>
              <p className="text-gold text-sm font-semibold mt-6">— Evgenii Romanov, Owner</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Owner-operated', 'Russian & English', `${THUMBTACK.rating} · ${THUMBTACK.reviewCount} Thumbtack reviews`, 'Direct: 786-305-1844'].map((tag) => (
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
                  alt="Easy Move Florida premium moving crew, South Florida"
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
                        alt="Evgenii Romanov, owner of Easy Move Florida, in Hollywood FL"
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
                    <h3 className="font-display font-semibold text-charcoal text-xl">Evgenii Romanov</h3>
                    <p className="text-gold text-xs uppercase tracking-widest mt-1 mb-4">Owner &amp; Dispatcher</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Evgenii owns the company and runs dispatch himself from Hollywood, FL. He writes the
                      estimates, calls your building about the freight elevator and the COI, and answers the
                      WhatsApp number on this site personally, in Russian or English. Also spelled Eugene
                      Romanov — same person.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                      {['Owner & dispatcher', 'Russian & English', 'WhatsApp: 786-305-1844'].map((badge) => (
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
                  Four things you can hold us to, because they are entirely inside our control — unlike a
                  guaranteed final total on an hourly job, which no honest mover can promise.
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
              {/* [TODO: Evgenii] add an FDACS IM# card here once you send the
                  registration number — Florida Chapter 507 registration is the
                  strongest trust signal we can publish, and competitors show theirs. */}
              {[
                { label: `${THUMBTACK.rating} · ${THUMBTACK.reviewCount} reviews`, sub: 'Verified on Thumbtack' },
                { label: 'COI in 24 hours', sub: 'To your building, no charge' },
                { label: 'High-rise competent', sub: 'Freight elevators, docks, move windows' },
                { label: 'Russian & English', sub: 'Crew leader and dispatcher both' },
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
