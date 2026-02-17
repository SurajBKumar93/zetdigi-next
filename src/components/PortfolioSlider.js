'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const portfolioItems = [
    { id: 1, name: 'Bribilla', image: '/portfolio/1771242824519-Bribilla.png' },
    { id: 2, name: 'Winstico', image: '/portfolio/1771242929170-Winstico.png' },
    { id: 3, name: 'By Amazon', image: '/portfolio/1771242944445-By-Amazon.png' },
    { id: 4, name: 'Honzuen', image: '/portfolio/1771242961996-HONZUEN.png' },
    { id: 5, name: 'Winning Beast', image: '/portfolio/1771242981649-Winning-Beast.png' },
    { id: 6, name: 'Zesty Paw', image: '/portfolio/1771242995204-Zesty-Paw.png' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  // Get visible items (current, previous, and next)
  const getVisibleItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + portfolioItems.length) % portfolioItems.length;
      items.push({ ...portfolioItems[index], position: i });
    }
    return items;
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

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
