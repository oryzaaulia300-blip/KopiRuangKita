import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  updateContactStatus
} from '../controllers/contactController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public: Submit contact / message
router.post('/', createContact);

// Protected: Staff, Admin, Owner can view submitted contact messages
router.get('/', requireAuth, getAllContacts);

// Protected: Update message status (e.g. READ, ARCHIVED)
router.patch('/:id/status', requireAuth, requireRole('owner', 'admin', 'staff'), updateContactStatus);

export default router;
