import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Booking from '@/models/Booking';
import { connectDB } from '@/lib/db';

// GET /api/bookings - Get all bookings for the authenticated user
export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    // Only return bookings for the logged-in user
    const bookings = await Booking.find({ user: decoded.id });
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['destination', 'startDate', 'endDate', 'numberOfTravelers', 'totalPrice'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    const booking = await Booking.create({
      ...body,
      user: decoded.id,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 