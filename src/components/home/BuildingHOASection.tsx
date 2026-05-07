'use client';

import { FileText, ArrowUpDown, Car, ClipboardCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: FileText,
    title: 'COI within 24 hours',
    body: 'Send your building name and management contact — we issue a Certificate of Insurance naming the building as additional insured. No charge.',
  },
  {
    icon: ArrowUpDown,
    title: 'Elevator + freight reservations',
    body: 'We coordinate elevator hold times and freight elevator hours directly with the front desk so the crew is not waiting in the lobby.',
  },
  {
    icon: Car,
    title: 'Loading zone + parking',
    body: 'Familiar with parking rules across Aventura, Sunny Isles, Miami Beach, and Hollywood high-rises. We handle the logistics, you do not get a ticket.',
  },
  {
    icon: ClipboardCheck,
    title: 'Building rules covered',
    body: 'Floor protection, padded elevators, time-window compliance — we already know what most South Florida buildings ask for.',
  },
];

export default function BuildingHOASection() {
  return (
    <section className="section-padding bg-cream border-t border-gray-100">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-1">
            <div className="w-8 h-px bg-gold mb-6" />
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Buildings &amp; HOAs</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
              Building-fluent crews.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Most condo buildings in South Florida require a COI before move day. Send the building name when you send photos — we handle the paperwork so the front desk does not stop your crew at the door.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white p-7">
                  <div className="w-10 h-10 bg-gold/[0.07] flex items-center justify-center mb-4">
                    <Icon className="text-gold" size={18} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-charcoal mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
