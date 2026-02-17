'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const portfolioItems = [
  {
    id: 1,
    title: 'Ferrari Skates - Premium Sports Brand',
    services: ['storefront-branding', 'amazon-ebc', 'listing-optimization'],
    mainService: 'Storefront & Branding',
    description: 'Complete Amazon brand store redesign with A+ content, driving 340% increase in conversion rate.',
    image: '/portfolio/Ferrari-Skates-Website.png',
    tags: ['Brand Store', 'A+ Content', 'Listing Optimization'],
    metrics: { sales: '+340%', bsr: 'Top 10', conversion: '18.5%' },
    amazonMetrics: {
      beforeAfter: { sessions: '+280%', units: '+340%', revenue: '$2.4M' },
      category: 'Sports & Outdoors'
    }
  },
  {
    id: 2,
    title: 'Drone Tech - Electronics Category Leader',
    services: ['pay-per-click', 'amazon-seo'],
    mainService: 'Pay Per Click',
    description: 'Strategic PPC campaign management reducing ACoS from 45% to 18% while scaling sales 5x.',
    image: '/portfolio/Booster-V2-Drone.png',
    tags: ['PPC Campaign', 'ACoS Optimization', 'Sponsored Brands'],
    metrics: { acos: '18%', sales: '5x', roas: '550%' },
    amazonMetrics: {
      beforeAfter: { acos: '45% → 18%', adSpend: '+120%', profitMargin: '+85%' },
      category: 'Electronics'
    }
  },
  {
    id: 3,
    title: 'Broadcast Pro - Professional Equipment',
    services: ['listing-optimization', 'keyword-research', 'amazon-seo', 'product-photography'],
    mainService: 'Listing Optimization',
    description: 'Complete catalog optimization with keyword research, resulting in page 1 rankings for 47 keywords.',
    image: '/portfolio/Broadcasting-Equipment.png',
    tags: ['SEO', 'Backend Keywords', 'Image Optimization'],
    metrics: { keywords: '47', ranking: 'Page 1', traffic: '+425%' },
    amazonMetrics: {
      beforeAfter: { organicSales: '+425%', pageViews: '+380%', cvr: '12.8%' },
      category: 'Professional Equipment'
    }
  },
  {
    id: 4,
    title: 'Pet Paws - Premium Pet Products',
    services: ['launch-rank', 'product-photography', 'amazon-ebc', 'pay-per-click'],
    mainService: 'Launch & Rank',
    description: 'Full product launch strategy with imagery, A+ content, and PPC - reached Best Seller in 6 weeks.',
    image: '/portfolio/Pet-Paws-Product.png',
    tags: ['Product Launch', 'Photography', 'Early Reviewer'],
    metrics: { timeline: '6 weeks', reviews: '250+', badge: 'Best Seller' },
    amazonMetrics: {
      beforeAfter: { launch: '0 → #1 BSR', reviews: '250+ (4.8⭐)', revenue: '$180K/mo' },
      category: 'Pet Supplies'
    }
  },
  {
    id: 5,
    title: 'Green Living - Organic Plants',
    services: ['storefront-branding', 'amazon-ebc', 'pay-per-click'],
    mainService: 'Storefront & Branding',
    description: 'Brand registry setup, EBC design, and sponsored brand campaigns achieving 95% brand search share.',
    image: '/portfolio/Plants-Products.png',
    tags: ['Brand Registry', 'EBC', 'Brand Analytics'],
    metrics: { brandShare: '95%', repeat: '68%', margin: '+45%' },
    amazonMetrics: {
      beforeAfter: { brandSearches: '+520%', repeatRate: '68%', ltv: '$420' },
      category: 'Home & Garden'
    }
  },
  {
    id: 6,
    title: 'Dashboard Analytics - Seller Tools',
    services: ['account-management', 'listing-optimization', 'amazon-a-z'],
    mainService: 'Account Management',
    description: 'Complete account health turnaround and catalog optimization for multi-million dollar seller.',
    image: '/portfolio/Dashboard-Interface.png',
    tags: ['Account Health', 'Inventory Management', 'Catalog Optimization'],
    metrics: { health: '100%', sku: '500+', revenue: '$4.2M' },
    amazonMetrics: {
      beforeAfter: { accountHealth: '85% → 100%', oos: '22% → 2%', defectRate: '0.3%' },
      category: 'Multiple Categories'
    }
  },
  {
    id: 7,
    title: 'Equipment Rental - B2B Solutions',
    services: ['account-management', 'amazon-a-z', 'pay-per-click'],
    mainService: 'Amazon A to Z',
    description: 'Amazon Business optimization with bulk pricing and business-only offers, 3x B2B sales.',
    image: '/portfolio/Equipment-Setup.png',
    tags: ['Amazon Business', 'Bulk Pricing', 'B2B Marketing'],
    metrics: { b2bSales: '3x', avgOrder: '$2,400', clients: '180+' },
    amazonMetrics: {
      beforeAfter: { b2bRevenue: '+310%', avgOrderValue: '$2,400', repeatBuyers: '74%' },
      category: 'Industrial & Scientific'
    }
  }
];

