import dynamic from 'next/dynamic';
import { getHomePageData } from '@/lib/api';

// Critical components - loaded immediately
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import FeaturesGrid from '@/components/FeaturesGrid';
import ServicesAndHowItWorks from '@/components/ServicesAndHowItWorks';
import Footer from '@/components/Footer';

// Non-critical components - lazy loaded for better performance
const SuccessStories = dynamic(() => import('@/components/SuccessStories'), { ssr: true });
const ProvenResults = dynamic(() => import('@/components/ProvenResults'), { ssr: true });
const AmazonSuccessMarquee = dynamic(() => import('@/components/AmazonSuccessMarquee'), { ssr: true });
const PortfolioSlider = dynamic(() => import('@/components/PortfolioSlider'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const TrustedByMarquee = dynamic(() => import('@/components/TrustedByMarquee'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
import CalendlySection from '@/components/CalendlySection';
const BlogPosts = dynamic(() => import('@/components/BlogPosts'), { ssr: true });

export default async function Home() {
  // Fetch all data on the server for SSR
  const pageData = await getHomePageData();

  return (
    <div className="min-h-screen bg-white">
      <Navigation data={pageData.navigation} />
      <HeroSlider slides={pageData.hero.slides} />
      <FeaturesGrid features={pageData.features.features} />
      <SuccessStories stories={pageData.successStories.stories} />
      <ProvenResults results={pageData.provenResults.results} />
      <ServicesAndHowItWorks servicesSection={pageData.servicesSection} />
      <AmazonSuccessMarquee />
      <PortfolioSlider items={pageData.portfolio.items} />
      <Testimonials testimonials={pageData.testimonials.testimonials} />
      <TrustedByMarquee brands={pageData.trustedBrands.brands} />
      <FAQ />
      <CalendlySection />
      <BlogPosts posts={pageData.blog.posts} />
      <Footer />
    </div>
  );
}

// Enable ISR (Incremental Static Regeneration) - revalidate every hour
export const revalidate = 3600;
