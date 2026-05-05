import { Resend } from 'resend';
import twilio from 'twilio';

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

const TO_EMAIL  = process.env.NOTIFY_EMAIL      ?? 'etbcompanyllc24@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM      ?? 'onboarding@resend.dev';
const TG_TOKEN  = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT   = process.env.TELEGRAM_CHAT_ID;

/**
 * Send an email via Resend.
 * Throws on failure so the caller can surface the error.
 *
 * `to` defaults to NOTIFY_EMAIL (the owner's inbox) for internal notifications.
 * Pass an explicit address (e.g. customer email for review requests) to override.
 */
export async function sendEmail(subject: string, html: string, to?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[notify] RESEND_API_KEY not set — email skipped');
    return;
  }

  const recipient = to ?? TO_EMAIL;

  if (FROM_EMAIL === 'onboarding@resend.dev') {
    console.warn('[notify] RESEND_FROM is using the default onboarding@resend.dev sender. ' +
      'This only works when sending to your own Resend-verified email. ' +
      'Set RESEND_FROM to a verified domain address (e.g. noreply@easy-move-florida.com).');
  }

  console.log(`[notify] Sending email via Resend: to=${recipient} from=${FROM_EMAIL} subject="${subject}"`);

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `EasyMove Elite <${FROM_EMAIL}>`,
    to:   recipient,
    subject,
    html,
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
 * Send an SMS to the customer via Twilio.
 * Never throws — failure is logged but does not block the response.
 */
export async function sendSMS(to: string, body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const from       = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    console.warn('[notify] Twilio not configured — SMS skipped');
    return;
  }

  if (!to) {
    console.warn('[notify] SMS skipped — no recipient phone number');
    return;
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({ body, from, to: normalizePhone(to) });
  } catch (err) {
    console.error('[notify] Twilio SMS failed:', err);
  }
}

/**
 * Send a Telegram message via bot API.
 * Never throws — failure is logged but does not block email or the response.
 */
export async function sendTelegram(text: string): Promise<void> {
  if (!TG_TOKEN || !TG_CHAT) {
    console.warn('[notify] Telegram not configured (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing) — skipped');
    return;
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
