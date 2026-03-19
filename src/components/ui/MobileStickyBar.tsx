'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

interface Props {
  /** Pass true on the /quote page to replace the "Get Quote" button with a call-only bar */
  onQuotePage?: boolean;
}

export default function MobileStickyBar({ onQuotePage = false }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = onQuotePage ? 100 : 300;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Check immediately in case page loaded scrolled
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onQuotePage]);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex shadow-luxury">
      <a
        href="tel:7863051844"
        className="flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-sm font-bold border-r border-white/10 flex-1"
      >
        <Phone size={14} />
        Call Now
      </a>
      {onQuotePage ? (
        <a
          href="tel:7863051844"
          className="flex items-center justify-center gap-2 py-4 bg-gold text-white text-sm font-bold flex-1"
        >
          <Phone size={14} />
          786-305-1844
        </a>
      ) : (
        <Link
          href="/quote"
          className="flex items-center justify-center gap-2 py-4 bg-gold text-white text-sm font-bold flex-1"
        >
          Get Quote <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
