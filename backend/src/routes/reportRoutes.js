import { Router } from 'express';
import { getReportSummary } from '../controllers/reportController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Protected: Staff, Admin, and Owner can view sales reports
router.get('/summary', requireAuth, requireRole('owner', 'admin', 'staff'), getReportSummary);

export default router;
