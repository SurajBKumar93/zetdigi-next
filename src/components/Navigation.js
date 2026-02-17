'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setServicesOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="ZetDigi Logo"
              width={182}
              height={67}
              className="object-contain w-28 sm:w-32 md:w-40 lg:w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600 font-semibold transition">
              Home
            </Link>

            <div className="relative dropdown-container">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                }}
                className="text-gray-700 hover:text-blue-600 font-semibold transition flex items-center gap-1"
              >
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50 overflow-y-auto max-h-96">
                  <Link href="/services/keyword-research" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Keyword Research</Link>
                  <Link href="/services/packaging-design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Packaging Design</Link>
                  <Link href="/services/product-photography" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Product Photography</Link>
                  <Link href="/services/amazon-ebc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Amazon EBC</Link>
                  <Link href="/services/content-writing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Content Writing</Link>
                  <Link href="/services/listing-optimization" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Listing Optimization</Link>
                  <Link href="/services/amazon-seo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Amazon SEO</Link>
                  <Link href="/services/launch-rank" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Launch & Rank</Link>
                  <Link href="/services/storefront-branding" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Storefront & Branding</Link>
                  <Link href="/services/pay-per-click" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Pay Per Click (PPC)</Link>
                  <Link href="/services/account-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Account Management</Link>
                  <Link href="/services/amazon-a-z" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Amazon A-Z</Link>
                </div>
              )}
            </div>

            <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 font-semibold transition">
              Portfolio
            </Link>

            <Link href="/blogs" className="text-gray-700 hover:text-blue-600 font-semibold transition">
              Blogs
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold transition">
              Contact
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <Link href="#clanderly" className="hidden lg:block bg-gray-900 text-white px-6 xl:px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium shadow-lg text-sm xl:text-base">
            Start a Project
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-700 hover:text-blue-600"
            aria-label="Close mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-5rem)] pb-20">
          <div className="p-4 space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
              >
                Services
                <svg
                  className={`w-4 h-4 transform transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                  <Link href="/services/keyword-research" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Keyword Research</Link>
                  <Link href="/services/packaging-design" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Packaging Design</Link>
                  <Link href="/services/product-photography" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Product Photography</Link>
                  <Link href="/services/amazon-ebc" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Amazon EBC</Link>
                  <Link href="/services/content-writing" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Content Writing</Link>
                  <Link href="/services/listing-optimization" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Listing Optimization</Link>
                  <Link href="/services/amazon-seo" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Amazon SEO</Link>
                  <Link href="/services/launch-rank" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Launch & Rank</Link>
                  <Link href="/services/storefront-branding" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Storefront & Branding</Link>
                  <Link href="/services/pay-per-click" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Pay Per Click (PPC)</Link>
                  <Link href="/services/account-management" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Account Management</Link>
                  <Link href="/services/amazon-a-z" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition">Amazon A-Z</Link>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
            >
              Portfolio
            </Link>

            <Link
              href="/blogs"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
            >
              Blogs
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-lg transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile CTA Button */}
          <div className="p-4 border-t border-gray-200 mt-4">
            <button
              onClick={closeMobileMenu}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition font-medium shadow-lg"
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
