import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <nav className="navbar">
        <div className="container mx-auto">
          <ul className="navbar-nav flex justify-center">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/destinations" className="nav-link">Destinations</Link></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
            <li><Link href="/booking" className="nav-link">Booking</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="not-found">
          <h1 className="not-found-title font-['Cinzel']">Blog Post Not Found</h1>
          <p className="not-found-text font-['Playfair_Display']">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="not-found-button"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    </main>
  )
} 