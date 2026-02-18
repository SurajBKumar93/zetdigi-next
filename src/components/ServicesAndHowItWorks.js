import Link from 'next/link';

export default function ServicesAndHowItWorks({ servicesSection = { services: [], steps: [] } }) {
  const { services = [], steps = [] } = servicesSection;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Our Services */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-12">
              Our <span className="text-blue-600">Services</span>
            </h2>

            <div className="relative">
              {/* Vertical Line on Right */}
              <div className="absolute right-6 top-4 bottom-4 w-0.5 bg-blue-600"></div>

              {/* Services List */}
              <div className="space-y-10">
                {services.map((service, idx) => (
                  <div key={service.id || idx} className="flex items-center gap-6 relative">
                    {/* Service Title */}
                    <div className="text-gray-900 flex items-center gap-5 font-normal text-base flex-1 bg-white p-6 rounded-full">
                      <div className="w-7 h-7 bg-blue-600 rounded-full"></div>
                      {service.name}
                    </div>
                    {/* Numbered Circle */}
                    <div className="w-12 h-12 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-blue-600 font-bold text-base z-10 flex-shrink-0">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - How it Works */}
          <div>
            <h2 className="text-3xl font-bold mb-12">
              <span className="text-blue-600">How it works</span>
            </h2>

            {/* Steps Container */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.id || step.number} className="bg-white border-2 border-blue-600 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Step {step.number}
                  </h3>
                  <h4 className="text-base font-bold text-gray-900 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Book a Consultation Button */}
        <div className="flex justify-center mt-16">
          <Link href="#clanderly" className="bg-gray-900 text-white px-12 py-3.5 rounded-full hover:bg-gray-800 transition font-medium text-base shadow-lg hover:shadow-xl">
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
