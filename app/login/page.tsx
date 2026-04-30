// app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FleetLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email:    email.trim().toLowerCase(),
      password: password.trim(),
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or access code. Please contact CLTmobile if you need help.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f4]">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow-md">

        <img src="/CLTmobileLogoBg-White-removebg.png" alt="CLTmobile" className="mb-6" />

        <p className="text-center text-[#171717] my-4 font-medium">| Fleet Manager Login |</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#171717] font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#171717] placeholder:text-gray-600"
              required
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#171717] font-medium mb-2">Access Code</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="•••••••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#171717] placeholder:text-gray-600"
              required
            />
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-[#171717] hover:text-yellow-500 text-[#171717] font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          Need access?{' '}
          <a href="mailto:support@cltmobile.com" className="text-yellow-600 hover:text-yellow-500 font-semibold transition">
            Contact CLTmobile
          </a>
        </p>

      </div>
    </div>
  );
}