import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TourPackage from '@/models/TourPackage';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const difficulty = searchParams.get('difficulty');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    let query = {};
    
    if (status) query.status = status;
    if (difficulty) query.difficulty = difficulty;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const tourPackages = await TourPackage.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json(tourPackages);
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tour packages' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();
    
    const tourPackage = await TourPackage.create(data);
    
    return NextResponse.json(tourPackage, { status: 201 });
  } catch (error) {
    console.error('Error creating tour package:', error);
    return NextResponse.json(
      { error: 'Failed to create tour package' },
      { status: 500 }
    );
  }
} 