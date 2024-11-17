// src/api/tasks.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
});

export const getTasks = async (filters = {}) => {
  const { status, sortBy, sortOrder, search } = filters;
  let query = '';

  if (status) query += `status=${status}&`;
  if (sortBy) query += `sortBy=${sortBy}&`;
  if (sortOrder) query += `sortOrder=${sortOrder}&`;
  if (search) query += `search=${encodeURIComponent(search)}&`;

  if (query) query = `?${query.slice(0, -1)}`;

  const response = await authAxios.get(`/tasks${query}`);
  return response.data;
};


export const createTask = async (taskData) => {
  const response = await authAxios.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await authAxios.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await authAxios.delete(`/tasks/${taskId}`);
  return response.data;
};
