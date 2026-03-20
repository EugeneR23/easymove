import { Resend } from 'resend';
import twilio from 'twilio';

const TO_EMAIL  = process.env.NOTIFY_EMAIL      ?? 'etbcompanyllc24@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM      ?? 'onboarding@resend.dev';
const TG_TOKEN  = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT   = process.env.TELEGRAM_CHAT_ID;

/**
 * Send an email via Resend.
 * Throws on failure so the caller can surface the error.
 */
export async function sendEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[notify] RESEND_API_KEY not set — email skipped');
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `EasyMove Elite <${FROM_EMAIL}>`,
    to:   TO_EMAIL,
    subject,
    html,
  });

  if (error) {
    console.error('[notify] Resend error:', error);
    throw new Error(error.message);
  }
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
    console.warn('[notify] Telegram not configured — skipped');
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: 'HTML' }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[notify] Telegram API error:', res.status, body);
    }
  } catch (err) {
    console.error('[notify] Telegram fetch failed:', err);
  }
}
