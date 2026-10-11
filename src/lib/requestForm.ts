/**
 * Where a "Calculate / Рассчитать" button sends a visitor.
 *
 * English goes to the /quote wizard. Russian and Ukrainian go to the request
 * form in their own language: on the same page when it has one (id "zayavka",
 * rendered by CTABanner, /ru and /ru/contact), otherwise to a page that does.
 * Until 2026-10-11 every one of these buttons opened the English-only wizard.
 */
import type { MouseEvent } from 'react';

export const REQUEST_FORM_ID = 'zayavka';

type L = 'en' | 'ru' | 'uk' | 'ua';

export function requestFormHref(locale: L): string {
  if (locale === 'ru') return `/ru/contact#${REQUEST_FORM_ID}`;
  if (locale === 'uk' || locale === 'ua') return `/ua#${REQUEST_FORM_ID}`;
  return '/quote';
}

/** onClick for those links: scroll to the form if this page has it. */
export function goToRequestForm(e: MouseEvent, locale: L): void {
  if (locale === 'en' || typeof document === 'undefined') return;
  const el = document.getElementById(REQUEST_FORM_ID);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
