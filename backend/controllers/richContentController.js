import { v2 as cloudinary } from 'cloudinary';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import Notification from '../models/Notification.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extract image URLs from HTML content and upload to Cloudinary
async function processImagesFromContent(content) {
  const imageRegex = /<img[^>]+src="([^">]+)"/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imageUrl = match[1];
    
    // Check if it's already a Cloudinary URL
    if (imageUrl.includes('cloudinary.com')) {
      // Extract public ID from Cloudinary URL
      const publicIdMatch = imageUrl.match(/\/v\d+\/([^\/]+)\./);
      if (publicIdMatch) {
        images.push({
          publicId: publicIdMatch[1],
          url: imageUrl,
          alt: 'Uploaded image'
        });
      }
    } else if (imageUrl.startsWith('data:image/')) {
      // Handle base64 images (if any)
      try {
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: 'stackit_uploads',
          resource_type: 'image',
        });
        images.push({
          publicId: result.public_id,
          url: result.secure_url,
          alt: 'Uploaded image'
        });
      } catch (error) {
        console.error('Error uploading base64 image:', error);
      }
    }
  }
  
  return images;
}

// Create question with image processing
export async function createQuestionWithImages(req, res) {
  try {
    const { title, description, tags } = req.body;
    
    // Process images from the rich text content
    const images = await processImagesFromContent(description);
    
    const question = new Question({
      title,
      description,
      tags,
      user: req.user.userId,
      answers: [],
      images,
    });
    
    await question.save();
    
    // Populate user info for response
    await question.populate('user', 'name email');
    
    // Notify user of successful question post
    await Notification.create({
      user: req.user.userId,
      type: 'question_posted',
      message: 'Your question has been posted successfully!',
      link: `/question/${question._id}`
    });
    
    res.status(201).json(question);
  } catch (err) {
    console.error('Error creating question with images:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Create answer with image processing
export async function createAnswerWithImages(req, res) {
  try {
    const { description } = req.body;
    
    // Process images from the rich text content
    const images = await processImagesFromContent(description);
    
    const answer = new Answer({
      description,
      user: req.user.userId,
      question: req.params.questionId,
      votes: [],
      images,
    });
    
    await answer.save();
    
    // Add answer to question
    await Question.findByIdAndUpdate(req.params.questionId, { 
      $push: { answers: answer._id } 
    });
    
    // Populate user info for response
    await answer.populate('user', 'name email');
    
    // Notify question author of new answer
    const question = await Question.findById(req.params.questionId);
    if (question && question.user.toString() !== req.user.userId) {
      await Notification.create({
        user: question.user,
        type: 'answer',
        message: 'Your question received a new answer!',
        link: `/question/${question._id}`
      });
    }
    
    res.status(201).json(answer);
  } catch (err) {
    console.error('Error creating answer with images:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Update question with image processing
export async function updateQuestionWithImages(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    
    if (question.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { title, description, tags } = req.body;
    
    // Process images from the new content
    const images = await processImagesFromContent(description);
    
    question.title = title || question.title;
    question.description = description || question.description;
    question.tags = tags || question.tags;
    question.images = images;
    
    await question.save();
    
    // Populate user info for response
    await question.populate('user', 'name email');
    
    res.json(question);
  } catch (err) {
    console.error('Error updating question with images:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Update answer with image processing
export async function updateAnswerWithImages(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    
    if (answer.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { description } = req.body;
    
    // Process images from the new content
    const images = await processImagesFromContent(description);
    
    answer.description = description || answer.description;
    answer.images = images;
    
    await answer.save();
    
    // Populate user info for response
    await answer.populate('user', 'name email');
    
    res.json(answer);
  } catch (err) {
    console.error('Error updating answer with images:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Delete images from Cloudinary when content is deleted
export async function cleanupImages(images) {
  if (!images || images.length === 0) return;
  
  for (const image of images) {
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }
  }
} 