import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleMapEmbed from '@/components/contact/GoogleMapEmbed';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const siteUrl = 'https://easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'Контакты — EasyMove Elite | Переезды в Майами и Южной Флориде' },
  description:
    'Свяжитесь с EasyMove Elite в Майами, Форт-Лодердейле и Бока-Ратоне. Реальный координатор отвечает в течение нескольких часов. Звоните 786-305-1844 или напишите.',
  alternates: {
    canonical: `${siteUrl}/ru/contact`,
    languages: {
      'en': `${siteUrl}/contact`,
      'ru': `${siteUrl}/ru/contact`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'EasyMove Elite',
    title: 'Контакты — EasyMove Elite',
    description: 'Связаться с координатором, который лично контролирует ваш переезд.',
    url: `${siteUrl}/ru/contact`,
  },
};

export default function RuContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Связаться с нами</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Поговорить с реальным человеком
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Не диспетчер. Не служба поддержки. Координатор, который лично контролирует ваш переезд от первого звонка
              до последней размещённой коробки.
            </p>
          </div>
        </section>

        {/* Contact methods */}
        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
              <div className="bg-white p-8">
                <Phone size={24} className="text-gold mb-4" />
                <h2 className="font-display text-xl font-semibold text-charcoal mb-2">Позвонить</h2>
                <p className="text-gray-500 text-sm mb-4">Самый быстрый способ. Отвечаем сразу с 8:00 до 19:00.</p>
                <a href="tel:+17863051844" className="font-display text-2xl font-bold text-charcoal hover:text-gold transition-colors">
                  786-305-1844
                </a>
                <p className="text-xs text-gray-400 mt-2">Говорим по-русски и по-английски</p>
              </div>
              <div className="bg-white p-8">
                <Mail size={24} className="text-gold mb-4" />
                <h2 className="font-display text-xl font-semibold text-charcoal mb-2">Написать</h2>
                <p className="text-gray-500 text-sm mb-4">Отвечаем в течение нескольких часов в рабочее время.</p>
                <a href="mailto:romanov@easy-move-florida.com" className="font-display text-base font-semibold text-charcoal hover:text-gold transition-colors break-all">
                  romanov@easy-move-florida.com
                </a>
                <p className="text-xs text-gray-400 mt-2">Прямой ящик основателя</p>
              </div>
              <div className="bg-white p-8">
                <Clock size={24} className="text-gold mb-4" />
                <h2 className="font-display text-xl font-semibold text-charcoal mb-2">Часы работы</h2>
                <ul className="text-gray-600 text-sm space-y-1.5">
                  <li>Пн–Сб: 8:00 — 19:00 EST</li>
                  <li>Вс: выходной</li>
                </ul>
                <p className="text-xs text-gray-400 mt-3">Срочные переезды по выходным — звоните.</p>
              </div>
              <div className="bg-white p-8">
                <MapPin size={24} className="text-gold mb-4" />
                <h2 className="font-display text-xl font-semibold text-charcoal mb-2">Зона обслуживания</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Майами-Дейд, Бровард и Палм-Бич. Включая Брикелл, Авентура, Санни-Айлс,
                  Корал-Гейблс, Кокосовый Гров, Форт-Лодердейл, Бока-Ратон и весь регион.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Google Map */}
        <section className="bg-white pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <GoogleMapEmbed />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream py-16">
          <div className="container-max text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Хотите смету сразу?
            </h2>
            <p className="text-gray-500 mb-8">Заполните короткую форму — получите письменную смету в тот же день.</p>
            <Link
              href="/ru#calculator"
              className="inline-flex items-center justify-center gap-2 bg-gold text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-gold/90 transition-colors"
            >
              Бесплатный расчёт
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
