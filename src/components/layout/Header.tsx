'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const onLight = scrolled || !isHome;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        onLight ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className={cn(
              'font-display text-2xl font-bold tracking-tight transition-colors',
              onLight ? 'text-charcoal' : 'text-white',
            )}>
              EasyMove<span className="text-gold">Elite</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide uppercase transition-colors',
                  pathname === link.href
                    ? 'text-gold'
                    : onLight
                      ? 'text-charcoal hover:text-gold'
                      : 'text-white/85 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Phone — only show on light bg */}
            {onLight && (
              <a
                href="tel:7863051844"
                className="hidden lg:flex items-center gap-1.5 text-sm text-charcoal hover:text-gold transition-colors"
              >
                <Phone size={13} className="text-gold" />
                786-305-1844
              </a>
            )}

            <Link href="/quote">
              <Button size="sm" variant="primary">Get a Quote</Button>
            </Link>
          </nav>

          {/* Mobile: phone + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href="tel:7863051844"
              aria-label="Call us"
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wide transition-colors',
                onLight ? 'text-charcoal hover:text-gold' : 'text-white/90 hover:text-gold',
              )}
            >
              <Phone size={15} className="text-gold" />
              <span className="hidden xs:inline">786-305-1844</span>
            </a>
            <button
              className={cn('p-2', onLight ? 'text-charcoal' : 'text-white')}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-charcoal font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:7863051844" className="flex items-center gap-2 text-charcoal py-2" onClick={() => setMenuOpen(false)}>
              <Phone size={14} className="text-gold" /> 786-305-1844
            </a>
            <Link href="/quote" onClick={() => setMenuOpen(false)}>
              <Button size="md" variant="primary" className="w-full mt-2">Get a Quote</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
