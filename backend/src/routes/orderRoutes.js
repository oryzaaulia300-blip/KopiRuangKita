import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderByCode,
  updateOrderStatus
} from '../controllers/orderController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public: Customer creates order
router.post('/', createOrder);

// Public / Semi-public: Check receipt / tracking by code
router.get('/:orderCode', getOrderByCode);

// Protected: Staff, Admin, Owner can view list of all orders
router.get('/', requireAuth, getAllOrders);

// Protected: Staff, Admin, Owner can update order status (e.g. PENDING -> PAID -> COMPLETED)
router.patch('/:id/status', requireAuth, updateOrderStatus);

export default router;
