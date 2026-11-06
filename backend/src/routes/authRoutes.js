import { Router } from 'express';
import { login, getMe, register } from '../controllers/authController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public login endpoint
router.post('/login', login);

// Protected: Get current user info
router.get('/me', requireAuth, getMe);

// Protected: Register new staff/admin (Owner or Admin only)
router.post('/register', requireAuth, requireRole('owner', 'admin'), register);

export default router;
