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

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Log environment status (without sensitive data)
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || '5000 (default)');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✓ Set' : '✗ Missing');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || 'not set');

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

