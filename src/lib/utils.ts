import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MARKET } from '@/config/market';

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

// Re-exported from the market config so the ~40 files that already import these
// follow the deployment they are built for without being touched.
export const PHONE_E164 = MARKET.phone.e164;
export const PHONE_DISPLAY = MARKET.phone.display;
export const WHATSAPP_NUMBER = MARKET.phone.whatsapp;

export function whatsappUrl(message = "Hi, I'd like a moving quote"): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
