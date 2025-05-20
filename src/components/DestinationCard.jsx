import Image from 'next/image';
import { useState } from 'react';

export default function DestinationCard({ item, showLocation = true }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isRestaurant = 'cuisine' in item;

  const getPriceRangeIcon = (range) => {
    switch (range) {
      case 'Budget':
        return '💰';
      case 'Moderate':
        return '💰💰';
      case 'Luxury':
        return '💰💰💰';
      default:
        return '';
    }
  };

  return (
    <div 
      className="card bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-64">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-['Cinzel']">{item.title}</h3>
          {isRestaurant && (
            <span className="text-[var(--mountain-slate)]" title={item.priceRange}>
              {getPriceRangeIcon(item.priceRange)}
            </span>
          )}
        </div>
        <p className="text-[var(--text-dark)] mb-4 font-['Playfair_Display']">
          {item.description}
        </p>
        
        {isRestaurant && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.cuisine.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[var(--rice-white)] text-[var(--dzong-blue)] rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-[var(--mountain-slate)]">
              {showLocation && item.location && (
                <div className="flex items-center">
                  <span>📍 {item.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <span>🕒 {item.openingHours}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-bold mb-2 font-['Cinzel']">Contact Information</h4>
              <div className="space-y-2 text-[var(--mountain-slate)]">
                {item.contact.phone && (
                  <div className="flex items-center">
                    <span>📞 {item.contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {!isRestaurant && showLocation && item.location && (
          <div className="flex items-center text-[var(--mountain-slate)]">
            <span>📍 {item.location}</span>
          </div>
        )}
      </div>
    </div>
  );
} 