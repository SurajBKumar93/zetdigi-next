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

async function getServiceData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/services/[SLUG]`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch service data:', error);
    return null;
  }
}

export async function generateMetadata() {
  const service = await getServiceData();
  if (!service) {
    return {
      title: '[DEFAULT_TITLE] - ZETDIGI',
      description: '[DEFAULT_DESCRIPTION]',
      keywords: '[DEFAULT_KEYWORDS]',
    };
  }
  return {
    title: service.metadata?.title || '[DEFAULT_TITLE] - ZETDIGI',
    description: service.metadata?.description || '[DEFAULT_DESCRIPTION]',
    keywords: service.metadata?.keywords || '[DEFAULT_KEYWORDS]',
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

        <ServiceContactSection defaultService="[SLUG]" />
      </main>

      <Footer />
    </div>
  );
}
