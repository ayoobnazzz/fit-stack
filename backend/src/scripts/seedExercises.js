import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise.js';
import connectDB from '../config/database.js';

dotenv.config();

const exercises = [
  {
    name: 'Bench Press',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: 'Barbell',
    description: 'A compound exercise targeting the chest, shoulders, and triceps.',
    instructions: [
      'Lie flat on a bench with feet on the floor',
      'Grip the barbell slightly wider than shoulder-width',
      'Lower the bar to your chest with control',
      'Press the bar back up explosively',
    ],
    isCustom: false,
  },
  {
    name: 'Running',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Cardiovascular'],
    difficulty: 'Beginner',
    equipment: 'None',
    description: 'Great cardiovascular exercise that improves endurance and burns calories.',
    instructions: [
      'Start with a warm-up walk',
      'Gradually increase pace to a comfortable running speed',
      'Maintain steady breathing',
      'Cool down with a walk',
    ],
    isCustom: false,
  },
  {
    name: 'Deadlift',
    category: 'Strength',
    muscleGroups: ['Back', 'Legs', 'Core'],
    difficulty: 'Advanced',
    equipment: 'Barbell',
    description: 'A fundamental compound movement that targets multiple muscle groups.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip the bar',
      'Keep back straight and core engaged',
      'Lift by extending hips and knees simultaneously',
    ],
    isCustom: false,
  },
  {
    name: 'Yoga Poses',
    category: 'Flexibility',
    muscleGroups: ['Full Body'],
    difficulty: 'Beginner',
    equipment: 'Mat',
    description: 'Improves flexibility, balance, and mental well-being.',
    instructions: [
      'Start with basic poses like Mountain Pose',
      'Focus on breathing and alignment',
      'Hold each pose for 30-60 seconds',
      'Gradually progress to more advanced poses',
    ],
    isCustom: false,
  },
  {
    name: 'Burpees',
    category: 'HIIT',
    muscleGroups: ['Full Body'],
    difficulty: 'Intermediate',
    equipment: 'None',
    description: 'High-intensity full-body exercise that combines squat, plank, and jump.',
    instructions: [
      'Start in standing position',
      'Drop into a squat and place hands on floor',
      'Jump feet back into plank position',
      'Do a push-up, then jump feet forward',
      'Explosively jump up with arms overhead',
    ],
    isCustom: false,
  },
  {
    name: 'Squats',
    category: 'Strength',
    muscleGroups: ['Legs', 'Glutes'],
    difficulty: 'Beginner',
    equipment: 'None',
    description: 'A fundamental lower body exercise targeting quads, glutes, and hamstrings.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending knees and hips',
      'Keep chest up and knees behind toes',
      'Lower until thighs are parallel to floor',
      'Push back up to starting position',
    ],
    isCustom: false,
  },
  {
    name: 'Cycling',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Cardiovascular'],
    difficulty: 'Beginner',
    equipment: 'Bicycle',
    description: 'Low-impact cardiovascular exercise that strengthens legs and improves endurance.',
    instructions: [
      'Adjust seat height for proper leg extension',
      'Start pedaling at a comfortable pace',
      'Maintain steady rhythm',
      'Gradually increase intensity',
    ],
    isCustom: false,
  },
  {
    name: 'Pull-ups',
    category: 'Strength',
    muscleGroups: ['Back', 'Biceps'],
    difficulty: 'Advanced',
    equipment: 'Pull-up Bar',
    description: 'Excellent upper body exercise targeting the back and biceps.',
    instructions: [
      'Hang from pull-up bar with palms facing away',
      'Pull your body up until chin clears the bar',
      'Lower yourself with control',
      'Repeat for desired reps',
    ],
    isCustom: false,
  },
  {
    name: 'Plank',
    category: 'Strength',
    muscleGroups: ['Core'],
    difficulty: 'Beginner',
    equipment: 'None',
    description: 'Isometric core exercise that strengthens the entire core region.',
    instructions: [
      'Start in push-up position',
      'Lower to forearms, keeping body straight',
      'Engage core and hold position',
      'Keep hips level with shoulders',
    ],
    isCustom: false,
  },
];

const seedExercises = async () => {
  try {
    await connectDB();

    // Check if exercises already exist
    const existingCount = await Exercise.countDocuments({ isCustom: false });
    
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing exercises. Skipping seed to avoid duplicates.`);
      console.log('To re-seed, delete existing exercises first or modify the script.');
      process.exit(0);
      return;
    }

    // Insert exercises
    const inserted = await Exercise.insertMany(exercises);
    console.log(`Successfully seeded ${inserted.length} exercises`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding exercises:', error);
    process.exit(1);
  }
};

seedExercises();

