import { NextResponse } from 'next/server';
import { sendTelegram, tgEscape } from '@/lib/notify';

// ─── Simple in-memory rate limiter ────────────────────────────────────────────
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX       = 3;      // max 3 requests per IP per minute
const ipLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { phone, name, moveType } = await req.json();
    if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 });

    const lines = [
      '📞 <b>CALLBACK REQUEST</b>',
      `📱 Phone: <b>${tgEscape(phone)}</b>`,
      name     ? `👤 Name: ${tgEscape(name)}`          : null,
      moveType ? `🚚 Move type: ${tgEscape(moveType)}` : null,
      '⚡ From hero quick form — call ASAP',
    ].filter(Boolean).join('\n');

    await sendTelegram(lines);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[callback] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
