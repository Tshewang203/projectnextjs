'use client';

import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import VideoSection from '@/components/VideoSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';

const features = [
  {
    image: '/SacredTemples.jpg',
    title: 'A Journey to Spirituality',
    description: 'Explore ancient monasteries and sacred sites that offer profound insights into Bhutanese Buddhism, providing a sense of peace and reflection.',
    link: '/destinations#sacred-sites',
    linkText: 'Explore Temples'
  },
  {
    image: '/Homeland.jpg',
    title: 'Natural Wonders',
    description: 'Trek through pristine Himalayan landscapes, discover hidden valleys, and encounter rare wildlife in one of the world\'s most environmentally protected countries.',
    link: '/destinations#sacred-sites',
    linkText: 'Discover Nature'
  },
  {
    image: '/HomeArt.avif',
    title: 'Unique Architecture',
    description: 'Marvel at majestic dzongs, traditional architecture, and intricate artworks that showcase Bhutan\'s rich cultural legacy spanning centuries.',
    link: '/destinations#landmarks',
    linkText: 'Experience Culture'
  },
  {
    image: '/HomeCuisine.jpg',
    title: 'A Culinary Delight',
    description: 'Savor the unique flavors of Bhutanese cuisine, from spicy Ema Datshi to hearty buckwheat dishes, that reflect the country\'s rich agricultural heritage.',
    link: '/destinations#restaurants',
    linkText: 'Taste Bhutan'
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-[var(--rice-white)]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-['Cinzel']">
            Experience the Magic of Bhutan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Video Section */}
      <VideoSection />

      {/* Testimonials Section */}
      <Testimonials />
    </Layout>
  );
} 