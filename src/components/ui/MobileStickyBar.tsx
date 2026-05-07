'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calculator } from 'lucide-react';
import { whatsappUrl } from '@/lib/utils';

interface Props {
  /** Pass true on the /quote page to replace the calculator button with a call-only bar */
  onQuotePage?: boolean;
}

export default function MobileStickyBar({ onQuotePage = false }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [onQuotePage]);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex shadow-luxury">
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-4 bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <MessageCircle size={14} />
        WhatsApp
      </a>
      <a
        href="tel:+17863051844"
        className="flex items-center justify-center gap-1.5 py-4 bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <Phone size={14} />
        Call
      </a>
      {onQuotePage ? (
        <a
          href="tel:+17863051844"
          className="flex items-center justify-center gap-1.5 py-4 bg-gold text-white text-xs font-bold flex-1"
        >
          <Phone size={14} />
          786-305-1844
        </a>
      ) : (
        <Link
          href="/quote"
          className="flex items-center justify-center gap-1.5 py-4 bg-gold text-white text-xs font-bold flex-1"
        >
          <Calculator size={14} />
          Calculate
        </Link>
      )}
    </div>
  );
}
