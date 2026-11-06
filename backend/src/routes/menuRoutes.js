import { Router } from 'express';
import {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '../controllers/menuController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public: View all menus or single menu
router.get('/', getAllMenus);
router.get('/:id', getMenuById);

// Protected: Admin or Owner can manage menus
router.post('/', requireAuth, requireRole('owner', 'admin'), createMenu);
router.put('/:id', requireAuth, requireRole('owner', 'admin'), updateMenu);
router.delete('/:id', requireAuth, requireRole('owner', 'admin'), deleteMenu);

export default router;
