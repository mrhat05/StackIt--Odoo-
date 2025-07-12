import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // rich text (HTML)
  tags: [{ type: String, required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  // Image fields for Cloudinary
  images: [{
    publicId: { type: String }, // Cloudinary public ID
    url: { type: String }, // Cloudinary URL
    alt: { type: String } // Alt text for accessibility
  }],
}, { timestamps: true });

export default mongoose.model('Question', questionSchema); 