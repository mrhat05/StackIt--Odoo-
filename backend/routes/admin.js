import express from 'express';
import auth from '../middleware/auth.js';
import { deleteUser, banUser, unbanUser, deleteQuestion, deleteAnswer } from '../controllers/adminController.js';

const router = express.Router();

router.delete('/user/:id', auth, deleteUser);
router.patch('/user/:id/ban', auth, banUser);
router.patch('/user/:id/unban', auth, unbanUser);
router.delete('/question/:id', auth, deleteQuestion);
router.delete('/answer/:id', auth, deleteAnswer);

export default router; 