/**
 * The confirmation a customer gets the moment their request lands.
 *
 * Until 2026-10-11 the customer got nothing: SMS is not configured in
 * production and no email to the customer existed in code, so a visitor who
 * submitted a quote heard nothing until the owner happened to see Telegram.
 *
 * Every figure here comes from lib/pricing (passed in) and lib/data/policies.
 * Nothing is typed by hand, so the email cannot promise what the site does not.
 */
import { sendEmail, senderVerified, customerFromEmail } from './notify';
import { CANCELLATION, COI, PAYMENT, replyPromise } from './data/policies';
import { PHONE } from './data/contact';

export type CustomerLocale = 'en' | 'ru' | 'ua';

export type CustomerEmailResult =
  | { sent: true }
  | { sent: false; reason: 'no-recipient' | 'sender-not-verified' | 'failed'; detail?: string };

export interface ConfirmationInput {
  locale: CustomerLocale;
  firstName: string;
  /** Present only for a priced quote. */
  estimate?: { total: number; crewSize: number; estimatedHours: number };
  /** 'custom' = long distance inside Florida, 'referral' = out of state. */
  mode?: 'priced' | 'custom' | 'referral';
  ref: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const money = (n: number) => `$${n.toLocaleString('en-US')}`;

function copy(i: ConfirmationInput) {
  const name = esc(i.firstName.trim());
  const est = i.estimate;
  if (i.locale === 'ru' || i.locale === 'ua') {
    const ua = i.locale === 'ua';
    return {
      subject: ua ? 'Ми отримали вашу заявку — Easy Move Florida' : 'Мы получили вашу заявку — Easy Move Florida',
      hello: ua ? `${name ? name + ', в' : 'В'}ітаємо!` : `${name ? name + ', з' : 'З'}дравствуйте!`,
      lead: ua ? `Дякуємо за заявку. ${replyPromise('ua')}` : `Спасибо за заявку. ${replyPromise('ru')}`,
      estimate: est && i.mode === 'priced'
        ? (ua
          ? `Попередній розрахунок: <b>${money(est.total)}</b> — ${est.crewSize} вантажники, близько ${est.estimatedHours} год, трак включено. Остаточну суму координатор підтвердить письмово.`
          : `Предварительный расчёт: <b>${money(est.total)}</b> — ${est.crewSize} грузчика, около ${est.estimatedHours} ч, грузовик включён. Итоговую сумму координатор подтвердит письменно.`)
        : i.mode === 'custom'
          ? (ua ? 'Далекі переїзди по Флориді рахуємо вручну: письмовий кошторис протягом 24 годин.' : 'Дальние переезды по Флориде считаем вручную: письменная смета в течение 24 часов.')
          : i.mode === 'referral'
            ? (ua ? 'Ми не перевозимо між штатами. Відповімо й підкажемо перевізника з потрібною ліцензією.' : 'Мы не перевозим между штатами. Ответим и подскажем перевозчика с нужной лицензией.')
            : '',
      facts: ua
        ? ['Депозиту немає.', `Скасування безкоштовне більш ніж за ${CANCELLATION.freeNoticeHours} години.`, 'Без доплат за вихідні, сходи й ліфт.', `COI для будинку — безкоштовно протягом ${COI.leadTimeHours} годин.`]
        : ['Депозита нет.', `Отмена бесплатно больше чем за ${CANCELLATION.freeNoticeHours} часа.`, 'Без доплат за выходные, лестницы и лифт.', `COI для здания — бесплатно в течение ${COI.leadTimeHours} часов.`],
      questions: ua ? `Питання? Телефон або WhatsApp: ${PHONE.display}` : `Вопросы? Телефон или WhatsApp: ${PHONE.display}`,
      sign: ua ? 'Євгеній Романов, Easy Move Florida' : 'Евгений Романов, Easy Move Florida',
      ref: 'Номер заявки',
    };
  }
  return {
    subject: 'We got your request — Easy Move Florida',
    hello: `Hi${name ? ' ' + name : ''},`,
    lead: `Thanks for your request. ${replyPromise('en')}`,
    estimate: est && i.mode === 'priced'
      ? `Your preliminary estimate: <b>${money(est.total)}</b> — ${est.crewSize} movers, about ${est.estimatedHours} hours, truck included. A coordinator confirms the final figure in writing.`
      : i.mode === 'custom'
        ? 'Long-distance moves inside Florida are quoted by hand: a written quote within 24 hours.'
        : i.mode === 'referral'
          ? 'We do not move across state lines. We will reply and point you to a properly licensed carrier.'
          : '',
    facts: [
      'No deposit.',
      `Free cancellation more than ${CANCELLATION.freeNoticeHours} hours ahead.`,
      'No surcharges for weekends, stairs or elevators.',
      `Certificate of insurance for your building — free, within ${COI.leadTimeHours} hours.`,
    ],
    questions: `Questions? Call or WhatsApp ${PHONE.display}`,
    sign: 'Evgenii Romanov, Easy Move Florida',
    ref: 'Request number',
  };
}

export function buildConfirmation(i: ConfirmationInput): { subject: string; html: string } {
  const c = copy(i);
  const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;color:#1C1C1E;line-height:1.55">
  <div style="border-top:3px solid #C9A84C;padding:20px 0 4px">
    <p style="margin:0 0 12px;font-size:15px">${c.hello}</p>
    <p style="margin:0 0 12px;font-size:15px">${c.lead}</p>
    ${c.estimate ? `<p style="margin:0 0 12px;font-size:15px">${c.estimate}</p>` : ''}
    <ul style="margin:0 0 14px;padding-left:18px;font-size:14px;color:#444">
      ${c.facts.map((f) => `<li>${f}</li>`).join('')}
    </ul>
    <p style="margin:0 0 4px;font-size:14px">${c.questions}</p>
    <p style="margin:16px 0 0;font-size:14px">${c.sign}<br>
      <span style="color:#777">2130 Stirling Rd, Hollywood, FL 33020 · easy-move-florida.com</span></p>
    <p style="margin:14px 0 0;font-size:12px;color:#999">${c.ref}: ${esc(i.ref)} · Zelle: ${PAYMENT.zelleAddress}</p>
  </div>
</div>`;
  return { subject: c.subject, html };
}

/** Sends the confirmation. Never throws; says why when nothing went out. */
export async function sendCustomerConfirmation(to: string | undefined, input: ConfirmationInput): Promise<CustomerEmailResult> {
  const address = (to ?? '').trim();
  if (!/.+@.+\..+/.test(address)) return { sent: false, reason: 'no-recipient' };
  if (!senderVerified()) return { sent: false, reason: 'sender-not-verified' };
  const { subject, html } = buildConfirmation(input);
  try {
    await sendEmail(subject, html, address, { replyTo: 'romanov@easy-move-florida.com', from: customerFromEmail() });
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: 'failed', detail: (err as Error).message };
  }
}

/** One line for the owner: did the customer hear back automatically? */
export function confirmationNote(r: CustomerEmailResult): string {
  if (r.sent) return 'Customer got an automatic confirmation email';
  if (r.reason === 'no-recipient') return 'No customer email given — call them';
  if (r.reason === 'sender-not-verified') return 'Customer confirmation NOT sent: Resend domain not verified yet — call them';
  return `Customer confirmation FAILED (${r.detail ?? 'unknown'}) — call them`;
}

/** Normalise whatever locale a form sent into one we write in. */
export function customerLocale(raw: unknown): CustomerLocale {
  return raw === 'ru' ? 'ru' : raw === 'ua' || raw === 'uk' ? 'ua' : 'en';
}
