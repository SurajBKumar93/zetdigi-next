import Image from 'next/image';
import ProvenResultsCarousel from './ProvenResultCarousel';
export default function ProvenResults() {
  const results = [
    {
      image: '/result/item1.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item2.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item3.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item4.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item5.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item6.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item7.jpeg',
      badge: 'Fashion Brand',
      days: '12 Days',
      title: '114% Sessions Up Increase in 2 Week',
      description: 'Complete Amazon listing and content optimization resulting in significantly improved conversion rates and revenue growth',
      sessions: '113.99%',
      sessionsLabel: 'Sessions',
      uplift: '90.56%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2436',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
  ];

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
