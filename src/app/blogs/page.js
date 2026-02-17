import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getAllBlogs } from '@/lib/blogData';
import { BlogCardGrid } from '@/components/BlogPosts';

export const metadata = {
  title: 'Blogs - ZETDIGI',
  description:
    'Read the latest insights on Amazon SEO, listing optimization, PPC, and digital growth strategies by ZetDigi.',
  keywords:
    'amazon blog, amazon seo blog, ppc blog, digital marketing blog, zetdigi blogs',
};

export default async function BlogsPage() {
  const posts = await getAllBlogs();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,153,0,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-orange-300">Insights & Strategies</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Amazon Growth Blog
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Expert insights, proven strategies, and actionable tips to help you succeed on Amazon and grow your e-commerce business.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <main className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <BlogCardGrid posts={posts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
