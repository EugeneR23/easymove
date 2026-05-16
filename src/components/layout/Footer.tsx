import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-white">
              Easy Move <span className="text-gold">Florida</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              Local moving and small handyman service across South Florida. Hollywood-based,
              owner-led by Evgenii Romanov. Russian + English.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 border border-gold/40 bg-gold/5 px-3 py-1.5">
              <span className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Owner-Led &middot; COI on Request
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              From $129/hr &middot; 3-hour minimum
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/services/residential-moving', label: 'Local Apartment & House Moves' },
                { href: '/services/long-distance-moving', label: 'Long-Distance' },
                { href: '/services/office-commercial', label: 'Office (Small)' },
                { href: '/packing-services', label: 'Packing' },
                { href: '/services/specialty-items', label: 'Heavy & Specialty Items' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'About Evgenii' },
                { href: '/pricing', label: 'Pricing & Costs' },
                { href: '/quote', label: 'Calculate My Move' },
                { href: '/contact', label: 'Contact' },
                { href: '/blog', label: 'Resources & Guides' },
                { href: '/miami-movers', label: 'Miami Movers' },
                { href: '/fort-lauderdale-movers', label: 'Fort Lauderdale Movers' },
                { href: '/boca-raton-movers', label: 'Boca Raton Movers' },
                { href: '/aventura-movers', label: 'Aventura Movers' },
                { href: '/coral-gables-movers', label: 'Coral Gables Movers' },
                { href: '/sunny-isles-movers', label: 'Sunny Isles Movers' },
                { href: '/hollywood-movers', label: 'Hollywood Movers' },
                { href: '/coconut-grove-movers', label: 'Coconut Grove Movers' },
                { href: '/packing-services', label: 'Packing Services' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={13} className="text-gold shrink-0" />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-gold shrink-0" />
                <a href="tel:+17863051844" className="hover:text-gold transition-colors">786-305-1844</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-gold shrink-0" />
                <a href="mailto:romanov@easy-move-florida.com" className="hover:text-gold transition-colors">romanov@easy-move-florida.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                <span>Hollywood, FL &mdash; serving<br />all of South Florida</span>
              </li>
              <li className="text-xs text-gray-600 pt-1">
                Mon – Sat &nbsp;·&nbsp; 8:00 AM – 7:00 PM EST
              </li>
            </ul>
          </div>
        </div>

        {/* Service area */}
        <div className="border-t border-white/5 mt-12 pt-8">
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-[0.2em] mb-2">Moving Company Service Areas</p>
          <p className="text-xs text-gray-600 text-center mb-6">
            Miami · Coral Gables · Coconut Grove · Brickell · Aventura · Sunny Isles Beach ·
            Hollywood · Fort Lauderdale · Pompano Beach · Boca Raton · Delray Beach · Palm Beach
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p>&copy; {new Date().getFullYear()} Easy Move Florida. All rights reserved.</p>
              <a
                href="https://www.thumbtack.com/profile/services/474342774303219734/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gold/60 hover:text-gold transition-colors"
              >
                <span className="text-[10px] uppercase tracking-widest">32 ★ Reviews on Thumbtack ↗</span>
              </a>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-5">
            Design by{' '}
            <a
              href="https://oriumstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold transition-colors"
            >
              Orium Studios LLC
            </a>
            {' '}— Want a site like this?{' '}
            <a
              href="https://oriumstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              oriumstudios.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
