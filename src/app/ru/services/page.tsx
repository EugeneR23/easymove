import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { ArrowRight, Building2, Truck, Palette, Package, MapPin, Shield, Phone } from 'lucide-react';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'Услуги переезда | Easy Move Florida' },
  description:
    'Локальные, дальние, в высотках, упаковка, специальные предметы — все услуги переезда в Майами, Форт-Лодердейле и Бока-Ратоне. Полная страховка, прозрачные цены.',
  alternates: {
    canonical: `${siteUrl}/ru/services`,
    languages: {
      'en': `${siteUrl}/services`,
      'ru': `${siteUrl}/ru/services`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'EasyMove Elite',
    title: 'Услуги — EasyMove Elite',
    description: 'Все услуги переезда премиум-класса в Южной Флориде.',
    url: `${siteUrl}/ru/services`,
  },
};

const SERVICES = [
  {
    icon: Building2,
    title: 'Жильё и высотки',
    desc: 'Кондо, апартаменты, дома любого размера. Координация лифтов и погрузочных доков, страховка для управляющей компании за 24 часа.',
    price: 'от $129/час',
    href: '/services/residential-moving',
  },
  {
    icon: Truck,
    title: 'Дальние переезды',
    desc: 'Из Южной Флориды в любую точку США. Выделенный грузовик — без объединённых грузов. Реальное окно доставки.',
    price: 'от $1,200',
    href: '/services/long-distance-moving',
  },
  {
    icon: MapPin,
    title: 'Международные переезды',
    desc: 'Упаковка и погрузка на стороне Майами + координация с лицензированным фрахт-форвардером. Латинская Америка, Карибы, Европа.',
    price: 'от $4,500',
    href: '/services/international-moving',
  },
  {
    icon: Building2,
    title: 'Офисы и коммерция',
    desc: 'Переезды по вечерам и выходным, чтобы минимизировать простой. IT и AV-оборудование, разборка и сборка модульной мебели.',
    price: 'от $800',
    href: '/services/office-commercial',
  },
  {
    icon: Palette,
    title: 'Искусство и редкости',
    desc: 'Кастомные ящики, климатический контроль, музейные стандарты. Картины, антиквариат, рояли, скульптуры.',
    price: 'от $800',
    href: '/services/specialty-items',
  },
  {
    icon: Package,
    title: 'Упаковка',
    desc: 'Полная или частичная упаковка качественными материалами. Материалы включены в смету.',
    price: 'от $237',
    href: '/packing-services',
  },
  {
    icon: Shield,
    title: 'Хранение',
    desc: 'Климат-контролируемые склады в Майами-Дейд и Броварде. Помесячно. Мы организуем доставку и возврат.',
    price: 'от $200/мес',
    href: '/services/storage-solutions',
  },
];

export default function RuServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Наши услуги</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Полный спектр премиум-переездов
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              От переезда из студии в Майами до международного контейнера в Европу — одна команда,
              один координатор, один стандарт качества.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="section-padding bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="group block bg-white border border-gray-100 hover:border-gold/40 transition-colors p-6"
                  >
                    <Icon size={28} className="text-gold mb-4" />
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-gold font-semibold text-sm">{s.price}</span>
                      <span className="text-gold text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                        Подробнее <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-16">
          <div className="container-max text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Не уверены какая услуга вам нужна?
            </h2>
            <p className="text-gray-400 mb-8">Позвоните — координатор задаст несколько вопросов и предложит правильный вариант.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 bg-gold text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-gold/90 transition-colors"
              >
                <Phone size={15} /> 786-305-1844
              </a>
              <Link
                href="/ru#calculator"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
              >
                Бесплатный расчёт
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
