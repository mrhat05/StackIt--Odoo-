import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import { createQuestionWithImages, updateQuestionWithImages, cleanupImages } from './richContentController.js';

export async function getQuestions(req, res) {
  try {
    const { page = 1, limit = 10, tag, search, sort = 'newest', unanswered } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (unanswered) filter.answers = { $size: 0 };
    if (search) filter.title = { $regex: search, $options: 'i' };
    const sortOption = sort === 'newest' ? { createdAt: -1 } : { createdAt: 1 };
    const questions = await Question.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('user', 'name email')
      .populate({ path: 'answers', populate: { path: 'user', select: 'name email' } });
    const total = await Question.countDocuments(filter);
    res.json({ questions, total });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', 'name email')
      .populate({ path: 'answers', populate: { path: 'user', select: 'name email' } });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function createQuestion(req, res) {
  // Use the new image processing function
  return createQuestionWithImages(req, res);
}

export async function updateQuestion(req, res) {
  // Use the new image processing function
  return updateQuestionWithImages(req, res);
}

export async function deleteQuestion(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (question.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Clean up images from Cloudinary
    await cleanupImages(question.images);
    
    // Delete all answers and their images
    const answers = await Answer.find({ question: question._id });
    for (const answer of answers) {
      await cleanupImages(answer.images);
    }
    
    await Answer.deleteMany({ question: question._id });
    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
} 