import { requireSession } from '@/lib/auth';

/**
 * Guards the quotes list and the [id] detail page. The detail page is a client
 * component and cannot call requireSession() itself, so the check lives here.
 */
export default function AdminQuotesLayout({ children }: { children: React.ReactNode }) {
  requireSession();
  return <>{children}</>;
}
