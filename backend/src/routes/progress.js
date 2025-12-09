import express from 'express';
import {
  getProgress,
  getStats,
  createProgress,
  updateProgress,
} from '../controllers/progressController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All routes require authentication

router.get('/stats', getStats);
router.route('/').get(getProgress).post(createProgress);
router.route('/:id').put(updateProgress);

export default router;

