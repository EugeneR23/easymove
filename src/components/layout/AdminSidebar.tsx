'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, FileText, Briefcase, LogOut } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="w-64 min-h-screen bg-charcoal flex flex-col shrink-0">
      <div className="p-6 border-b border-charcoal-light">
        <Link href="/" className="font-display text-xl font-bold text-white">
          EasyMove<span className="text-gold">Elite</span>
        </Link>
        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                active
                  ? 'bg-gold/15 text-gold border-l-2 border-gold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-charcoal-light">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
