import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogData';

export function BlogCardGrid({ posts }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
      {posts.map((post) => (
        <article key={post.slug} className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <Link href={`/blogs/${post.slug}`} className="block">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          </Link>

          <div className="p-5 sm:p-6 md:p-8 space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span>/</span>
              <span className="font-semibold text-gray-700">{post.category}</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h3>

            <div className="pt-1 md:pt-2">
              <Link
                href={`/blogs/${post.slug}`}
                className="border-2 border-blue-600 text-blue-600 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function BlogPosts({ posts }) {
  // If posts are passed as props and valid, use them; otherwise fetch from dataStore
  let blogPosts = posts;

  if (!Array.isArray(blogPosts)) {
    const allBlogs = await getAllBlogs();
    blogPosts = allBlogs.slice(0, 3);
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-900">
          Latest Blog Posts
        </h2>
        <BlogCardGrid posts={blogPosts} />
      </div>
    </section>
  );
}
