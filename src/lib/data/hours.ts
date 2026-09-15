/**
 * Opening hours, in one place.
 *
 * These were twelve separate literals — footer, contact page, two FAQ answers,
 * the quote summary, the pricing block, llms.txt, the Russian contact page, a
 * Russian city fact, and two independently written schema.org blocks. All twelve
 * happened to agree, which is the only reason nobody noticed they had drifted
 * away from the Google Business Profile: the site said Monday–Saturday 8–7 and
 * closed Sunday, while the profile said Monday–Friday 9–7 and weekends 10–6.
 *
 * Google reconciles hours across a business's own site, its profile and the
 * directories that cite it. Two answers is worse than either answer alone.
 *
 * The owner confirmed the profile is right. Change a value here and the site,
 * both JSON-LD blocks and the machine-readable files all move together.
 */

export interface HoursBlock {
  /** schema.org day names, in week order. */
  days: readonly string[];
  /** 24-hour "HH:MM", as OpeningHoursSpecification wants it. */
  opens: string;
  closes: string;
}

export const BUSINESS_HOURS: readonly HoursBlock[] = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
  { days: ['Saturday', 'Sunday'], opens: '10:00', closes: '18:00' },
];

export const HOURS_TZ = 'EST';

type Locale = 'en' | 'ru' | 'uk';

/** "9:00 AM" from "09:00". */
function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** "9" from "09:00" — the short form drops the minutes when they are zero. */
function to12hShort(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? String(hour) : `${hour}:${String(m).padStart(2, '0')}`;
}

const DAY_ABBR: Record<Locale, Record<string, string>> = {
  en: { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' },
  ru: { Monday: 'Пн', Tuesday: 'Вт', Wednesday: 'Ср', Thursday: 'Чт', Friday: 'Пт', Saturday: 'Сб', Sunday: 'Вс' },
  uk: { Monday: 'Пн', Tuesday: 'Вт', Wednesday: 'Ср', Thursday: 'Чт', Friday: 'Пт', Saturday: 'Сб', Sunday: 'Нд' },
};

/** English only: the Slavic sentences are hand-written, see hoursSentence. */
const DAY_FULL = {
  en: { Monday: 'Monday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' } as Record<string, string>,
};

function range(block: HoursBlock, locale: Locale): string {
  const a = DAY_ABBR[locale][block.days[0]];
  const b = DAY_ABBR[locale][block.days[block.days.length - 1]];
  return `${a}–${b}`;
}

/** Two OpeningHoursSpecification objects for JSON-LD. */
export function hoursSchema() {
  return BUSINESS_HOURS.map((b) => ({
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: [...b.days],
    opens: b.opens,
    closes: b.closes,
  }));
}

/** schema.org `openingHours` shorthand: ['Mo-Fr 09:00-19:00', 'Sa-Su 10:00-18:00']. */
export function hoursOpeningHours(): string[] {
  const SHORT: Record<string, string> = {
    Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th', Friday: 'Fr', Saturday: 'Sa', Sunday: 'Su',
  };
  return BUSINESS_HOURS.map(
    (b) => `${SHORT[b.days[0]]}-${SHORT[b.days[b.days.length - 1]]} ${b.opens}-${b.closes}`,
  );
}

/**
 * One line for a footer or a contact card.
 * en long:  "Mon–Fri 9:00 AM–7:00 PM · Sat–Sun 10:00 AM–6:00 PM EST"
 * en short: "Mon–Fri 9–7 · Sat–Sun 10–6 EST"
 */
export function hoursLine(locale: Locale = 'en', style: 'long' | 'short' = 'long'): string {
  const fmt = style === 'long' ? to12h : to12hShort;
  const parts = BUSINESS_HOURS.map((b) =>
    locale === 'en'
      ? `${range(b, locale)} ${fmt(b.opens)}–${fmt(b.closes)}`
      : `${range(b, locale)} ${b.opens}–${b.closes}`,
  );
  return `${parts.join(' · ')} ${HOURS_TZ}`;
}

/**
 * Prose form, for a sentence inside an FAQ answer.
 *
 * Russian and Ukrainian are hand-written per locale rather than assembled from
 * day names: "с понедельника по пятницу" needs the accusative, "по субботам"
 * the dative plural, and a formatter that glues nominative day names together
 * produces confident-looking nonsense. Only the times are interpolated.
 */
export function hoursSentence(locale: Locale = 'en'): string {
  const [wk, we] = BUSINESS_HOURS;
  if (locale === 'ru') {
    return `с понедельника по пятницу ${wk.opens}–${wk.closes}, по субботам и воскресеньям ${we.opens}–${we.closes} ${HOURS_TZ}`;
  }
  if (locale === 'uk') {
    return `з понеділка по п'ятницю ${wk.opens}–${wk.closes}, по суботах і неділях ${we.opens}–${we.closes} ${HOURS_TZ}`;
  }
  return (
    `${DAY_FULL.en[wk.days[0]]} to ${DAY_FULL.en[wk.days[wk.days.length - 1]]}, ` +
    `${to12h(wk.opens)} to ${to12h(wk.closes)}, and ${DAY_FULL.en[we.days[0]]} and ` +
    `${DAY_FULL.en[we.days[we.days.length - 1]]}, ${to12h(we.opens)} to ${to12h(we.closes)} ${HOURS_TZ}`
  );
}

/** Rows for a two-line contact card: [{ label: 'Monday – Friday', time: '9:00 AM – 7:00 PM' }, ...]. */
export function hoursRows(locale: Locale = 'en'): { label: string; time: string }[] {
  return BUSINESS_HOURS.map((b) => {
    const first = b.days[0];
    const last = b.days[b.days.length - 1];
    const label =
      locale === 'en'
        ? `${DAY_FULL.en[first]} – ${DAY_FULL.en[last]}`
        : `${DAY_ABBR[locale][first]} – ${DAY_ABBR[locale][last]}`;
    const time = locale === 'en' ? `${to12h(b.opens)} – ${to12h(b.closes)}` : `${b.opens} – ${b.closes}`;
    return { label, time };
  });
}
