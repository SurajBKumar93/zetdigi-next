'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Grow Your Amazon & Marketplace Sales with Data-Driven Automation",
      subtitle: "Smart tools for product research, listing optimization, PPC automation & multi-channel selling.",
      buttonText: "Book a Consultation",
      backgroundImage: "/UI-Dashboard.png"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative text-white overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {slides[currentSlide].backgroundImage && (
          <Image
            src={slides[currentSlide].backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover opacity-40 md:opacity-30 lg:opacity-20"
            priority
          />
        )}
        {/* Dark Gradient Overlay - lighter on mobile for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85 md:from-slate-900/90 md:via-slate-800/85 md:to-slate-900/90 lg:from-slate-900/95 lg:via-slate-800/90 lg:to-slate-900/95"></div>
        {/* Additional mesh gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 min-h-[400px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center w-full py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Left Content - Centered on mobile/tablet, left-aligned on desktop */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-center lg:text-left mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="#clanderly" className="bg-blue-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform">
                {slides[currentSlide].buttonText}
              </Link>
            </div>
          </div>

          {/* Right Content - Laptop Mockup (Hidden on mobile/tablet, shown on lg+) */}
          <div className="relative hidden lg:block">
            {/* Laptop */}
            <div className="relative">
              <div className="relative">
                {/* Laptop Screen */}
                <div className="relative bg-gray-900 rounded-t-2xl border-4 border-gray-700 shadow-2xl overflow-hidden backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 p-2 md:p-4 border-t-2 border-gray-600">
                    {/* Dashboard Content */}
                    <div className="h-full bg-slate-900 rounded-lg p-2 md:p-4 space-y-2 md:space-y-3">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 md:gap-2">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded flex items-center justify-center">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-white font-semibold text-xs">ZetDigi</span>
                        </div>
                        <div className="text-gray-400 text-xs hidden lg:block">Seller Analytics</div>
                      </div>

                      {/* Charts Area */}
                      <div className="grid grid-cols-2 gap-2 md:gap-3 h-full">
                        {/* Main Chart */}
                        <div className="bg-slate-800 rounded p-1 md:p-2">
                          <div className="text-xs text-gray-400 mb-1 hidden md:block">Sales Trend</div>
                          <svg className="w-full h-12 md:h-20" viewBox="0 0 100 40">
                            <polyline
                              points="0,35 10,32 20,28 30,25 40,22 50,18 60,15 70,12 80,10 90,8 100,5"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>

                        {/* PPC Performance */}
                        <div className="bg-slate-800 rounded p-1 md:p-2">
                          <div className="text-xs text-gray-400 mb-1 hidden md:block">PPC Performance</div>
                          <svg className="w-full h-12 md:h-20" viewBox="0 0 100 40">
                            <rect x="10" y="15" width="8" height="20" fill="#8b5cf6" opacity="0.6" />
                            <rect x="25" y="10" width="8" height="25" fill="#8b5cf6" opacity="0.8" />
                            <rect x="40" y="20" width="8" height="15" fill="#8b5cf6" opacity="0.6" />
                            <rect x="55" y="5" width="8" height="30" fill="#8b5cf6" />
                            <rect x="70" y="12" width="8" height="23" fill="#8b5cf6" opacity="0.7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="h-1 md:h-2 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-b-lg"></div>
                <div className="h-2 md:h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-b-xl mx-4 md:mx-8"></div>
              </div>
            </div>

            {/* Floating Badges - Only shown on large desktop screens */}
            <div className="hidden xl:block absolute -top-2 -right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-2xl text-sm font-bold animate-bounce border border-orange-400/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-90">Total Score</span>
                <span className="text-xl">92</span>
              </div>
            </div>

            <div className="hidden xl:flex absolute top-1/2 -right-6 transform translate-y-4 bg-gradient-to-br from-orange-500 to-red-600 text-white px-3 py-2 rounded-lg shadow-2xl text-xs font-bold items-center gap-2 border border-orange-400/50 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Low ACOS
            </div>

            <div className="hidden xl:flex absolute bottom-1/4 right-2 bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 lg:w-24 lg:h-24 rounded-full items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">92</div>
                <div className="text-xs opacity-90">Score</div>
              </div>
            </div>

            <div className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-lg shadow-2xl text-sm font-bold items-center gap-2 border border-indigo-400/50 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Inventory Forecast Ready
            </div>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 shadow-lg ${
                currentSlide === index
                  ? 'bg-blue-500 w-8 md:w-10 shadow-blue-500/50'
                  : 'bg-white/50 w-2 md:w-3 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
