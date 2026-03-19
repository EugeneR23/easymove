import { readAllQuotes } from '@/lib/data/quotes';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import type { QuoteStatus } from '@/types';

export default function AdminQuotesPage() {
  const quotes = readAllQuotes();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">Quotes</h1>
        <p className="text-gray-500 mt-1">{quotes.length} total quote{quotes.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-display mb-2">No quotes yet</p>
            <p className="text-sm">Quotes from the calculator will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Client', 'Route', 'Move Type', 'Date', 'Estimate', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/admin/quotes/${q.id}`} className="font-medium text-charcoal hover:text-gold transition-colors">
                        {q.firstName} {q.lastName}
                      </Link>
                      <p className="text-xs text-gray-400">{q.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {q.fromCity}, {q.fromState} → {q.toCity}, {q.toState}
                    </td>
                    <td className="px-5 py-4 text-gray-500 capitalize">{q.moveType.replace('-', ' ')}</td>
                    <td className="px-5 py-4 text-gray-400">{formatDateShort(q.createdAt)}</td>
                    <td className="px-5 py-4 font-semibold text-gold">{formatCurrency(q.pricing.total)}</td>
                    <td className="px-5 py-4">
                      <Badge label={q.status} variant={q.status as QuoteStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
