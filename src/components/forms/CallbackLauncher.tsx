'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PhoneIncoming, X } from 'lucide-react';
import { localeOfPath } from '@/lib/seo/routes';
import QuickLeadForm, { type FormLocale } from './QuickLeadForm';

/**
 * "Call me back" — name and phone, nothing else — reachable from every page.
 *
 * Owner, 2026-10-11: a visitor who does not want to click through a calculator
 * but wants a call now had no short path. The one-field form sat only at the
 * bottom of English pages. Now:
 * - on a phone, the sticky bar has a "Перезвоните" button that opens this sheet
 *   (it fires OPEN_CALLBACK_EVENT; the bar and this component never import
 *   each other);
 * - on a desktop, a small button sits in the bottom-right corner.
 *
 * Not shown in /admin, and the desktop button is hidden on /quote, where the
 * wizard and the exit-intent popup already ask for a phone.
 */
export const OPEN_CALLBACK_EVENT = 'easymove:open-callback';

const COPY: Record<FormLocale, { button: string; close: string }> = {
  en: { button: 'Call me back', close: 'Close' },
  ru: { button: 'Перезвоните мне', close: 'Закрыть' },
  ua: { button: 'Передзвоніть мені', close: 'Закрити' },
};

export default function CallbackLauncher() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const loc = localeOfPath(pathname);
  const locale: FormLocale = loc === 'ru' ? 'ru' : loc === 'uk' ? 'ua' : 'en';
  const t = COPY[locale];

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CALLBACK_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CALLBACK_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    try {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'callback_open', locale, page: pathname });
    } catch { /* analytics never blocks */ }
    return () => window.removeEventListener('keydown', onKey);
  }, [open, locale, pathname]);

  if (pathname.startsWith('/admin')) return null;
  const onQuote = pathname === '/quote';

  return (
    <>
      {!onQuote && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden lg:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-bold px-5 py-3 shadow-luxury transition-colors"
        >
          <PhoneIncoming size={16} />
          {t.button}
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end lg:items-end lg:justify-end bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.button}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full lg:w-[420px] lg:mr-6 lg:mb-6 bg-white p-6 pb-8 shadow-luxury"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-charcoal"
            >
              <X size={18} />
            </button>
            <QuickLeadForm id="callback-sheet" locale={locale} variant="callback" tone="light" stacked />
          </div>
        </div>
      )}
    </>
  );
}
