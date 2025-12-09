import express from 'express';
import {
  getProfile,
  updateProfile,
  getUserStats,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All routes require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/stats', getUserStats);

export default router;

