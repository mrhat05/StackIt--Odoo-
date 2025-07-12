# StackIt - A minimal Q&A Forum Platform



## 🧩 1. Frontend README – client/

This is the frontend of StackIt, a minimalist Q&A platform built for collaborative learning and knowledge sharing. It provides a clean and user-friendly interface to ask questions, answer them using rich formatting, and interact with the community in real time.

## 🛠️ Tech Stack

- React.js – Core framework
- React Router – Routing
- Redux Toolkit – State management
- TailwindCSS – Utility-first styling
- ShadCN UI – UI components
- Radix UI Icons – Iconography




## ✨ Features

- 🔍 Search Bar: Filter questions by text
- 🔔 Notification Bell: Real-time alerts for mentions, answers, and comments
- 📝 Rich Text Editor: Supports bold, italics, bullet points, emojis, links, image uploads, and alignment
- 🏷️ Tag Display: Clickable tags for filtering
- 🔄 Pagination: Navigate between question pages
- 👤 Auth-Aware Navbar: Conditional rendering based on login state
- ✅ Vote Count: Upvote answers
- 📦 Theme Integration: Centralized color and layout system via theme.js

## 🧪 Environment Setup

```bash
cd client
npm install
npm run dev
```
## 🧠 2. Backend README – server/

This is the backend for StackIt. It powers all logic behind users, questions, answers, votes, notifications, and admin moderation.

## 🛠️ Tech Stack

- Node.js + Express.js – RESTful API
- MongoDB + Mongoose – Database layer
- JWT – Authentication
- Cloudinary – Image upload
- Multer – File handling
- Dotenv – Config handling




## ✨ API Features

- 🛂 Auth: Register, Login (JWT secured)
- ❓ Questions: Create, update, delete, filter, sort, tag-based search
- 🗨️ Answers: Post, edit, delete, upvote, accept answer
- 📬 Notifications: Auto-generated when someone answers/comments/mentions
- 🧙‍♂️ Admin Controls: Ban/unban users, delete posts
- ☁️ Image Upload: Cloudinary integration


## 🧪 Environment Setup

1. Create a .env file
```bash
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```
 
2.Run server:
```bash
cd server
npm install
npm run dev
```

##  3. Overall README – StackIt Hackathon Submission
## 💡 Project Name
## StackIt – A Minimal Q&A Forum Platform


We wanted to create a lightweight, clean, and powerful question-answer platform that makes knowledge sharing intuitive and engaging—built from scratch during the hackathon!


## ✅ Core Hackathon Requirements – Completed!

## 🧁 Extra Features (Special Additions!)
- 🌗 Dark Mode Friendly via theme tokens
- 🚫 Admin Panel: Ban/unban users and moderate content
- 📑 Search + Filters: By tags, unanswered questions, and recency
- 🧹 Client-Side Caching via Redux
- 🧾 Line-Clamp Previews for compact UI
- 🖼️ Image Upload Integration in answers/questions
- 📬 Notification Read Status toggle

## 🚦 How to Run Locally
1. Clone this repository
2. Start Backend:
```bash
cd server
npm install
npm run dev

```
3. Start Frontend:
```bash
cd client
npm install
npm run dev

```
4. Visit http://localhost:5173 in your browser.
