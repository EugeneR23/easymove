import { readAllLeads } from '@/lib/data/leads';
import { formatDateShort } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import type { LeadStatus } from '@/types';

export default function AdminLeadsPage() {
  const leads = readAllLeads();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">Leads</h1>
        <p className="text-gray-500 mt-1">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-display mb-2">No leads yet</p>
            <p className="text-sm">Leads from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Source', 'From → To', 'Date', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium text-charcoal hover:text-gold transition-colors">
                        {lead.firstName} {lead.lastName}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{lead.email}</td>
                    <td className="px-5 py-4 text-gray-500">{lead.phone || '—'}</td>
                    <td className="px-5 py-4 text-gray-400 capitalize">{lead.source.replace('-', ' ')}</td>
                    <td className="px-5 py-4 text-gray-500">
                      {lead.fromCity && lead.toCity ? `${lead.fromCity} → ${lead.toCity}` : '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-400">{formatDateShort(lead.createdAt)}</td>
                    <td className="px-5 py-4">
                      <Badge label={lead.status} variant={lead.status as LeadStatus} />
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
