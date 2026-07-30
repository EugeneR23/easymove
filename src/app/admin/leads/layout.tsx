import { requireSession } from '@/lib/auth';

/**
 * Guards the leads list and the [id] detail page. The detail page is a client
 * component and cannot call requireSession() itself, so the check lives here.
 * The parent /admin layout deliberately does not guard, because /admin/login
 * is one of its children.
 */
export default function AdminLeadsLayout({ children }: { children: React.ReactNode }) {
  requireSession();
  return <>{children}</>;
}
