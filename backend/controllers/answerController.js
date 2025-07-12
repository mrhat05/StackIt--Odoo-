import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import { createAnswerWithImages, updateAnswerWithImages, cleanupImages } from './richContentController.js';
import Notification from '../models/Notification.js';

export async function createAnswer(req, res) {
  // Use the new image processing function
  return createAnswerWithImages(req, res);
}

export async function updateAnswer(req, res) {
  // Use the new image processing function
  return updateAnswerWithImages(req, res);
}

export async function deleteAnswer(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    // Clean up images from Cloudinary
    await cleanupImages(answer.images);
    await Question.findByIdAndUpdate(answer.question, { $pull: { answers: answer._id } });
    await answer.deleteOne();
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function upvoteAnswer(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.votes.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already upvoted' });
    }
    answer.votes.push(req.user.userId);
    await answer.save();
    // Notify answer author of upvote
    if (answer.user.toString() !== req.user.userId) {
      await Notification.create({
        user: answer.user,
        type: 'upvote',
        message: 'Your answer was upvoted!',
        link: `/question/${answer.question}`
      });
    }
    res.json({ message: 'Upvoted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function acceptAnswer(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    const question = await Question.findById(answer.question);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (question.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only question owner can accept answers' });
    }
    question.acceptedAnswer = answer._id;
    await question.save();
    res.json({ message: 'Answer accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Optionally: Add upvote notification for questions
export async function upvoteQuestion(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (!question.votes) question.votes = [];
    if (question.votes.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already upvoted' });
    }
    question.votes.push(req.user.userId);
    await question.save();
    // Notify question author of upvote
    if (question.user.toString() !== req.user.userId) {
      await Notification.create({
        user: question.user,
        type: 'upvote',
        message: 'Your question was upvoted!',
        link: `/question/${question._id}`
      });
    }
    res.json({ message: 'Upvoted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function getAnswerById(req, res) {
  try {
    const answer = await Answer.findById(req.params.id)
      .populate('user', 'name email')
      .populate('question', 'title _id');
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
} 