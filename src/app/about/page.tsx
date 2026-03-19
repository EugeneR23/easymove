import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import { Award, Users, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us — EasyMove Elite' };

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

const team = [
  {
    name: 'Eugene Romanov',
    role: 'Founder & Owner',
    bio: 'Eugene built EasyMove Elite from the ground up after years of watching clients get let down by large, impersonal moving companies. His standard: you speak directly with the owner, the crew knows the building before they arrive, and every item is handled as if it belongs to family. He is present on every high-value and complex move.',
    image: '/images/Founder.jpg',
    featured: true,
  },
  {
    name: 'Natalie Ferreira',
    role: 'Client Coordinator',
    bio: 'Natalie is usually the first voice you hear. She handles scheduling, building approvals, COI requests, and any questions that come up before or after your move.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    featured: false,
  },
  {
    name: 'James Okafor',
    role: 'Lead Field Crew',
    bio: 'James has been with the company since the beginning. He leads our field crews on high-rise, fine art, and full-estate moves — the jobs where nothing can go wrong.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    featured: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative h-72 md:h-[420px] flex items-center justify-center overflow-hidden bg-charcoal"
          style={{ backgroundImage: "url('/images/Hero.png')", backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/75 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 text-center px-4">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h1 className="font-display text-3xl md:text-6xl font-bold text-white">About EasyMove Elite</h1>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Founder-led. Crew-driven. Built for South Florida.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
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
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/About.png"
                alt="EasyMove Elite team in South Florida"
                className="w-full h-56 sm:h-80 lg:h-[420px] object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">What Drives Us</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">Our Commitments</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-cream p-6 sm:p-8">
                    <div className="w-10 h-10 flex items-center justify-center mb-5">
                      <Icon className="text-gold" size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-charcoal mb-3">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">The Team</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">Small by Design</h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Not a franchise. Not a call center. A tight crew where everyone knows what they&rsquo;re doing and why it matters.
              </p>
            </div>

            {/* Founder featured */}
            {team.filter((m) => m.featured).map((member) => (
              <div key={member.name} className="max-w-3xl mx-auto mb-14">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start bg-cream border border-gray-100 p-6 sm:p-8">
                  <div className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover object-top bg-gray-200"
                    />
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-xs text-gray-400">South Florida</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-charcoal text-xl">{member.name}</h3>
                    <p className="text-gold text-xs uppercase tracking-widest mt-1 mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    <div className="flex flex-wrap gap-3 mt-5">
                      {['Licensed & Insured', 'Hands-on leadership', 'Direct line: 786-305-1844'].map((badge) => (
                        <span key={badge} className="text-xs border border-gray-200 px-3 py-1 text-gray-500">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Supporting crew */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {team.filter((m) => !m.featured).map((member) => (
                <div key={member.name} className="group flex gap-5 items-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-semibold text-charcoal">{member.name}</h3>
                    <p className="text-gold text-xs uppercase tracking-widest mt-0.5 mb-2">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-charcoal py-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative container-max">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
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
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
