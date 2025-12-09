import User from '../models/User.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-__v');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get user stats summary
export const getUserStats = async (req, res) => {
  try {
    const Workout = (await import('../models/Workout.js')).default;
    const Progress = (await import('../models/Progress.js')).default;

    const totalWorkouts = await Workout.countDocuments({ userId: req.userId });
    const progressEntries = await Progress.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(7);

    // Calculate streak
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
        currentStreak: streak,
        memberSince: req.user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

