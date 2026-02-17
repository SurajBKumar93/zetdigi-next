import TestimonialsCarousel from './TestimonialsCarousel';

export default function Testimonials({ testimonials = [] }) {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-black">
          Proven <span className="text-blue-600">Amazon Success</span>
        </h2>

        {/* Testimonials Slider */}
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
