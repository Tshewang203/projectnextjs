'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import CostCalculator from '@/components/CostCalculator';
import BookingForm from '@/components/BookingForm';
import Image from 'next/image';

const tourPackages = [
  {
    id: 1,
    title: 'Cultural Heritage Tour',
    duration: '7 Days',
    price: 2200,
    image: '/tours/cultural-heritage.jpg',
    highlights: [
      'Visit to Tiger\'s Nest Monastery',
      'Punakha Dzong exploration',
      'Traditional mask dance performance',
      'Local farmhouse stay'
    ]
  },
  {
    id: 2,
    title: 'Himalayan Trek Adventure',
    duration: '10 Days',
    price: 2800,
    image: '/tours/himalayan-trek.jpg',
    highlights: [
      'Druk Path Trek',
      'High-altitude camping',
      'Mountain village visits',
      'Buddhist monastery tours'
    ]
  },
  {
    id: 3,
    title: 'Festival & Wellness Journey',
    duration: '8 Days',
    price: 2500,
    image: '/tours/festival-wellness.jpg',
    highlights: [
      'Thimphu Tshechu festival',
      'Traditional hot stone bath',
      'Meditation sessions',
      'Organic farm visits'
    ]
  }
];

export default function BookingPage() {
  return (
    <Layout>
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-[#2B3F55] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4 font-['Cinzel'] text-white">
              Plan Your Bhutan Journey
            </h1>
            <p className="text-xl text-center font-['Playfair_Display'] text-[var(--rice-white)]">
              Explore our curated packages and start your adventure
            </p>
          </div>
        </div>

        {/* Tour Packages Section */}
        <section className="py-16 bg-[var(--rice-white)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 font-['Cinzel'] text-[#2B3F55]">
              Featured Tour Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={pkg.id === 1}
                      quality={85}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 font-['Cinzel'] text-[#2B3F55]">
                      {pkg.title}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {pkg.duration}
                      </span>
                      <span className="text-[#2B3F55] font-bold text-lg">${pkg.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-[#2B3F55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CostCalculator />
        <BookingForm />

        {/* Why Book With Us Section */}
        <section className="py-16 bg-[var(--rice-white)]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-['Cinzel'] text-[#2B3F55]">
              Why Book With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2 font-['Cinzel']">Expert Local Guides</h3>
                <p className="font-['Playfair_Display']">
                  Our guides are certified professionals with deep knowledge of Bhutanese culture and traditions.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2 font-['Cinzel']">Authentic Experiences</h3>
                <p className="font-['Playfair_Display']">
                  We ensure you experience the real Bhutan, from local festivals to traditional homestays.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="text-xl font-bold mb-2 font-['Cinzel']">Sustainable Tourism</h3>
                <p className="font-['Playfair_Display']">
                  We are committed to responsible tourism that preserves Bhutan's unique culture and environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 