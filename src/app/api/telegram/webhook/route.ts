/**
 * Telegram Webhook — EasyMove Elite
 *
 * Handles incoming Telegram bot messages and supports the /nextjob command,
 * which reads the next upcoming job from Airtable.
 *
 * ── SETUP (one-time, manual) ─────────────────────────────────────────────────
 *
 * 1. Set these environment variables in Vercel:
 *      TELEGRAM_BOT_TOKEN       your bot token from @BotFather
 *      TELEGRAM_CHAT_ID         your personal chat ID (for outbound lead alerts)
 *      TELEGRAM_WEBHOOK_SECRET  any random string you generate, e.g. openssl rand -hex 32
 *
 * 2. Register the webhook URL with Telegram (run once after deploying):
 *      curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://www.easymoveelite.com/api/telegram/webhook&secret_token=<WEBHOOK_SECRET>"
 *
 * 3. Supported commands (send to your bot):
 *      /nextjob   → returns the nearest upcoming confirmed job from Airtable
 *
 * ── NOTES ────────────────────────────────────────────────────────────────────
 * - Only responds to messages from your own chat (TELEGRAM_CHAT_ID) to prevent
 *   strangers from querying your CRM data.
 * - Airtable Job Date must be filled in manually by Eugene after confirming a job.
 * - A record shows up in /nextjob once Status ≠ Completed/Lost and Job Date is set.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getNextJob } from '@/lib/airtable';
import { tgEscape } from '@/lib/notify';

const TG_TOKEN    = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT = process.env.TELEGRAM_CHAT_ID;        // only respond to this chat
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

async function reply(chatId: number | string, text: string): Promise<void> {
  if (!TG_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

export async function POST(req: NextRequest) {
  // Validate Telegram webhook secret header
  if (WEBHOOK_SECRET) {
    const incomingSecret = req.headers.get('x-telegram-bot-api-secret-token');
    if (incomingSecret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const message = body?.message as Record<string, unknown> | undefined;
  if (!message) return NextResponse.json({ ok: true });

  const chatId  = (message?.chat as Record<string, unknown>)?.id as number | string;
  const text    = ((message?.text as string) ?? '').trim();

  if (!chatId) return NextResponse.json({ ok: true });

  // Security: only respond to the configured chat (your own Telegram account)
  if (ALLOWED_CHAT && String(chatId) !== String(ALLOWED_CHAT)) {
    console.warn('[telegram/webhook] Message from unknown chat:', chatId);
    return NextResponse.json({ ok: true });
  }

  // ── /nextjob ────────────────────────────────────────────────────────────────
  if (text === '/nextjob' || text.startsWith('/nextjob ')) {
    try {
      const job = await getNextJob();

      if (!job) {
        await reply(chatId, '📭 No upcoming jobs in Airtable.\n\nMake sure a record has <b>Job Date</b> set and <b>Status</b> is not Completed or Lost.');
      } else {
        const f = (key: string) => tgEscape(String(job[key] ?? '—'));
        const msg = [
          '📅 <b>Next Upcoming Job</b>',
          '',
          `👤 <b>${f('Name')}</b>`,
          `📞 ${f('Phone')}`,
          `📦 ${f('Move Type')}${job['Home Size'] ? ' · ' + f('Home Size') : ''}`,
          `📍 ${f('From City')} → ${f('To City')}`,
          `📅 Job Date: <b>${f('Job Date')}</b>`,
          `🏷 Status: ${f('Status')}`,
          job['Notes'] ? `\n💬 ${f('Notes')}` : '',
        ].filter(Boolean).join('\n');

        await reply(chatId, msg);
      }
    } catch (err) {
      console.error('[telegram/webhook] /nextjob error:', err);
      await reply(chatId, '⚠️ Could not fetch job data.\nCheck Airtable connection and environment variables.');
    }

    return NextResponse.json({ ok: true });
  }

  // ── Unknown command ──────────────────────────────────────────────────────────
  if (text.startsWith('/')) {
    await reply(chatId, '🤖 EasyMove Elite Bot\n\nAvailable commands:\n/nextjob — Show the next upcoming job');
  }

  return NextResponse.json({ ok: true });
}
