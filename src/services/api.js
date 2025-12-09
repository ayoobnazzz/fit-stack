import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth headers from Supabase session
export const setAuthHeaders = (user) => {
  if (user) {
    api.defaults.headers.common['x-user-id'] = user.id;
    api.defaults.headers.common['x-user-email'] = user.email;
  } else {
    delete api.defaults.headers.common['x-user-id'];
    delete api.defaults.headers.common['x-user-email'];
  }
};

// Workouts API
export const workoutsAPI = {
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  create: (data) => api.post('/workouts', data),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  delete: (id) => api.delete(`/workouts/${id}`),
};

// Exercises API
export const exercisesAPI = {
  getAll: (params) => api.get('/exercises', { params }),
  getById: (id) => api.get(`/exercises/${id}`),
  create: (data) => api.post('/exercises', data),
  update: (id, data) => api.put(`/exercises/${id}`, data),
  delete: (id) => api.delete(`/exercises/${id}`),
};

// Progress API
export const progressAPI = {
  getAll: (params) => api.get('/progress', { params }),
  getStats: (params) => api.get('/progress/stats', { params }),
  create: (data) => api.post('/progress', data),
  update: (id, data) => api.put(`/progress/${id}`, data),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getStats: () => api.get('/users/stats'),
};

export default api;

