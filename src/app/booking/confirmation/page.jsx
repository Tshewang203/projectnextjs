'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reference) {
      fetchBookingDetails();
    }
  }, [reference]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${reference}`);
      if (!response.ok) throw new Error('Failed to fetch booking details');
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load booking details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--rice-white)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--dzong-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--dzong-blue)] font-['Playfair_Display']">Loading...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[var(--rice-white)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-['Cinzel'] font-bold text-[var(--dzong-blue)] mb-4">
            Booking Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the booking details you're looking for.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[var(--dzong-blue)] text-white rounded-md hover:bg-[var(--river-blue)] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--rice-white)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-['Cinzel'] font-bold text-[var(--dzong-blue)] mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for choosing Bhutan Travel. Your booking has been confirmed.
            </p>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="font-semibold">{booking.bookingReference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold capitalize">{booking.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tour Package</p>
                <p className="font-semibold">{booking.tourPackage.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-semibold">
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Customer Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">
                  {booking.customerDetails.firstName} {booking.customerDetails.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{booking.customerDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{booking.customerDetails.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nationality</p>
                <p className="font-semibold">{booking.customerDetails.nationality}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Travel Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Number of Adults</p>
                <p className="font-semibold">{booking.numberOfTravelers.adults}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Children</p>
                <p className="font-semibold">{booking.numberOfTravelers.children}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="font-semibold">${booking.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-semibold capitalize">{booking.paymentStatus}</p>
              </div>
            </div>
          </div>

          {booking.specialRequirements && (
            <div className="mb-6">
              <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
                Special Requirements
              </h2>
              <p className="text-gray-600">{booking.specialRequirements}</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[var(--dzong-blue)] text-white rounded-md hover:bg-[var(--river-blue)] transition-all mr-4"
            >
              Return Home
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-block px-6 py-3 border border-[var(--dzong-blue)] text-[var(--dzong-blue)] rounded-md hover:bg-[var(--dzong-blue)] hover:text-white transition-all"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 