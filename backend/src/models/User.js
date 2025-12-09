import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    supabaseUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    height: {
      type: Number, // in cm
      default: null,
    },
    weight: {
      type: Number, // in kg
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    preferences: {
      units: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      emailUpdates: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;

