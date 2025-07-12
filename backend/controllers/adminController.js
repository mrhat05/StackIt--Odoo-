import User from '../models/User.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

export async function deleteUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function banUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = 'banned';
    await user.save();
    res.json({ message: 'User banned' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function unbanUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = 'user';
    await user.save();
    res.json({ message: 'User unbanned' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function deleteQuestion(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function deleteAnswer(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
} 