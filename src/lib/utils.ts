import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// PHONE_E164, PHONE_DISPLAY, WHATSAPP_NUMBER and whatsappUrl moved to
// src/lib/data/contact.ts on 2026-09-18. The first two had zero importers in
// the whole repository while 282 phone literals sat in the pages, so they were
// not centralisation — they were a second place to be wrong. No re-export is
// left here on purpose: that would preserve the two-ways-to-say-it problem the
// move exists to end.
