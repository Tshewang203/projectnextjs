import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#2B3F55] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-['Cinzel']">Explore Bhutan</h3>
            <p className="text-gray-300 font-['Playfair_Display']">
              Your gateway to the Land of the Thunder Dragon. Experience the magic of Bhutan with our curated tours and expert guides.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-['Cinzel']">Quick Links</h3>
            <ul className="space-y-2 font-['Playfair_Display']">
              <li><Link href="/destinations" className="hover:text-gray-300">Destinations</Link></li>
              <li><Link href="/travel-tips" className="hover:text-gray-300">Travel Tips</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-['Cinzel']">Contact Us</h3>
            <ul className="space-y-2 font-['Playfair_Display']">
              <li>Email: info@explorebhutan.com</li>
              <li>Phone: +975 2 123 456</li>
              <li>Address: Thimphu, Bhutan</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-['Cinzel']">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-gray-300"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-2xl hover:text-gray-300"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-2xl hover:text-gray-300"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-2xl hover:text-gray-300"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center font-['Playfair_Display']">
          <p>&copy; {new Date().getFullYear()} Explore Bhutan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 