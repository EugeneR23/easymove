'use client';
import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { CheckCircle, Phone, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { replyPromise } from '@/lib/data/policies';
import { PHONE, telHref, whatsappUrl } from '@/lib/data/contact';
import HoneypotField from '@/components/ui/HoneypotField';
import { HONEYPOT_FIELD } from '@/lib/leadGuard';
import type { HomeSize, MoveType } from '@/types';

/**
 * One short form in three languages.
 *
 * Until 2026-10-11 the Russian and Ukrainian pages — the niche where the site
 * ranks first — had no form at all: every "Рассчитать" button led to an
 * English-only wizard. This form posts to /api/leads, the customer gets a
 * confirmation in their own language, and the owner's alert says which
 * language the request came in.
 *
 * variant="callback" is the one-field version (phone, optional name) for the
 * bottom of every page, including on phones, where the exit-intent popup on
 * /quote never fires.
 */
export type FormLocale = 'en' | 'ru' | 'ua';

const T = {
  en: {
    titleFull: 'Get a written estimate',
    titleCallback: 'Request a call back',
    name: 'Your name', phone: 'Phone *', email: 'Email (optional)',
    from: 'Moving from', to: 'Moving to', date: 'Move date', size: 'Home size',
    sizes: { studio: 'Studio', '1br': '1 bedroom', '2br': '2 bedrooms', '3br': '3 bedrooms', '4br+': '4+ bedrooms', office: 'Office' },
    sizePlaceholder: 'Choose…',
    message: 'Anything we should know? (optional)',
    submitFull: 'Send request', submitCallback: 'Call me back',
    sending: 'Sending…',
    okTitle: 'Request received',
    okBody: 'We will call you to confirm the details and the price.',
    phoneRequired: 'Please enter a phone number we can call.',
    failed: 'We could not send the form. Please call or WhatsApp us:',
    note: 'No obligation. No deposit.',
  },
  ru: {
    titleFull: 'Заявка на расчёт переезда',
    titleCallback: 'Перезвоните мне',
    name: 'Как к вам обращаться', phone: 'Телефон *', email: 'Email (необязательно)',
    from: 'Откуда', to: 'Куда', date: 'Дата переезда', size: 'Размер жилья',
    sizes: { studio: 'Студия', '1br': '1 спальня', '2br': '2 спальни', '3br': '3 спальни', '4br+': '4+ спальни', office: 'Офис' },
    sizePlaceholder: 'Выберите…',
    message: 'Что нам стоит знать? (необязательно)',
    submitFull: 'Отправить заявку', submitCallback: 'Перезвоните мне',
    sending: 'Отправляем…',
    okTitle: 'Заявка получена',
    okBody: 'Мы перезвоним, уточним детали и назовём цену.',
    phoneRequired: 'Укажите телефон, по которому вам можно позвонить.',
    failed: 'Не удалось отправить форму. Позвоните или напишите в WhatsApp:',
    note: 'Без обязательств. Без депозита.',
  },
  ua: {
    titleFull: 'Заявка на розрахунок переїзду',
    titleCallback: 'Передзвоніть мені',
    name: 'Як до вас звертатися', phone: 'Телефон *', email: 'Email (необовʼязково)',
    from: 'Звідки', to: 'Куди', date: 'Дата переїзду', size: 'Розмір житла',
    sizes: { studio: 'Студія', '1br': '1 спальня', '2br': '2 спальні', '3br': '3 спальні', '4br+': '4+ спальні', office: 'Офіс' },
    sizePlaceholder: 'Оберіть…',
    message: 'Що нам варто знати? (необовʼязково)',
    submitFull: 'Надіслати заявку', submitCallback: 'Передзвоніть мені',
    sending: 'Надсилаємо…',
    okTitle: 'Заявку отримано',
    okBody: 'Ми передзвонимо, уточнимо деталі й назвемо ціну.',
    phoneRequired: 'Вкажіть телефон, за яким вам можна зателефонувати.',
    failed: 'Не вдалося надіслати форму. Зателефонуйте або напишіть у WhatsApp:',
    note: 'Без зобовʼязань. Без депозиту.',
  },
} as const;

const SIZE_KEYS: HomeSize[] = ['studio', '1br', '2br', '3br', '4br+', 'office'];

interface Props {
  locale?: FormLocale;
  variant?: 'full' | 'callback';
  tone?: 'light' | 'dark';
  /** Values carried over from a calculator on the same page. */
  prefill?: { homeSize?: HomeSize | null; moveType?: MoveType };
  id?: string;
  className?: string;
  /** One column at every width — for narrow containers such as the call-back sheet. */
  stacked?: boolean;
}

export default function QuickLeadForm({
  locale = 'en', variant = 'full', tone = 'light', prefill, id, className, stacked = false,
}: Props) {
  const t = T[locale];
  const [form, setForm] = useState({
    firstName: '', phone: '', email: '', fromCity: '', toCity: '', moveDate: '',
    homeSize: (prefill?.homeSize ?? '') as HomeSize | '', message: '', hp: '',
  });
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  // A calculator on the same page can change its mind after the form mounted.
  useEffect(() => {
    if (prefill?.homeSize) setForm((f) => ({ ...f, homeSize: prefill.homeSize as HomeSize }));
  }, [prefill?.homeSize]);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const dark = tone === 'dark';
  const field = cn(
    'block w-full px-4 py-3 border transition-colors duration-150 focus:outline-none focus:ring-0 focus:border-gold',
    dark ? 'bg-white/[0.04] border-white/15 text-white placeholder-white/30' : 'bg-white border-gray-300 text-charcoal placeholder-gray-400',
  );
  const label = cn('block text-[11px] font-semibold uppercase tracking-[0.12em] mb-1.5', dark ? 'text-white/50' : 'text-gray-500');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.phone.replace(/\D/g, '').length < 7) {
      setError(t.phoneRequired);
      setState('error');
      return;
    }
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: variant === 'callback' ? 'callback' : 'quick-form',
          locale,
          firstName: form.firstName,
          phone: form.phone,
          email: form.email,
          fromCity: form.fromCity,
          toCity: form.toCity,
          moveDate: form.moveDate,
          homeSize: form.homeSize || undefined,
          moveType: prefill?.moveType === 'long-distance' || prefill?.moveType === 'specialty' ? prefill.moveType : 'local',
          message: form.message,
          [HONEYPOT_FIELD]: form.hp,
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(typeof payload?.error === 'string' ? payload.error : `HTTP ${res.status}`);
      }
      setState('ok');
      try {
        const w = window as unknown as { dataLayer?: unknown[] };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: 'lead_submitted', form: variant, locale });
        track('lead_submitted', { form: variant, locale });
      } catch { /* analytics never blocks a lead */ }
    } catch (err) {
      console.error('[QuickLeadForm] submit failed:', err);
      setError(t.failed);
      setState('error');
    }
  }

  if (state === 'ok') {
    return (
      <div id={id} className={cn('p-6 text-center', dark ? 'border border-gold/30' : 'bg-cream border border-gold/20', className)}>
        <CheckCircle size={26} className="text-gold mx-auto mb-3" />
        <p className={cn('font-display text-xl font-semibold mb-1', dark ? 'text-white' : 'text-charcoal')}>{t.okTitle}</p>
        <p className={cn('text-sm', dark ? 'text-white/60' : 'text-gray-600')}>{t.okBody} {replyPromise(locale)}</p>
      </div>
    );
  }

  const isFull = variant === 'full';

  return (
    <form id={id} onSubmit={submit} noValidate className={cn('relative text-left', className)}>
      <p className={cn('font-display text-xl font-semibold mb-4', dark ? 'text-white' : 'text-charcoal')}>
        {isFull ? t.titleFull : t.titleCallback}
      </p>

      <div className={cn('grid gap-3', stacked ? 'grid-cols-1' : isFull ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-[1fr_1fr_auto] sm:items-end')}>
        <div>
          <label htmlFor={`${id ?? 'qlf'}-name`} className={label}>{t.name}</label>
          <input id={`${id ?? 'qlf'}-name`} className={field} autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName')(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`${id ?? 'qlf'}-phone`} className={label}>{t.phone}</label>
          <input id={`${id ?? 'qlf'}-phone`} className={field} type="tel" inputMode="tel" autoComplete="tel" required placeholder="786-000-0000" value={form.phone} onChange={(e) => set('phone')(e.target.value)} />
        </div>

        {isFull && (
          <>
            <div>
              <label htmlFor={`${id ?? 'qlf'}-from`} className={label}>{t.from}</label>
              <input id={`${id ?? 'qlf'}-from`} className={field} autoComplete="address-level2" value={form.fromCity} onChange={(e) => set('fromCity')(e.target.value)} />
            </div>
            <div>
              <label htmlFor={`${id ?? 'qlf'}-to`} className={label}>{t.to}</label>
              <input id={`${id ?? 'qlf'}-to`} className={field} value={form.toCity} onChange={(e) => set('toCity')(e.target.value)} />
            </div>
            <div>
              <label htmlFor={`${id ?? 'qlf'}-date`} className={label}>{t.date}</label>
              <input id={`${id ?? 'qlf'}-date`} className={field} type="date" value={form.moveDate} onChange={(e) => set('moveDate')(e.target.value)} />
            </div>
            <div>
              <label htmlFor={`${id ?? 'qlf'}-size`} className={label}>{t.size}</label>
              <select id={`${id ?? 'qlf'}-size`} className={field} value={form.homeSize} onChange={(e) => set('homeSize')(e.target.value)}>
                <option value="">{t.sizePlaceholder}</option>
                {SIZE_KEYS.map((k) => <option key={k} value={k}>{t.sizes[k]}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${id ?? 'qlf'}-email`} className={label}>{t.email}</label>
              <input id={`${id ?? 'qlf'}-email`} className={field} type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set('email')(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${id ?? 'qlf'}-msg`} className={label}>{t.message}</label>
              <textarea id={`${id ?? 'qlf'}-msg`} className={field} rows={3} value={form.message} onChange={(e) => set('message')(e.target.value)} />
            </div>
          </>
        )}

        <div className={cn(isFull && !stacked && 'sm:col-span-2')}>
          <button
            type="submit"
            disabled={state === 'sending'}
            className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-white font-bold text-sm tracking-wide px-6 py-3.5 transition-colors"
          >
            {state === 'sending' ? t.sending : isFull ? t.submitFull : t.submitCallback}
          </button>
        </div>
      </div>

      <HoneypotField value={form.hp} onChange={set('hp')} />

      {state === 'error' && (
        <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-200 p-3">
          <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">
            {error}{' '}
            {error === t.failed && (
              <>
                <a href={telHref()} className="font-semibold underline">{PHONE.display}</a>
                {' · '}
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">WhatsApp</a>
              </>
            )}
          </p>
        </div>
      )}

      <p className={cn('text-xs mt-3 flex items-center gap-1.5', dark ? 'text-white/40' : 'text-gray-500')}>
        <Phone size={11} className="text-gold" /> {t.note} {replyPromise(locale)}
      </p>
    </form>
  );
}
