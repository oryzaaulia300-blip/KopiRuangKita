import { Router } from 'express';
import {
  getAllPromos,
  createPromo,
  updatePromo,
  deletePromo
} from '../controllers/promoController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public: View all active promos
router.get('/', getAllPromos);

// Protected: Admin or Owner can manage promos
router.post('/', requireAuth, requireRole('owner', 'admin'), createPromo);
router.put('/:id', requireAuth, requireRole('owner', 'admin'), updatePromo);
router.delete('/:id', requireAuth, requireRole('owner', 'admin'), deletePromo);

export default router;
