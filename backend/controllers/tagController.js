import Tag from '../models/Tag.js';

export async function getTags(req, res) {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function createTag(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create tags' });
    }
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
} 