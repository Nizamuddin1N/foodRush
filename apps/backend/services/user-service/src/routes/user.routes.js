import express from 'express';
import { createProfile, getProfile, addAddress } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/profile', authenticate, createProfile);
router.get('/me', authenticate, getProfile);
router.post('/address', authenticate, addAddress);

export default router;
