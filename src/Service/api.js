import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://reqres.in/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

// Fetch Users API
export const fetchUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch users';
  }
};

// Update User API
export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update user';
  }
};

// Delete User API
export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return 'User deleted successfully';
  } catch (error) {
    throw error.response?.data?.error || 'Failed to delete user';
  }
};
