import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// This would typically come from a database or API
const blogPosts = [
  {
    id: 1,
    title: 'Exploring Bhutanese Festivals',
    content: `
      Bhutanese festivals, known as Tshechus, are vibrant celebrations that bring communities together and showcase the country's rich cultural heritage. These festivals typically feature colorful mask dances, traditional music, and religious ceremonies.

      The most famous festivals include:
      
      • Thimphu Tshechu - Held in the capital city
      • Paro Tshechu - Famous for its early morning unfurling of the Thangka
      • Punakha Drubchen - Commemorating Bhutan's victory over Tibetan forces
      
      During these festivals, locals dress in their finest traditional attire, and the atmosphere is filled with joy and spiritual devotion. Visitors are welcome to participate and witness these authentic cultural celebrations.
    `,
    image: '/blogTshetshu.jpg',
    date: 'May 20, 2024',
    author: 'Travel Expert'
  },
  {
    id: 2,
    title: 'A Guide to Bhutanese Cuisine',
    content: `
      Bhutanese cuisine is known for its spicy flavors and use of local ingredients. The national dish, Ema Datshi, consists of chili peppers and cheese, reflecting the unique taste preferences of the Bhutanese people.

      Popular Bhutanese dishes include:
      
      • Phaksha Paa - Pork with red chilies
      • Momos - Dumplings filled with meat or vegetables
      • Jasha Maru - Spicy minced chicken
      
      The food culture in Bhutan is deeply connected to its Buddhist traditions, with many dishes having spiritual and cultural significance.
    `,
    image: '/blogFood.jpg',
    date: 'May 18, 2024',
    author: 'Food Explorer'
  },
  {
    id: 3,
    title: 'Majestic Dzongs of Bhutan',
    content: `
      Dzongs are magnificent structures that serve as both administrative centers and monasteries. These architectural marvels showcase Bhutan's unique building style and cultural heritage.

      Notable Dzongs include:
      
      • Punakha Dzong - Located at the confluence of two rivers
      • Tashichho Dzong - The seat of Bhutan's government
      • Paro Dzong - One of the finest examples of Bhutanese architecture
      
      Each Dzong tells a story of Bhutan's history and continues to play a vital role in modern Bhutanese society.
    `,
    image: '/blogDzong.jpg',
    date: 'May 15, 2024',
    author: 'Culture Guide'
  }
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <nav className="navbar">
        <div className="container mx-auto">
          <ul className="navbar-nav flex justify-center">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/destinations" className="nav-link">Destinations</Link></li>
            <li><Link href="/blog" className="nav-link active">Blog</Link></li>
            <li><Link href="/booking" className="nav-link">Booking</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <article className="blog-post">
          <Link 
            href="/blog"
            className="back-button"
          >
            ← Back to Blog
          </Link>

          <div className="relative h-[400px] mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <h1 className="blog-post-title font-['Cinzel']">{post.title}</h1>
          
          <div className="blog-post-meta">
            <span className="mr-4">{post.author}</span>
            <span>{post.date}</span>
          </div>

          <div className="blog-post-content font-['Playfair_Display']">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="share-section">
            <h2 className="text-2xl font-bold mb-4 font-['Cinzel']">Share this article</h2>
            <div className="flex space-x-4">
              <button className="share-button facebook">
                Share on Facebook
              </button>
              <button className="share-button twitter">
                Share on Twitter
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
} 