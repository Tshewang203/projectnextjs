import { NextResponse } from 'next/server';

export function errorHandler(error) {
  console.error('Error:', error);

  // Handle specific error types
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      { error: 'Validation Error', details: error.message },
      { status: 400 }
    );
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    return NextResponse.json(
      { error: 'Duplicate Entry', details: 'This record already exists' },
      { status: 409 }
    );
  }

  // Default error response
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
} 