import Link from 'next/link';
import { replyPromise, sameDayCopy } from '@/lib/data/policies';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE, telHref, whatsappUrl } from '@/lib/data/contact';
import QuickLeadForm from '@/components/forms/QuickLeadForm';

/**
 * Closing call to action. Rendered on nearly every page, which is why it no
 * longer imports an animation library: the reveals go through <AnimateIn>
 * (IntersectionObserver + CSS) and the ambient glows are CSS keyframes, so
 * this component ships no JavaScript of its own at all.
 *
 * The ambient layers animate opacity and scale over a static gradient rather
 * than animating the gradient itself — same look, but the compositor can do it
 * without repainting.
 *
 * The locale prop defaults to 'en' so the ~14 English pages need no change. The
 * two city/cost templates and the Russian and Ukrainian pages pass their own —
 * this banner is the last thing a visitor reads before calling, and until
 * 2026-09-18 it asked a Ukrainian reader "Ready to move?" in English at the
 * bottom of an otherwise Ukrainian page.
 */
type CtaLocale = 'en' | 'ru' | 'ua';

const CTA_COPY: Record<CtaLocale, {
  heading: string; body: string; calc: string; whatsapp: string;
  badges: string[]; waMessage: string;
}> = {
  en: {
    heading: 'Ready to move?',
    body: `Send photos via WhatsApp or leave your number below. ${replyPromise('en')} ${sameDayCopy('en', 'short')}.`,
    calc: 'Calculate My Move',
    whatsapp: 'WhatsApp Us',
    badges: ['Owner-led', 'COI on request', 'Russian + English', 'Hollywood-based'],
    waMessage: "Hi, I'd like a moving quote",
  },
  ru: {
    heading: 'Готовы к переезду?',
    body: `Пришлите фото в WhatsApp или оставьте заявку ниже. ${replyPromise('ru')} ${sameDayCopy('ru', 'short')}.`,
    calc: 'Рассчитать переезд',
    whatsapp: 'Написать в WhatsApp',
    badges: ['Владелец ведёт заказ', 'COI по запросу', 'Русский и английский', 'База в Голливуде'],
    waMessage: 'Здравствуйте, хочу рассчитать переезд',
  },
  ua: {
    heading: 'Готові до переїзду?',
    body: `Надішліть фото у WhatsApp або залиште заявку нижче. ${replyPromise('ua')} ${sameDayCopy('ua', 'short')}.`,
    calc: 'Розрахувати переїзд',
    whatsapp: 'Написати у WhatsApp',
    badges: ['Власник веде замовлення', 'COI на запит', 'Українською — на запит', 'База в Голлівуді'],
    waMessage: 'Вітаю, хочу розрахувати переїзд',
  },
};

export default function CTABanner({ locale = 'en' }: { locale?: CtaLocale } = {}) {
  const t = CTA_COPY[locale] ?? CTA_COPY.en;
  return (
    <section className="relative py-14 md:py-24 bg-charcoal overflow-hidden">
      {/* Gold gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Ambient pulsing radial glow */}
      <div
        className="absolute inset-0 pointer-events-none cta-glow"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
      />

      {/* Secondary ambient orb at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none cta-orb"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Decorative separator */}
        <AnimateIn direction="none" className="flex items-center justify-center gap-4 mb-8 md:mb-10">
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {t.heading}
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.35}>
          <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
            {t.body}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.5} className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]">
            {/* English goes to the wizard. Russian and Ukrainian readers get
                the form below in their own language instead of an English
                wizard (until 2026-10-11 this button sent them to /quote). */}
            <Link href={locale === 'en' ? '/quote' : '#zayavka'}>
              <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[220px] shadow-[0_0_32px_rgba(201,168,76,0.2)] hover:shadow-[0_0_48px_rgba(201,168,76,0.3)]">
                {t.calc}
              </Button>
            </Link>
          </div>
          <div className="transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <a href={whatsappUrl(t.waMessage)} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/[0.06] hover:border-white/35 w-full sm:w-auto min-w-[220px] inline-flex items-center gap-2 justify-center transition-all duration-200"
              >
                <MessageCircle size={16} />
                {t.whatsapp}
              </Button>
            </a>
          </div>
          <div className="transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <a href={telHref()}>
              <Button
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/[0.06] hover:border-white/35 w-full sm:w-auto min-w-[220px] inline-flex items-center gap-2 justify-center transition-all duration-200"
              >
                <Phone size={16} />
                {PHONE.display}
              </Button>
            </a>
          </div>
        </AnimateIn>

        {/* A form at the bottom of every page. Russian and Ukrainian get the
            full request form; English gets the one-field call-back, which is
            the only call-back on a phone (the /quote exit popup is desktop). */}
        <div className="max-w-2xl mx-auto mt-10 border border-white/10 bg-white/[0.02] p-5 sm:p-7">
          <QuickLeadForm
            id="zayavka"
            locale={locale}
            variant={locale === 'en' ? 'callback' : 'full'}
            tone="dark"
          />
        </div>

        <AnimateIn delay={0.7} direction="none" className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          {t.badges.map((b, i) => (
            <span key={b} className="contents">
              {i > 0 && <span className="w-px h-3 bg-white/15" />}
              <span className="text-white/45 text-xs">{b}</span>
            </span>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
