'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Quote, QuoteStatus } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { formatDate, formatCurrency } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
];

export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState<QuoteStatus>('pending');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/quotes/${id}`)
      .then((r) => r.json())
      .then((data: Quote) => {
        setQuote(data);
        setStatus(data.status);
        setNotes(data.adminNotes ?? '');
      });
  }, [id]);

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes: notes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setQuote(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (!quote) return <div className="p-8 text-gray-500">Loading...</div>;

  const { pricing } = quote;
  const lineItems = [
    { label: 'Base Rate', value: pricing.baseRate },
    { label: 'Distance Fee', value: pricing.distanceFee },
    { label: 'Inventory Fee', value: pricing.inventoryFee },
    { label: 'Add-ons', value: pricing.addonsFee },
    ...(pricing.discount > 0 ? [{ label: 'Discount', value: -pricing.discount }] : []),
  ].filter((i) => i.value !== 0);

  return (
    <div className="p-8 max-w-5xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-charcoal text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Quotes
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">{quote.firstName} {quote.lastName}</h1>
          <p className="text-gray-500 mt-1">Quote #{quote.id.slice(-8).toUpperCase()} · {formatDate(quote.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold text-gold">{formatCurrency(pricing.total)}</span>
          <Badge label={quote.status} variant={quote.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Move Details */}
          <div className="bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Move Details</h2>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              {[
                { label: 'Move Type', value: quote.moveType.replace('-', ' ') },
                { label: 'Distance', value: `~${quote.estimatedDistance} miles` },
                { label: 'From', value: `${quote.fromCity}, ${quote.fromState} ${quote.fromZip}` },
                { label: 'To', value: `${quote.toCity}, ${quote.toState} ${quote.toZip}` },
                { label: 'Preferred Date', value: quote.preferredDate ? formatDate(quote.preferredDate) : 'TBD' },
                { label: 'Flexible Dates', value: quote.flexibleDates ? 'Yes' : 'No' },
                { label: 'Bedrooms', value: quote.inventory.bedrooms },
                { label: 'Est. Boxes', value: quote.inventory.estimatedBoxes },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-gray-400 text-xs">{item.label}</dt>
                  <dd className="text-charcoal font-medium capitalize mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Pricing Breakdown</h2>
            <div className="space-y-3">
              {lineItems.map((item) => (
                <div key={item.label} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={item.value < 0 ? 'text-green-600 font-medium' : 'text-charcoal font-medium'}>
                    {item.value < 0 ? `-${formatCurrency(-item.value)}` : formatCurrency(item.value)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="font-bold text-charcoal">Total Estimate</span>
                <span className="font-display text-xl font-bold text-gold">{formatCurrency(pricing.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Contact</h2>
            <dl className="space-y-2 text-sm">
              <div><dt className="text-gray-400 text-xs">Email</dt><dd className="text-charcoal mt-0.5">{quote.email}</dd></div>
              <div><dt className="text-gray-400 text-xs">Phone</dt><dd className="text-charcoal mt-0.5">{quote.phone || '—'}</dd></div>
            </dl>
          </div>

          <div className="bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Manage</h2>
            <div className="space-y-4">
              <Select
                label="Status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value as QuoteStatus)}
              />
              <Textarea
                label="Notes"
                placeholder="Internal notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <Button onClick={save} loading={saving} className="w-full">
                {saved ? '✓ Saved' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
