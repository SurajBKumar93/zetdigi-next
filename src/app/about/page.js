import Navigation from '@/components/Navigation';
import AboutUsHero from '@/components/AboutUsHero';
import WhyChooseZetDigi from '@/components/WhyChooseZetDigi';
import TrustedByMarquee from '@/components/TrustedByMarquee';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us - ZETDIGI | Your Digital Success Partner',
  description: 'Learn about ZETDIGI, your trusted partner for Amazon services, digital marketing, and website development. We help businesses achieve exceptional online success.',
  keywords: 'about zetdigi, digital marketing agency, amazon services, website development, our story',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AboutUsHero />

      {/* Brand Marquee */}
      <TrustedByMarquee />

      <WhyChooseZetDigi />
      <Footer />
    </div>
  );
}