// Service Categories with Icons and Descriptions
const serviceCategories = [
  {
    id: 'all',
    name: 'All Projects',
    icon: '🎯',
    description: 'View all our success stories',
    color: 'from-gray-600 to-gray-700'
  },
  {
    id: 'pay-per-click',
    name: 'Pay Per Click',
    icon: '💰',
    description: 'PPC campaigns & ad optimization',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'listing-optimization',
    name: 'Listing Optimization',
    icon: '📝',
    description: 'Listing optimization & conversion',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'amazon-seo',
    name: 'Amazon SEO',
    icon: '🔍',
    description: 'Keyword research & ranking',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'product-photography',
    name: 'Product Photography',
    icon: '📸',
    description: 'Professional product images',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'amazon-ebc',
    name: 'Amazon EBC',
    icon: '🎨',
    description: 'A+ Content & brand content',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'storefront-branding',
    name: 'Storefront & Branding',
    icon: '🏪',
    description: 'Brand stores & registry',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'launch-rank',
    name: 'Launch & Rank',
    icon: '🚀',
    description: 'New product launches',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'account-management',
    name: 'Account Management',
    icon: '⚙️',
    description: 'Full account management',
    color: 'from-slate-600 to-gray-700'
  },
  {
    id: 'amazon-a-z',
    name: 'Amazon A to Z',
    icon: '🎓',
    description: 'Complete Amazon solutions',
    color: 'from-teal-500 to-cyan-600'
  }
];

export default function Portfolio() {
  const [activeService, setActiveService] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredItems = activeService === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.services.includes(activeService));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,153,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-orange-300">Amazon Success Stories</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Proven Amazon Growth Results
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore our portfolio of successful Amazon brands we&apos;ve helped scale from startup to
              7-figures with data-driven strategies and expert marketplace optimization.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold text-orange-400">$50M+</span>
                <span className="text-gray-300 ml-2">Revenue Generated</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold text-blue-400">200+</span>
                <span className="text-gray-300 ml-2">Brands Scaled</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold text-cyan-400">10+</span>
                <span className="text-gray-300 ml-2">Expert Services</span>
              </div>
            </div>

            {/* Quick Service Overview */}
            <div className="max-w-5xl mx-auto">
              <p className="text-sm text-gray-400 mb-4">Browse by Service Category:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {serviceCategories.filter(s => s.id !== 'all').map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setActiveService(service.id);
                      document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-xs font-medium transition-all hover:scale-105"
                  >
                    <span>{service.icon}</span>
                    <span>{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="container-custom">
          {/* Service Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {serviceCategories.map((service) => {
              const itemCount = service.id === 'all'
                ? portfolioItems.length
                : portfolioItems.filter(item => item.services.includes(service.id)).length;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`group relative flex items-center justify-center gap-1 overflow-hidden rounded-xl px-4 py-2 transition-all duration-300 text-left ${activeService === service.id
                    ? 'bg-gradient-to-br ' + service.color + ' text-white shadow-xl scale-105 ring-2 ring-white'
                    : 'bg-white text-gray-700 hover:shadow-lg hover:-translate-y-1'
                    }`}
                >
                  {/* Icon */}
                  <div className="text-2xl md:text-3xl">{service.icon}</div>

                  {/* Service Name */}
                  <div className={`font-bold text-xs md:text-sm ${activeService === service.id ? 'text-white' : 'text-gray-900'
                    }`}>
                    {service.name}
                  </div>

                  {/* Project Count Badge */}
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${activeService === service.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                    }`}>
                    <span>{itemCount}</span>
                    <span>{itemCount === 1 ? 'project' : 'projects'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio-grid" className="py-20 bg-white">
        <div className="container-custom">
          {filteredItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="text-6xl mb-6">
                {serviceCategories.find(s => s.id === activeService)?.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Projects Yet for {serviceCategories.find(s => s.id === activeService)?.name}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We&apos;re constantly adding new success stories. Check back soon or explore our other services!
              </p>
              <button
                onClick={() => setActiveService('all')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent transition-opacity duration-500 ${hoveredItem === item.id ? 'opacity-95' : 'opacity-0'
                      }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-300">
                          Category: {item.amazonMetrics.category}
                        </p>
                      </div>
                    </div>

                    {/* Main Service Badge */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          {item.mainService}
                        </span>
                        <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                          {item.services.length} Services
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {item.description}
                    </p>

                    {/* Services Used */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 mb-2">Services Used:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.services.map((serviceId) => {
                          const service = serviceCategories.find(s => s.id === serviceId);
                          return (
                            <span
                              key={serviceId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-md text-xs font-medium transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveService(serviceId);
                              }}
                            >
                              <span>{service?.icon}</span>
                              <span>{service?.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-gray-100">
                      {Object.entries(item.metrics).map(([key, value]) => (
                        <div key={key} className="text-center bg-gray-50 rounded-lg py-2">
                          <div className="text-base font-bold text-orange-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Before/After Stats */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Results Achieved:</div>
                      <div className="space-y-1">
                        {Object.entries(item.amazonMetrics.beforeAfter).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-bold text-primary-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-gray-900 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm">
                        Case Study
                        <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                      <Link
                        href={`/services/${item.services[0]}`}
                        className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 font-semibold py-2.5 rounded-lg transition-all duration-300 text-center text-sm flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Service
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact Across All Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from real brands. Here&apos;s what we&apos;ve achieved for our clients across all our services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '$50M+', label: 'Total Revenue Generated', icon: '💰' },
              { value: '200+', label: 'Brands Successfully Scaled', icon: '🚀' },
              { value: '18%', label: 'Average ACoS Achieved', icon: '📊' },
              { value: '4.8⭐', label: 'Average Client Rating', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
