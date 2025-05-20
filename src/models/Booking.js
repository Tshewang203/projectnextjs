import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: String,
    required: [true, 'Please provide a destination'],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
  },
  numberOfTravelers: {
    type: Number,
    required: [true, 'Please provide the number of travelers'],
    min: [1, 'Number of travelers must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide the total price'],
    min: [0, 'Price cannot be negative'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
    trim: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp
bookingSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: new Date() });
});

// Validate that endDate is after startDate
bookingSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking; 