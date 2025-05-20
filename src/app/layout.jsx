import './globals.css'
import { Cinzel, Playfair_Display } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import Navigation from '@/components/Navigation'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Explore Bhutan - Your Gateway to the Land of Thunder Dragon',
  description: 'Discover the magic of Bhutan with our curated tours, cultural experiences, and adventure packages.',
  keywords: 'Bhutan, travel, tourism, Buddhist temples, Himalayan kingdom, cultural tours',
  authors: [{ name: 'Bhutan Travel' }],
  openGraph: {
    title: 'Explore Bhutan - Your Gateway to the Land of Thunder Dragon',
    description: 'Discover the magic of Bhutan with our curated tours, cultural experiences, and adventure packages.',
    url: 'https://bhutan-travel.vercel.app',
    siteName: 'Bhutan Travel',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </head>
      <body className={playfair.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 