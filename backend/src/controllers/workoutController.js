import Workout from '../models/Workout.js';

// Get all workouts for a user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId })
      .populate('exercises.exerciseId')
      .sort({ completedAt: -1 });

    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single workout
export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate('exercises.exerciseId');

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new workout
export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a workout
export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    res.json({ success: true, message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

