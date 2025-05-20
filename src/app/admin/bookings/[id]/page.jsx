'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';

export default function BookingDetails({ params }) {
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [params.id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch booking details');
      const data = await response.json();
      setBooking(data);
      setEditedBooking(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load booking details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBooking),
      });

      if (!response.ok) throw new Error('Failed to update booking');
      
      const updatedBooking = await response.json();
      setBooking(updatedBooking);
      setEditedBooking(updatedBooking);
      setIsEditing(false);
      toast.success('Booking updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update booking');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--dzong-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--dzong-blue)] font-['Playfair_Display']">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!booking) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-['Cinzel'] font-bold text-[var(--dzong-blue)] mb-4">
            Booking Not Found
          </h1>
          <button
            onClick={() => router.push('/admin/bookings')}
            className="text-[var(--dzong-blue)] hover:text-[var(--river-blue)]"
          >
            ← Back to Bookings
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-['Cinzel'] font-bold text-[var(--dzong-blue)]">
            Booking Details
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/admin/bookings')}
              className="text-[var(--dzong-blue)] hover:text-[var(--river-blue)]"
            >
              ← Back to Bookings
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-[var(--dzong-blue)] text-white px-4 py-2 rounded-md hover:bg-[var(--river-blue)]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditedBooking(booking);
                    setIsEditing(false);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[var(--dzong-blue)] text-white px-4 py-2 rounded-md hover:bg-[var(--river-blue)]"
              >
                Edit Booking
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Booking Status */}
          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Booking Status
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="font-semibold">{booking.bookingReference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                {isEditing ? (
                  <select
                    value={editedBooking.status}
                    onChange={(e) => setEditedBooking({ ...editedBooking, status: e.target.value })}
                    className="border rounded-md p-2 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <p className={`font-semibold capitalize ${
                    booking.status === 'confirmed'
                      ? 'text-green-600'
                      : booking.status === 'cancelled'
                      ? 'text-red-600'
                      : booking.status === 'completed'
                      ? 'text-blue-600'
                      : 'text-yellow-600'
                  }`}>
                    {booking.status}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tour Package Details */}
          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Tour Package
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Package Name</p>
                <p className="font-semibold">{booking.tourPackage.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedBooking.startDate.split('T')[0]}
                    onChange={(e) => setEditedBooking({ ...editedBooking, startDate: e.target.value })}
                    className="border rounded-md p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Customer Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editedBooking.customerDetails.firstName}
                      onChange={(e) => setEditedBooking({
                        ...editedBooking,
                        customerDetails: {
                          ...editedBooking.customerDetails,
                          firstName: e.target.value
                        }
                      })}
                      className="border rounded-md p-2"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={editedBooking.customerDetails.lastName}
                      onChange={(e) => setEditedBooking({
                        ...editedBooking,
                        customerDetails: {
                          ...editedBooking.customerDetails,
                          lastName: e.target.value
                        }
                      })}
                      className="border rounded-md p-2"
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <p className="font-semibold">
                    {booking.customerDetails.firstName} {booking.customerDetails.lastName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedBooking.customerDetails.email}
                    onChange={(e) => setEditedBooking({
                      ...editedBooking,
                      customerDetails: {
                        ...editedBooking.customerDetails,
                        email: e.target.value
                      }
                    })}
                    className="border rounded-md p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">{booking.customerDetails.email}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedBooking.customerDetails.phone}
                    onChange={(e) => setEditedBooking({
                      ...editedBooking,
                      customerDetails: {
                        ...editedBooking.customerDetails,
                        phone: e.target.value
                      }
                    })}
                    className="border rounded-md p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">{booking.customerDetails.phone}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Nationality</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedBooking.customerDetails.nationality}
                    onChange={(e) => setEditedBooking({
                      ...editedBooking,
                      customerDetails: {
                        ...editedBooking.customerDetails,
                        nationality: e.target.value
                      }
                    })}
                    className="border rounded-md p-2 w-full"
                  />
                ) : (
                  <p className="font-semibold">{booking.customerDetails.nationality}</p>
                )}
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="mb-6">
            <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
              Travel Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Number of Adults</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedBooking.numberOfTravelers.adults}
                    onChange={(e) => setEditedBooking({
                      ...editedBooking,
                      numberOfTravelers: {
                        ...editedBooking.numberOfTravelers,
                        adults: parseInt(e.target.value)
                      }
                    })}
                    className="border rounded-md p-2 w-full"
                    min="1"
                  />
                ) : (
                  <p className="font-semibold">{booking.numberOfTravelers.adults}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Children</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedBooking.numberOfTravelers.children}
                    onChange={(e) => setEditedBooking({
                      ...editedBooking,
                      numberOfTravelers: {
                        ...editedBooking.numberOfTravelers,
                        children: parseInt(e.target.value)
                      }
                    })}
                    className="border rounded-md p-2 w-full"
                    min="0"
                  />
                ) : (
                  <p className="font-semibold">{booking.numberOfTravelers.children}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="font-semibold">${booking.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                {isEditing ? (
                  <select
                    value={editedBooking.paymentStatus}
                    onChange={(e) => setEditedBooking({ ...editedBooking, paymentStatus: e.target.value })}
                    className="border rounded-md p-2 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                ) : (
                  <p className="font-semibold capitalize">{booking.paymentStatus}</p>
                )}
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          {booking.specialRequirements && (
            <div className="mb-6">
              <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">
                Special Requirements
              </h2>
              {isEditing ? (
                <textarea
                  value={editedBooking.specialRequirements}
                  onChange={(e) => setEditedBooking({ ...editedBooking, specialRequirements: e.target.value })}
                  className="border rounded-md p-2 w-full h-32"
                />
              ) : (
                <p className="text-gray-600">{booking.specialRequirements}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 