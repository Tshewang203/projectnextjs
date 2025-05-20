'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/travel-tips', label: 'Travel Tips' },
  { href: '/blog', label: 'Blog' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/contact', label: 'Contact' }
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = (e) => {
    e.preventDefault();
      router.push('/booking');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#2B3F55] transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          <Link 
            href="/" 
            className="text-4xl font-bold text-white font-['Cinzel'] hover:text-[var(--rice-white)] transition-colors"
          >
            Explore Bhutan
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] py-3 ${
                  pathname === link.href ? 'border-b-2 border-white' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleBookNow}
              className="text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] py-3"
            >
              Book Now
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] py-3"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] py-3"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] py-3"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:text-[var(--rice-white)] transition-colors p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-[500px]' : 'max-h-0'
          }`}
        >
          <div className="py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-4 text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display'] ${
                  pathname === link.href ? 'bg-white/10 rounded-lg' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={(e) => {
                handleBookNow(e);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-4 text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display']"
            >
              Book Now
            </button>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block px-6 py-4 text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display']"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-6 py-4 text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display']"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-6 py-4 text-xl text-white hover:text-[var(--rice-white)] transition-colors font-['Playfair_Display']"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}