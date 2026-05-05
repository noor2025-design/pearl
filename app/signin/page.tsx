'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-cream-dark bg-white font-ui text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle transition-colors';
  const labelClass = 'block font-ui text-sm font-medium text-text-primary mb-1.5';

  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Logo */}
      <Link href="/" className="font-display text-4xl text-periwinkle tracking-widest font-semibold mb-10">
        PEARL
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />

        {/* Tabs */}
        <div className="flex border-b border-cream-dark">
          <button
            onClick={() => { setTab('signin'); setSubmitted(false); }}
            className={`flex-1 py-4 font-ui text-sm font-semibold transition-colors ${
              tab === 'signin' ? 'text-periwinkle border-b-2 border-periwinkle' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setSubmitted(false); }}
            className={`flex-1 py-4 font-ui text-sm font-semibold transition-colors ${
              tab === 'signup' ? 'text-periwinkle border-b-2 border-periwinkle' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="px-8 py-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">{tab === 'signin' ? '👋' : '🎉'}</div>
              <h2 className="font-display text-2xl text-text-primary mb-2">
                {tab === 'signin' ? 'Welcome back!' : 'Account created!'}
              </h2>
              <p className="font-ui text-sm text-text-secondary mb-6">
                {tab === 'signin'
                  ? 'You\'re now signed in to PEARL.'
                  : 'Welcome to the PEARL community. Start exploring modest fashion boutiques.'}
              </p>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-periwinkle text-periwinkle font-ui font-medium text-sm hover:bg-periwinkle hover:text-white transition-colors"
              >
                Browse Stores
              </Link>
            </div>
          ) : tab === 'signin' ? (
            <>
              <h2 className="font-ui text-2xl text-text-primary mb-1">Welcome back</h2>
              <p className="font-ui text-sm text-text-secondary mb-6">Sign in to your PEARL account</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" required placeholder="your.email@example.com" className={inputClass} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={labelClass.replace('mb-1.5', '')}>Password</label>
                    <button type="button" className="font-ui text-xs text-periwinkle hover:underline">Forgot password?</button>
                  </div>
                  <input type="password" required placeholder="••••••••" className={inputClass} />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg border border-periwinkle text-periwinkle font-ui font-semibold text-sm hover:bg-periwinkle hover:text-white transition-colors mt-2"
                >
                  Sign In
                </button>
              </form>
              <p className="font-ui text-xs text-center text-text-secondary mt-5">
                Don't have an account?{' '}
                <button onClick={() => setTab('signup')} className="text-periwinkle hover:underline font-medium">
                  Create one
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-ui text-2xl text-text-primary mb-1">Join PEARL</h2>
              <p className="font-ui text-sm text-text-secondary mb-6">Create an account to save stores and leave reviews</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" required placeholder="Aisha" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" required placeholder="Rahman" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" required placeholder="your.email@example.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" required placeholder="At least 8 characters" className={inputClass} />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg border border-periwinkle text-periwinkle font-ui font-semibold text-sm hover:bg-periwinkle hover:text-white transition-colors mt-2"
                >
                  Create Account
                </button>
              </form>
              <p className="font-ui text-xs text-center text-text-secondary mt-5">
                Already have an account?{' '}
                <button onClick={() => setTab('signin')} className="text-periwinkle hover:underline font-medium">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      <p className="font-ui text-xs text-text-secondary mt-6 text-center max-w-xs">
        By creating an account you agree to our{' '}
        <span className="text-periwinkle cursor-pointer hover:underline">Terms of Service</span> and{' '}
        <span className="text-periwinkle cursor-pointer hover:underline">Privacy Policy</span>.
      </p>
    </div>
  );
}
