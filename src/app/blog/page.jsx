'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';

const blogPosts = [
  {
    id: 1,
    title: 'Hiking to Tiger\'s Nest: A Spiritual Journey',
    content: 'Experience the breathtaking journey to Bhutan\'s most iconic monastery, perched on a cliff 3,000 feet above the Paro valley.',
    image: '/blog/blogDzong.PNG',
    date: 'January 15, 2024',
    category: 'Adventure',
    link: 'https://travelwithlens.com/hiking-to-the-tigers-nest/'
  },
  {
    id: 2,
    title: 'Experiencing Thimphu Tshechu Festival',
    content: 'Discover the vibrant colors and ancient traditions of one of Bhutan\'s most spectacular religious festivals.',
    image: '/blog/blogTshetshu.jpg',
    date: 'January 10, 2024',
    category: 'Culture',
    link: 'https://www.drukasia.com/bhutan-tours/festival/thimphu-tshechu-7-days/'
  },
  {
    id: 3,
    title: 'A Taste of Bhutanese Cuisine',
    content: 'Explore the unique flavors and spices of traditional Bhutanese dishes that will tantalize your taste buds.',
    image: '/blog/blogFood.jpg',
    date: 'January 5, 2024',
    category: 'Food',
    link: 'https://www.youtube.com/watch?v=TCsMbrEMx4k'
  },
  {
    id: 4,
    title: 'The Magnificent Dzongs of Bhutan',
    content: 'Learn about the architectural marvels that serve as both administrative centers and monasteries.',
    image: '/blog/blogDzong.jpg',
    date: 'January 1, 2024',
    category: 'Architecture',
    link: 'https://www.regent-holidays.co.uk/blog/top-5-dzongs-of-bhutan/'
  }
];

export default function Blog() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-[#2B3F55] pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-['Cinzel'] text-white leading-tight">
            Bhutan Travel Blog
          </h1>
          <p className="text-lg md:text-xl text-center font-['Playfair_Display'] text-[var(--rice-white)] max-w-2xl mx-auto">
            Stories, guides, and insights from the Land of the Thunder Dragon
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <section className="py-16 bg-[var(--rice-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-72">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    priority={post.id <= 2}
                  />
                </div>
                <div className="p-8">
                  <div className="text-sm text-[#2B3F55] font-['Playfair_Display'] mb-3">
                    {post.date} | {post.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-['Cinzel'] text-[#2B3F55] hover:text-[var(--river-blue)]">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-['Playfair_Display'] line-clamp-2 text-lg">
                    {post.content}
                  </p>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#2B3F55] text-white rounded-lg hover:bg-[var(--river-blue)] transition-colors font-['Cinzel']"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}