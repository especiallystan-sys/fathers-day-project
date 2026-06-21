/**
 * Frontend API Configuration
 * Uses environment variables for API URL configuration
 */

const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? window.location.origin + '/api'
    : 'http://localhost:8000/api');

export const apiConfig = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_URL;
