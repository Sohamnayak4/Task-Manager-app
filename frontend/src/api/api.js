import axios from 'axios';

export const API = axios.create({ baseURL: 'https://task-manager-app-backend-xz3w.onrender.com/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status
    };
    return Promise.reject(customError);
  }
);

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const createTask = (task) => API.post('/tasks', task);
export const getTasks = (query = '') => API.get(`/tasks${query}`);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const API_URL = 'https://task-manager-app-backend-xz3w.onrender.com';