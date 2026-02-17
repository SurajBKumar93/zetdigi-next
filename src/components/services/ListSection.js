import Image from 'next/image';
import { VisualPlaceholder } from './ServiceSharedSections';

export default function ListSection({ data }) {
  if (!data) return null;

  const ImageContent = () => {
    if (data.image) {
      return (
        <div className="relative w-full overflow-hidden rounded-2xl min-h-[280px] md:min-h-[320px]">
          <Image
            src={data.image}
            alt={data.title || 'Section'}
            width={500}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return <VisualPlaceholder label={`${data.title || 'Section'} Placeholder`} className="min-h-[280px] md:min-h-[320px]" />;
  };

  const TextContent = () => (
    <div>
      {data.title && (
        <h2 className="mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          {data.title}
        </h2>
      )}
      {data.items && data.items.length > 0 && (
        <ul className="space-y-2 text-sm sm:text-base text-gray-600">
          {data.items.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          {data.imagePosition === 'left' ? (
            <>
              <ImageContent />
              <TextContent />
            </>
          ) : (
            <>
              <TextContent />
              <ImageContent />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
