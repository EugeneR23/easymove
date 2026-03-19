'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CheckCircle, ArrowRight, Shield, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactForm() {
  const [form, setForm]       = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid  = form.name && form.phone && form.email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          source: 'contact-form',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please call us at 786-305-1844.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-charcoal p-10 text-center">
        <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={26} className="text-gold" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-white mb-3">Message Received</h3>
        <p className="text-gray-400 mb-6 leading-relaxed max-w-sm mx-auto">
          A coordinator will be in touch within a few hours to discuss your move.
        </p>
        <Link href="/quote">
          <Button size="md" variant="primary" className="inline-flex items-center gap-2">
            Get an Instant Estimate <ArrowRight size={15} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Your Name"
        required
        placeholder="e.g. Maria Gonzalez"
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Phone Number"
          type="tel"
          required
          placeholder="786-000-0000"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
        />
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>
      <Textarea
        label="Tell us about your move"
        placeholder="Where are you moving from and to? Any special items, high-rise, or specific needs? (Optional)"
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        rows={4}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" size="lg" loading={loading} disabled={!valid} className="w-full mt-1">
        Send Message
      </Button>

      <p className="text-gray-400 text-xs text-center">
        No obligation &nbsp;·&nbsp; We respond within a few hours
      </p>

      {/* Trust strip */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Shield size={11} className="text-gold shrink-0" />
          Fully insured
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={11} className="text-gold shrink-0" />
          No hidden fees
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Phone size={11} className="text-gold shrink-0" />
          <a href="tel:7863051844" className="hover:text-gold transition-colors">786-305-1844</a>
        </div>
      </div>
    </form>
  );
}
