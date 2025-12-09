import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import corsConfig from './config/cors.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import workoutRoutes from './routes/workouts.js';
import exerciseRoutes from './routes/exercises.js';
import progressRoutes from './routes/progress.js';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// API Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

