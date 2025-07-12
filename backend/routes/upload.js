import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/image', auth, upload.single('image'), uploadImage);

export default router; 