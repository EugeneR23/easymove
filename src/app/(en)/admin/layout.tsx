import type { Metadata } from 'next';
import AdminSidebar from '@/components/layout/AdminSidebar';

// Admin pages set no metadata of their own, so they inherited "index, follow"
// and the homepage canonical from the root layout. robots.txt blocks crawling
// of /admin/, which does not stop a linked URL from being indexed.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
  // An empty object replaces the inherited homepage canonical and hreflang.
  alternates: {},
};

/**
 * Chrome only — no session check here.
 *
 * This layout used to call requireSession(), which redirects to /admin/login
 * when there is no cookie. But /admin/login is itself a child of this layout,
 * so an unauthenticated visit redirected to a page that redirected to itself:
 * an infinite loop that made the admin area unreachable (present since the
 * initial deploy). Each protected page calls requireSession() individually
 * instead — see src/app/admin/page.tsx and the leads/quotes/services pages.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
