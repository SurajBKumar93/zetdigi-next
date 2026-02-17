import Image from 'next/image';
import { VisualPlaceholder } from './ServiceSharedSections';

export default function TipsSection({ data }) {
  if (!data) return null;

  const ImageContent = () => {
    if (data.image) {
      return (
        <div className="relative w-full overflow-hidden rounded-2xl min-h-[280px] md:min-h-[320px]">
          <Image
            src={data.image}
            alt={data.title || 'Tips'}
            width={500}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return <VisualPlaceholder label={`${data.title || 'Tips'} Placeholder`} className="min-h-[280px] md:min-h-[320px]" />;
  };

  const TextContent = () => (
    <div>
      {data.title && (
        <h2 className="mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {data.title}
        </h2>
      )}
      {data.items && data.items.length > 0 && (
        <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {data.items.map((tip, index) => (
            <p key={index} className="px-4 md:px-5 py-3 md:py-4 text-xs sm:text-sm font-semibold text-gray-700">
              + {tip}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:gap-10 lg:grid-cols-2">
          {data.imagePosition === 'right' ? (
            <>
              <TextContent />
              <ImageContent />
            </>
          ) : (
            <>
              <ImageContent />
              <TextContent />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
