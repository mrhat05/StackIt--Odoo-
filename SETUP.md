# StackIt Setup Guide

## Environment Variables

### Backend (.env file in backend directory)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/stackit

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env file in frontend directory)

Create a `.env` file in the `frontend` directory with:

```env
VITE_BACKEND_URL=http://localhost:5000
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Set up MongoDB

Make sure MongoDB is running locally or update the MONGODB_URI in the backend .env file.

### 3. Set up Cloudinary

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from your dashboard
3. Update the Cloudinary variables in the backend .env file

### 4. Start the Servers

```bash
# Backend (in backend directory)
npm run dev

# Frontend (in frontend directory)
npm run dev
```

## Features Implemented

### Rich Text Editor
- ✅ Full TipTap integration with comprehensive toolbar
- ✅ Bold, italic, underline formatting
- ✅ Headings (H1, H2)
- ✅ Bullet and numbered lists
- ✅ Text alignment (left, center, right)
- ✅ Code and code blocks
- ✅ Blockquotes
- ✅ Links with URL input
- ✅ Image upload with Cloudinary integration
- ✅ File validation (type and size)
- ✅ Loading states and error handling

### API Integration
- ✅ Centralized API service with axios interceptors
- ✅ Authentication token handling
- ✅ Image upload to Cloudinary
- ✅ Question and answer CRUD operations
- ✅ Voting and answer acceptance
- ✅ User authentication

### UI/UX Improvements
- ✅ Modern toolbar with icons
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Proper HTML rendering for rich content
- ✅ File upload validation and feedback

## Troubleshooting

### TipTap Import Errors
If you encounter import errors for TipTap extensions:
1. Make sure all packages are installed: `npm install @tiptap/extension-*`
2. Restart the development server
3. Clear node_modules and reinstall if needed

### Cloudinary Upload Issues
1. Verify your Cloudinary credentials in the backend .env file
2. Check that the uploads directory exists and is writable
3. Ensure the backend is running and accessible

### CORS Issues
1. Make sure the FRONTEND_URL in backend .env matches your frontend URL
2. Check that both servers are running on the correct ports 