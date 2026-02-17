'use client';

import Image from 'next/image';

export default function MarqueeDisplay({ images }) {
  if (!images || images.length === 0) {
    return null;
  }

  // Create an array with enough items to fill the marquee
  const displayItems = Array.from({ length: 6 }, (_, idx) => images[idx % images.length]);

  return (
    <div className="relative w-full">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex animate-scroll">
        {/* First Set of Images */}
        {displayItems.map((imageSrc, idx) => (
          <div key={`first-${idx}`} className="flex-shrink-0 px-4">
            <div className="w-80">
              <Image
                src={imageSrc}
                alt={`Amazon Success Story ${idx + 1}`}
                width={320}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Duplicate Set for Seamless Loop */}
        {displayItems.map((imageSrc, idx) => (
          <div key={`second-${idx}`} className="flex-shrink-0 px-4">
            <div className="w-80">
              <Image
                src={imageSrc}
                alt={`Amazon Success Story ${idx + 1}`}
                width={320}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
