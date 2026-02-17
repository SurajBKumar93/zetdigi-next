import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { VisualPlaceholder } from '@/components/services/ServiceSharedSections';

export const metadata = {
  title: 'Services - ZETDIGI',
  description:
    'Explore ZetDigi Amazon services including keyword research, packaging design, product photography, Amazon EBC, content writing, listing optimization, SEO, PPC, account management, and more.',
  keywords:
    'amazon services, keyword research, packaging design, product photography, amazon ebc, content writing, listing optimization, amazon seo, launch and rank, storefront branding, ppc, account management, amazon a-z',
};

const services = [
  {
    title: 'Keyword Research',
    href: '/services/keyword-research',
    description: 'Find high-impact keywords to improve ranking and discoverability.',
  },
  {
    title: 'Packaging Design',
    href: '/services/packaging-design',
    description: 'Create standout packaging that strengthens your brand and conversion.',
  },
  {
    title: 'Product Photography',
    href: '/services/product-photography',
    description: 'Professional listing visuals tailored for Amazon performance.',
  },
  {
    title: 'Amazon EBC',
    href: '/services/amazon-ebc',
    description: 'Design A+ content modules that tell your story and increase trust.',
  },
  {
    title: 'Content Writing',
    href: '/services/content-writing',
    description: 'Craft persuasive titles, bullets, and descriptions optimized for sales.',
  },
  {
    title: 'Listing Optimization',
    href: '/services/listing-optimization',
    description: 'Improve listing quality, ranking performance, and conversion efficiency.',
  },
  {
    title: 'Amazon SEO',
    href: '/services/amazon-seo',
    description: 'Boost organic visibility with strategic SEO and keyword implementation.',
  },
  {
    title: 'Launch & Rank',
    href: '/services/launch-rank',
    description: 'Launch products with a ranking-focused strategy for faster traction.',
  },
  {
    title: 'Storefront & Branding',
    href: '/services/storefront-branding',
    description: 'Build a stronger storefront identity with conversion-ready design.',
  },
  {
    title: 'Pay Per Click (PPC)',
    href: '/services/pay-per-click',
    description: 'Scale sponsored ads with performance-focused PPC management.',
  },
  {
    title: 'Account Management',
    href: '/services/account-management',
    description: 'Comprehensive account operations and catalog management support.',
  },
  {
    title: 'Amazon A-Z',
    href: '/services/amazon-a-z',
    description: 'End-to-end support from product research to launch and growth.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <section className="bg-gray-100 py-12 md:py-16 lg:py-24">
          <div className="container-custom">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Amazon Services</h1>
            <p className="mx-auto mt-3 md:mt-4 max-w-3xl text-center text-sm sm:text-base text-gray-600 px-4">
              Choose a service page below to view detailed process, deliverables, and layouts. All visuals are currently placeholders and can be replaced anytime.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <VisualPlaceholder label={`${service.title} Placeholder`} className="mb-5 min-h-[190px]" />
                  <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                  <Link
                    className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                    href={service.href}
                  >
                    View Service
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
