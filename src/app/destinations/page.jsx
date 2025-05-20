'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import DestinationCard from '@/components/DestinationCard';
import { destinationSections, restaurants } from '@/data/destinations';

export default function Destinations() {
  const [activeSection, setActiveSection] = useState('landmarks');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Get unique locations from all destinations and restaurants
  const locations = Array.from(new Set([
    ...destinationSections.flatMap(section => 
      section.items.map(item => item.location)
    ),
    ...restaurants.map(r => r.location)
  ])).filter(Boolean);

  // Filter destinations based on location
  const filteredSections = destinationSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      return !selectedLocation || item.location === selectedLocation;
    })
  }));

  // Filter restaurants based on location
  const filteredRestaurants = restaurants.filter(restaurant => {
    return !selectedLocation || restaurant.location === selectedLocation;
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Height of the main navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['landmarks', 'sacred-sites', 'restaurants'];
      const navHeight = 64; // Height of the main navigation
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= navHeight + 50 && rect.bottom >= navHeight;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Sub Navigation */}
      <div className="bg-[#2B3F55] pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-3 text-center font-['Cinzel'] text-white">
            Discover Bhutan's Treasures
          </h1>
          <p className="text-xl text-center mb-8 font-['Playfair_Display'] text-[var(--rice-white)]">
            Explore iconic landmarks, sacred temples, and authentic cuisine
          </p>

          {/* Location Filter */}
          <div className="flex justify-center mb-8">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--rice-white)] w-full max-w-xs bg-white"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Section Navigation */}
          <nav className="flex justify-center space-x-6">
            {[
              { id: 'landmarks', label: 'Historic Landmarks' },
              { id: 'sacred-sites', label: 'Sacred Sites' },
              { id: 'restaurants', label: 'Local Restaurants' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-['Cinzel'] ${
                  activeSection === section.id
                    ? 'bg-white text-[#2B3F55]'
                    : 'bg-transparent text-white border border-white hover:bg-white hover:text-[#2B3F55]'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Destination Sections */}
      {filteredSections.map(section => (
        section.items.length > 0 && (
          <section
            key={section.id}
            id={section.id}
            className={`py-16 ${
              section.id === 'sacred-sites' ? '' : 'bg-[var(--rice-white)]'
            }`}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center font-['Cinzel']">
                {section.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, index) => (
                  <DestinationCard key={index} item={item} />
                ))}
              </div>
            </div>
          </section>
        )
      ))}

      {/* Restaurants Section */}
      {filteredRestaurants.length > 0 && (
        <section id="restaurants" className="py-16 bg-[var(--rice-white)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center font-['Cinzel']">
              Local Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRestaurants.map((restaurant, index) => (
                <DestinationCard key={index} item={restaurant} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ScrollToTop />
    </Layout>
  );
} 