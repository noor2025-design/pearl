'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedStories } from '@/lib/stories';

function ReviewFormSection({
  inputClass,
  labelClass,
  SelectField,
}: {
  inputClass: string;
  labelClass: string;
  SelectField: React.ComponentType<{
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    children: React.ReactNode;
  }>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [proof, setProof] = useState<File | null>(null);
  const [form, setForm] = useState({
    storeName: '',
    storeWebsite: '',
    rating: '',
    reviewText: '',
    email: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setProof(e.target.files?.[0] ?? null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />
        <div className="px-8 py-16 text-center">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="font-ui text-2xl text-periwinkle font-semibold mb-3">Review Submitted</h3>
          <p className="font-ui text-text-secondary text-sm leading-relaxed max-w-sm mx-auto mb-6">
            Thank you for sharing your experience. Our team will review your submission and publish it if it meets our community guidelines.
          </p>
          <button
            onClick={() => { setSubmitted(false); setProof(null); setForm({ storeName: '', storeWebsite: '', rating: '', reviewText: '', email: '' }); }}
            className="px-6 py-3 rounded-lg border border-periwinkle text-periwinkle font-ui font-medium text-sm hover:bg-periwinkle hover:text-white transition-colors"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />
      <div className="px-8 py-10">
        <h3 className="font-ui text-2xl text-text-primary font-semibold mb-2">Submit a Review</h3>
        <p className="font-ui text-text-secondary text-sm leading-relaxed mb-8">
          Share your experience with a brand or store in the Pearl directory. Your review will be considered for publication after our team reviews it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1 — Store */}
          <div className="rounded-xl bg-cream border border-periwinkle/20 px-6 py-5">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-6 h-6 rounded-full bg-periwinkle text-white font-ui font-semibold text-xs flex items-center justify-center shrink-0">1</span>
              <h4 className="font-ui text-sm font-semibold text-periwinkle uppercase tracking-widest">Store or Brand</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Store or Brand Name <span className="text-periwinkle">*</span></label>
                <input name="storeName" value={form.storeName} onChange={handleChange} required placeholder="e.g., Merrachi" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Website or Instagram</label>
                <input name="storeWebsite" value={form.storeWebsite} onChange={handleChange} placeholder="https://..." className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Overall Rating <span className="text-periwinkle">*</span></label>
                <SelectField name="rating" value={form.rating} onChange={handleChange} required>
                  <option value="" disabled>Select a rating</option>
                  <option value="5">⭐⭐⭐⭐⭐ — Excellent</option>
                  <option value="4">⭐⭐⭐⭐ — Good</option>
                  <option value="3">⭐⭐⭐ — Average</option>
                  <option value="2">⭐⭐ — Below Average</option>
                  <option value="1">⭐ — Poor</option>
                </SelectField>
              </div>
            </div>
          </div>

          {/* Section 2 — Review */}
          <div className="rounded-xl bg-cream border border-periwinkle/20 px-6 py-5">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-6 h-6 rounded-full bg-periwinkle text-white font-ui font-semibold text-xs flex items-center justify-center shrink-0">2</span>
              <h4 className="font-ui text-sm font-semibold text-periwinkle uppercase tracking-widest">Your Review</h4>
            </div>
            <label className={labelClass}>Review <span className="text-periwinkle">*</span></label>
            <textarea
              name="reviewText"
              value={form.reviewText}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Share your experience — what did you order, how was the quality, service, and delivery? Be specific and helpful."
              className={inputClass}
            />
            <p className="font-ui text-xs text-text-secondary mt-2 leading-relaxed">
              Be specific, honest, and kind. Focus on products, service, and overall experience.
            </p>
          </div>

          {/* Section 3 — Proof */}
          <div className="rounded-xl bg-cream border border-periwinkle/20 px-6 py-5">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-6 h-6 rounded-full bg-periwinkle text-white font-ui font-semibold text-xs flex items-center justify-center shrink-0">3</span>
              <h4 className="font-ui text-sm font-semibold text-periwinkle uppercase tracking-widest">Supporting Details</h4>
              <span className="font-ui text-xs text-text-secondary">(Optional)</span>
            </div>
            <p className="font-ui text-xs text-text-secondary leading-relaxed mb-4 pl-8">
              Supporting details are used for internal review only and never shared publicly. Reviews with supporting details may be noted as a verified experience.
            </p>
            <label className="flex items-center gap-4 cursor-pointer rounded-lg border border-dashed border-periwinkle/30 bg-white px-5 py-4 hover:border-periwinkle/50 transition-colors">
              <svg className="w-6 h-6 text-periwinkle/50 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex-1 min-w-0">
                {proof ? (
                  <p className="font-ui text-sm font-medium text-periwinkle truncate">{proof.name}</p>
                ) : (
                  <>
                    <p className="font-ui text-sm font-medium text-text-primary">Upload a photo or proof of purchase</p>
                    <p className="font-ui text-xs text-text-secondary mt-0.5">JPG, PNG, PDF — up to 10 MB</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*,.pdf" onChange={handleFile} className="sr-only" />
            </label>
          </div>

          {/* Section 4 — Contact */}
          <div className="rounded-xl bg-cream border border-periwinkle/20 px-6 py-5">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-6 h-6 rounded-full bg-periwinkle text-white font-ui font-semibold text-xs flex items-center justify-center shrink-0">4</span>
              <h4 className="font-ui text-sm font-semibold text-periwinkle uppercase tracking-widest">Your Information</h4>
            </div>
            <label className={labelClass}>Email Address <span className="text-periwinkle">*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your.email@example.com" className={inputClass} />
            <p className="font-ui text-xs text-text-secondary mt-2 leading-relaxed">
              We may reach out if we need additional context before publishing your review.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-periwinkle text-white font-ui font-semibold text-base hover:bg-periwinkle-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Submit Review
          </button>
          <p className="text-center font-ui text-xs text-text-secondary">
            All reviews are reviewed by Pearl before being published.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'submit' | 'reviews'>('submit');
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const featuredStories = getFeaturedStories();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    storeName: '',
    website: '',
    storeType: '',
    location: '',
    categories: '',
    priceRange: '',
    description: '',
    email: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-periwinkle/30 bg-white font-ui text-sm text-text-primary placeholder:text-periwinkle/40 focus:outline-none focus:border-periwinkle focus:ring-4 focus:ring-periwinkle/10 transition-all';

  const labelClass = 'block font-ui text-xs font-semibold text-periwinkle uppercase tracking-widest mb-2';

  const SelectField = ({ name, value, onChange, required, children }: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass + ' appearance-none pr-10'}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-periwinkle border-b border-periwinkle-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream/20 text-cream font-ui text-xs font-semibold tracking-wide mb-6">
            ✦ Community Powered
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-10 font-semibold">
            Grow PEARL Together
          </h1>
          <p className="font-ui text-lg text-cream/80 leading-relaxed max-w-xl mx-auto">
            Help us build the most comprehensive directory of modest fashion. Share your favorite stores, explore authentic reviews, and read founder interviews and brand stories in Stories.
          </p>
        </div>
      </section>

      {/* Background image behind everything below hero */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/community-reviews-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/75" />
        <div className="relative z-10">

      {/* Tabs + Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tab bar */}
        <div className="flex rounded-2xl overflow-hidden border border-cream-dark bg-white shadow-card mb-8">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-ui text-sm font-semibold transition-colors ${
              activeTab === 'submit'
                ? 'bg-periwinkle text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Submit a Store
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-ui text-sm font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'bg-periwinkle text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Community Reviews
          </button>
        </div>

        {/* Submit a Store tab */}
        {activeTab === 'submit' && (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {/* Accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />

            <div className="px-8 py-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="font-display text-3xl text-periwinkle mb-3">Thank you!</h2>
                  <p className="font-ui text-text-secondary text-base leading-relaxed mb-6">
                    Your store recommendation has been submitted. We'll review it and add it to PEARL within 3–5 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ storeName: '', website: '', storeType: '', location: '', categories: '', priceRange: '', description: '', email: '' }); }}
                    className="px-6 py-3 rounded-lg border border-periwinkle text-periwinkle font-ui font-medium text-sm hover:bg-periwinkle hover:text-white transition-colors"
                  >
                    Submit Another Store
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-ui text-3xl text-text-primary font-semibold mb-2">Recommend a Store</h2>
                  <p className="font-ui text-text-secondary text-sm mb-8 leading-relaxed">
                    Know a wonderful modest fashion shop that's not on PEARL? We'd love to hear about it. Fill out the form below and we'll review your submission.
                  </p>
                  <div className="h-px bg-periwinkle/20 mb-8" />

                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Section 1 */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-8 rounded-full bg-periwinkle text-white font-ui font-semibold text-sm flex items-center justify-center shrink-0">
                          1
                        </span>
                        <h3 className="font-ui text-xl text-text-primary font-semibold">Store Information</h3>
                      </div>
                      <div className="h-px bg-periwinkle/20 mb-6" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            Store Name <span className="text-periwinkle">*</span>
                          </label>
                          <input
                            name="storeName"
                            value={form.storeName}
                            onChange={handleChange}
                            required
                            placeholder="e.g., The Modest Boutique"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Website or Instagram</label>
                          <input
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            Store Type <span className="text-periwinkle">*</span>
                          </label>
                          <SelectField name="storeType" value={form.storeType} onChange={handleChange} required>
                            <option value="" disabled>Select</option>
                            <option value="online">Online</option>
                            <option value="local">Local / In-Person</option>
                            <option value="both">Online & In-Person</option>
                          </SelectField>
                        </div>
                        <div>
                          <label className={labelClass}>
                            Location <span className="text-periwinkle">*</span>
                          </label>
                          <SelectField name="location" value={form.location} onChange={handleChange} required>
                            <option value="" disabled>Select</option>
                            <option value="online">Online / US-Based</option>
                            <option value="nyc">New York City</option>
                            <option value="nj">New Jersey</option>
                            <option value="international">International</option>
                          </SelectField>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-8 rounded-full bg-periwinkle text-white font-ui font-semibold text-sm flex items-center justify-center shrink-0">
                          2
                        </span>
                        <h3 className="font-ui text-xl text-text-primary font-semibold">Product Details</h3>
                      </div>
                      <div className="h-px bg-periwinkle/20 mb-6" />

                      <div className="space-y-5">
                        <div>
                          <label className={labelClass}>
                            Categories <span className="text-periwinkle">*</span>
                          </label>
                          <input
                            name="categories"
                            value={form.categories}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Abayas, Occasionwear, Casualwear"
                            className={inputClass}
                          />
                          <p className="font-ui text-xs text-text-secondary mt-1.5">Separate multiple categories with commas</p>
                        </div>
                        <div>
                          <label className={labelClass}>
                            Price Range <span className="text-periwinkle">*</span>
                          </label>
                          <SelectField name="priceRange" value={form.priceRange} onChange={handleChange} required>
                            <option value="" disabled>Select</option>
                            <option value="$">$ — Budget-friendly (under $50)</option>
                            <option value="$$">$$ — Mid-range ($50–$150)</option>
                            <option value="$$$">$$$ — Premium ($150–$400)</option>
                            <option value="$$$$">$$$$ — Luxury ($400+)</option>
                          </SelectField>
                        </div>
                        <div>
                          <label className={labelClass}>
                            Description <span className="text-periwinkle">*</span>
                          </label>
                          <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Tell us what makes this store special. What products do they offer? What's the shopping experience like?"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-8 rounded-full bg-periwinkle text-white font-ui font-semibold text-sm flex items-center justify-center shrink-0">
                          3
                        </span>
                        <h3 className="font-ui text-xl text-text-primary font-semibold">Your Information</h3>
                      </div>
                      <div className="h-px bg-periwinkle/20 mb-6" />

                      <div>
                        <label className={labelClass}>
                          Email Address <span className="text-periwinkle">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className={inputClass}
                        />
                        <p className="font-ui text-xs text-text-secondary mt-1.5">We'll contact you if we need more information about this store</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <div className="h-px bg-periwinkle/20 mb-6" />
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl border border-periwinkle text-periwinkle font-ui font-semibold text-base hover:bg-periwinkle hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Submit for Review
                      </button>
                      <p className="text-center font-ui text-xs text-text-secondary mt-4">
                        Thank you for helping PEARL grow! We'll review your submission within 3–5 business days.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Community Reviews tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review guidelines */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />
              <button
                className="w-full px-8 py-8 flex items-center justify-between gap-4 text-left"
                onClick={() => setGuidelinesOpen(!guidelinesOpen)}
              >
                <div>
                  <h2 className="font-ui text-2xl text-text-primary font-semibold mb-1">Community Review Guidelines</h2>
                  <p className="font-ui text-text-secondary text-sm">
                    Authentic reviews from the modest fashion community — shared thoughtfully and respectfully.
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-periwinkle shrink-0 transition-transform duration-300 ${guidelinesOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {guidelinesOpen && (
              <div className="px-8 pb-8">
                {/* Guidelines blocks */}
                <div className="space-y-5">
                  <div className="rounded-xl bg-periwinkle/5 border border-periwinkle/15 px-6 py-5">
                    <p className="font-ui text-sm text-text-primary leading-relaxed">
                      Pearl is built on shared experiences, offered thoughtfully and respectfully.
                    </p>
                    <p className="font-ui text-sm text-text-secondary leading-relaxed mt-3">
                      Reviews are based on personal experiences and are reviewed before being published. We look for feedback that is specific, helpful, and kind, focusing on products, service, and overall experience.
                    </p>
                    <p className="font-ui text-sm text-text-secondary leading-relaxed mt-3">
                      Constructive feedback is welcome, but all content must remain respectful. Harmful or misleading reviews will not be published.
                    </p>
                    <p className="font-ui text-sm text-text-secondary leading-relaxed mt-3">
                      Pearl is a curated space shaped by both community contributions and careful review.
                    </p>
                  </div>

                  <div className="rounded-xl bg-cream border border-cream-dark px-6 py-5">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-periwinkle shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className="font-ui text-sm font-semibold text-text-primary mb-2">Supporting Details & Verification</p>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed">
                          To help maintain trust within our community, reviewers may optionally provide supporting details such as photos or proof of purchase when submitting a review.
                        </p>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed mt-2">
                          This information is used for internal review only and is never shared publicly.
                        </p>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed mt-2">
                          Reviews that include supporting details may be noted as a verified experience. In some cases, we may request additional context before publishing, especially for constructive or critical feedback.
                        </p>
                        <p className="font-ui text-sm text-text-secondary leading-relaxed mt-2">
                          All reviews are reviewed by Pearl to ensure they are honest, respectful, and helpful to others.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* Submit a review form */}
            <ReviewFormSection inputClass={inputClass} labelClass={labelClass} SelectField={SelectField} />

            {/* Placeholder first review */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark" />
              <div className="px-8 py-8">
                <div className="flex items-center gap-3 mb-5">
                  <p className="font-ui text-xs text-text-secondary uppercase tracking-widest">Community Reviews</p>
                  <span className="px-2 py-0.5 rounded-full bg-cream-dark font-ui text-xs text-text-secondary italic">Example</span>
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-periwinkle/20 flex items-center justify-center shrink-0">
                      <span className="font-ui font-bold text-periwinkle text-sm">S</span>
                    </div>
                    <div>
                      <p className="font-ui font-semibold text-text-primary text-sm">Sara M.</p>
                      <p className="font-ui text-xs text-text-secondary">Verified Purchase · May 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-periwinkle text-base">★</span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-periwinkle/10 text-periwinkle font-ui mb-3">
                    Merrachi
                  </span>
                  <p className="font-ui text-sm text-text-primary leading-relaxed">
                    Absolutely beautiful quality. I ordered the embroidered abaya for Eid and it arrived within a week — the fabric is luxurious and the embroidery is even more stunning in person. Sizing was true to the chart and customer service was so helpful when I had a question. Will definitely be ordering again.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-cream-dark">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-ui bg-periwinkle text-white">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                    Verified Experience
                  </span>
                  <span className="font-ui text-xs text-text-secondary">Reviewed by Pearl ✦</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Founder Stories */}
      {featuredStories.length > 0 && (
        <section className="bg-cream py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-periwinkle/30 bg-periwinkle/10 text-periwinkle font-ui text-xs font-semibold tracking-wide mb-3">
                ✦ Founder Stories
              </span>
              <h2 className="font-ui text-3xl text-periwinkle font-semibold">Behind the Brand</h2>
            </div>
            <Link
              href="/stories"
              className="font-ui text-sm text-periwinkle font-semibold hover:underline flex items-center gap-1 shrink-0"
            >
              View All Stories
              <svg className="w-4 h-4 text-periwinkle" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="h-44 relative overflow-hidden bg-cream/20">
                  <Image
                    src={story.cardImageUrl || story.imageUrl}
                    alt={story.brandName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-ui text-xs text-periwinkle uppercase tracking-widest mb-2">
                    {story.founderName}
                  </p>
                  <h3 className="font-ui text-lg text-text-primary font-semibold leading-snug mb-2 group-hover:text-periwinkle transition-colors">
                    {story.title}
                  </h3>
                  <p className="font-ui text-sm text-text-secondary italic leading-relaxed flex-1">
                    {story.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-periwinkle font-ui text-sm font-semibold">
                    Read Story
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </section>
      )}

        </div>{/* end relative z-10 */}
      </div>{/* end bg image wrapper */}
    </div>
  );
}
