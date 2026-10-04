import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
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

/**
 * The cookie is signed. Until 2026-10-04 it was base64 JSON with no signature,
 * so anyone could write {"role":"admin"} into it and pass every check. The key
 * is ADMIN_SESSION_SECRET, or ADMIN_PASSWORD when that is not set; with
 * neither, no session is ever valid (admin login is already refused then).
 */
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const signingKey = (): string | null => process.env.ADMIN_SESSION_SECRET || ADMIN_PASSWORD || null;
const sign = (payload: string, key: string): string =>
  createHmac('sha256', key).update(payload).digest('base64url');

export function getSession(): AdminSession | null {
  // Read the cookie first, unconditionally. cookies() is what tells Next.js a
  // page is per-request; returning before it when no key is set at build time
  // prerendered /admin as a static redirect to the login page.
  const raw = cookies().get(COOKIE_NAME)?.value;
  const key = signingKey();
  if (!key) return null;
  if (!raw) return null;
  const dot = raw.lastIndexOf('.');
  if (dot < 1) return null;
  const payload = raw.slice(0, dot);
  const given = Buffer.from(raw.slice(dot + 1));
  const expected = Buffer.from(sign(payload, key));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as AdminSession;
    if (session.role !== 'admin') return null;
    if (Date.now() - Date.parse(session.loginAt) > SESSION_TTL_MS) return null;
    return session;
  } catch {
    return null;
  }
}

/**
 * For API route handlers: a 401 response when there is no valid admin
 * session, null when the caller may proceed. Lead and quote records hold
 * customers' names, phones and emails; only the public POST that creates them
 * is open.
 */
export function unauthorizedUnlessAdmin(): NextResponse | null {
  return getSession() ? null : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function requireSession(): AdminSession {
  const session = getSession();
  if (!session) redirect('/admin/login');
  return session;
}

export function sessionToValue(session: AdminSession): string {
  const key = signingKey();
  if (!key) throw new Error('[auth] no signing key: set ADMIN_SESSION_SECRET or ADMIN_PASSWORD');
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload, key)}`;
}

export { COOKIE_NAME };
