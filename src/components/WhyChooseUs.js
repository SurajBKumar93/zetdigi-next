export default function WhyChooseUs({ whyChooseUs = { title: '', stats: [] } }) {
  const { title = '', stats = [] } = whyChooseUs;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left - Title */}
          <div className="lg:w-2/4">
            <h2 className="text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          {/* Right - Stats */}
          <div className="lg:w-2/4 grid md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
