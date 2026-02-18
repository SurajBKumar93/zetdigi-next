'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const emptyForm = {
  image: '',
  badge: '',
  days: '',
  title: '',
  description: '',
  sessions: '',
  sessionsLabel: 'Sessions',
  uplift: '',
  upliftLabel: 'Sales Uplift',
  revenue: '',
  revenueLabel: 'Additional Revenue in 2 weeks',
};

export default function ProvenResultsAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
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
      const response = await fetch('/api/admin/proven-results');
      const data = await response.json();
      setItems(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch proven results:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) { alert('Please upload an image'); return; }

    setSaving(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, id: editingItem.id, order: editingItem.order } : formData;

      const response = await fetch('/api/admin/proven-results', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData(emptyForm);
        setEditingItem(null);
        fetchItems();
      } else {
        alert('Failed to save item');
      }
    } catch (error) {
      alert('Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    try {
      const response = await fetch(`/api/admin/proven-results?id=${id}`, { method: 'DELETE' });
      if (response.ok) fetchItems();
      else alert('Failed to delete item');
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      image: item.image, badge: item.badge, days: item.days, title: item.title,
      description: item.description, sessions: item.sessions, sessionsLabel: item.sessionsLabel,
      uplift: item.uplift, upliftLabel: item.upliftLabel, revenue: item.revenue,
      revenueLabel: item.revenueLabel,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('category', 'results');
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await response.json();
      if (data.url) setFormData(prev => ({ ...prev, image: data.url }));
      else alert('Failed to upload image');
    } catch { alert('Failed to upload image'); }
    finally { setUploading(false); }
  };

  const field = (key, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black resize-none"
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-xl text-gray-600">Loading...</div></div>;
  }
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">← Dashboard</Link>
            <h1 className="text-2xl font-bold text-gray-900">Proven Results</h1>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/admin' })} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Manage case studies ({items.length} total)</p>
          <button
            onClick={() => { setEditingItem(null); setFormData(emptyForm); setShowModal(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm"
          >
            + Add Result
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-40 bg-gray-200">
                {item.image && <Image src={item.image} alt={item.badge} fill className="object-cover" />}
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{item.badge}</div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{item.days}</p>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div><div className="text-blue-600 font-bold text-sm">{item.sessions}</div><div className="text-xs text-gray-500">{item.sessionsLabel}</div></div>
                  <div><div className="text-blue-600 font-bold text-sm">{item.uplift}</div><div className="text-xs text-gray-500">{item.upliftLabel}</div></div>
                  <div><div className="text-blue-600 font-bold text-sm">{item.revenue}</div><div className="text-xs text-gray-500 line-clamp-1">{item.revenueLabel}</div></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12"><p className="text-gray-500 text-lg">No results yet. Add your first one!</p></div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{editingItem ? 'Edit Result' : 'Add Result'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Result Image *</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                {formData.image && <div className="mt-2 relative h-32 bg-gray-100 rounded-lg overflow-hidden"><Image src={formData.image} alt="Preview" fill className="object-cover" /></div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {field('badge', 'Brand Category *', 'e.g., Kitchen Brand')}
                {field('days', 'Time Period *', 'e.g., 2 Months')}
              </div>
              {field('title', 'Title *', 'e.g., 120% Sessions Up Increase in 3 Week')}
              {field('description', 'Description *', 'Enter description...', 'textarea')}
              <div className="grid grid-cols-2 gap-4">
                {field('sessions', 'Sessions Value *', 'e.g., 120%')}
                {field('sessionsLabel', 'Sessions Label *', 'Sessions')}
                {field('uplift', 'Sales Uplift Value *', 'e.g., 40%')}
                {field('upliftLabel', 'Sales Uplift Label *', 'Sales Uplift')}
                {field('revenue', 'Revenue Value *', 'e.g., $2635')}
                {field('revenueLabel', 'Revenue Label *', 'Additional Revenue in 2 weeks')}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setEditingItem(null); setFormData(emptyForm); }} disabled={saving} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={uploading || saving || !formData.image} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50">{saving ? 'Saving...' : editingItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
