'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll functionality
  useEffect(() => {
    // Don't auto-scroll if hovered or if there are no testimonials
    if (isHovered || testimonials.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-advance every 5 seconds

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [isHovered, currentIndex, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No testimonials available
      </div>
    );
  }

  // Get 3 testimonials to display: current, and next two (wrapping around)
  const displayedTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <div
      className="relative max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayedTestimonials.map((testimonial, idx) => (
          <div
            key={`${currentIndex}-${idx}`}
            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${idx === 1 ? 'hidden sm:block' : ''
              } ${idx === 2 ? 'hidden lg:block' : ''
              }`}
          >
            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-6 h-6 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              {testimonial.avatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Show on hover for xl screens */}
      <button
        onClick={handlePrevious}
        className={`hidden xl:block absolute -left-20 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Previous testimonials"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className={`hidden xl:block absolute -right-20 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Next testimonials"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
