import { requireSession } from '@/lib/auth';
import { readAllServicesAdmin } from '@/lib/data/services';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function AdminServicesPage() {
  requireSession();
  const services = readAllServicesAdmin();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">Services</h1>
        <p className="text-gray-500 mt-1">Service catalog — {services.length} services</p>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Service', 'Category', 'Starting Price', 'Sort', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-charcoal">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.tagline}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 capitalize">{s.category}</td>
                  <td className="px-5 py-4 font-semibold text-charcoal">
                    {formatCurrency(s.startingPrice)}
                    <span className="text-gray-400 font-normal ml-1 text-xs">{s.priceUnit}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{s.sortOrder}</td>
                  <td className="px-5 py-4">
                    <Badge label={s.isActive ? 'Active' : 'Hidden'} variant={s.isActive ? 'accepted' : 'lost'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
