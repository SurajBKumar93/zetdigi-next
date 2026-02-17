import Link from 'next/link';
export default function ServicesAndHowItWorks() {
  const services = [
    'Conversion Rate Optimization',
    'Click Through Rate Optimization',
    'Amazon PPC Management',
    'Product Photography and Videograph',
    'AI Powered Creatives',
    'A+ Content and Storefront Creation',
    'Consultation'
  ];

  const steps = [
    {
      number: 1,
      title: 'Book a Strategy Session',
      description: "Let's start with clarity. Book a free 1-on-1 session with our strategy team. We'll review your brand, listings, and goals to identify exactly where your biggest growth opportunities lie - whether it's creative optimization or PPC scaling."
    },
    {
      number: 2,
      title: 'Audit & Gameplan',
      description: "We'll run a deep audit of your Amazon presence - from visuals and content to traffic and conversions. You'll get a clear, data-driven roadmap that shows what needs fixing, what's working, and how we'll move the needle."
    },
    {
      number: 3,
      title: 'Onboarding & Setup',
      description: "Once you're ready to move forward, we'll onboard you into our client portal. Here, you'll meet your dedicated success manager, approve the plan, and we'll align timelines for creative delivery and PPC execution."
    },
    {
      number: 4,
      title: 'Delivery & Optimization',
      description: "You'll start seeing results fast. Our team will deliver the first creative or campaign batch, gather your feedback, and continue optimizing until we hit your performance targets. Every deliverable is designed to increase CTR, CVR, and ROI - not just look good."
    }
  ];

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
                  <div key={idx} className="flex items-center gap-6 relative">
                    {/* Service Title */}
                    <div className="text-gray-900 flex items-center gap-5 font-normal text-base flex-1 bg-white p-6 rounded-full">
                      <div className="w-7 h-7 bg-blue-600 rounded-full"></div>

                      {service}
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
                <div key={step.number} className="bg-white border-2 border-blue-600 rounded-3xl p-6">
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
