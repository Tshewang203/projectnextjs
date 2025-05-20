'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';

const teamMembers = [
  {
    name: 'Lhaki',
    role: 'Tour Guide',
    image: '/contact/contact_tourGuide.jpg'
  },
  {
    name: 'Karma',
    role: 'Travel Expert',
    image: '/contact/contact_expert.jpeg'
  },
  {
    name: 'Pema',
    role: 'Local Guide',
    image: '/contact/contact_guide.jpeg'
  },
  {
    name: 'Dorji and Team',
    role: 'Support Staff',
    image: '/contact/contact_teamStaff.jpg'
  }
];

const contactHighlights = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: '24/7 Support'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    text: 'Local Expertise'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: 'Quick Response'
  }
];

const contactInfo = [
  {
    icon: '📍',
    title: 'Address',
    details: [
      'Tourism Council of Bhutan',
      'Thimphu, Bhutan'
    ]
  },
  {
    icon: '📞',
    title: 'Phone',
    details: [
      '+975 2 323251',
      '+975 2 323252'
    ]
  },
  {
    icon: '✉️',
    title: 'Email',
    details: [
      'info@tourism.gov.bt',
      'support@tourism.gov.bt'
    ]
  },
  {
    icon: '⏰',
    title: 'Office Hours',
    details: [
      'Monday - Friday: 9:00 AM - 5:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ]
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="pt-20">
        {/* Header Section */}
        <header className="py-12 bg-[var(--rice-white)]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6 font-['Cinzel'] text-[#2B3F55]">
              Contact Us
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-center mb-12 font-['Playfair_Display'] text-[var(--text-dark)]">
                Have questions about your Bhutan adventure? Our team of local experts is here to help plan your unforgettable journey.
              </p>

              {/* Team Members */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>
                    <h5 className="text-lg font-bold mb-1 font-['Cinzel'] text-[#2B3F55]">
                      {member.name}
                    </h5>
                    <p className="text-[var(--mountain-slate)]">{member.role}</p>
                  </div>
                ))}
              </div>

              {/* Contact Highlights */}
              <div className="flex justify-center items-center gap-12">
                {contactHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[#2B3F55] mb-2">
                      {highlight.icon}
                    </div>
                    <p className="font-['Playfair_Display'] text-[var(--text-dark)]">
                      {highlight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Contact Information Grid */}
      <section className="py-16 bg-[var(--rice-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold mb-4 font-['Cinzel'] text-[#2B3F55]">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 font-['Playfair_Display']"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center font-['Cinzel'] text-[#2B3F55]">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                />
              </div>
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-['Playfair_Display']">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
              />
            </div>
            <div>
              <label className="block mb-2 font-['Playfair_Display']">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-[#2B3F55] text-white rounded-lg hover:bg-[var(--river-blue)] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
} 