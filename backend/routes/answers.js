import express from 'express';
import auth from '../middleware/auth.js';
import { createAnswer, updateAnswer, deleteAnswer, upvoteAnswer, acceptAnswer } from '../controllers/answerController.js';

const router = express.Router();

router.post('/:questionId', auth, createAnswer);
router.put('/:id', auth, updateAnswer);
router.delete('/:id', auth, deleteAnswer);
router.post('/upvote/:id', auth, upvoteAnswer);
router.post('/accept/:id', auth, acceptAnswer);

export default router; 