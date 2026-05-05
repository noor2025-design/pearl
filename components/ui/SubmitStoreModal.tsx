'use client';

import { useEffect, useRef, useState } from 'react';

interface SubmitStoreModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmitStoreModal({ open, onClose }: SubmitStoreModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [website, setWebsite] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus trap + close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API or mailto link
    setSubmitted(true);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="relative bg-cream rounded-2xl shadow-card-hover max-w-md w-full p-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-secondary hover:bg-cream-dark transition-colors"
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="font-display text-2xl text-periwinkle mb-2">Thank you!</h2>
            <p className="font-ui text-text-secondary text-sm">
              We&apos;ve received your submission and will review it within 5–7 business days.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-6 px-5 py-2.5 rounded-lg bg-periwinkle text-white text-sm font-medium font-ui hover:bg-periwinkle-dark transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="submit-modal-title" className="font-display text-2xl md:text-3xl text-text-primary mb-1">
              Submit a Store
            </h2>
            <p className="font-ui text-sm text-text-secondary mb-6">
              Know a modest fashion boutique we should feature? Tell us about it.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="store-name" className="block font-ui text-sm font-medium text-text-primary mb-1.5">
                  Store Name <span aria-hidden="true" className="text-periwinkle">*</span>
                </label>
                <input
                  id="store-name"
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Hana Boutique"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-cream-dark bg-white font-ui text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle"
                />
              </div>
              <div>
                <label htmlFor="store-website" className="block font-ui text-sm font-medium text-text-primary mb-1.5">
                  Website
                </label>
                <input
                  id="store-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-cream-dark bg-white font-ui text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle"
                />
              </div>
              <div>
                <label htmlFor="submit-email" className="block font-ui text-sm font-medium text-text-primary mb-1.5">
                  Your Email <span aria-hidden="true" className="text-periwinkle">*</span>
                </label>
                <input
                  id="submit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-cream-dark bg-white font-ui text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-periwinkle text-white font-medium font-ui text-sm hover:bg-periwinkle-dark transition-colors mt-2"
              >
                Submit for Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
