import mongoose from 'mongoose';

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  duration: {
    type: String,
    required: [true, 'Please provide duration'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  highlights: [{
    type: String,
    required: true,
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  included: [{
    type: String,
    required: true,
  }],
  excluded: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TourPackage = mongoose.models.TourPackage || mongoose.model('TourPackage', tourPackageSchema);

export default TourPackage; 