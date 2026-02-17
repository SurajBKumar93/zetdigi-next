'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tagLine: "10M+ generated across 20+ niches",
      title1: "Ready To Grow Your Amazon Sales From $10K To $100K Per Month?",
      title2: " We Build The Structure, Optimize The Ads, And Scale Profitably",
      subtitle: "Cut the wasted spend, Eliminate the chaos, Free up your time",
      subtitle2: "We take full control and turn your brand into a scalable machine",
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
        <div className="grid lg:grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center w-full py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Left Content - Centered on mobile/tablet, left-aligned on desktop */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-center lg:text-left mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
            
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-4xl font-bold leading-tight text-white drop-shadow-lg">
              <span className="text-sm mb-5 sm:text-base md:text-lg lg:text-2xl font-semibold tracking-wide text-white drop-shadow-lg">
              <span className='text-blue-400'>10M+</span> sales generated across <span className='text-blue-400'>20+</span> niches
            </span>
              <br/>
              Ready To Grow Your Amazon Sales From <span className='text-blue-400'>$10K</span> To <span className='text-blue-400'>$100K</span> Per Month?
              <br/>
              {slides[currentSlide].title2}
              <br/>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-md">
              {slides[currentSlide].subtitle}
            </span>
            </span>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-md">
              {slides[currentSlide].subtitle2}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="#clanderly" className="bg-blue-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform">
                {slides[currentSlide].buttonText}
              </Link>
            </div>
          </div>

          {/* Right Content - Laptop Mockup (Hidden on mobile/tablet, shown on lg+) */}
          
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
