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

import Image from 'next/image';

// Default contact image used across all service pages
const DEFAULT_CONTACT_IMAGE = '/uploads/services/1771211286839-Slide-2.jpg';

export function ServiceContactSection({ defaultService = '' }) {
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

          <form className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="First Name" type="text" />
              <input className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Last Name" type="text" />
            </div>
            <input className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Email Address" type="email" />
            <input className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Phone Number" type="tel" />
            <select
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              defaultValue={defaultService}
            >
              <option value="" disabled>Select Services</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Your Message" rows={6} />
            <button className="mt-5 rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800" type="button">
              Submit Form
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
