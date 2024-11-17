// src/api/auth.js
import axios from 'axios';
import { API_URL } from './api';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `${token}` }
  });
  return response.data;
};
