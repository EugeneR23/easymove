/**
 * Deposit, cancellation, payment and surcharges — in one place, in three languages.
 *
 * Shaped after src/lib/data/scope.ts, for the same reason. These facts were prose
 * in about a dozen spots, and /terms — the page a customer would actually be held
 * to — contradicted every one of them. It said "Payment is due upon completion of
 * services" while the rest of the site said payment is collected on site about
 * 45-60 minutes *before* the crew finishes, and "Cancellation fees may apply"
 * while the rest of the site promised free cancellation more than 48 hours out.
 *
 * Boilerplate written once from a template is exactly where that happens: nobody
 * re-reads Terms when a policy changes.
 *
 * A null value means the site does not make that claim, the same convention as
 * credentials.ts. No placeholder ever renders.
 */

export const DEPOSIT = {
  /** None, on any move type. Confirmed and stated site-wide. */
  required: false,
} as const;

export const CANCELLATION = {
  /** Free cancellation or reschedule with more than this much notice. */
  freeNoticeHours: 48,
  /** No fee exists. Inside the window we reschedule; we do not charge for it. */
  lateFee: null,
  /**
   * The one exception (owner, 2026-11-09): a crew already dispatched to the
   * address is paid the job minimum. Until that day /terms said "no fee",
   * /pricing said "a partial reschedule fee" and the FAQ said this.
   */
  dispatchedMinimumHours: 3,
} as const;

export const PAYMENT = {
  /**
   * Collected on site once the final hour count is clear — before the job wraps,
   * not after, and never in advance. /terms said "upon completion" until 2026-09-18.
   */
  timing: 'before-completion',
  collectedMinutesBeforeFinish: [45, 60] as const,
  methods: ['cash', 'card', 'apple-pay', 'zelle'] as const,
  cardSurchargePercent: 0,
  /** The only Zelle address. A request to send anywhere else is not from us. */
  zelleAddress: 'romanov@easy-move-florida.com',
} as const;

/**
 * Every one of these is false, permanently. The rate you book is the rate you pay.
 * Owner confirmed 2026-09-18 after one Russian FAQ was found claiming a 10%
 * weekend uplift against roughly fifteen pages saying there is none.
 *
 * heavyItem left this list on 2026-11-09. The owner's answer: a piano, a safe
 * or a marble piece is its own line on the estimate, named before booking. The
 * site had said "no heavy item fee" and "a flat add-on" on the same page.
 */
export const SURCHARGES = {
  weekend: false,
  seasonal: false,
  fuel: false,
  stairs: false,
  elevator: false,
  longCarry: false,
} as const;

/** Piano, safe, marble: a separate line on the estimate, agreed before booking. No published amount. */
export const HEAVY_ITEMS = {
  separateEstimateLine: true,
  publishedAmount: null,
} as const;

export const COI = {
  free: true,
  leadTimeHours: 24,
  namesBuildingAsAdditionalInsured: true,
} as const;

export const RESPONSE = {
  writtenEstimateWithinHours: 24,
  /**
   * Owner, 2026-10-11: a reply within 2 hours, counted in working hours (the
   * hours in hours.ts). Until that day the site carried five hand-typed promises
   * that contradicted each other; claims-guard rule `reply-time-literal` now
   * fails the build on any of them, so copy has to come through replyPromise().
   */
  replyWithinBusinessHours: 2,
  /**
   * Owner, 2026-11-09: "we say 9 to 10, an hour at most, and the crew always
   * calls 30-40 minutes before arriving". Six pages had promised a two-hour
   * window with a 30-minute call while this field was still null.
   */
  arrivalWindowHours: 1 as number | null,
  callAheadMinutes: [30, 40] as const,
} as const;

const ARRIVAL_COPY = {
  en: 'a one-hour arrival window, and the crew calls 30 to 40 minutes before arriving',
  ru: 'окно приезда в один час, и бригада звонит за 30-40 минут до приезда',
  uk: 'вікно приїзду в одну годину, і бригада телефонує за 30-40 хвилин до приїзду',
} as const;

/** The one arrival promise, as a clause that fits inside a sentence or a list. */
export function arrivalPromise(locale: 'en' | 'ru' | 'uk' | 'ua' = 'en'): string {
  return ARRIVAL_COPY[locale === 'ua' ? 'uk' : locale];
}

/**
 * Owner, 2026-10-11: a same-day move is taken when a crew is free, and costs the
 * same as any other day. Competitors in Hollywood charge 10–20% for it, which is
 * why this is stated as an offer rather than buried.
 */
export const SAME_DAY = {
  offered: true,
  onlyWhenCrewAvailable: true,
  surcharge: false,
} as const;

type AnyLocale = 'en' | 'ru' | 'uk' | 'ua';
const norm = (l: AnyLocale): 'en' | 'ru' | 'uk' => (l === 'ua' ? 'uk' : l);

const REPLY_COPY = {
  en: {
    short: `Reply within ${RESPONSE.replyWithinBusinessHours} hours`,
    sentence: `We reply within ${RESPONSE.replyWithinBusinessHours} hours during working hours.`,
  },
  ru: {
    short: `Ответ за ${RESPONSE.replyWithinBusinessHours} часа`,
    sentence: `Отвечаем за ${RESPONSE.replyWithinBusinessHours} часа в рабочее время.`,
  },
  uk: {
    short: `Відповідь за ${RESPONSE.replyWithinBusinessHours} години`,
    sentence: `Відповідаємо за ${RESPONSE.replyWithinBusinessHours} години в робочий час.`,
  },
} as const;

