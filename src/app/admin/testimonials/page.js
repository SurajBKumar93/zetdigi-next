'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TestimonialsAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    quote: '',
    avatar: null
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    } else if (status === 'authenticated') {
      fetchItems();
    }
  }, [status, router]);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();
      setItems(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, id: editingItem.id, order: editingItem.order } : formData;

      const response = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ name: '', rating: 5, quote: '', avatar: null });
        setEditingItem(null);
        fetchItems();
      } else {
        alert('Failed to save testimonial');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete testimonial');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      rating: item.rating,
      quote: item.quote,
      avatar: item.avatar
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('category', 'testimonials');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, avatar: data.url }));
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Failed to upload:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
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
            <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin' })}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Manage customer testimonials ({items.length} total)</p>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', rating: 5, quote: '', avatar: null });
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm"
          >
            + Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {item.avatar ? (
                    <Image src={item.avatar} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= item.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.quote}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials yet. Add your first one!</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  required
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Quote *
                </label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                  placeholder="What did they say about your service?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                )}
                {formData.avatar && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden">
                      <Image src={formData.avatar} alt="Preview" fill className="object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: null })}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({ name: '', rating: 5, quote: '', avatar: null });
                  }}
                  disabled={saving}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
