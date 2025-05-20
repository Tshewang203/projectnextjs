import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TourPackage from '@/models/TourPackage';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const tourPackage = await TourPackage.findById(params.id);

    if (!tourPackage) {
      return NextResponse.json(
        { error: 'Tour package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tourPackage);
  } catch (error) {
    console.error('Error fetching tour package:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 