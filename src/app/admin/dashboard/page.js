'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    portfolio: 0,
    testimonials: 0,
    blogs: 0,
    successStories: 0,
    features: 0,
    faqs: 0,
    hero: 0,
    services: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolio, testimonials, blogs, successStories, features, faqs, hero, services] = await Promise.all([
        fetch('/api/admin/portfolio').then(r => r.json()),
        fetch('/api/admin/testimonials').then(r => r.json()),
        fetch('/api/admin/blogs').then(r => r.json()),
        fetch('/api/admin/success-stories').then(r => r.json()),
        fetch('/api/admin/features').then(r => r.json()),
        fetch('/api/admin/faqs').then(r => r.json()),
        fetch('/api/admin/hero').then(r => r.json()),
        fetch('/api/admin/services').then(r => r.json()),
      ]);

      setStats({
        portfolio: portfolio.length || 0,
        testimonials: testimonials.length || 0,
        blogs: blogs.length || 0,
        successStories: successStories.length || 0,
        features: features.length || 0,
        faqs: faqs.length || 0,
        hero: hero.length || 0,
        services: services.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { name: 'Services', href: '/admin/services', icon: '🛠️', count: stats.services },
    { name: 'Portfolio', href: '/admin/portfolio', icon: '🖼️', count: stats.portfolio },
    { name: 'Testimonials', href: '/admin/testimonials', icon: '💬', count: stats.testimonials },
    { name: 'Blogs', href: '/admin/blogs', icon: '📝', count: stats.blogs },
    { name: 'Success Stories', href: '/admin/success-stories', icon: '📊', count: stats.successStories },
    { name: 'Features', href: '/admin/features', icon: '⭐', count: stats.features },
    { name: 'FAQs', href: '/admin/faqs', icon: '❓', count: stats.faqs },
    { name: 'Hero Slides', href: '/admin/hero', icon: '🎯', count: stats.hero },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ZetDigi Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <button
              onClick={() => signOut({ callbackUrl: '/admin' })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.count} {item.count === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link href="/" target="_blank" className="text-blue-600 hover:underline block">
              View Website →
            </Link>
            <Link href="/blogs" target="_blank" className="text-blue-600 hover:underline block">
              View Blog Page →
            </Link>
            <Link href="/portfolio" target="_blank" className="text-blue-600 hover:underline block">
              View Portfolio Page →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
