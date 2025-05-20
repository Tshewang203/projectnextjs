import React from 'react';

const stats = [
  {
    number: '20+',
    label: 'Dzongs'
  },
  {
    number: '72%',
    label: 'Forest Coverage'
  },
  {
    number: '2000+',
    label: 'Monasteries'
  },
  {
    number: '4',
    label: 'Climate Zones'
  }
];

const StatsSection = () => {
  return (
    <section className="relative py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/homeforest.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <div className="stat-number text-5xl font-bold mb-3 font-['Cinzel'] text-white">
                {stat.number}
              </div>
              <div className="text-lg font-['Playfair_Display'] text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 