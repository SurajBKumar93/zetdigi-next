'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProvenResultCarousel({ testimonials }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Memoize handleNext so it can be used safely inside useEffect
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, [testimonials.length]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    // Auto-scroll logic
    useEffect(() => {
        // If the user is hovering, stop the timer
        if (isHovered || testimonials.length === 0) return;

        const interval = setInterval(() => {
            handleNext();
        }, 2000); // 5000ms = 5 seconds

        return () => clearInterval(interval);
    }, [isHovered, handleNext, testimonials.length]);

    if (!testimonials || testimonials.length === 0) {
        return <div className="text-center py-12 text-gray-500">No testimonials available</div>;
    }

    // Display 2 items
    const results = [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
    ];

    return (
        <div
            className="relative max-w-6xl mx-auto px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ease-in-out">
                {results.map((card, idx) => (
                    <div 
                        key={`${currentIndex}-${idx}`} 
                        className="bg-gray-50 rounded-xl shadow-md border border-gray-100 flex flex-col animate-fadeIn"
                    >
                        {/* Image Section */}
                        <div className="relative p-4">
                            <div className="aspect-video bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4 flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold uppercase">
                                    {card.badge}
                                </span>
                                <span className="text-xs text-gray-400">{card.days}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                <div>
                                    <div className="text-lg font-bold text-blue-600">{card.sessions}</div>
                                    <div className="text-[10px] uppercase text-gray-500">{card.sessionsLabel}</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">{card.uplift}</div>
                                    <div className="text-[10px] uppercase text-gray-500">{card.upliftLabel}</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">{card.revenue}</div>
                                    <div className="text-[10px] uppercase text-gray-500">{card.revenueLabel}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Manual Controls (Hidden on mobile, visible on hover for desktop) */}
            <button
                onClick={handlePrevious}
                className={`hidden xl:block absolute -left-16 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-4 rounded-full shadow-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button
                onClick={handleNext}
                className={`hidden xl:block absolute -right-16 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-4 rounded-full shadow-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    );
}