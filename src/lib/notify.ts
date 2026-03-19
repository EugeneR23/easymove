import { Resend } from 'resend';

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
