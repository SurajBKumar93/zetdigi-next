export default function FeaturesGrid({ features = [] }) {
  // Icon mapping - maps feature titles to your icon files
  const iconMap = {
    'Product Research': '/icons/Analytics-Icon.png',
    'Listing Optimization': '/icons/Quality-Assurance.png',
    'PPC Automation': '/icons/PPC-Click-Icon.png',
    'Multi-Channel Sync': '/icons/Network-Diagram.png',
    'Inventory Insights': '/icons/Settings-Icon.png',
    'Competitor Tracking': '/icons/User-Management.png',
  };

  // Fallback data if no features provided
  const defaultFeatures = [
    {
      title: 'Product Research',
      desc: 'Find winning products with AI + real market data'
    },
    {
      title: 'Listing Optimization',
      desc: 'SEO titles, bullet points & backend keyword suggestions'
    },
    {
      title: 'PPC Automation',
      desc: 'Smart bids, rule-based campaigns & budget recommendations'
    },
    {
      title: 'Multi-Channel Sync',
      desc: 'Sell on Amazon, eBay, Shopify & more from one dashboard'
    },
    {
      title: 'Inventory Insights',
      desc: 'Forecast stock levels & avoid stockouts'
    },
    {
      title: 'Competitor Tracking',
      desc: 'Monitor competitors & pricing strategies'
    },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8 md:mb-16">
          What <span className="text-blue-600">ZetDigi Does</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {displayFeatures.map((feature, idx) => {
            const iconSrc = feature.icon || iconMap[feature.title] || '/icons/Analytics-Icon.png';
            return (
              <div key={idx} className="bg-white border-2 border-sky-200 rounded-xl p-4 sm:p-6 hover:border-primary-400 hover:shadow-xl transition-all duration-300 text-center group">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <img
                      src={iconSrc}
                      alt={feature.title}
                      className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-md font-normal leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
