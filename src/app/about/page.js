import Navigation from '@/components/Navigation';
import AboutUsHero from '@/components/AboutUsHero';
import WhyChooseZetDigi from '@/components/WhyChooseZetDigi';
import TrustedByMarquee from '@/components/TrustedByMarquee';
import Footer from '@/components/Footer';
import { getTrustedBrands, getWhyChooseZetDigi } from '@/lib/api';

export const metadata = {
  title: 'About Us - ZETDIGI | Your Digital Success Partner',
  description: 'Learn about ZETDIGI, your trusted partner for Amazon services, digital marketing, and website development. We help businesses achieve exceptional online success.',
  keywords: 'about zetdigi, digital marketing agency, amazon services, website development, our story',
};

export default async function AboutPage() {
  const [trustedBrandsData, whyChooseZetDigiData] = await Promise.all([
    getTrustedBrands(),
    getWhyChooseZetDigi(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AboutUsHero />

      {/* Brand Marquee */}
      <TrustedByMarquee brands={trustedBrandsData.brands} />

      <WhyChooseZetDigi whyChooseZetDigi={whyChooseZetDigiData} />
      <Footer />
    </div>
  );
}
