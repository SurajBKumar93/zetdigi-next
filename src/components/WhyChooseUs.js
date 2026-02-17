export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left - Title */}
          <div className="lg:w-2/4">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Zitdigi Should Be Your First Choice
            </h2>
          </div>

          {/* Right - Stats */}
          <div className="lg:w-2/4 grid md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">$200M+</div>
              <div className="text-gray-600 text-base">Revenue Generated</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600 text-base">Amazon Brands</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">93%</div>
              <div className="text-gray-600 text-base">Client Retention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
