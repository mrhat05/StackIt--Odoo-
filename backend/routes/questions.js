import express from 'express';
import auth from '../middleware/auth.js';
import { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { upvoteQuestion } from '../controllers/answerController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.query.my) {
    return auth(req, res, next);
  }
  next();
}, getQuestions);
router.get('/:id', getQuestionById);
router.post('/', auth, createQuestion);
router.post('/upvote/:id', auth, upvoteQuestion);
router.put('/:id', auth, updateQuestion);
router.delete('/:id', auth, deleteQuestion);

export default router; 