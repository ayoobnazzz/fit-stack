import User from '../models/User.js';

// Middleware to verify user is authenticated via Supabase
// For now, we'll use a simple header check. In production, verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    const supabaseUserId = req.headers['x-user-id'];
    const userEmail = req.headers['x-user-email'];

    if (!supabaseUserId || !userEmail) {
      return res.status(401).json({ error: 'Unauthorized - Missing user credentials' });
    }

    // Find or create user in MongoDB
    let user = await User.findOne({ supabaseUserId });

    if (!user) {
      // Create user if doesn't exist
      user = await User.create({
        supabaseUserId,
        email: userEmail,
      });
    }

    req.user = user;
    req.userId = user._id;
    req.supabaseUserId = supabaseUserId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid credentials' });
  }
};

