'use client';
import { create } from 'zustand';
import axios from 'axios';

// Read raw env value and normalize it to avoid malformed URLs (quotes, commas, trailing slash)
const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
// Remove any stray quotes, commas or whitespace and strip trailing slash
const BASE_URL = String(RAW_BASE_URL)
  .replace(/['",\s]+/g, '')
  .replace(/\/$/, '');
if (!BASE_URL) {
  console.warn(
    'NEXT_PUBLIC_API_URL not set or empty. API calls will likely fail.'
  );
}

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  role_id: number;
  is_active: number;
  department_id: number | null;
  mobile: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  registerUser: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

// Load stored auth state
const loadStoredAuth = () => {
  try {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (token && user) {
      // Set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { user, isAuthenticated: true };
    }
  } catch (error) {
    console.error('Error loading stored auth state:', error);
  }
  return { user: null, isAuthenticated: false };
};

// Save auth state to storage
const saveAuthState = (user: User | null, token: string | null) => {
  try {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('roleId', String(user.role_id));
      localStorage.setItem('roleName', user.role.name);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('roleId');
      localStorage.removeItem('roleName');
    }
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

// Initialize store with stored auth state
const storedAuth = loadStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  user: storedAuth.user,
  loading: false,
  error: null,
  isAuthenticated: storedAuth.isAuthenticated,

  loginUser: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      const { data: user, token, message } = response.data;

      // Save auth state and set up axios
      saveAuthState(user, token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({
        user,
        loading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      set({
        loading: false,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  },

  registerUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      const { data: user, token } = response.data;

      // Save auth state and set up axios
      saveAuthState(user, token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({
        user,
        loading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      set({
        loading: false,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Registration failed',
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      // Make API call to logout
      await axios.post(`${BASE_URL}/logout`);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear all auth data from storage and reset axios
      saveAuthState(null, null);
      delete axios.defaults.headers.common['Authorization'];

      set({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  },
}));
