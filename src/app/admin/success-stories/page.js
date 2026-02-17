'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SuccessStoriesAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', image: '', alt: '' });
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
      const response = await fetch('/api/admin/success-stories');
      const data = await response.json();
      setItems(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch success stories:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }

    setSaving(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, id: editingItem.id, order: editingItem.order } : formData;

      const response = await fetch('/api/admin/success-stories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ title: '', image: '', alt: '' });
        setEditingItem(null);
        fetchItems();
      } else {
        alert('Failed to save success story');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save success story');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this success story?')) return;

    try {
      const response = await fetch(`/api/admin/success-stories?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete success story');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete success story');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, image: item.image, alt: item.alt || '' });
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
    uploadFormData.append('category', 'success-stories');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
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
            <h1 className="text-2xl font-bold text-gray-900">Success Stories Management</h1>
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
          <p className="text-gray-600">Manage success stories ({items.length} total)</p>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({ title: '', image: '', alt: '' });
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm"
          >
            + Add Success Story
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 bg-gray-200">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Order: {item.order}</p>
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
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No success stories yet. Add your first one!</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Success Story' : 'Add Success Story'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  placeholder="e.g., 500% Revenue Growth"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  placeholder="Image description for accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
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
                {formData.image && (
                  <div className="mt-3 relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({ title: '', image: '', alt: '' });
                  }}
                  disabled={saving}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || saving || !formData.image}
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
