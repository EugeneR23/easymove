'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { whatsappUrl } from '@/lib/utils';

const NAV_LINKS_EN = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const NAV_LINKS_RU = [
  { href: '/ru', label: 'Главная' },
  { href: '/ru/about', label: 'О нас' },
  { href: '/ru/services', label: 'Услуги' },
  { href: '/ru/contact', label: 'Контакты' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRu = pathname.startsWith('/ru');
  const isHome = pathname === '/' || pathname === '/ru';
  const NAV_LINKS = isRu ? NAV_LINKS_RU : NAV_LINKS_EN;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const langSwitch = isRu
    ? { href: '/', label: 'EN' }
    : { href: '/ru', label: 'RU' };

  const textColor = scrolled || !isHome ? 'text-white' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome ? 'header-glass' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={isRu ? '/ru' : '/'} className="flex items-center gap-2">
            <span className={cn('font-display text-2xl font-bold tracking-tight transition-colors', textColor)}>
              Easy Move <span className="text-gold">Florida</span>
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
                    : 'text-white/80 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <Link
              href={langSwitch.href}
              className="text-[11px] font-bold tracking-wider border border-white/30 text-white/60 px-2.5 py-1 hover:border-gold hover:text-gold transition-all duration-200"
            >
              {langSwitch.label}
            </Link>

            {/* WhatsApp */}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-sm text-white/70 hover:text-gold transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={13} className="text-gold" />
              WhatsApp
            </a>

            {/* Phone */}
            <a
              href="tel:+17863051844"
              className="hidden lg:flex items-center gap-1.5 text-sm text-white/70 hover:text-gold transition-colors"
            >
              <Phone size={13} className="text-gold" />
              786-305-1844
            </a>

            <Link href="/quote">
              <Button size="sm" variant="primary">
                {isRu ? 'Рассчитать' : 'Calculate My Move'}
              </Button>
            </Link>
          </nav>

          {/* Mobile: lang + phone + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href={langSwitch.href}
              className="text-[10px] font-bold tracking-wider border border-white/30 text-white/60 px-2 py-0.5"
            >
              {langSwitch.label}
            </Link>
            <a
              href="tel:+17863051844"
              aria-label="Call us"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wide text-white/90 hover:text-gold transition-colors"
            >
              <Phone size={15} className="text-gold" />
              <span className="hidden sm:inline">786-305-1844</span>
            </a>
            <button
              className="p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-charcoal border-t border-white/10 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block font-medium py-2',
                    pathname === link.href ? 'text-gold' : 'text-white/80',
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 py-2" onClick={() => setMenuOpen(false)}>
                <MessageCircle size={14} className="text-gold" /> WhatsApp Us
              </a>
              <a href="tel:+17863051844" className="flex items-center gap-2 text-white/80 py-2" onClick={() => setMenuOpen(false)}>
                <Phone size={14} className="text-gold" /> 786-305-1844
              </a>
              <Link href="/quote" onClick={() => setMenuOpen(false)}>
                <Button size="md" variant="primary" className="w-full mt-2">
                  {isRu ? 'Рассчитать переезд' : 'Calculate My Move'}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
