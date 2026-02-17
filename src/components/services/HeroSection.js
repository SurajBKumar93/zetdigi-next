import Image from 'next/image';

export default function HeroSection({ data }) {
  if (!data) return null;

  return (
    <section className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,153,0,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            {data.image ? (
              <div className="relative w-full overflow-hidden rounded-2xl min-h-[280px] md:min-h-[360px]">
                <Image
                  src={data.image}
                  alt={data.title || 'Service'}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-100 shadow-md min-h-[280px] md:min-h-[360px]">
                <div className="absolute -top-14 -right-14 h-44 w-44 rounded-full bg-blue-100/60" />
                <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-slate-200/60" />
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="rounded-full border border-blue-200 bg-white/90 px-5 py-2 text-sm font-semibold tracking-wide text-blue-800">
                    {data.title || 'Service'} Hero
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            {data.badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-blue-300 uppercase tracking-wide">
                  {data.badge}
                </span>
              </div>
            )}
            {data.title && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {data.title}
              </h1>
            )}
            {data.description && (
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                {data.description}
              </p>
            )}
            {data.subtitle && (
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-100">
                {data.subtitle}
              </p>
            )}
            {data.bullets && data.bullets.length > 0 && (
              <ul className="space-y-2 text-sm sm:text-base text-gray-200">
                {data.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
