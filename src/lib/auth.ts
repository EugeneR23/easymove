import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AdminSession } from '@/types';

const COOKIE_NAME = 'admin-session';
const ADMIN_CREDENTIALS = {
  email: 'admin@easymove.com',
  password: 'luxury2024',
  name: 'Admin User',
  role: 'admin' as const,
};

export function validateCredentials(email: string, password: string): AdminSession | null {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
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
