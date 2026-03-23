import { NextResponse } from 'next/server';
import { sendTelegram, tgEscape } from '@/lib/notify';

export async function POST(req: Request) {
  try {
    const { phone, name, moveType } = await req.json();
    if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 });

    const lines = [
      '📞 <b>CALLBACK REQUEST</b>',
      `📱 Phone: <b>${tgEscape(phone)}</b>`,
      name     ? `👤 Name: ${tgEscape(name)}`          : null,
      moveType ? `🚚 Move type: ${tgEscape(moveType)}` : null,
      '⚡ From hero quick form — call ASAP',
    ].filter(Boolean).join('\n');

    await sendTelegram(lines).catch(console.error);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[callback] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
