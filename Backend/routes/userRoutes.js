import express from 'express';
import {
  getSavedProperties,
  toggleSaveProperty,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/saved', protect, getSavedProperties);
router.post('/saved/:propertyId', protect, toggleSaveProperty);

export default router;
