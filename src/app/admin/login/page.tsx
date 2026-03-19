'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white">
            EasyMove<span className="text-gold">Elite</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Portal</p>
        </div>
        <div className="bg-white p-8 shadow-luxury">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@easymove.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>
          <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-500 text-center">
            Demo: <strong>admin@easymove.com</strong> / <strong>luxury2024</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
