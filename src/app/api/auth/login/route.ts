import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, sessionToValue, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const session = validateCredentials(email, password);
  if (!session) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, sessionToValue(session), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: 'lax',
  });
  return res;
}
