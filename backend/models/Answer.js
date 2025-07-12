import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  description: { type: String, required: true }, // rich text (HTML)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Image fields for Cloudinary
  images: [{
    publicId: { type: String }, // Cloudinary public ID
    url: { type: String }, // Cloudinary URL
    alt: { type: String } // Alt text for accessibility
  }],
}, { timestamps: true });

export default mongoose.model('Answer', answerSchema); 