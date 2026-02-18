'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ServicesSectionAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [formData, setFormData] = useState({ services: [], steps: [] });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '' });
  const [stepForm, setStepForm] = useState({ number: '', title: '', description: '' });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/services-section');
      const data = await response.json();
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  const save = async (updated) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/services-section', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) alert('Failed to save');
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  // Services handlers
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    let updated;
    if (editingService) {
      updated = { ...formData, services: formData.services.map(s => s.id === editingService.id ? { ...s, name: serviceForm.name } : s) };
    } else {
      const newId = formData.services.length > 0 ? Math.max(...formData.services.map(s => s.id)) + 1 : 1;
      updated = { ...formData, services: [...formData.services, { id: newId, name: serviceForm.name, order: formData.services.length + 1 }] };
    }
    setFormData(updated);
    await save(updated);
    setShowServiceModal(false);
    setEditingService(null);
    setServiceForm({ name: '' });
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    const updated = { ...formData, services: formData.services.filter(s => s.id !== id) };
    setFormData(updated);
    await save(updated);
  };

  // Steps handlers
  const handleStepSubmit = async (e) => {
    e.preventDefault();
    let updated;
    if (editingStep) {
      updated = { ...formData, steps: formData.steps.map(s => s.id === editingStep.id ? { ...s, ...stepForm, number: parseInt(stepForm.number) } : s) };
    } else {
      const newId = formData.steps.length > 0 ? Math.max(...formData.steps.map(s => s.id)) + 1 : 1;
      updated = { ...formData, steps: [...formData.steps, { id: newId, ...stepForm, number: parseInt(stepForm.number), order: formData.steps.length + 1 }] };
    }
    setFormData(updated);
    await save(updated);
    setShowStepModal(false);
    setEditingStep(null);
    setStepForm({ number: '', title: '', description: '' });
  };

  const handleDeleteStep = async (id) => {
    if (!confirm('Delete this step?')) return;
    const updated = { ...formData, steps: formData.steps.filter(s => s.id !== id) };
    setFormData(updated);
    await save(updated);
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Services & How It Works</h1>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/admin' })} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 text-sm font-medium transition ${activeTab === 'services' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Services ({formData.services.length})
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-6 py-3 text-sm font-medium transition ${activeTab === 'steps' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            How It Works Steps ({formData.steps.length})
          </button>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Manage service list items</p>
              <button
                onClick={() => { setEditingService(null); setServiceForm({ name: '' }); setShowServiceModal(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
              >
                + Add Service
              </button>
            </div>
            <div className="space-y-3">
              {formData.services.map((service, idx) => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                    <span className="text-gray-900 font-medium">{service.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingService(service); setServiceForm({ name: service.name }); setShowServiceModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Edit</button>
                    <button onClick={() => handleDeleteService(service.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps Tab */}
        {activeTab === 'steps' && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Manage how it works steps</p>
              <button
                onClick={() => { setEditingStep(null); setStepForm({ number: formData.steps.length + 1, title: '', description: '' }); setShowStepModal(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
              >
                + Add Step
              </button>
            </div>
            <div className="space-y-4">
              {formData.steps.map((step) => (
                <div key={step.id} className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-blue-600 font-semibold mb-1">Step {step.number}</div>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{step.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingStep(step); setStepForm({ number: step.number, title: step.title, description: step.description }); setShowStepModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Edit</button>
                      <button onClick={() => handleDeleteStep(step.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{editingService ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  placeholder="e.g., Conversion Rate Optimization"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50">{saving ? 'Saving...' : editingService ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Step Modal */}
      {showStepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{editingStep ? 'Edit Step' : 'Add Step'}</h2>
            <form onSubmit={handleStepSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Number *</label>
                <input
                  type="number"
                  value={stepForm.number}
                  onChange={(e) => setStepForm({ ...stepForm, number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Title *</label>
                <input
                  type="text"
                  value={stepForm.title}
                  onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  placeholder="e.g., Book a Strategy Session"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={stepForm.description}
                  onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black resize-none"
                  placeholder="Describe what happens in this step..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowStepModal(false); setEditingStep(null); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50">{saving ? 'Saving...' : editingStep ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
