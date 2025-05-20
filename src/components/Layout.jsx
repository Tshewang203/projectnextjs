'use client';

import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
} 