import Image from 'next/image';

export default function AboutUsHero() {
  return (
    <section className="relative bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Images */}
          <div className="relative order-2 lg:order-1">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Top Left - Larger Image */}
              <div className="col-span-2 relative h-48 sm:h-56 md:h-64 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                <Image
                  src="/Man-Portrait.png"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Left */}
              <div className="relative h-36 sm:h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                <Image
                  src="/UI-Dashboard.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right */}
              <div className="relative h-36 sm:h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                <Image
                  src="/ppc-results.png"
                  alt="Results"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-block bg-blue-50 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                About Us
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
                Empowering Your Digital Success
              </h1>
            </div>

            <div className="space-y-3 md:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                At <span className="text-blue-600 font-semibold">ZETDIGI</span>, we take immense pride in being your go-to partner for Amazon services, bringing unparalleled expertise to help you master the art of selling on the world's largest online marketplace.
              </p>
              <p>
                Our dedicated team of Amazon service specialists excels in optimizing your product listings, managing advertising campaigns, and propelling your business toward exceptional success on Amazon.
              </p>
              <p>
                Beyond Amazon, we offer a full spectrum of digital marketing services designed to enhance your online visibility and drive targeted traffic to your brand. From SEO and social media marketing to email campaigns and content creation, our strategies are tailored to meet your unique business needs.
              </p>
              <p>
                Moreover, our website development team is committed to creating dynamic, user-friendly websites that not only look great but also perform seamlessly. With our comprehensive suite of services, ZETDIGI ensures that every aspect of your online presence is optimized for growth and success.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 md:pt-4">
              <button className="btn-primary">
                Get Started
              </button>
              <button className="border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
