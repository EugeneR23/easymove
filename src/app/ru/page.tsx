'use client';

import { useState } from 'react';
import { THUMBTACK } from '@/lib/data/credentials';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import CTABanner from '@/components/home/CTABanner';
import FAQSection from '@/components/home/FAQSection';
import { localStartingPrice, packingStartingPrice, startingHours, crewOptions, effectiveCrew, HOURLY_RATE, PACKING_HOURLY_RATE } from '@/lib/pricing';
import { replyPromise, sameDayCopy, RESPONSE } from '@/lib/data/policies';
import { GOOGLE_REVIEWS } from '@/lib/data/googleReviews';
import QuickLeadForm from '@/components/forms/QuickLeadForm';
import { formatCurrency } from '@/lib/utils';
import type { HomeSize, CrewSize, MoveType } from '@/types';
import {
  Phone, Shield, Star, ArrowRight, CheckCircle, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Truck, Package, Palette, Building2,
} from 'lucide-react';
import { ld, webPageNode } from '@/lib/seo/schema';

// The page's own node, so /ru states its language and date like every other
// page. Name and description match the metadata in ru/layout.tsx.
const PAGE_JSON = ld(webPageNode({
  path: '/ru',
  name: 'Переезды Майами',
  description: 'Переезды в Южной Флориде — Майами, Холливуд, Sunny Isles, Aventura.',
  locale: 'ru',
}));

/* ── Calculator data ─────────────────────────────────────────────────────────── */
// Hours and prices come from lib/pricing; this list only names the sizes.
// It used to carry its own hours, so the 2-bedroom "от" here said $710 while
// /ru/pricing said $645 (owner chose $645 on 2026-10-11).
const SIZES: { value: HomeSize; label: string }[] = [
  { value: 'studio', label: 'Студия' },
  { value: '1br', label: '1 комн.' },
  { value: '2br', label: '2 комн.' },
  { value: '3br', label: '3 комн.' },
  { value: '4br+', label: '4+ комн.' },
  { value: 'office', label: 'Офис' },
];
const packingPrice = packingStartingPrice;

/* ── Testimonials ────────────────────────────────────────────────────────────── */
// Real Google reviews, quoted word for word from googleReviews.ts, with a
// Russian translation marked as one. Four invented testimonials with avatar
// initials stood here until 2026-10-11 (claims-guard: invented-testimonial).
const REVIEW_PICKS: { name: string; ru: string }[] = [
  { name: 'Ekaterina Bykova', ru: 'Нужно было организовать переезд из одной квартиры в другую, и команда справилась на 100%. От первого общения до разгрузки всё было на высшем уровне: быстро, чётко и с большой заботой и о вещах, и обо мне как о клиенте. Огромное спасибо!' },
  { name: 'Ivan Berezovskii', ru: 'Отличная команда! Надёжные, пунктуальные и каждый раз делают работу хорошо. Очень профессиональные, с ними легко работать. Доверяю им уже несколько лет и очень рекомендую.' },
  { name: 'Andrei Oho', ru: 'Евгений и его команда — настоящие профессионалы. Всё сделали очень аккуратно и быстро, без стресса. Вся моя мебель доставлена в полной сохранности.' },
  { name: 'Andrey', ru: 'Евгений и его команда сделали работу безупречно. Приехали к месту встречи вовремя и всё доставили в срок, с отличным настроем. Обязательно обращусь снова — команде можно доверять!' },
];
const TESTIMONIALS = REVIEW_PICKS.map((p) => {
  const r = GOOGLE_REVIEWS.find((g) => g.name === p.name);
  if (!r) throw new Error(`ru/page: review by ${p.name} is not in googleReviews.ts`);
  return { name: r.name, original: r.text, ru: p.ru };
});

/* ── Services ────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: MapPin, name: 'Локальные переезды', desc: 'Майами, Форт-Лодердейл, Бока-Ратон и все пригороды.', href: '#zayavka' },
  { icon: Building2, name: 'Переезд из высоток', desc: 'Brickell, Sunny Isles, Aventura — координация лифтов, COI за 24 часа.', href: '#zayavka' },
  { icon: Truck, name: 'Доставка мебели и вещей', desc: 'Диван из магазина или находка с маркетплейса — заберём, упакуем, поднимем на этаж.', href: '#zayavka' },
  { icon: Package, name: 'Упаковка', desc: 'Профессиональная упаковка с материалами. Каждый предмет обёрнут.', href: '#zayavka' },
  { icon: Palette, name: 'Картины и антиквариат', desc: 'Кастомные деревянные ящики, двойная упаковка, обрешётка углов.', href: '#zayavka' },
  { icon: Users, name: 'Офисные переезды', desc: 'Минимальный простой. Серверы, мебель, документы — всё аккуратно.', href: '#zayavka' },
];

/* ── FAQ ──────────────────────────────────────────────────────────────────────── */

