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
 */
export const SURCHARGES = {
  weekend: false,
  seasonal: false,
  fuel: false,
  stairs: false,
  elevator: false,
  longCarry: false,
  heavyItem: false,
} as const;

export const COI = {
  free: true,
  leadTimeHours: 24,
  namesBuildingAsAdditionalInsured: true,
} as const;

export const RESPONSE = {
  writtenEstimateWithinHours: 24,
  /**
   * The site carries five different reply-time promises — "2 business hours",
   * "within hours", "a few hours", "< 2 ч", "during business hours". None is
   * confirmed, so none is asserted from here until one is.
   * [TODO: Evgenii] the real number, and whether it is business hours or clock hours.
   */
  replyWithinBusinessHours: null as number | null,
  /** Same: an arrival window is promised in three places with two different shapes. */
  arrivalWindowHours: null as number | null,
} as const;

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
      'Inside that window, call us and we will move the date — there is no cancellation fee.',
    payment:
      `Payment is collected on site roughly ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} minutes ` +
      'before the crew finishes, once the final hour count is clear, so you can see the work before you pay for it. ' +
      `Cash, card (Visa, MasterCard, Amex, Discover — no surcharge), Apple Pay, or Zelle to ${PAYMENT.zelleAddress}, ` +
      'which is the only Zelle address we use. A request to send Zelle anywhere else does not come from us.',
    surcharges:
      'Nothing is added for weekends, high season, fuel, stairs, elevators, long carries or heavy items. ' +
      'The hourly rate you book is the hourly rate you pay, seven days a week and year-round.',
    coi:
      `A certificate of insurance goes to your building's management within ${COI.leadTimeHours} hours of booking, ` +
      'free of charge, in the format the building asks for and naming it as additional insured.',
  },
  ru: {
    deposit:
      'Депозита нет ни на одном переезде. Вы бронируете дату и платите, когда работа сделана.',
    cancellation:
      `Отменить или перенести бесплатно можно больше чем за ${CANCELLATION.freeNoticeHours} часа. ` +
      'Если срок меньше — позвоните, перенесём дату; штрафа за отмену у нас нет.',
    payment:
      `Оплата на месте, примерно за ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} минут ` +
      'до конца работы, когда уже понятно итоговое количество часов — чтобы вы видели результат до того, как платите. ' +
      `Наличные, карта (Visa, MasterCard, Amex, Discover — без комиссии), Apple Pay или Zelle на ${PAYMENT.zelleAddress}. ` +
      'Это единственный наш адрес Zelle: просьба отправить на другой адрес или телефон исходит не от нас.',
    surcharges:
      'Ничего не добавляется за выходные, высокий сезон, топливо, лестницы, лифты, длинный пронос или тяжёлые вещи. ' +
      'Ставка, по которой вы забронировали, — это ставка, по которой вы платите, в любой день недели и в любой сезон.',
    coi:
      `Сертификат страхования уходит в управляющую компанию здания в течение ${COI.leadTimeHours} часов после брони, ` +
      'бесплатно, в том формате, который здание требует, с указанием здания как additional insured.',
  },
  uk: {
    deposit:
      'Депозиту немає на жодному переїзді. Ви бронюєте дату й платите, коли роботу зроблено.',
    cancellation:
      `Скасувати або перенести безкоштовно можна більш ніж за ${CANCELLATION.freeNoticeHours} години. ` +
      'Якщо часу менше — зателефонуйте, перенесемо дату; штрафу за скасування ми не беремо.',
    payment:
      `Оплата на місці, приблизно за ${PAYMENT.collectedMinutesBeforeFinish[0]}–${PAYMENT.collectedMinutesBeforeFinish[1]} хвилин ` +
      'до кінця роботи, коли вже зрозуміла підсумкова кількість годин. ' +
      `Готівка, картка (без комісії), Apple Pay або Zelle на ${PAYMENT.zelleAddress} — це єдина наша адреса Zelle.`,
    surcharges:
      'Нічого не додається за вихідні, високий сезон, пальне, сходи, ліфти, довгий пронос чи важкі речі. ' +
      'Ставка, за якою ви забронювали, — це ставка, за якою ви платите.',
    coi:
      `Сертифікат страхування йде до управителя будівлі протягом ${COI.leadTimeHours} годин після броні, безкоштовно, ` +
      'у форматі, який вимагає будівля.',
  },
};
