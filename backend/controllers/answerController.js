import Answer from '../models/Answer.js';
import Question from '../models/Question.js';

export async function createAnswer(req, res) {
  try {
    const { description } = req.body;
    const answer = new Answer({
      description,
      user: req.user.userId,
      question: req.params.questionId,
      votes: [],
    });
    await answer.save();
    await Question.findByIdAndUpdate(req.params.questionId, { $push: { answers: answer._id } });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function updateAnswer(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    answer.description = req.body.description || answer.description;
    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function deleteAnswer(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    if (answer.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
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