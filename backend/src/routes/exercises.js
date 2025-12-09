import express from 'express';
import {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../controllers/exerciseController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get exercises requires auth (to filter user's custom exercises)
router.get('/', authenticate, getExercises);
router.get('/:id', authenticate, getExercise);

// Create/update/delete require auth (custom exercises)
router.post('/', authenticate, createExercise);
router.put('/:id', authenticate, updateExercise);
router.delete('/:id', authenticate, deleteExercise);

export default router;