/** The one reply-time promise, in the visitor's language. */
export function replyPromise(locale: AnyLocale = 'en', form: 'short' | 'sentence' = 'sentence'): string {
  return REPLY_COPY[norm(locale)][form];
}

const SAME_DAY_COPY = {
  en: {
    short: 'Same-day moves, no rush fee',
    sentence: 'Need to move today? If a crew is free, we come the same day — at the same hourly rate, with no rush fee.',
  },
  ru: {
    short: 'Срочно в тот же день — без доплаты',
    sentence: 'Нужно переехать сегодня? Если бригада свободна, приедем в тот же день — по обычной ставке, без доплаты за срочность.',
  },
  uk: {
    short: 'Терміново того ж дня — без доплати',
    sentence: 'Потрібно переїхати сьогодні? Якщо бригада вільна, приїдемо того ж дня — за звичайною ставкою, без доплати за терміновість.',
  },
} as const;

/** The same-day offer, in the visitor's language. */
export function sameDayCopy(locale: AnyLocale = 'en', form: 'short' | 'sentence' = 'sentence'): string {
  return SAME_DAY_COPY[norm(locale)][form];
}

interface PolicyCopy {
  deposit: string;
  cancellation: string;
  payment: string;
  surcharges: string;
  coi: string;
}

export const POLICY_COPY: Record<'en' | 'ru' | 'uk', PolicyCopy> = {
  en: {
    deposit:
      'No deposit is taken, on any move. You book the date and pay when the work is done.',
    cancellation:
      `Cancel or reschedule free of charge with more than ${CANCELLATION.freeNoticeHours} hours' notice. ` +
      'Inside that window, call us and we will move the date. There is still no cancellation fee, with one exception: ' +
      `if the crew has already been dispatched to your address, the ${CANCELLATION.dispatchedMinimumHours}-hour minimum is charged.`,
    payment:
      `Payment is collected on site roughly ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} minutes ` +
      'before the crew finishes, once the final hour count is clear, so you can see the work before you pay for it. ' +
      `Cash, card (Visa, MasterCard, Amex, Discover — no surcharge), Apple Pay, or Zelle to ${PAYMENT.zelleAddress}, ` +
      'which is the only Zelle address we use. A request to send Zelle anywhere else does not come from us.',
    surcharges:
      'Nothing is added for weekends, high season, fuel, stairs, elevators or long carries. ' +
      'The hourly rate you book is the hourly rate you pay, seven days a week and year-round. ' +
      'A piano, a safe or a marble piece is a separate line on the estimate, agreed with you before you book.',
    coi:
      `A certificate of insurance goes to your building's management within ${COI.leadTimeHours} hours of booking, ` +
      'free of charge, in the format the building asks for and naming it as additional insured.',
  },
  ru: {
    deposit:
      'Депозита нет ни на одном переезде. Вы бронируете дату и платите, когда работа сделана.',
    cancellation:
      `Отменить или перенести бесплатно можно больше чем за ${CANCELLATION.freeNoticeHours} часа. ` +
      'Если срок меньше, позвоните, перенесём дату. Штрафа за отмену нет и в этом случае, с одним исключением: ' +
      `если бригада уже выехала к вам, оплачивается минимум ${CANCELLATION.dispatchedMinimumHours} часа.`,
    payment:
      `Оплата на месте, примерно за ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} минут ` +
      'до конца работы, когда уже понятно итоговое количество часов — чтобы вы видели результат до того, как платите. ' +
      `Наличные, карта (Visa, MasterCard, Amex, Discover — без комиссии), Apple Pay или Zelle на ${PAYMENT.zelleAddress}. ` +
      'Это единственный наш адрес Zelle: просьба отправить на другой адрес или телефон исходит не от нас.',
    surcharges:
      'Ничего не добавляется за выходные, высокий сезон, топливо, лестницы, лифты или длинный пронос. ' +
      'Вы платите по той ставке, по которой забронировали, в любой день недели и в любой сезон. ' +
      'Пианино, сейф или мраморная плита идут отдельной строкой в смете, сумму называем до брони.',
    coi:
      `Сертификат страхования уходит в управляющую компанию здания в течение ${COI.leadTimeHours} часов после брони, ` +
      'бесплатно, в том формате, который здание требует, с указанием здания как additional insured.',
  },
  uk: {
    deposit:
      'Депозиту немає на жодному переїзді. Ви бронюєте дату й платите, коли роботу зроблено.',
    cancellation:
      `Скасувати або перенести безкоштовно можна більш ніж за ${CANCELLATION.freeNoticeHours} години. ` +
      'Якщо часу менше, зателефонуйте, перенесемо дату. Штрафу за скасування немає і тоді, з одним винятком: ' +
      `якщо бригада вже виїхала до вас, оплачується мінімум ${CANCELLATION.dispatchedMinimumHours} години.`,
    payment:
      `Оплата на місці, приблизно за ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} хвилин ` +
      'до кінця роботи, коли вже зрозуміла підсумкова кількість годин. ' +
      `Готівка, картка (без комісії), Apple Pay або Zelle на ${PAYMENT.zelleAddress} — це єдина наша адреса Zelle.`,
    surcharges:
      'Нічого не додається за вихідні, високий сезон, пальне, сходи, ліфти чи довгий пронос. ' +
      'Ви платите за тією ставкою, за якою забронювали. ' +
      'Піаніно, сейф чи мармурова плита йдуть окремим рядком у кошторисі, суму називаємо до броні.',
    coi:
      `Сертифікат страхування йде до управителя будівлі протягом ${COI.leadTimeHours} годин після броні, безкоштовно, ` +
      'у форматі, який вимагає будівля.',
  },
};
