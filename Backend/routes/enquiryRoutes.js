import express from 'express';
import {
  createEnquiry,
  getMyEnquiries,
} from '../controllers/enquiryController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createEnquiry);
router.get('/my-enquiries', protect, getMyEnquiries);

export default router;
