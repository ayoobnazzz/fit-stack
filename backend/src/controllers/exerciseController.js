import Exercise from '../models/Exercise.js';

// Get all exercises (public library + user's custom exercises)
export const getExercises = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Build search query
    const searchConditions = [];
    if (search) {
      searchConditions.push(
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      );
    }

    // Get public exercises and user's custom exercises
    const customConditions = [
      { isCustom: false },
      { isCustom: true, createdBy: req.userId },
    ];

    // Combine conditions
    if (searchConditions.length > 0) {
      query.$and = [
        { $or: searchConditions },
        { $or: customConditions },
      ];
    } else {
      query.$or = customConditions;
    }

    const exercises = await Exercise.find(query).sort({ name: 1 });

    res.json({ success: true, data: exercises });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single exercise
export const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }

    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a custom exercise
export const createExercise = async (req, res) => {
  try {
    const exercise = await Exercise.create({
      ...req.body,
      isCustom: true,
      createdBy: req.userId,
    });

    res.status(201).json({ success: true, data: exercise });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update an exercise (only if user created it)
export const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found or unauthorized' });
    }

    Object.assign(exercise, req.body);
    await exercise.save();

    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete an exercise (only if user created it)
export const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found or unauthorized' });
    }

    res.json({ success: true, message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

