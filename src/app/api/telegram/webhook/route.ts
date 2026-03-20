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
 *      curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://www.easy-move-florida.com/api/telegram/webhook&secret_token=<WEBHOOK_SECRET>"
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

const TG_TOKEN      = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT  = process.env.TELEGRAM_CHAT_ID;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

async function reply(chatId: number | string, text: string): Promise<void> {
  if (!TG_TOKEN) {
    console.error('[telegram/webhook] reply: TELEGRAM_BOT_TOKEN is not set — cannot send message');
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[telegram/webhook] sendMessage FAILED ${res.status} for chat ${chatId}:`, detail);
  } else {
    console.log(`[telegram/webhook] sendMessage OK → chat ${chatId}`);
  }
}

export async function POST(req: NextRequest) {
  console.log('[telegram/webhook] Incoming POST request');

  // ── Webhook secret validation ────────────────────────────────────────────────
  if (WEBHOOK_SECRET) {
    const incomingSecret = req.headers.get('x-telegram-bot-api-secret-token');
    if (incomingSecret !== WEBHOOK_SECRET) {
      console.warn('[telegram/webhook] Secret mismatch — rejecting request. Received:', incomingSecret ? '[present but wrong]' : '[missing]');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log('[telegram/webhook] Webhook secret validated OK');
  } else {
    console.warn('[telegram/webhook] TELEGRAM_WEBHOOK_SECRET is not set — webhook is unprotected');
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    console.log('[telegram/webhook] Raw update:', JSON.stringify(body).slice(0, 500));
  } catch {
    console.error('[telegram/webhook] Failed to parse JSON body');
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const message = body?.message as Record<string, unknown> | undefined;
  if (!message) {
    console.log('[telegram/webhook] No message field in update (may be edited_message, channel_post, etc.) — ignoring');
    return NextResponse.json({ ok: true });
  }

  const chatId = (message?.chat as Record<string, unknown>)?.id as number | string;
  const text   = ((message?.text as string) ?? '').trim();
  const fromId = (message?.from as Record<string, unknown>)?.id;

  console.log(`[telegram/webhook] Message from chat=${chatId} user=${fromId} text="${text}"`);

  if (!chatId) {
    console.warn('[telegram/webhook] No chat.id found in message — ignoring');
    return NextResponse.json({ ok: true });
  }

  // ── Security: only respond to the owner's chat ───────────────────────────────
  if (!ALLOWED_CHAT) {
    console.warn('[telegram/webhook] TELEGRAM_CHAT_ID is not set — responding to ALL chats (insecure). Set this env var.');
  } else if (String(chatId) !== String(ALLOWED_CHAT)) {
    console.warn(`[telegram/webhook] Blocked: chat ${chatId} is not the allowed chat (${ALLOWED_CHAT})`);
    return NextResponse.json({ ok: true });
  } else {
    console.log(`[telegram/webhook] Chat ID verified: ${chatId}`);
  }

  // ── /nextjob ─────────────────────────────────────────────────────────────────
  if (text === '/nextjob' || text.startsWith('/nextjob ')) {
    console.log('[telegram/webhook] Handling /nextjob command');
    try {
      const job = await getNextJob();

      if (!job) {
        console.log('[telegram/webhook] /nextjob: no upcoming jobs found');
        await reply(
          chatId,
          '📭 <b>No upcoming jobs scheduled.</b>\n\n' +
          'To add one:\n' +
          '1. Open the record in Airtable\n' +
          '2. Set the <b>Job Date</b> field\n' +
          '3. Make sure <b>Status</b> is not Completed, Lost, or Cancelled\n\n' +
          'Then send /nextjob again.',
        );
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

        console.log('[telegram/webhook] /nextjob: sending job details for:', job['Name']);
        await reply(chatId, msg);
      }
    } catch (err) {
      console.error('[telegram/webhook] /nextjob error:', err);
      await reply(chatId, '⚠️ <b>Error fetching job data.</b>\n\nCheck Vercel logs for details.\nLikely cause: wrong AIRTABLE_BASE_ID or AIRTABLE_API_KEY.');
    }

    return NextResponse.json({ ok: true });
  }

  // ── Unknown command ───────────────────────────────────────────────────────────
  if (text.startsWith('/')) {
    console.log(`[telegram/webhook] Unknown command: "${text}"`);
    await reply(chatId, '🤖 <b>EasyMove Elite Bot</b>\n\nAvailable commands:\n/nextjob — Show the next upcoming job');
  } else if (text) {
    console.log(`[telegram/webhook] Plain text message, no action taken: "${text.slice(0, 80)}"`);
  }

  return NextResponse.json({ ok: true });
}
