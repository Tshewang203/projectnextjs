'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Add tourPackages array here (copy from booking page)
const tourPackages = [
  {
    id: 1,
    title: 'Cultural Heritage Tour',
  },
  {
    id: 2,
    title: 'Himalayan Trek Adventure',
  },
  {
    id: 3,
    title: 'Festival & Wellness Journey',
  }
];

export default function BookingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    selectedPackage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    adults: 1,
    children: 0,
    startDate: '',
    specialRequirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store form data in sessionStorage before redirecting
      sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
      
      // Redirect to login page with return URL
      router.push('/login?redirectTo=/booking/confirmation');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-['Cinzel'] text-[#2B3F55]">
          Book Your Tour
        </h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Tour Package Dropdown */}
          <div>
            <label htmlFor="selectedPackage" className="block text-sm font-medium text-gray-700 mb-1">
              Select Tour Package
            </label>
            <select
              id="selectedPackage"
              name="selectedPackage"
              value={formData.selectedPackage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              required
            >
              <option value="">-- General Inquiry --</option>
              {tourPackages.map(pkg => (
                <option key={pkg.id} value={pkg.title}>{pkg.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
            <div>
              <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Passport Number
              </label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Adults
              </label>
              <input
                type="number"
                id="adults"
                name="adults"
                min="1"
                value={formData.adults}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Children
              </label>
              <input
                type="number"
                id="children"
                name="children"
                min="0"
                value={formData.children}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requirements
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#2B3F55] focus:border-[#2B3F55]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-[#2B3F55] text-white rounded-md hover:bg-[#1a2634] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Continue to Book'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 