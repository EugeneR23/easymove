import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AdminSession } from '@/types';

const COOKIE_NAME = 'admin-session';

// Credentials come from the environment. They used to be hardcoded here in
// plaintext and committed to the repo — set ADMIN_EMAIL and ADMIN_PASSWORD in
// Vercel (and .env.local for development). With either unset, admin login is
// refused outright rather than falling back to a known default.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME ?? 'Admin';

/** Constant-time-ish comparison so a wrong password does not leak its length. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function validateCredentials(email: string, password: string): AdminSession | null {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('[auth] ADMIN_EMAIL / ADMIN_PASSWORD are not set — admin login disabled.');
    return null;
  }
  if (safeEqual(email.trim().toLowerCase(), ADMIN_EMAIL.trim().toLowerCase()) && safeEqual(password, ADMIN_PASSWORD)) {
    return {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: 'admin',
      loginAt: new Date().toISOString(),
    };
  }
  return null;
}

export function getSession(): AdminSession | null {
  const cookieStore = cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')) as AdminSession;
  } catch {
    return null;
  }
}

export function requireSession(): AdminSession {
  const session = getSession();
  if (!session) redirect('/admin/login');
  return session;
}

export function sessionToValue(session: AdminSession): string {
  return Buffer.from(JSON.stringify(session)).toString('base64');
}

export { COOKIE_NAME };
