'use client';

import { useState } from 'react';
import Image from 'next/image';

const serviceOptions = [
  { value: 'keyword-research', label: 'Keyword Research' },
  { value: 'packaging-design', label: 'Packaging Design' },
  { value: 'product-photography', label: 'Product Photography' },
  { value: 'amazon-ebc', label: 'Amazon EBC' },
  { value: 'content-writing', label: 'Content Writing' },
  { value: 'listing-optimization', label: 'Listing Optimization' },
  { value: 'amazon-seo', label: 'Amazon SEO' },
  { value: 'launch-rank', label: 'Launch & Rank' },
  { value: 'storefront-branding', label: 'Storefront & Branding' },
  { value: 'pay-per-click', label: 'Pay Per Click (PPC)' },
  { value: 'account-management', label: 'Account Management' },
  { value: 'amazon-a-z', label: 'Amazon A-Z' },
];

export function VisualPlaceholder({ label, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-100 shadow-md ${className}`}
    >
      <div className="absolute -top-14 -right-14 h-44 w-44 rounded-full bg-blue-100/60" />
      <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-slate-200/60" />
      <div className="relative flex h-full min-h-[240px] items-center justify-center p-6">
        <div className="rounded-full border border-blue-200 bg-white/90 px-5 py-2 text-sm font-semibold tracking-wide text-blue-800">
          {label}
        </div>
      </div>
    </div>
  );
}

export function ServiceCtaBand({ title, description, buttonText }) {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 py-14 text-white">
      <div className="container-custom text-center">
        <h2 className="mb-3 text-3xl font-bold text-white">{title}</h2>
        <p className="mx-auto mb-7 max-w-3xl text-sm text-blue-100 md:text-base">{description}</p>
        <button className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-black" type="button">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

const DEFAULT_CONTACT_IMAGE = '/uploads/services/1771211286839-Slide-2.jpg';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
};

export function ServiceContactSection({ defaultService = '' }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit right now. Please try again.');
      }

      setSubmitStatus('success');
      setSubmitMessage('Our team will contact you within 24 hours with your free audit.');
      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container-custom">
        <p className="mb-2 text-center text-sm font-semibold text-blue-700">Get Pure Estimate</p>
        <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">Get In Touch With Us</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {DEFAULT_CONTACT_IMAGE ? (
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl">
              <Image
                src={DEFAULT_CONTACT_IMAGE}
                alt="Contact us"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <VisualPlaceholder label="Contact Image Placeholder" className="min-h-[420px]" />
          )}

          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Request received!</p>
                  <p className="text-xs">{submitMessage}</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M4.93 19.07A10 10 0 1119.07 4.93 10 10 0 014.93 19.07z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Submission failed</p>
                  <p className="text-xs">{submitMessage}</p>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Last Name"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Email Address"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Phone Number"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>Select Services</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              placeholder="Your Message"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Form'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function ServiceRecentWorkGrid({ title = 'Recent Work', items = [] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="mb-10 bg-gradient-to-r from-blue-500 to-blue-600 py-3 text-center">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="space-y-3">
              <VisualPlaceholder label={`${item} Placeholder`} className="min-h-[190px]" />
              <p className="text-center text-sm font-medium text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}