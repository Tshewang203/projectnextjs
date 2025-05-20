import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    image: '/home_travel1.jpg',
    quote: 'An incredible journey through this mystical kingdom. The culture and traditions are truly unique.',
    name: 'Nick Sturniolo',
    location: 'From United States',
    position: 'left'
  },
  {
    image: '/home_travel3.jpg',
    quote: 'The natural beauty and peaceful atmosphere of Bhutan left me speechless.',
    name: 'Emma Thompson',
    location: 'From Singapore',
    position: 'right'
  },
  {
    image: '/home_travel2.PNG',
    quote: 'A life-changing experience. The warmth of Bhutanese people is unforgettable.',
    name: 'Jude Bellingham',
    location: 'From United Kingdom',
    position: 'left'
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-['Cinzel'] text-center mb-12">What Travelers Say</h2>
        
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`flex flex-col ${testimonial.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6`}>
              <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className={`flex-1 ${testimonial.position === 'right' ? 'text-right' : 'text-left'}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg mb-4 text-gray-700">&quot;{testimonial.quote}&quot;</p>
                  <strong className="block text-gray-900">{testimonial.name}</strong>
                  <span className="text-gray-600">{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 