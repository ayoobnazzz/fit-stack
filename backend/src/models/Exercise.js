import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['Strength', 'Cardio', 'Flexibility', 'HIIT'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    equipment: {
      type: String,
      default: 'None',
    },
    muscleGroups: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: '',
    },
    instructions: [
      {
        type: String,
      },
    ],
    isCustom: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;

