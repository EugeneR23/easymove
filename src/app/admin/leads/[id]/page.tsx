'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Lead, LeadStatus } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { formatDate } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
];

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState<LeadStatus>('new');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/leads/${id}`)
      .then((r) => r.json())
      .then((data: Lead) => {
        setLead(data);
        setStatus(data.status);
        setNotes(data.adminNotes ?? '');
      });
  }, [id]);

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes: notes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setLead(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (!lead) return <div className="p-8 text-gray-500">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-charcoal text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Leads
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">{lead.firstName} {lead.lastName}</h1>
          <p className="text-gray-500 mt-1">Lead · {formatDate(lead.createdAt)}</p>
        </div>
        <Badge label={lead.status} variant={lead.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Info */}
        <div className="bg-white border border-gray-100 p-6">
          <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Contact Details</h2>
          <dl className="space-y-3 text-sm">
            {[
              { label: 'Email', value: lead.email },
              { label: 'Phone', value: lead.phone || '—' },
              { label: 'Source', value: lead.source.replace('-', ' ') },
              { label: 'From', value: lead.fromCity || '—' },
              { label: 'To', value: lead.toCity || '—' },
              { label: 'Move Date', value: lead.moveDate ? formatDate(lead.moveDate) : '—' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-50">
                <dt className="text-gray-400">{item.label}</dt>
                <dd className="text-charcoal font-medium capitalize">{item.value}</dd>
              </div>
            ))}
          </dl>
          {lead.message && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Message</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3">{lead.message}</p>
            </div>
          )}
        </div>

        {/* Admin Panel */}
        <div className="bg-white border border-gray-100 p-6">
          <h2 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Admin Actions</h2>
          <div className="space-y-4">
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
            />
            <Textarea
              label="Internal Notes"
              placeholder="Add notes about this lead..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
            <Button onClick={save} loading={saving} className="w-full">
              {saved ? '✓ Saved' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
