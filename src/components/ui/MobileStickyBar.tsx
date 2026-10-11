'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, Calculator, PhoneIncoming } from 'lucide-react';
import { OPEN_CALLBACK_EVENT } from '@/components/forms/CallbackLauncher';
import { PHONE, telHref, whatsappUrl } from '@/lib/data/contact';
import { localeOfPath } from '@/lib/seo/routes';
import { requestFormHref, goToRequestForm } from '@/lib/requestForm';

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
  en: { call: 'Call',    back: 'Call me back', calc: 'Calculate',   wa: "Hi, I'd like a moving quote" },
  ru: { call: 'Позвонить', back: 'Перезвоните', calc: 'Рассчитать', wa: 'Здравствуйте, хочу рассчитать переезд' },
  ua: { call: 'Подзвонити', back: 'Передзвоніть', calc: 'Розрахувати', wa: 'Вітаю, хочу розрахувати переїзд' },
} as const;

export default function MobileStickyBar({ onQuotePage = false }: Props) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = localeOfPath(pathname);
  const t = locale === 'ru' ? BAR_COPY.ru : locale === 'uk' ? BAR_COPY.ua : BAR_COPY.en;

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
        className="flex flex-col items-center justify-center gap-1 py-2.5 leading-tight text-center bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <MessageCircle size={14} />
        WhatsApp
      </a>
      <a
        href={telHref()}
        className="flex flex-col items-center justify-center gap-1 py-2.5 leading-tight text-center bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <Phone size={14} />
        {t.call}
      </a>
      {/* Name and phone, nothing else — opens CallbackLauncher's sheet. */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CALLBACK_EVENT))}
        className="flex flex-col items-center justify-center gap-1 py-2.5 leading-tight text-center bg-charcoal text-white text-xs font-bold border-r border-white/10 flex-1"
      >
        <PhoneIncoming size={14} />
        {t.back}
      </button>
      {onQuotePage ? (
        <a
          href={telHref()}
          className="flex flex-col items-center justify-center gap-1 py-2.5 leading-tight text-center bg-gold text-white text-xs font-bold flex-1"
        >
          <Phone size={14} />
          {PHONE.display}
        </a>
      ) : (
        <Link
          href={requestFormHref(locale)}
          onClick={(e) => goToRequestForm(e, locale)}
          className="flex flex-col items-center justify-center gap-1 py-2.5 leading-tight text-center bg-gold text-white text-xs font-bold flex-1"
        >
          <Calculator size={14} />
          {t.calc}
        </Link>
      )}
    </div>
  );
}
