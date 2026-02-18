import ProvenResultsCarousel from './ProvenResultCarousel';

export default function ProvenResults({ results = [] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-black">
          Our <span className="text-blue-600">Proven Results</span>
        </h2>
        <ProvenResultsCarousel testimonials={results} />
      </div>
    </section>
  );
}
