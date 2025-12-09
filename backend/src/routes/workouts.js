import express from 'express';
import {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All routes require authentication

router.route('/').get(getWorkouts).post(createWorkout);
router.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout);

export default router;

