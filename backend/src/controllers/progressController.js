import Progress from '../models/Progress.js';
import Workout from '../models/Workout.js';

// Get user's progress entries
export const getProgress = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const progress = await Progress.find(query).sort({ date: -1 });

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get aggregated statistics
export const getStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = { userId: req.userId };

    if (startDate || endDate) {
      dateFilter.completedAt = {};
      if (startDate) dateFilter.completedAt.$gte = new Date(startDate);
      if (endDate) dateFilter.completedAt.$lte = new Date(endDate);
    }

    // Get workout statistics
    const workouts = await Workout.find(dateFilter);
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

    // Get weekly stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyWorkouts = await Workout.countDocuments({
      userId: req.userId,
      completedAt: { $gte: oneWeekAgo },
    });

    // Get current streak
    const progressEntries = await Progress.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(30);

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < progressEntries.length; i++) {
      const entryDate = new Date(progressEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      success: true,
      data: {
        totalWorkouts,
        totalCalories,
        totalMinutes,
        weeklyWorkouts,
        currentStreak: streak,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a progress entry
export const createProgress = async (req, res) => {
  try {
    const progress = await Progress.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json({ success: true, data: progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a progress entry
export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!progress) {
      return res.status(404).json({ success: false, error: 'Progress entry not found' });
    }

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

