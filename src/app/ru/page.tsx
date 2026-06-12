'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import CTABanner from '@/components/home/CTABanner';
import { localStartingPrice } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';
import type { HomeSize, CrewSize, MoveType } from '@/types';
import {
  Phone, Shield, Star, ArrowRight, CheckCircle, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Truck, Package, Palette, Building2,
} from 'lucide-react';

/* ── Calculator data ─────────────────────────────────────────────────────────── */
const SIZES: { value: HomeSize; label: string; hrs: number }[] = [
  { value: 'studio', label: 'Студия', hrs: 3 },
  { value: '1br', label: '1 комн.', hrs: 3 },
  { value: '2br', label: '2 комн.', hrs: 4.5 },
  { value: '3br', label: '3 комн.', hrs: 6 },
  { value: '4br+', label: '4+ комн.', hrs: 8 },
  { value: 'office', label: 'Офис', hrs: 5 },
];

const PACKING_RATE: Record<CrewSize, number> = { 2: 79, 3: 119, 4: 159 };
function packingPrice(size: HomeSize, crew: CrewSize): number {
  const hrs = Math.max(3, SIZES.find(s => s.value === size)?.hrs ?? 3);
  return Math.round(PACKING_RATE[crew] * hrs);
}

/* ── Testimonials ────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Валентина Р.', city: 'Sunny Isles Beach', initials: 'ВР', color: '#7C6AF7',
    type: 'Переезд из высотки',
    quote: 'Переезд с 38-го этажа — бронирование лифта, защита полов, страховка для управляющей компании. Всё было готово до того, как я успела попросить.',
  },
  {
    name: 'Камила и Диего П.', city: 'Hollywood', initials: 'КД', color: '#9B6FB0',
    type: 'Локальный переезд',
    quote: 'Переезжали с маленьким ребёнком и собакой — полный хаос с нашей стороны. Ребята работали спокойно и быстро, за три часа всё расставили. Каждый доллар оправдан.',
  },
  {
    name: 'Марк С.', city: 'Doral', initials: 'МС', color: '#5B8FBF',
    type: 'Переезд офиса',
    quote: 'Перевезли офис на 12 человек за выходные. В понедельник все работали как обычно. Даже IT-шник был в шоке — ничего не пришлось перенастраивать.',
  },
  {
    name: 'Лиза и Роберт К.', city: 'Brickell', initials: 'ЛК', color: '#C2724F',
    type: 'Срочный переезд',
    quote: 'Дата закрытия сделки сдвинулась на неделю раньше. Позвонили во вторник — в четверг уже переехали. Страховку оформили за ночь. До сих пор не понимаю, как они это сделали.',
  },
];

/* ── Services ────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: MapPin, name: 'Локальные переезды', desc: 'Майами, Форт-Лодердейл, Бока-Ратон и все пригороды.', href: '/quote?type=local' },
  { icon: Building2, name: 'Переезд из высоток', desc: 'Brickell, Sunny Isles, Aventura — координация лифтов, COI за 24 часа.', href: '/quote?type=local' },
  { icon: Truck, name: 'Дальние перевозки', desc: 'По всем США. Выделенный трак, GPS-трекинг, один координатор.', href: '/quote?type=long-distance' },
  { icon: Package, name: 'Упаковка', desc: 'Профессиональная упаковка с материалами. Каждый предмет обёрнут.', href: '/quote?type=packing-only' },
  { icon: Palette, name: 'Картины и антиквариат', desc: 'Музейная упаковка, кастомные ящики, климат-контроль.', href: '/quote?type=specialty' },
  { icon: Users, name: 'Офисные переезды', desc: 'Минимальный простой. Серверы, мебель, документы — всё аккуратно.', href: '/quote?type=local' },
];

/* ── FAQ ──────────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Сколько стоит локальный переезд?',
    a: 'Локальные переезды оплачиваются почасово: $129/час за 2 муверов, $179/час за 3, $229/час за 4, минимум 3 часа. Грузовик от $90 в зависимости от расстояния. Студия от $477, 2-комнатная от $671. Выходные +10%, пиковый сезон (май–сентябрь) +5%.',
  },
  {
    q: 'Вы работаете с высотками в Brickell и Sunny Isles?',
    a: 'Да, это наша специализация. Мы бронируем лифты, координируем с загрузочной зоной и оформляем страховку (COI) для управляющей компании — обычно за 24 часа.',
  },
  {
    q: 'Вы застрахованы?',
    a: 'Полностью. У нас есть general liability и cargo insurance. Сертификат страхования (COI) для вашего здания выдаётся по запросу, обычно в течение 24 часов.',
  },
  {
    q: 'Можно ли переехать срочно?',
    a: 'Да, мы часто берём переезды в течение одной недели. Позвоните нам — мы постараемся найти окно даже на ближайшие дни.',
  },
  {
    q: 'Вы говорите по-русски?',
    a: 'Да! Основатель и координатор Евгений Романов говорит по-русски. Вы можете обсудить все детали переезда на русском языке.',
  },
];

export default function RuHomePage() {
  const [moveType, setMoveType] = useState<MoveType>('local');
  const [homeSize, setHomeSize] = useState<HomeSize | null>(null);
  const [crew, setCrew] = useState<CrewSize>(2);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const showSizeGrid = moveType === 'local' || moveType === 'packing-only';
  const sizeData = homeSize ? SIZES.find(s => s.value === homeSize) : null;
  const price =
    homeSize && moveType === 'local' ? localStartingPrice(homeSize, crew)
      : homeSize && moveType === 'packing-only' ? packingPrice(homeSize, crew)
        : null;

  const quoteHref = `/quote${moveType ? `?type=${moveType}` : ''}${homeSize ? `&size=${homeSize}` : ''}${crew ? `&crew=${crew}` : ''}`;

  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">

        {/* ══════════════════════ HERO + CALCULATOR ══════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0 animate-kenburns">
            <Image src="/images/Hero.png" alt="Профессиональные муверы EasyMove Elite в Южной Флориде" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
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
                  500+ успешных переездов. Полная страховка. Без скрытых платежей —
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
                    Отвечаем в течение 2 часов
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
                    <div className="grid grid-cols-4 gap-1.5 mb-5">
                      {([
                        { v: 'local' as MoveType, l: 'Локальный' },
                        { v: 'long-distance' as MoveType, l: 'Дальний' },
                        { v: 'packing-only' as MoveType, l: 'Упаковка' },
                        { v: 'specialty' as MoveType, l: 'Спец.' },
                      ]).map(t => (
                        <button key={t.v} onClick={() => { setMoveType(t.v); setHomeSize(null); }}
                          className={`py-2 px-1 text-[11px] font-semibold border transition-all duration-150 text-center ${moveType === t.v ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'}`}
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
                              <button key={s.value} onClick={() => setHomeSize(s.value)}
                                className={`py-2.5 px-2 text-center border transition-all duration-150 ${homeSize === s.value ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-500 hover:border-gold/40 hover:bg-gold/5'}`}
                              >
                                <span className={`block text-xs font-bold ${homeSize === s.value ? 'text-white' : 'text-charcoal'}`}>{s.label}</span>
                                <span className={`block text-[10px] mt-0.5 ${homeSize === s.value ? 'text-white/80' : 'text-gray-400'}`}>от {formatCurrency(sp)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {homeSize && showSizeGrid && (
                      <div className="grid grid-cols-2 gap-1.5 mb-5">
                        {([2, 3, 4] as CrewSize[]).map(c => {
                          const cp = moveType === 'local' ? localStartingPrice(homeSize, c) : packingPrice(homeSize, c);
                          return (
                            <button key={c} onClick={() => setCrew(c)}
                              className={`py-3 text-center border transition-all duration-150 ${crew === c ? 'border-gold bg-gold/10' : 'border-gray-200 hover:border-gold/40'}`}
                            >
                              <span className="block text-xs font-bold text-charcoal">{c} {moveType === 'packing-only' ? 'упаковщика' : 'мувера'}</span>
                              <span className="block text-[10px] text-gray-400 mt-0.5">${moveType === 'packing-only' ? (c === 2 ? 79 : c === 3 ? 119 : 159) : (c === 2 ? 129 : c === 3 ? 179 : 229)}/час · {formatCurrency(cp)}</span>
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
                          <p className="text-gray-400 text-xs">{sizeData?.hrs} ч · {crew} {moveType === 'packing-only' ? 'упаковщ.' : 'мувера'}{moveType === 'local' ? ' · трак включён' : ''}</p>
                        </div>
                      </div>
                    )}

                    {(moveType === 'specialty' || moveType === 'long-distance') && (
                      <div className="bg-cream p-5 text-center mb-5">
                        <p className="font-display text-lg font-bold text-charcoal mb-1">Индивидуальный расчёт</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {moveType === 'specialty' ? 'Каждый специализированный переезд уникален — координатор предоставит точный расчёт.' : 'Стоимость дальнего переезда зависит от расстояния и объёма. Запросите бесплатный расчёт.'}
                        </p>
                      </div>
                    )}

                    <Link href={quoteHref} className="block">
                      <Button variant="primary" size="lg" className="w-full gap-2 shadow-[0_0_24px_rgba(201,168,76,0.3)]">
                        Бесплатный расчёт <ArrowRight size={15} />
                      </Button>
                    </Link>
                    <div className="flex items-center justify-center gap-3 mt-3 text-gray-400 text-[10px]">
                      <span>Без обязательств</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                      <span>Быстрый ответ</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                      <span>Полная страховка</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile trust */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 lg:hidden">
              <div className="flex items-center gap-2 text-white/60">
                <Shield size={13} className="text-gold shrink-0" />
                <span className="text-[11px] tracking-wider uppercase">Застрахованы</span>
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
                { val: '500+', label: 'Переездов', sub: 'Локальные и дальние' },
                { val: '4.9 ★', label: 'Рейтинг', sub: 'На проверенных площадках' },
                { val: '< 2 ч', label: 'Ответ', sub: 'Координатор перезвонит' },
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
              {TESTIMONIALS.slice(testimonialIdx * 2, testimonialIdx * 2 + 2).map(t => (
                <div key={t.name} className="border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-1">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}</div>
                    <span className="border border-gold/25 text-gold text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">{t.type}</span>
                  </div>
                  <blockquote className="font-display text-base md:text-lg text-white/80 italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: t.color }}>{t.initials}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{t.city}, FL</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setTestimonialIdx(i => i === 0 ? 1 : 0)} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all"><ChevronLeft size={15} /></button>
              {[0, 1].map(i => <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-px transition-all duration-300 ${i === testimonialIdx ? 'bg-gold w-8' : 'bg-white/20 w-4'}`} />)}
              <button onClick={() => setTestimonialIdx(i => i === 1 ? 0 : 1)} className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all"><ChevronRight size={15} /></button>
            </div>
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
                    <p className="font-semibold text-charcoal text-sm mb-1 group-hover:text-gold transition-colors">{s.name}</p>
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
                <Image src="/images/founder.jpg" alt="Евгений Романов, основатель EasyMove Elite" fill sizes="80px" className="object-cover object-[center_20%]" />
              </div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Слово основателя</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
                &laquo;Мы остаёмся небольшими, чтобы ваш переезд прошёл безупречно.&raquo;
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Большинство мувинговых компаний растут за счёт количества заказов и отправляют кого попало.
                Мы растём за счёт качества. У каждого клиента — личный координатор.
                Каждая бригада знает ваше здание. Каждый переезд — тот, за который мы готовы отвечать.
              </p>
              <p className="text-gold/60 text-sm font-semibold mb-5">&mdash; Евгений Романов, Основатель</p>
              <a href="tel:+17863051844" className="inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] hover:text-white/70 transition-colors duration-200 border-b border-white/20 pb-px hover:border-white/50">
                <Phone size={11} /> Прямой: 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════ FAQ ══════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Частые вопросы</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal">Ответы на ваши вопросы</h2>
            </div>
            <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
              {FAQS.map((faq, i) => (
                <div key={faq.q} className="py-5">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between text-left">
                    <p className="font-semibold text-charcoal pr-4">{faq.q}</p>
                    <span className="text-gold shrink-0 text-xl">{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && <p className="text-gray-500 text-sm leading-relaxed mt-3">{faq.a}</p>}
                </div>
              ))}
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

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section className="relative bg-charcoal py-16 overflow-hidden">
          <div className="absolute inset-0 grain-overlay" />
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="relative container-max text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Готовы к переезду?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Получите бесплатный расчёт сегодня</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">Координатор перезвонит и подтвердит точную стоимость. Без обязательств.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="gap-2">Бесплатный расчёт <ArrowRight size={14} /></Button>
              </Link>
              <a href="tel:+17863051844" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-8 py-4 hover:border-gold hover:text-gold transition-all">
                <Phone size={14} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