export default function RuHomePage() {
  const [moveType, setMoveType] = useState<MoveType>('local');
  const [homeSize, setHomeSize] = useState<HomeSize | null>(null);
  const [crew, setCrew] = useState<CrewSize>(2);

  const showSizeGrid = moveType === 'local' || moveType === 'packing-only';
  const sizeHours = homeSize ? startingHours(homeSize, moveType === 'packing-only') : null;
  const price =
    homeSize && moveType === 'local' ? localStartingPrice(homeSize, crew)
      : homeSize && moveType === 'packing-only' ? packingPrice(homeSize, crew)
        : null;

  const quoteHref = `/quote${moveType ? `?type=${moveType}` : ''}${homeSize ? `&size=${homeSize}` : ''}${crew ? `&crew=${crew}` : ''}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PAGE_JSON }} />
      <Header />
      <main className="pb-16 lg:pb-0">

        {/* ══════════════════════ HERO + CALCULATOR ══════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0 animate-kenburns">
            <Image src="/images/Hero.png" alt="Профессиональные муверы Easy Move Florida в Южной Флориде" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
          </div>
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-charcoal/35" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(28,28,30,0.35) 100%)' }} />
          <div className="absolute inset-0 grain-overlay z-[2]" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold z-[3]" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator z-[3]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-12 lg:pt-32 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

              {/* Left */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 border border-gold/40 bg-black/20 backdrop-blur-[2px] px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shrink-0" />
                  <span className="text-gold text-xs font-semibold tracking-[0.08em] sm:tracking-[0.2em] uppercase">
                    Майами · Форт-Лодердейл · Бока-Ратон
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mb-5 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
                  Переезды в Южной Флориде<br />
                  <span className="gold-text">на которые можно положиться</span>
                </h1>

                <p className="text-gray-300 text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
                  Рейтинг {THUMBTACK.rating} по {THUMBTACK.reviewCount} проверенным отзывам на Thumbtack. Без скрытых платежей —
                  надёжная команда, которая приезжает вовремя и бережно обращается с вашими вещами.
                </p>

                <div className="space-y-2.5 mb-8 hidden lg:block">
                  {[
                    'Прозрачные цены — узнайте стоимость до звонка',
                    'Личный контроль основателя, без субподрядчиков',
                    'Говорим по-русски',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={14} className="text-gold shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:flex items-center gap-5">
                  <a href="tel:+17863051844" className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-gold transition-colors">
                    <Phone size={15} className="text-gold" /> 786-305-1844
                  </a>
                  <span className="text-white/20">|</span>
                  <p className="text-white/40 text-xs">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 align-middle animate-pulse" />
                    {replyPromise('ru')}
                  </p>
                </div>
              </div>

              {/* Right — Calculator */}
              <div className="lg:col-span-6">
                <div className="bg-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] w-full overflow-hidden">
                  <div className="bg-charcoal px-5 sm:px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-display text-base font-bold">Рассчитайте стоимость</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-gold text-gold" />)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                      <span><span className="text-gold font-semibold">$129</span>/час · 2 мувера</span>
                      <span className="text-white/20">|</span>
                      <span><span className="text-gold font-semibold">$179</span>/час · 3 мувера</span>
                      <span className="text-white/20">|</span>
                      <span>мин. 3 часа</span>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-5">
                    <p className="text-charcoal text-[11px] font-semibold uppercase tracking-wider mb-2">Тип переезда</p>
                    <div className="grid grid-cols-3 gap-1.5 mb-5">
                      {([
                        { v: 'local' as MoveType, l: 'Локальный' },
                        { v: 'packing-only' as MoveType, l: 'Упаковка' },
                        { v: 'specialty' as MoveType, l: 'Спец.' },
                      ]).map(t => (
                        <button key={t.v} onClick={() => { setMoveType(t.v); setHomeSize(null); }}
                          className={`py-2 px-1 text-[11px] font-semibold border transition-all duration-150 text-center ${moveType === t.v ? 'border-gold bg-gold text-charcoal' : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'}`}
                        >{t.l}</button>
                      ))}
                    </div>

                    {showSizeGrid && (
                      <>
                        <p className="text-charcoal text-[11px] font-semibold uppercase tracking-wider mb-2">Размер жилья</p>
                        <div className="grid grid-cols-3 gap-1.5 mb-5">
                          {SIZES.map(s => {
                            const sp = moveType === 'local' ? localStartingPrice(s.value, crew) : packingPrice(s.value, crew);
                            return (
                              <button key={s.value} onClick={() => { setHomeSize(s.value); setCrew((c) => effectiveCrew(s.value, c)); }}
                                className={`py-2.5 px-2 text-center border transition-all duration-150 ${homeSize === s.value ? 'border-gold bg-gold text-charcoal' : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'}`}
                              >
                                <span className={`block text-xs font-bold ${homeSize === s.value ? 'text-charcoal' : 'text-charcoal'}`}>{s.label}</span>
                                <span className={`block text-[10px] mt-0.5 ${homeSize === s.value ? 'text-charcoal/80' : 'text-gray-500'}`}>от {formatCurrency(sp)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {homeSize && showSizeGrid && (
                      <div className="grid grid-cols-2 gap-1.5 mb-5">
                        {crewOptions(homeSize).map(c => {
                          const cp = moveType === 'local' ? localStartingPrice(homeSize, c) : packingPrice(homeSize, c);
                          return (
                            <button key={c} onClick={() => setCrew(c)}
                              className={`py-3 text-center border transition-all duration-150 ${crew === c ? 'border-gold bg-gold/10' : 'border-gray-200 hover:border-gold/40'}`}
                            >
                              <span className="block text-xs font-bold text-charcoal">{c} {moveType === 'packing-only' ? 'упаковщика' : 'мувера'}</span>
                              <span className="block text-[10px] text-gray-500 mt-0.5">${moveType === 'packing-only' ? PACKING_HOURLY_RATE[c] : HOURLY_RATE[c]}/час · {formatCurrency(cp)}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {price !== null && (
                      <div className="bg-charcoal p-5 text-center mb-5 relative overflow-hidden">
                        <div className="absolute inset-0 grain-overlay opacity-50" />
                        <div className="relative">
                          <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">Стоимость от</p>
                          <p className="font-display text-4xl font-bold text-white mb-1">{formatCurrency(price)}</p>
                          <p className="text-gray-400 text-xs">{sizeHours} ч · {crew} {moveType === 'packing-only' ? 'упаковщ.' : 'мувера'}{moveType === 'local' ? ' · трак включён' : ''}</p>
                        </div>
                      </div>
                    )}

                    {moveType === 'specialty' && (
                      <div className="bg-cream p-5 text-center mb-5">
                        <p className="font-display text-lg font-bold text-charcoal mb-1">Индивидуальный расчёт</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Каждый специализированный переезд уникален — координатор предоставит точный расчёт.
                        </p>
                      </div>
                    )}

                    {/* Russian readers stay in Russian: the button opens the
                        form below with the size already chosen, instead of the
                        English-only /quote wizard. */}
                    <a href="#zayavka" className="block">
                      <Button variant="primary" size="lg" className="w-full gap-2 shadow-[0_0_24px_rgba(201,168,76,0.3)]">
                        Бесплатный расчёт <ArrowRight size={15} />
                      </Button>
                    </a>
                    <div className="flex items-center justify-center gap-3 mt-3 text-gray-500 text-[10px]">
                      <span>Без обязательств</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                      <span>{replyPromise('ru', 'short')}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                      <span>COI за 24 часа</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile trust */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 lg:hidden">
              <div className="flex items-center gap-2 text-white/60">
                <Shield size={13} className="text-gold shrink-0" />
                <span className="text-[11px] tracking-wider uppercase">COI за 24 часа</span>
              </div>
              <div className="flex items-center gap-1 text-white/60">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-gold text-gold" />)}
                <span className="text-[11px] tracking-wider uppercase ml-1">Топ-рейтинг</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-[11px] tracking-wider uppercase">Говорим по-русски</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ STATS ══════════════════════ */}
        <section className="relative bg-charcoal overflow-hidden">
          <div className="absolute inset-0 grain-overlay" />
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              {[
                { val: `${THUMBTACK.reviewCount}`, label: 'Отзыва', sub: 'Проверенные на Thumbtack' },
                { val: `${THUMBTACK.rating} ★`, label: 'Рейтинг', sub: `Thumbtack, ${THUMBTACK.reviewCount} отзыва` },
                { val: `${RESPONSE.replyWithinBusinessHours} ч`, label: 'Ответ', sub: 'В рабочее время' },
                { val: '$0', label: 'Скрытых платежей', sub: 'Цена подтверждена письменно' },
              ].map((s, i) => (
                <div key={s.label} className={`text-center ${i < 3 ? 'md:border-r md:border-white/[0.07]' : ''}`}>
                  <p className="font-display text-2xl md:text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-white text-xs font-semibold mt-1">{s.label}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
        <section className="relative section-padding bg-charcoal overflow-hidden">
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative container-max">
            <div className="text-center mb-10">
              <div className="w-8 h-px bg-gold mx-auto mb-6" />
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Отзывы клиентов</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Нам доверяют жители Южной Флориды</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {TESTIMONIALS.map(t => (
                <figure key={t.name} className="border border-white/10 bg-white/[0.03] p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-1">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}</div>
                    <span className="border border-gold/25 text-gold text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">Отзыв в Google</span>
                  </div>
                  <blockquote className="font-display text-base md:text-lg text-white/80 italic leading-relaxed mb-3">&laquo;{t.ru}&raquo;</blockquote>
                  <p className="text-white/35 text-xs leading-relaxed mb-6">Перевод с английского. Оригинал: &ldquo;{t.original}&rdquo;</p>
                  <figcaption className="pt-5 border-t border-white/10 mt-auto">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Google, 5 звёзд</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="text-center">
              <Link href="/reviews" className="text-gold text-sm font-semibold hover:underline">Все отзывы Google →</Link>
            </p>
          </div>
        </section>

        {/* ══════════════════════ SERVICES ══════════════════════ */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Наши услуги</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">Полный спектр услуг по переезду</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map(s => (
                <Link key={s.name} href={s.href} className="group flex items-start gap-4 bg-white p-6 border border-gray-100 hover:border-gold/40 hover:shadow-card transition-all duration-200">
                  <s.icon size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-semibold text-charcoal text-sm mb-1 group-hover:text-gold transition-colors">{s.name}</h3>
                    <p className="text-gray-400 text-xs leading-snug">{s.desc}</p>
                  </div>
                  <ArrowRight size={13} className="text-gold/0 group-hover:text-gold/60 ml-auto shrink-0 mt-0.5 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ FOUNDER ══════════════════════ */}
        <section className="section-padding bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 grain-overlay" />
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="container-max relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold/30">
                <Image src="/images/founder.jpg" alt="Евгений Романов, основатель Easy Move Florida" fill sizes="80px" className="object-cover object-[center_20%]" />
              </div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Слово основателя</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
                &laquo;Мы остаёмся небольшими, чтобы ваш переезд прошёл безупречно.&raquo;
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Большинство мувинговых компаний растут за счёт количества заказов и отправляют кого попало.
                Мы растём за счёт качества. У каждого клиента — личный координатор.
                Правила вашего здания выясняем до дня переезда. Каждый переезд — тот, за который мы готовы отвечать.
              </p>
              <p className="text-gold/60 text-sm font-semibold mb-5">&mdash; Евгений Романов, Основатель</p>
              <a href="tel:+17863051844" className="inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] hover:text-white/70 transition-colors duration-200 border-b border-white/20 pb-px hover:border-white/50">
                <Phone size={11} /> Прямой: 786-305-1844
              </a>
            </div>
          </div>
        </section>


        {/* ══════════════════════ Города ══════════════════════ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-4xl mx-auto text-center">
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Где мы работаем</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">Русскоязычные грузчики в вашем городе</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">
              Отдельные страницы для городов с большой русскоязычной общиной — цены, здания, частые вопросы.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: '/ru/russkie-gruzchiki-miami', label: 'Русские грузчики в Майами' },
                { href: '/ru/miami-movers', label: 'Майами' },
                { href: '/ru/sunny-isles-movers', label: 'Санни-Айлс-Бич' },
                { href: '/ru/aventura-movers', label: 'Авентура' },
                { href: '/ru/hallandale-beach-movers', label: 'Халландейл-Бич' },
                { href: '/ru/hollywood-movers', label: 'Голливуд' },
                { href: '/ru/fort-lauderdale-movers', label: 'Форт-Лодердейл' },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="text-sm border border-gray-200 text-gray-600 px-5 py-2.5 hover:border-gold hover:text-charcoal transition-colors duration-150"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ FAQ ══════════════════════ */}
        <FAQSection locale="ru" />

        {/* ══════════════════════ ЗАЯВКА ══════════════════════ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Готовы к переезду?</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">Оставьте заявку — посчитаем переезд</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                {replyPromise('ru')} {sameDayCopy('ru', 'short')}. Или звоните: <a href="tel:+17863051844" className="text-charcoal font-semibold hover:text-gold">786-305-1844</a>
              </p>
            </div>
            <div className="bg-white border border-gray-100 shadow-card p-6 sm:p-8">
              <QuickLeadForm id="zayavka" locale="ru" prefill={{ homeSize, moveType }} />
            </div>
          </div>
        </section>

      </main>
      <Footer locale="ru" />
      <MobileStickyBar />
    </>
  );
}
