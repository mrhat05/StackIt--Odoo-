import express from 'express';
import auth from '../middleware/auth.js';
import { getTags, createTag } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getTags);
router.post('/', auth, createTag);

export default router; 