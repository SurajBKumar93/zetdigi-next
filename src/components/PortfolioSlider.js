'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PortfolioSlider({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Get visible items (current, previous, and next)
  const getVisibleItems = () => {
    if (items.length === 0) return [];
    const visibleItems = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visibleItems.push({ ...items[index], position: i });
    }
    return visibleItems;
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || items.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, items.length]);

  return (
    <section className="py-20 bg-gray-900 w-full overflow-hidden">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center text-white">
          Portfolio Store Front
        </h2>
      </div>

      {/* Slider Container */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Portfolio Items */}
          <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
            {getVisibleItems().map((item, idx) => {
              const position = item.position;
              const isCenter = position === 0;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`absolute transition-all duration-500 ease-in-out ${isCenter ? 'z-30 scale-100' : 'z-10 scale-75 opacity-60'
                    }`}
                  style={{
                    transform: `translateX(${position * 280}px) scale(${isCenter ? 1 : 0.75})`,
                    opacity: Math.abs(position) > 2 ? 0 : isCenter ? 1 : 0.6,
                  }}
                >
                  {/* Phone Mockup Frame */}
                  <div className="relative">
                    {/* Phone Border/Frame */}
                    <div className="rounded-[3rem] hover:scale-105 transition-transform duration-300 w-[280px]">
                      {/* Phone Screen */}
                      <div className="bg-black rounded-[2.5rem] overflow-hidden h-[590px] relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
