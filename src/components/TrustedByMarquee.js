'use client';

import Image from 'next/image';

export default function TrustedByMarquee() {
  const logos = [
    { name: 'Factor Duty', image: '/brands/Factor-Duty-Wheel.png' },
    { name: 'Rage Fitness', image: '/brands/Rage-Fitness.png' },
    { name: 'Gibson', image: '/brands/Gibson-Logo.png' },
    { name: 'Mr. Froth', image: '/brands/Mr-Froth.png' },
    { name: 'Factor Duty 2', image: '/brands/Factor-Duty-Wheel-2.png' },
    { name: 'Gibson 2', image: '/brands/Gibson-Logo-2.png' },
  ];

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
          {logos.map((logo, idx) => (
            <div key={`first-${idx}`} className="flex-shrink-0 px-8">
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
          {logos.map((logo, idx) => (
            <div key={`second-${idx}`} className="flex-shrink-0 px-8 flex items-center justify-center">
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
