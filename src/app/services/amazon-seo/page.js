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
    const service = await getServiceBySlug('amazon-seo');

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
      title: 'Amazon SEO - ZETDIGI',
      description: 'Amazon SEO services to increase product visibility, improve rankings, and drive higher organic traffic.',
      keywords: 'amazon seo, amazon ranking, amazon keyword optimization, listing seo, zetdigi',
    };
  }
  return {
    title: service.metadata?.title || 'Amazon SEO - ZETDIGI',
    description: service.metadata?.description || 'Amazon SEO services',
    keywords: service.metadata?.keywords || 'amazon seo',
  };
}

export default async function AmazonSeoPage() {
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

        <ServiceContactSection defaultService="amazon-seo" />
      </main>

      <Footer />
    </div>
  );
}
