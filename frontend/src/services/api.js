import axios from 'axios';
import { showLoginToast } from '@/utils/toastHelpers';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler for authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If it's an auth error and we have a toast function available, show login toast
    if (error.response?.status === 401 || error.response?.status === 403) {
      showLoginToast();
    }
    return Promise.reject(error);
  }
);

// Image upload function
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post('/api/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.url;
};

// Questions API
export const createQuestion = async (questionData) => {
  const response = await api.post('/api/questions', questionData);
  return response.data;
};

export const getQuestions = async (params = {}) => {
  const response = await api.get('/api/questions', { params });
  return response.data;
};

export const getQuestion = async (id) => {
  const response = await api.get(`/api/questions/${id}`);
  return response.data;
};

// Answers API
export const createAnswer = async (questionId, answerData) => {
  const response = await api.post(`/api/answers/${questionId}`, answerData);
  return response.data;
};

export const getAnswerById = async (answerId) => {
  const response = await api.get(`/api/answers/${answerId}`);
  return response.data;
};

export const voteAnswer = async (answerId) => {
  const response = await api.post(`/api/answers/upvote/${answerId}`);
  return response.data;
};

export const acceptAnswer = async (answerId) => {
  const response = await api.post(`/api/answers/${answerId}/accept`);
  return response.data;
};

// Auth API
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

// Tags API
export const getTags = async () => {
  const response = await api.get('/api/tags');
  return response.data;
};

// Notifications API
export const getNotifications = async () => {
  const response = await api.get('/api/notifications');
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await api.patch(`/api/notifications/${id}/read`);
  return response.data;
};

export default api; 