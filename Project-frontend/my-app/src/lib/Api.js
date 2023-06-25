import axios from 'axios';
import { store } from '../store/Store';

export const ENDPOINTS = {
  register: { method: 'POST', url: '/register' },
  login: { method: 'POST', url: '/login' },
  verifyAccount: {method: 'GET', url: '/verify-account'},
  forgotPassword:{method: 'POST', url: '/forgot-password-request'},
  resetPassword: {method: 'POST', url: '/reset-password'},
  getDealerships: { method: 'GET', url: '/dealerships' },
  showDealership: { method: 'GET', url: '/dealerships'},
  createDealership:{method: 'POST', url: '/dealerships'},
  editDealership:{method: 'PUT', url: '/dealerships'},
  deleteDealership:{method: 'DELETE', url: '/dealerships'},
  createReview:{method: 'POST', url: '/dealerships' },
  deleteReview:{method: 'DELETE', url: '/dealerships'},
};

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Enable sending cookies in cross-origin requests
});

// Add an interceptor to include the token in the request headers
apiInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  console.log(token + "token at api")
  if (token) {
    config.headers.Authorization = token;
  }
  console.log(config.headers)
  return config;
});

export const apiCall = async (endpoint, options = null) => {
  let data = {};
  if (options) {
    data = options.data;
  }

  try {
    const response = await apiInstance({
      ...endpoint,
      data,
    });
    return response.data;
  } catch (err) {
    return false;
  }
};
