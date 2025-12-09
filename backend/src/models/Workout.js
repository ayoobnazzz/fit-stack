import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Strength', 'Cardio', 'HIIT', 'Flexibility', 'Other'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        sets: Number,
        reps: Number,
        weight: Number, // in kg
        duration: Number, // in seconds (for time-based exercises)
        notes: String,
      },
    ],
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;

