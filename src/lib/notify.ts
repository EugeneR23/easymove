import { Resend } from 'resend';
import twilio from 'twilio';
import { NotConfiguredError } from './delivery';

export { NotConfiguredError };

/**
 * Escape HTML special characters in user-provided strings before embedding
 * them in Telegram messages that use parse_mode: 'HTML'.
 * Unescaped <, >, & in customer names / cities / notes will cause the
 * Telegram API to return a 400 and drop the notification silently.
 */
export function tgEscape(text: string | undefined | null): string {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Read at call time, not at module load. Captured once as constants, they made
// a test that removed TELEGRAM_* still send a real message from the Vercel build
// (2026-10-11), because the module had already copied the production values.
const toEmail   = () => (process.env.NOTIFY_EMAIL ?? 'romanov@easy-move-florida.com').trim();
const fromEmail = () => (process.env.RESEND_FROM ?? 'onboarding@resend.dev').trim();
const tgToken   = () => process.env.TELEGRAM_BOT_TOKEN?.trim();
const tgChat    = () => process.env.TELEGRAM_CHAT_ID?.trim();
/** Resend's shared test domain. Delivers only to the account owner's own inbox. */
const isSharedSender = (from: string) => /@resend\.dev>?$/i.test(from);


/**
 * Resend's shared onboarding@resend.dev sender delivers only to the account
 * owner's own address. Mail to a customer needs a verified domain sender in
 * RESEND_FROM, so customer-facing mail is skipped (and reported) until then.
 */
/**
 * The sender for mail to CUSTOMERS. Kept apart from RESEND_FROM (owner alerts)
 * since 2026-10-11: switching the one shared variable to romanov@ before Resend
 * had verified the domain made Resend refuse every email, owner alerts
 * included (403 "domain is not verified"). Now the owner's alerts stay on the
 * sender that works, and customer mail starts by itself once Resend verifies.
 */
export const customerFromEmail = () => (process.env.RESEND_CUSTOMER_FROM ?? '').trim();

export function senderVerified(): boolean {
  const from = customerFromEmail();
  return !!process.env.RESEND_API_KEY && from !== '' && !isSharedSender(from);
}

/**
 * Send an email via Resend.
 * Throws on failure so the caller can surface the error.
 *
 * `to` defaults to NOTIFY_EMAIL (the owner's inbox) for internal notifications.
 * Pass an explicit address (e.g. customer email for review requests) to override.
 */
export async function sendEmail(subject: string, html: string, to?: string, opts: { replyTo?: string; from?: string } = {}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[notify] RESEND_API_KEY not set — email not sent');
    throw new NotConfiguredError('email');
  }

  const recipient = to ?? toEmail();
  const FROM_EMAIL = opts.from?.trim() || fromEmail();

  if (isSharedSender(FROM_EMAIL)) {
    console.warn('[notify] RESEND_FROM is using the default onboarding@resend.dev sender. ' +
      'This only works when sending to your own Resend-verified email. ' +
      'Set RESEND_FROM to a verified domain address (e.g. noreply@easy-move-florida.com).');
  }

  console.log(`[notify] Sending email via Resend: to=${recipient} from=${FROM_EMAIL} subject="${subject}"`);

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `Easy Move Florida <${FROM_EMAIL}>`,
    to:   recipient,
    subject,
    html,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
  });

  if (error) {
    console.error('[notify] Resend error:', error);
    throw new Error(error.message);
  }

  console.log('[notify] Resend email sent OK, id:', data?.id);
}

/**
 * Normalise a US phone number to E.164 format (+1XXXXXXXXXX).
 * Returns the original string if the format is unrecognised.
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return phone;
}

/**
 * What happened to an SMS. Skipped and sent must never look the same to a
 * caller: until 2026-09-22 this function returned void and never threw, so
 * `status.sms = result.status === 'fulfilled'` was true whether the message
 * went out, was skipped for missing config, or failed inside Twilio.
 *
 * Production has no TWILIO_* variables at all, so every one of the three call
 * sites had been reporting a delivered SMS for a message that was never sent —
 * including the review request, which is the mechanism behind the single
 * highest-value item in docs/ACTION-PLAN.md.
 */
export type SmsResult =
  | { sent: true }
  | { sent: false; reason: 'not-configured' | 'no-recipient' | 'failed'; detail?: string };

/**
 * Send an SMS to the customer via Twilio.
 * Never throws — it reports instead, so a caller cannot mistake silence for success.
 */
export async function sendSMS(to: string, body: string): Promise<SmsResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const from       = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    console.warn('[notify] Twilio not configured — SMS skipped');
    return { sent: false, reason: 'not-configured' };
  }

  if (!to) {
    console.warn('[notify] SMS skipped — no recipient phone number');
    return { sent: false, reason: 'no-recipient' };
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({ body, from, to: normalizePhone(to) });
    return { sent: true };
  } catch (err) {
    console.error('[notify] Twilio SMS failed:', err);
    return { sent: false, reason: 'failed', detail: (err as Error).message };
  }
}

/**
 * Send a Telegram message via bot API.
 * Throws on failure or missing config, so allSettled reports it as not sent.
 */
export async function sendTelegram(text: string): Promise<void> {
  const TG_TOKEN = tgToken();
  const TG_CHAT = tgChat();
  if (!TG_TOKEN || !TG_CHAT) {
    console.warn('[notify] Telegram not configured (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing) — not sent');
    throw new NotConfiguredError('telegram');
  }

  console.log(`[notify] Sending Telegram message to chat ${TG_CHAT}, length=${text.length}`);

  const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: 'HTML' }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[notify] Telegram API error ${res.status}:`, detail);
    throw new Error(`Telegram ${res.status}: ${detail}`);
  }

  console.log('[notify] Telegram message sent OK');
}
