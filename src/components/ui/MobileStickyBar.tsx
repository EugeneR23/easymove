'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, Calculator } from 'lucide-react';
import { PHONE, telHref, whatsappUrl } from '@/lib/data/contact';

interface Props {
  /** Pass true on the /quote page to replace the calculator button with a call-only bar */
  onQuotePage?: boolean;
}

/**
 * The bar reads its own locale from the path rather than taking a prop. It is
 * already a client component and the header does the same, so this costs
 * nothing extra and means a new /ru or /ua page cannot forget to pass it.
 *
 * Most of this site's traffic is mobile, and this bar is the whole call-to-action
 * on a phone. It said "Call" and "Calculate" in English on every Russian and
 * Ukrainian page until 2026-09-18.
 */
const BAR_COPY = {
  en: { call: 'Call',    calc: 'Calculate',   wa: "Hi, I'd like a moving quote" },
  ru: { call: 'Позвонить', calc: 'Рассчитать', wa: 'Здравствуйте, хочу рассчитать переезд' },
  ua: { call: 'Зателефонувати', calc: 'Розрахувати', wa: 'Вітаю, хочу розрахувати переїзд' },
} as const;

export default function MobileStickyBar({ onQuotePage = false }: Props) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const t = pathname.startsWith('/ru') ? BAR_COPY.ru
    : pathname.startsWith('/ua') ? BAR_COPY.ua
    : BAR_COPY.en;

  useEffect(() => {
    setVisible(true);
  }, [onQuotePage]);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex shadow-luxury">
      <a
        href={whatsappUrl(t.wa)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-4 bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <MessageCircle size={14} />
        WhatsApp
      </a>
      <a
        href={telHref()}
        className="flex items-center justify-center gap-1.5 py-4 bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <Phone size={14} />
        {t.call}
      </a>
      {onQuotePage ? (
        <a
          href={telHref()}
          className="flex items-center justify-center gap-1.5 py-4 bg-gold text-white text-xs font-bold flex-1"
        >
          <Phone size={14} />
          {PHONE.display}
        </a>
      ) : (
        <Link
          href="/quote"
          className="flex items-center justify-center gap-1.5 py-4 bg-gold text-white text-xs font-bold flex-1"
        >
          <Calculator size={14} />
          {t.calc}
        </Link>
      )}
    </div>
  );
}
