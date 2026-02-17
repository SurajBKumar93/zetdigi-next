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
    const service = await getServiceBySlug('product-photography');

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
      title: 'Product Photography - ZETDIGI',
      description: 'High-quality Amazon product photography to increase conversions and showcase products professionally.',
      keywords: 'amazon product photography, ecommerce photography, listing images, product images, zetdigi',
    };
  }
  return {
    title: service.metadata?.title || 'Product Photography - ZETDIGI',
    description: service.metadata?.description || 'Product photography services',
    keywords: service.metadata?.keywords || 'product photography',
  };
}

export default async function ProductPhotographyServicePage() {
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

        <ServiceContactSection defaultService="product-photography" />
      </main>

      <Footer />
    </div>
  );
}
