'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/booking';
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Check if there's booking form data in sessionStorage
    const storedBookingData = sessionStorage.getItem('bookingFormData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Login successful!');
      
      // If user is admin, redirect to admin panel
      if (data.user.role === 'admin') {
        router.push('/admin');
        return;
      }

      // If there's booking data, create the booking
      if (bookingData) {
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const bookingResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              customerDetails: {
                firstName: bookingData.firstName,
                lastName: bookingData.lastName,
                email: bookingData.email,
                phone: bookingData.phone,
                nationality: bookingData.nationality,
                passportNumber: bookingData.passportNumber
              },
              numberOfTravelers: {
                adults: parseInt(bookingData.adults),
                children: parseInt(bookingData.children)
              },
              startDate: bookingData.startDate,
              specialRequirements: bookingData.specialRequirements
            }),
          });

          if (!bookingResponse.ok) {
            throw new Error('Failed to create booking');
          }

          const bookingResult = await bookingResponse.json();
          sessionStorage.removeItem('bookingFormData'); // Clear the stored data
          router.push(`/booking/confirmation?reference=${bookingResult.bookingReference}`);
        } catch (bookingError) {
          console.error('Booking error:', bookingError);
          toast.error('Login successful, but failed to create booking. Please try again.');
          router.push('/booking');
        }
      } else {
        // For regular users without booking data, redirect to the original destination
        router.push(redirectTo);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[var(--rice-white)] to-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center mb-8 font-['Cinzel'] text-[#2B3F55]"
            >
              {bookingData ? 'Complete Your Booking' : 'Welcome Back'}
            </motion.h1>

            {bookingData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded mb-6"
              >
                <p className="font-medium">Booking Details</p>
                <p>Please sign in to complete your booking for {bookingData.startDate}</p>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
              >
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--dzong-blue)] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--dzong-blue)] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--dzong-blue)] focus:ring-[var(--dzong-blue)] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-[var(--dzong-blue)] hover:text-[var(--dzong-blue-dark)]">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--dzong-blue)] text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {bookingData ? 'Processing...' : 'Logging in...'}
                  </div>
                ) : (
                  bookingData ? 'Complete Booking' : 'Sign In'
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-[var(--dzong-blue)] hover:text-[var(--dzong-blue-dark)] font-medium"
                >
                  Create one here
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 