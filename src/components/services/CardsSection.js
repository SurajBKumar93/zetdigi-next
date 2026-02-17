export default function CardsSection({ data }) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        {data.title && (
          <h2 className="mb-8 md:mb-10 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {data.title}
          </h2>
        )}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <article key={index} className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm transition hover:shadow-lg hover:border-blue-200">
              {item.title && (
                <h3 className="mb-3 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
