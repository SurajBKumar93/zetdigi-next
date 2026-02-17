'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ServicesAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    order: 1,
    status: 'published',
    hero: {
      badge: '',
      title: '',
      description: '',
      subtitle: '',
      image: '',
      bullets: []
    },
    sections: [],
    cta: {
      title: '',
      description: '',
      buttonText: ''
    },
    metadata: {
      title: '',
      description: '',
      keywords: ''
    }
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
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      setItems(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingItem ? prev.slug : generateSlug(title)
    }));
  };

  const handleImageUpload = async (e, fieldPath) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('category', 'services');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.url) {
        // Handle nested field paths like 'hero.image' or 'contact.image'
        const paths = fieldPath.split('.');
        setFormData(prev => {
          const updated = { ...prev };
          let current = updated;
          for (let i = 0; i < paths.length - 1; i++) {
            current[paths[i]] = { ...current[paths[i]] };
            current = current[paths[i]];
          }
          current[paths[paths.length - 1]] = data.url;
          return updated;
        });
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

  const handleSectionImageUpload = async (e, sectionIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('category', 'services');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => {
          const sections = [...prev.sections];
          sections[sectionIndex] = { ...sections[sectionIndex], image: data.url };
          return { ...prev, sections };
        });
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

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `section-${Date.now()}`,
          type: 'list',
          title: '',
          image: '',
          imagePosition: 'right',
          items: []
        }
      ]
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const section = sections[index];

      // Handle type change - convert items format
      if (field === 'type') {
        const needsStructured = ['process', 'cards'].includes(value);
        const currentlyStructured = Array.isArray(section.items) && section.items.length > 0 && typeof section.items[0] === 'object';

        if (needsStructured && !currentlyStructured) {
          // Convert simple strings to structured objects
          sections[index] = {
            ...section,
            type: value,
            items: Array.isArray(section.items)
              ? section.items.map(item => ({ title: item, description: '', image: '' }))
              : []
          };
        } else if (!needsStructured && currentlyStructured) {
          // Convert structured objects to simple strings
          sections[index] = {
            ...section,
            type: value,
            items: Array.isArray(section.items)
              ? section.items.map(item => item.title || item.description || '')
              : []
          };
        } else {
          sections[index] = { ...section, [field]: value };
        }
      } else {
        sections[index] = { ...section, [field]: value };
      }

      return { ...prev, sections };
    });
  };

  const addStructuredItem = (sectionIndex) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const section = sections[sectionIndex];
      const newItem = { title: '', description: '', image: '' };
      sections[sectionIndex] = {
        ...section,
        items: Array.isArray(section.items) ? [...section.items, newItem] : [newItem]
      };
      return { ...prev, sections };
    });
  };

  const removeStructuredItem = (sectionIndex, itemIndex) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const section = sections[sectionIndex];
      sections[sectionIndex] = {
        ...section,
        items: section.items.filter((_, i) => i !== itemIndex)
      };
      return { ...prev, sections };
    });
  };

  const updateStructuredItem = (sectionIndex, itemIndex, field, value) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const section = sections[sectionIndex];
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      sections[sectionIndex] = { ...section, items };
      return { ...prev, sections };
    });
  };

  const handleItemImageUpload = async (e, sectionIndex, itemIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('category', 'services');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.url) {
        updateStructuredItem(sectionIndex, itemIndex, 'image', data.url);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem
        ? { ...formData, id: editingItem.id }
        : formData;

      const response = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowModal(false);
        resetForm();
        fetchItems();
      } else {
        alert('Failed to save service');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete service');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setActiveTab('basic');
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      order: items.length + 1,
      status: 'published',
      hero: {
        badge: '',
        title: '',
        description: '',
        subtitle: '',
        image: '',
        bullets: []
      },
      sections: [],
      cta: {
        title: '',
        description: '',
        buttonText: ''
      },
      contact: {
        image: ''
      },
      metadata: {
        title: '',
        description: '',
        keywords: ''
      }
    });
    setEditingItem(null);
    setActiveTab('basic');
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
            <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
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
          <p className="text-gray-600">Manage service pages ({items.length} total)</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm"
          >
            + Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="relative h-48 bg-gray-200">
                {item.hero?.image && (
                  <Image src={item.hero.image} alt={item.title} fill className="object-cover" />
                )}
                {!item.hero?.image && (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === 'published'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    {item.order}
                  </span>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">/{item.slug}</p>
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
          <div className="bg-white rounded-lg shadow-sm text-center py-12">
            <p className="text-gray-500 text-lg">No services yet. Add your first one!</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-5xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Service' : 'Add Service'}
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
              {['basic', 'hero', 'sections', 'cta', 'seo'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                        placeholder="Amazon SEO"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                        placeholder="amazon-seo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                        required
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.hero.badge}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, badge: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="Amazon SEO Services"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="Amazon SEO"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.hero.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, description: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                      placeholder="Service description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="From Start to Finish..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'hero.image')}
                      disabled={uploading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {uploading && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                    {formData.hero.image && (
                      <div className="mt-3 relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <Image src={formData.hero.image} alt="Hero" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bullet Points (one per line)
                    </label>
                    <textarea
                      value={formData.hero.bullets.join('\n')}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: {
                          ...formData.hero,
                          bullets: e.target.value.split('\n').filter(b => b.trim())
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                      placeholder="Bullet point 1&#10;Bullet point 2&#10;Bullet point 3"
                    />
                  </div>
                </div>
              )}

              {/* Sections Tab */}
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Content Sections</h3>
                    <button
                      type="button"
                      onClick={addSection}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      + Add Section
                    </button>
                  </div>

                  {formData.sections.map((section, index) => (
                    <div key={section.id || index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Section {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            placeholder="Benefits of using our services"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type
                            </label>
                            <select
                              value={section.type}
                              onChange={(e) => updateSection(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            >
                              <option value="list">List</option>
                              <option value="tips">Tips Box</option>
                              <option value="cards">Cards</option>
                              <option value="process">Process Steps</option>
                              <option value="content">Content Block</option>
                              <option value="recent-work">Recent Work</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Image Position
                            </label>
                            <select
                              value={section.imagePosition}
                              onChange={(e) => updateSection(index, 'imagePosition', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            >
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSectionImageUpload(e, index)}
                            disabled={uploading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black text-sm"
                          />
                          {section.image && (
                            <div className="mt-2 relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                              <Image src={section.image} alt="Section" fill className="object-cover" />
                            </div>
                          )}
                        </div>

                        <div>
                          {/* Simple items for list/tips/content/recent-work sections */}
                          {['list', 'tips', 'content', 'recent-work'].includes(section.type) ? (
                            <>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Items (one per line)
                              </label>
                              <textarea
                                value={Array.isArray(section.items) && typeof section.items[0] === 'string' ? section.items.join('\n') : ''}
                                onChange={(e) => updateSection(index, 'items', e.target.value.split('\n').filter(i => i.trim()))}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black resize-none text-sm"
                                placeholder="Item 1&#10;Item 2&#10;Item 3"
                              />
                            </>
                          ) : (
                            /* Structured items for process/cards sections */
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">
                                  {section.type === 'process' ? 'Process Steps' : 'Cards'}
                                </label>
                                <button
                                  type="button"
                                  onClick={() => addStructuredItem(index)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                                >
                                  + Add {section.type === 'process' ? 'Step' : 'Card'}
                                </button>
                              </div>

                              {Array.isArray(section.items) && section.items.length > 0 && section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="border border-gray-200 rounded-lg p-3 bg-white space-y-2">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-gray-600">
                                      {section.type === 'process' ? `Step ${itemIndex + 1}` : `Card ${itemIndex + 1}`}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeStructuredItem(index, itemIndex)}
                                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                                    >
                                      Remove
                                    </button>
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      value={item.title || ''}
                                      onChange={(e) => updateStructuredItem(index, itemIndex, 'title', e.target.value)}
                                      className="w-full px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-black text-sm"
                                      placeholder="Step title"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Description
                                    </label>
                                    <textarea
                                      value={item.description || ''}
                                      onChange={(e) => updateStructuredItem(index, itemIndex, 'description', e.target.value)}
                                      rows={2}
                                      className="w-full px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-black text-sm resize-none"
                                      placeholder="Step description"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Image
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleItemImageUpload(e, index, itemIndex)}
                                      disabled={uploading}
                                      className="w-full px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-black text-xs"
                                    />
                                    {item.image && (
                                      <div className="mt-2 relative h-24 bg-gray-50 rounded overflow-hidden">
                                        <Image src={item.image} alt={item.title || 'Item'} fill className="object-cover" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}

                              {(!Array.isArray(section.items) || section.items.length === 0) && (
                                <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-300 rounded">
                                  No {section.type === 'process' ? 'steps' : 'cards'} yet. Click "+ Add" to create one.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {formData.sections.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No sections yet. Click "Add Section" to create one.</p>
                  )}
                </div>
              )}

              {/* CTA Tab */}
              {activeTab === 'cta' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Title
                    </label>
                    <input
                      type="text"
                      value={formData.cta.title}
                      onChange={(e) => setFormData({
                        ...formData,
                        cta: { ...formData.cta, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="Amazon SEO"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Description
                    </label>
                    <textarea
                      value={formData.cta.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        cta: { ...formData.cta, description: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                      placeholder="Increase your product visibility..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.cta.buttonText}
                      onChange={(e) => setFormData({
                        ...formData,
                        cta: { ...formData.cta, buttonText: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="Boost your SEO"
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.title}
                      onChange={(e) => setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="Amazon SEO - ZETDIGI"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metadata.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, description: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                      placeholder="Amazon SEO services to increase product visibility..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.keywords}
                      onChange={(e) => setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, keywords: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                      placeholder="amazon seo, amazon ranking, listing optimization"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
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
