import * as dataStore from '@/lib/dataStore';
import FAQItem from './FAQItem';

export default async function FAQ() {
  // Fetch FAQs on the server
  let faqs = [];
  try {
    faqs = await dataStore.getFAQs();
    faqs.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
  }

  if (faqs.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="text-center text-gray-500">No FAQs available at the moment.</div>
        </div>
      </section>
    );
  }

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Frequently Asked Questions
        </h2>

        {/* FAQ Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumnFaqs.map((faq, idx) => (
              <FAQItem key={faq.id} faq={faq} index={idx} isOpen={idx === 0} />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightColumnFaqs.map((faq, idx) => (
              <FAQItem key={faq.id} faq={faq} index={idx + midPoint} isOpen={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
