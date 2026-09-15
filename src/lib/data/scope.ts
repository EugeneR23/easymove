/**
 * What the company will and will not move — in one place, in three languages.
 *
 * This existed as prose in roughly twenty spots and had already drifted into
 * flat contradiction: the homepage offered moves "anywhere in Florida or out of
 * state" while its own FAQ said we neither quote nor take them, and
 * /miami-beach-movers answered "Do you move between Miami Beach and other
 * states?" with "Yes — New York, Chicago, Texas and the Carolinas are routes we
 * run regularly." Every copy that can import instead of restate now does.
 *
 * The rule itself: long-distance inside Florida is a real service, quoted per
 * move. Crossing a state line with household goods needs federal operating
 * authority (USDOT_NUMBER in credentials.ts, currently null), so it is refused
 * and referred.
 *
 * If USDOT_NUMBER ever becomes non-null, every string below is wrong. Rewrite
 * them; do not branch on it, because "we might have authority" is not something
 * a customer-facing sentence can hedge.
 */

export interface ScopeCopy {
  /** One sentence, for a service-area line or a meta description. */
  short: string;
  /** Full explanation, for a service page intro or a detailed FAQ answer. */
  long: string;
  /** Ready-made FAQ pair — the question people actually ask. */
  faq: { q: string; a: string };
  /** Machine-readable line for llms.txt, where ambiguity gets repeated verbatim. */
  llms: string;
}

const EN_LONG =
  'We are a Florida mover. Local work across Miami-Dade, Broward and Palm Beach is billed hourly. ' +
  'Moves to anywhere else in Florida — Orlando, Tampa, Naples, Jacksonville — are quoted individually by ' +
  'distance, volume and access at both ends. We do not move household goods across a state line: that ' +
  'requires federal operating authority we do not hold, so we neither quote nor take interstate jobs. ' +
  'If you are leaving Florida, call 786-305-1844 anyway — we will point you to a licensed carrier, and we ' +
  'can still pack your home or handle the Florida-side leg.';

const RU_LONG =
  'Мы флоридская компания. Локальные переезды по Майами-Дейд, Бровард и Палм-Бич считаются почасово. ' +
  'Переезд в любую другую точку Флориды — Орландо, Тампа, Нейплс, Джексонвилл — считаем индивидуально: ' +
  'по расстоянию, объёму и доступу с обеих сторон. Через границу штата вещи мы не возим: на это нужно ' +
  'федеральное разрешение, которого у нас нет, поэтому межштатные переезды мы не берём и не оцениваем. ' +
  'Если вы уезжаете из Флориды — всё равно позвоните на 786-305-1844: подскажем лицензированного ' +
  'перевозчика, а упаковку и флоридское плечо возьмём на себя.';

const UK_LONG =
  'Ми флоридська компанія. Локальні переїзди по Маямі-Дейд, Бровард і Палм-Біч рахуються погодинно. ' +
  'Переїзд у будь-яку іншу точку Флориди — Орландо, Тампа, Нейплс, Джексонвілл — рахуємо індивідуально: ' +
  'за відстанню, обсягом і доступом з обох боків. Через кордон штату речі ми не возимо: на це потрібен ' +
  'федеральний дозвіл, якого ми не маємо, тому міжштатні переїзди не беремо й не оцінюємо. ' +
  'Якщо ви виїжджаєте з Флориди — все одно зателефонуйте на 786-305-1844: підкажемо ліцензованого ' +
  'перевізника, а пакування й флоридське плече візьмемо на себе.';

export const SERVICE_SCOPE: Record<'en' | 'ru' | 'uk', ScopeCopy> = {
  en: {
    short:
      'Local moves across Miami-Dade, Broward and Palm Beach; long-distance anywhere inside Florida by custom estimate. No out-of-state moves.',
    long: EN_LONG,
    faq: { q: 'Do you do long-distance or out-of-state moves?', a: EN_LONG },
    llms:
      '- Long-distance: offered anywhere inside Florida, quoted individually. Interstate / out-of-state: NOT offered — the company holds no federal operating authority. For a move leaving Florida it refers a licensed carrier and can do packing and the Florida-side leg only.',
  },
  ru: {
    short:
      'Локальные переезды по Майами-Дейд, Бровард и Палм-Бич; дальние — в любую точку Флориды по индивидуальной смете. В другие штаты не возим.',
    long: RU_LONG,
    faq: { q: 'Делаете ли вы дальние переезды или переезды в другой штат?', a: RU_LONG },
    llms:
      '- Дальние переезды: по Флориде — да, смета индивидуальная. Межштатные — нет, федерального разрешения у компании нет. При переезде из штата компания рекомендует лицензированного перевозчика и берёт только упаковку и флоридское плечо.',
  },
  uk: {
    short:
      'Локальні переїзди по Маямі-Дейд, Бровард і Палм-Біч; далекі — у будь-яку точку Флориди за індивідуальним кошторисом. В інші штати не возимо.',
    long: UK_LONG,
    faq: { q: 'Чи робите ви далекі переїзди або переїзди в інший штат?', a: UK_LONG },
    llms:
      '- Далекі переїзди: по Флориді — так, кошторис індивідуальний. Міжштатні — ні, федерального дозволу компанія не має.',
  },
};
