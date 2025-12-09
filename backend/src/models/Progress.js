import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    workoutsCompleted: {
      type: Number,
      default: 0,
    },
    totalCaloriesBurned: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number, // in minutes
      default: 0,
    },
    weight: {
      type: Number, // in kg
      default: null,
    },
    bodyMeasurements: {
      chest: Number,
      waist: Number,
      hips: Number,
      arms: Number,
      thighs: Number,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
progressSchema.index({ userId: 1, date: -1 });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;

