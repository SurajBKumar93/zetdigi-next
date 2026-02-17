import Image from 'next/image';
import { VisualPlaceholder } from './ServiceSharedSections';

export default function ContentSection({ data }) {
  if (!data) return null;

  const ImageContent = () => {
    if (data.image) {
      return (
        <div className="relative w-full overflow-hidden rounded-2xl min-h-[280px] md:min-h-[320px]">
          <Image
            src={data.image}
            alt={data.title || 'Content'}
            width={500}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return <VisualPlaceholder label={`${data.title || 'Content'} Placeholder`} className="min-h-[280px] md:min-h-[320px]" />;
  };

  const TextContent = () => (
    <div className="space-y-3 md:space-y-4">
      {data.title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {data.title}
        </h2>
      )}
      {data.content && (
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {data.content}
        </p>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2">
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
