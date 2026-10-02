import AdminSidebar from '@/components/layout/AdminSidebar';

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
