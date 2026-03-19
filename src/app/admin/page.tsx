import { readAllQuotes } from '@/lib/data/quotes';
import { readAllLeads } from '@/lib/data/leads';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import type { LeadStatus, QuoteStatus } from '@/types';

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-100 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{label}</p>
      <p className={`font-display text-4xl font-bold ${color ?? 'text-charcoal'}`}>{value}</p>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const quotes = readAllQuotes();
  const leads = readAllLeads();

  const totalRevenue = quotes
    .filter((q) => q.status === 'accepted')
    .reduce((sum, q) => sum + q.pricing.total, 0);

  const recentLeads = leads.slice(0, 5);
  const recentQuotes = quotes.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here&apos;s an overview of your business.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Quotes" value={quotes.length} sub="All time" />
        <StatCard label="Total Leads" value={leads.length} sub="All time" />
        <StatCard label="Pending Quotes" value={quotes.filter((q) => q.status === 'pending').length} color="text-yellow-600" />
        <StatCard label="Accepted Revenue" value={formatCurrency(totalRevenue)} color="text-green-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-display text-lg font-semibold text-charcoal">Recent Leads</h2>
            <Link href="/admin/leads" className="text-gold text-xs font-semibold uppercase tracking-wider hover:underline">View All</Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No leads yet.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentLeads.map((lead) => (
                <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{lead.firstName} {lead.lastName}</p>
                    <p className="text-xs text-gray-400">{lead.email} · {formatDateShort(lead.createdAt)}</p>
                  </div>
                  <Badge label={lead.status} variant={lead.status as LeadStatus} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Quotes */}
        <div className="bg-white border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-display text-lg font-semibold text-charcoal">Recent Quotes</h2>
            <Link href="/admin/quotes" className="text-gold text-xs font-semibold uppercase tracking-wider hover:underline">View All</Link>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No quotes yet. They&apos;ll appear here after visitors use the quote calculator.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentQuotes.map((quote) => (
                <Link key={quote.id} href={`/admin/quotes/${quote.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{quote.firstName} {quote.lastName}</p>
                    <p className="text-xs text-gray-400">{quote.fromCity} → {quote.toCity} · {formatDateShort(quote.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gold">{formatCurrency(quote.pricing.total)}</span>
                    <Badge label={quote.status} variant={quote.status as QuoteStatus} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
