'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WhyChooseZetDigiAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    badge: '',
    heading: '',
    headingHighlight: '',
    image: '',
    points: [
      { id: 1, text: '', order: 1 },
      { id: 2, text: '', order: 2 },
      { id: 3, text: '', order: 3 },
    ],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/why-choose-zetdigi');
      const data = await response.json();
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  const handlePointChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      points: prev.points.map(p => p.id === id ? { ...p, text: value } : p),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('category', 'why-choose-zetdigi');

    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/why-choose-zetdigi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Saved successfully!');
      } else {
        alert('Failed to save');
      }
    } catch (error) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Why Choose ZetDigi</h1>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin' })}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Section Content</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                placeholder="WHY CHOOSE ZETDIGI?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                placeholder="Driving Growth, Inspiring Excellence,"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Highlight (blue text)</label>
              <input
                type="text"
                value={formData.headingHighlight}
                onChange={(e) => setFormData({ ...formData, headingHighlight: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                placeholder="Our Values, Your Success"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Value Points</h2>
            {formData.points.map((point, idx) => (
              <div key={point.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Point {idx + 1}</label>
                <textarea
                  value={point.text}
                  onChange={(e) => handlePointChange(point.id, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black resize-none"
                  placeholder="Enter value proposition..."
                  required
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Section Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
            />
            {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
            {formData.image && (
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image src={formData.image} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
}
