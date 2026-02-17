'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

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
              <span className="text-xs sm:text-sm font-medium text-orange-300">Amazon Growth Experts Ready to Help</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let&apos;s Grow Your Amazon Business
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Whether you&apos;re launching your first product or scaling to 8-figures, our Amazon experts
              are here to create a custom growth strategy for your brand.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-gray-300">Free Amazon Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">24-Hour Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">No Long-term Contracts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 -mt-12 md:-mt-24 lg:-mt-32 relative z-10 mb-8 md:mb-12">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Our Team</h3>
              <p className="text-gray-600 mb-4">Get expert Amazon advice</p>
              <a href="mailto:support@zetdigi.com" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2 group">
                support@zetdigi.com
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Us</h3>
              <p className="text-gray-600 mb-4">Chat with us directly</p>
              <a href="https://wa.me/923214523355" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2 group">
                +92 321 4523355
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our office location</p>
              <p className="text-orange-600 font-semibold leading-relaxed">
                5900 Balcones Dr #18888<br />
                Austin, TX 78731
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Amazon Audit
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Fill out the form below and our Amazon specialists will analyze your account and
                  provide a custom growth strategy within 24 hours.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">Request received! 🎉</p>
                    <p className="text-sm">Our team will contact you within 24 hours with your free audit.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                  >
                    <option value="">Select Services</option>
                    <option value="keyword-research">Keyword Research</option>
                    <option value="packaging-design">Packaging Design</option>
                    <option value="product-photography">Product Photography</option>
                    <option value="amazon-ebc">Amazon EBC</option>
                    <option value="content-writing">Content Writing</option>
                    <option value="listing-optimization">Listing Optimization</option>
                    <option value="amazon-seo">Amazon SEO</option>
                    <option value="launch-rank">Launch & Rank</option>
                    <option value="storefront-branding">Storefront & Branding</option>
                    <option value="ppc">Pay Per Click (PPC)</option>
                    <option value="account-management">Account Management</option>
                    <option value="amazon-a-z">Amazon A-Z</option>
                  </select>
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Form'
                  )}
                </button>
              </form>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
