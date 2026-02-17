'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SuccessStories() {
  const [currentStatSlide, setCurrentStatSlide] = useState(0);

  const statisticsSlides = [
    {
      image: '/uploads/success-stories/1771241369428-Marketing-Insights-001.png',
      alt: 'PPC Automation Results - AI Optimized',
      title: 'Campaign Performance'
    },
    {
      image: '/uploads/success-stories/1771241393952-Marketing-Insights-002.png',
      alt: 'Sales Growth Statistics',
      title: 'Sales Growth'
    },
    {
      image: '/uploads/success-stories/1771241403549-Marketing-Insights-003.png',
      alt: 'ROI Metrics Dashboard',
      title: 'ROI Metrics'
    }
  ];

  // Auto-play for statistics slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatSlide((prev) => (prev + 1) % statisticsSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [statisticsSlides.length]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-10 lg:mb-12 leading-tight">
          <span className="text-blue-600">Success Stories:</span>{' '}
          <span className="text-gray-900">Tangible Growth with</span>{' '}
          <span className="text-blue-600">PPC Campaigns</span>
        </h2>
      </div>

      {/* Statistics Slider Container - Full Width */}
      <div className="relative w-full px-4 sm:px-6 md:px-8">
        {/* Slide Content */}
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={statisticsSlides[currentStatSlide].image}
              alt={statisticsSlides[currentStatSlide].alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Slider Dots */}
        {statisticsSlides.length > 1 && (
          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {statisticsSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStatSlide(index)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                  currentStatSlide === index
                    ? 'bg-blue-600 w-6 md:w-8'
                    : 'bg-gray-400 hover:bg-gray-500 w-2 md:w-2.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
