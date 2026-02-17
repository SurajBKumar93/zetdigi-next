import Image from 'next/image';
import ProvenResultsCarousel from './ProvenResultCarousel';
export default function ProvenResults() {
  const results = [
    {
      image: '/result/item1.jpeg',
      badge: 'Travelling Brand',
      days: '1 Year',
      title: '120% Sessions Up Increase in 3 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '120%',
      sessionsLabel: 'Sessions',
      uplift: '40%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2635',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item2.jpeg',
      badge: 'Suppliment Brand',
      days: '8 months',
      title: '90% Sessions Up Increase in 2 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '90%',
      sessionsLabel: 'Sessions',
      uplift: '28%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2160',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item3.jpeg',
      badge: 'Kitchen Brand',
      days: '2 Months',
      title: '110% Sessions Up Increase in 4 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '110%',
      sessionsLabel: 'Sessions',
      uplift: '30%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2237',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item4.jpeg',
      badge: 'Suppliment Brand',
      days: '20 Days',
      title: '80% Sessions Up Increase in 1 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '80%',
      sessionsLabel: 'Sessions',
      uplift: '25%',
      upliftLabel: 'Sales Uplift',
      revenue: '$1920',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item5.jpeg',
      badge: 'Fitness Brand',
      days: '4 Months',
      title: '110% Sessions Up Increase in 3 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '110%',
      sessionsLabel: 'Sessions',
      uplift: '40%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2010',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item6.jpeg',
      badge: 'Suppliment Brand',
      days: '2 Years',
      title: '130% Sessions Up Increase in 2 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '130%',
      sessionsLabel: 'Sessions',
      uplift: '50%',
      upliftLabel: 'Sales Uplift',
      revenue: '$2575',
      revenueLabel: 'Additional Revenue in 2 weeks'
    },
    {
      image: '/result/item7.jpeg',
      badge: 'Kitchen Brand',
      days: '3 Years',
      title: '140% Sessions Up Increase in 4 Week',
      description: 'Optimized Amazon listings with SEO-driven content and conversion-focused strategy, resulting in higher sales, improved conversion rates, and consistent revenue growth.',
      sessions: '140%',
      sessionsLabel: 'Sessions',
      uplift: '60.5%',
      upliftLabel: 'Sales Uplift',
      revenue: '$3270',
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
