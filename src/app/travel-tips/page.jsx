'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

const travelTips = [
  {
    title: 'When Magic Happens: Best Time to Visit',
    icon: 'calendar',
    content: '🌸 Spring (March-May) paints the hills with rhododendrons and crystal-clear mountain views. 🍂 Fall (September-November) brings festival fever and perfect selfie weather! Summer adds drama with mystical clouds and waterfalls, while winter offers crowd-free dzongs and crisp mountain air. Pro tip: Pack your camera for any season - Bhutan\'s always ready for its close-up!',
    category: 'Practical'
  },
  {
    title: 'Your Golden Ticket: Visa Guide',
    icon: 'passport',
    content: '✈️ Think of your Bhutanese visa as a VIP pass! Your tour operator is like your personal concierge - they\'ll handle everything from your comfy bed to your mountain adventures. Just give them 7-10 days to wave their magic wand (process your visa). Remember: No DIY backpacking here - Bhutan likes to keep things exclusive!',
    category: 'Practical'
  },
  {
    title: 'Money Matters & Dragon Tales',
    icon: 'cash',
    content: '💰 Meet the Ngultrum - Bhutan\'s own dragon-adorned currency! While your credit card works in fancy hotels, cash is king in local markets. Want to shop like a local? ATMs are your friends in major towns. Fun fact: The daily tourist tariff includes almost everything - it\'s like an all-access pass to the Kingdom of Happiness!',
    category: 'Practical'
  },
  {
    title: 'Head in the Clouds: Altitude Tips',
    icon: 'mountain',
    content: '⛰️ Welcome to the Himalayan high life! At 2,000-4,000 meters, you\'re literally walking among the clouds. Take it slow, champ - your body needs time to become superhuman at these heights. Feeling dizzy? That\'s just your body saying "Wow, we\'re really up here!" Stay hydrated, skip the celebratory drinks, and channel your inner mountain goat gradually.',
    category: 'Health & Safety'
  },
  {
    title: 'Dress to Impress (The Dragons)',
    icon: 'person',
    content: '👔 Think "respectful chic" - Bhutan\'s not your typical beach destination! Cover those shoulders and knees like you\'re meeting royalty (because you might!). Pack layers like you\'re dressing for four seasons in one day - because you are! For festivals, channel your inner Bhutanese fashionista with long skirts/pants and collared shirts. And remember: Hats off to Buddha!',
    category: 'Cultural'
  },
  {
    title: 'The Do\'s and Om\'s of Bhutan',
    icon: 'people',
    content: '🙏 Welcome to Bhutan\'s cultural masterclass! Temples are like sacred discos - shoes off at the door, and spin clockwise around religious structures (it\'s the original spiritual spin class!). Keep the PDA for your private moments, and when offered butter tea, smile and sip - it\'s not just a drink, it\'s a friendship potion!',
    category: 'Cultural'
  },
  {
    title: 'Staying Fighting Fit',
    icon: 'heart-pulse',
    content: '🏥 Give your doctor a heads-up about your Himalayan adventure 4-6 weeks before takeoff. Pack your superhero kit: altitude meds, regular meds, sunscreen (mountain sun is extra spicy!), and bug spray. Most towns have hospitals, but rural areas keep it traditional - better safe than sorry!',
    category: 'Health & Safety'
  },
  {
    title: 'Snap Happy Guidelines',
    icon: 'camera',
    content: '📸 Ready for your National Geographic moment? Remember: Monks are not models - always ask before clicking! Temples and dzongs often play hard to get with their "no photos" policy. And those epic drone shots? You\'ll need special permission - Bhutan\'s dragons are protective of their airspace! Keep it respectful, and you\'ll capture memories (and hearts) everywhere you go.',
    category: 'Practical'
  },
  {
    title: 'Staying Connected in the Clouds',
    icon: 'wifi',
    content: '📱 Yes, you can Instagram from the top of the world! Wi-Fi exists in most hotels and cafes, though it might be as slow as a yak in no hurry. Pro tip: Grab a local SIM card faster than you can say "Tashi Delek" - available at airports and towns (passport required). Your home network might charge like a thunder dragon, so plan ahead!',
    category: 'Practical'
  }
];

const categories = ['All Tips', 'Cultural', 'Practical', 'Health & Safety'];

export default function TravelTips() {
  const [selectedCategory, setSelectedCategory] = useState('All Tips');

  // Filter tips based on category
  const filteredTips = travelTips.filter(tip => 
    selectedCategory === 'All Tips' ? true : tip.category === selectedCategory
  );

  return (
    <Layout>
      <div className="min-h-screen bg-[var(--rice-white)]">
      {/* Header Section */}
        <div className="bg-[#2B3F55] pt-32 pb-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-['Cinzel'] text-white leading-tight">
              Essential Travel Tips
          </h1>
            <p className="text-lg md:text-xl text-center font-['Playfair_Display'] text-[var(--rice-white)] max-w-2xl mx-auto">
              Make the most of your Bhutan adventure with our expert guidance
          </p>
        </div>
      </div>

        {/* Category Filter */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map(category => (
              <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all transform hover:scale-105 font-['Cinzel'] text-sm md:text-base ${
                    selectedCategory === category
                      ? 'bg-[#2B3F55] text-white shadow-lg'
                      : 'bg-white text-[#2B3F55] border border-[#2B3F55] hover:bg-gray-50'
                  }`}
                >
                  {category}
              </button>
            ))}
            </div>
          </div>
      </div>

        {/* Tips Grid */}
        <section className="py-16 bg-[var(--rice-white)]">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredTips.map((tip, index) => (
                  <div
                    key={index}
                  className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#2B3F55]/10 flex items-center justify-center mr-4">
                      <i className={`bi bi-${tip.icon} text-xl md:text-2xl text-[#2B3F55]`}></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold font-['Cinzel'] text-[#2B3F55]">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 font-['Playfair_Display'] leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        </section>
        </div>
    </Layout>
  );
} 