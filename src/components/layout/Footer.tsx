import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-white">
              EasyMove<span className="text-gold">Elite</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              South Florida&rsquo;s premium white-glove moving company. Serving Miami-Dade,
              Broward, and Palm Beach Counties since 2021.
            </p>
            <p className="mt-3 text-xs text-gray-600">
              Fully Insured · COI Available on Request
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gold transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/services/residential-moving', label: 'High-Rise & Residential' },
                { href: '/services/long-distance-moving', label: 'Long-Distance' },
                { href: '/services/international-moving', label: 'International' },
                { href: '/services/office-commercial', label: 'Office & Commercial' },
                { href: '/services/specialty-items', label: 'Fine Art & Specialty' },
                { href: '/services/storage-solutions', label: 'Premium Storage' },
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
                { href: '/about', label: 'About Us' },
                { href: '/quote', label: 'Get a Quote' },
                { href: '/contact', label: 'Contact' },
                { href: '/admin', label: 'Client Portal' },
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
                <Phone size={13} className="text-gold shrink-0" />
                <a href="tel:7863051844" className="hover:text-gold transition-colors">786-305-1844</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-gold shrink-0" />
                <a href="mailto:hello@easymoveelite.com" className="hover:text-gold transition-colors">hello@easymoveelite.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                <span>Serving Miami-Dade, Broward<br />&amp; Palm Beach County</span>
              </li>
              <li className="text-xs text-gray-600 pt-1">
                Mon – Sat &nbsp;·&nbsp; 8:00 AM – 7:00 PM EST
              </li>
            </ul>
          </div>
        </div>

        {/* Service area */}
        <div className="border-t border-white/5 mt-12 pt-8">
          <p className="text-xs text-gray-600 text-center mb-6">
            Serving: Miami · Coral Gables · Coconut Grove · Brickell · Aventura · Sunny Isles Beach ·
            Hollywood · Fort Lauderdale · Pompano Beach · Boca Raton · Delray Beach · Palm Beach
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} EasyMove Elite LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
