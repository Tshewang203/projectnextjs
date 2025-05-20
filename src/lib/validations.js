import { z } from 'zod';

export const bookingSchema = z.object({
  tourPackage: z.string().min(1, 'Tour package is required'),
  startDate: z.string().min(1, 'Start date is required'),
  customerDetails: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    nationality: z.string().min(1, 'Nationality is required'),
    passportNumber: z.string().min(1, 'Passport number is required'),
  }),
  numberOfTravelers: z.object({
    adults: z.number().min(1, 'At least one adult is required'),
    children: z.number().min(0, 'Number of children cannot be negative'),
  }),
  specialRequirements: z.string().optional(),
});

export const tourPackageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  price: z.number().min(0, 'Price cannot be negative'),
  currency: z.string().default('USD'),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
  itinerary: z.array(z.object({
    day: z.number().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    activities: z.array(z.string()).optional(),
  })),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  difficulty: z.enum(['easy', 'moderate', 'challenging']),
  maxGroupSize: z.number().min(1, 'Maximum group size must be at least 1'),
  startDates: z.array(z.string().or(z.date())).min(1, 'At least one start date is required'),
  status: z.enum(['active', 'inactive']).default('active'),
}); 