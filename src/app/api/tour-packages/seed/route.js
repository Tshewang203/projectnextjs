import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TourPackage from '@/models/TourPackage';

const tourPackages = [
  {
    title: 'Cultural Heritage Tour',
    description: 'Immerse yourself in Bhutan\'s rich cultural heritage with visits to ancient monasteries, traditional villages, and local festivals.',
    duration: '7 Days',
    price: 2200,
    image: '/tours/cultural-heritage.jpg',
    highlights: [
      'Visit to Tiger\'s Nest Monastery',
      'Punakha Dzong exploration',
      'Traditional mask dance performance',
      'Local farmhouse stay'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paro',
        description: 'Arrive at Paro International Airport and transfer to your hotel. Evening orientation and welcome dinner.'
      },
      {
        day: 2,
        title: 'Tiger\'s Nest Hike',
        description: 'Full-day hike to the iconic Tiger\'s Nest Monastery, one of Bhutan\'s most sacred sites.'
      }
    ],
    included: [
      'Airport transfers',
      'Accommodation in 3-star hotels',
      'All meals',
      'English-speaking guide',
      'Entrance fees'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Tips for guides and drivers'
    ]
  },
  {
    title: 'Himalayan Trek Adventure',
    description: 'Experience the breathtaking beauty of the Himalayas with this challenging trek through pristine mountain landscapes.',
    duration: '10 Days',
    price: 2800,
    image: '/tours/himalayan-trek.jpg',
    highlights: [
      'Druk Path Trek',
      'High-altitude camping',
      'Mountain village visits',
      'Buddhist monastery tours'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Preparation',
        description: 'Arrive in Paro, meet your trekking guide, and prepare for the adventure ahead.'
      },
      {
        day: 2,
        title: 'Start of Trek',
        description: 'Begin the Druk Path Trek with a moderate hike to the first campsite.'
      }
    ],
    included: [
      'Trekking permits',
      'Camping equipment',
      'All meals during trek',
      'Experienced trekking guide',
      'Support staff'
    ],
    excluded: [
      'International flights',
      'Personal trekking gear',
      'Travel insurance',
      'Tips for staff'
    ]
  },
  {
    title: 'Festival & Wellness Journey',
    description: 'Combine cultural immersion with wellness activities in this unique tour featuring Bhutan\'s famous festivals and traditional healing practices.',
    duration: '8 Days',
    price: 2500,
    image: '/tours/festival-wellness.jpg',
    highlights: [
      'Thimphu Tshechu festival',
      'Traditional hot stone bath',
      'Meditation sessions',
      'Organic farm visits'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Festival',
        description: 'Arrive in Thimphu and attend the colorful Tshechu festival.'
      },
      {
        day: 2,
        title: 'Wellness Activities',
        description: 'Experience traditional Bhutanese wellness practices and meditation.'
      }
    ],
    included: [
      'Festival permits',
      'Wellness activities',
      'Accommodation in 4-star hotels',
      'All meals',
      'English-speaking guide'
    ],
    excluded: [
      'International flights',
      'Personal wellness items',
      'Travel insurance',
      'Tips for guides'
    ]
  }
];

export async function GET() {
  try {
    await connectDB();

    // Clear existing tour packages
    await TourPackage.deleteMany({});

    // Insert new tour packages
    const createdPackages = await TourPackage.insertMany(tourPackages);

    return NextResponse.json({
      message: 'Tour packages seeded successfully',
      count: createdPackages.length
    });
  } catch (error) {
    console.error('Error seeding tour packages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 