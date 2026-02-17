// Template for dynamic service pages
// Replace [SLUG] and [DEFAULT_TITLE] with actual values

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/services/HeroSection';
import SectionRenderer from '@/components/services/SectionRenderer';
import {
  ServiceCtaBand,
  ServiceContactSection,
} from '@/components/services/ServiceSharedSections';

import { getServiceBySlug } from '@/lib/dataStore';
async function getServiceData() {
  try {
    const service = await getServiceBySlug('content-writing');

    // Only return if published
    if (!service || service.status !== 'published') {
      return null;
    }

    return service;
  } catch (error) {
    console.error('Failed to fetch service data:', error);
    return null;
  }
}

export async function generateMetadata() {
  const service = await getServiceData();
  if (!service) {
    return {
      title: 'Content Writing - ZETDIGI',
      description: 'Professional Amazon content writing services including product titles, bullet points, descriptions, A+ content, and brand storytelling.',
      keywords: 'amazon content writing, amazon listing copy, product descriptions, bullet points, a+ content, zetdigi',
    };
  }
  return {
    title: service.metadata?.title || 'Content Writing - ZETDIGI',
    description: service.metadata?.description || 'Professional Amazon content writing services including product titles, bullet points, descriptions, A+ content, and brand storytelling.',
    keywords: service.metadata?.keywords || 'amazon content writing, amazon listing copy, product descriptions, bullet points, a+ content, zetdigi',
  };
}

export default async function ServicePage() {
  const service = await getServiceData();

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <HeroSection data={service.hero} />

        {service.sections?.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}

        <ServiceCtaBand
          title={service.cta?.title || ''}
          description={service.cta?.description || ''}
          buttonText={service.cta?.buttonText || 'Get Started'}
        />

        <ServiceContactSection defaultService="content-writing" />
      </main>

      <Footer />
    </div>
  );
}
