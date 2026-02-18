'use client';

import Image from 'next/image';

export default function TrustedByMarquee({ brands = [] }) {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom mx-auto px-6 mb-12">
        <h2 className="text-4xl font-bold text-center text-black">
          <span className="text-blue-600">Trusted</span> By
        </h2>
      </div>

      {/* Logo Marquee */}
      <div className="relative w-full">
        <style jsx>{`
          @keyframes scrollLogos {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-logos {
            animation: scrollLogos 20s linear infinite;
          }
          .animate-scroll-logos:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex animate-scroll-logos">
          {/* First Set of Logos */}
          {brands.map((logo, idx) => (
            <div key={`first-${logo.id || idx}`} className="flex-shrink-0 px-8">
              <div className="w-48">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}

          {/* Duplicate Set for Seamless Loop */}
          {brands.map((logo, idx) => (
            <div key={`second-${logo.id || idx}`} className="flex-shrink-0 px-8 flex items-center justify-center">
              <div className="w-48">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
