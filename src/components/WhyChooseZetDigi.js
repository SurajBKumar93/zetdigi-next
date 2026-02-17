import Image from 'next/image';

export default function WhyChooseZetDigi() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-block bg-blue-50 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 uppercase tracking-wide">
                WHY CHOOSE ZETDIGI?
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
                Driving Growth, Inspiring Excellence,{' '}
                <span className="text-blue-600">Our Values, Your Success</span>
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Value 1 */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We offer cutting-edge digital strategies and services that keep your business ahead in the rapidly evolving digital landscape.
                </p>
              </div>

              {/* Value 2 */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our decisions are backed by data and analytics, ensuring effective and measurable results for your marketing campaigns.
                </p>
              </div>

              {/* Value 3 */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Tailored to your business objectives, we create personalized strategies that resonate with your target audience and drive significant growth.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
              <Image
                src="/Man-Portrait.png"
                alt="Customer Support Representative"
                fill
                className="object-cover"
              />
              {/* Overlay gradient for better text visibility if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 md:-top-6 md:-right-6 w-32 h-32 md:w-40 md:h-40 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -z-10 -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-32 h-32 md:w-40 md:h-40 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
