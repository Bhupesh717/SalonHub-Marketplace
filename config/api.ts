// API Configuration
// Replace this with your actual backend API URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://your-api-url.com/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  // Use '/login' so when API_BASE_URL is e.g. 'https://labtesting.mobilogicx.com/api'
  // the full URL becomes 'https://labtesting.mobilogicx.com/api/login'
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Students
  STUDENTS: '/students',
  STUDENT_BY_ID: (id: string) => `/students/${id}`,

  // Schools
  SCHOOLS: '/schools',
  SCHOOL_BY_ID: (id: string) => `/schools/${id}`,
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Token storage key
export const AUTH_TOKEN_KEY = 'auth_token';
