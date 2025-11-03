'use client';
import { create } from 'zustand';
import api from '@/services/api';
import { AUTH_TOKEN_KEY } from '@/config/api';

interface User {
  id: number;
  email: string;
  name: string;
  role: {
    id: number;
    name: string;
  };
  role_id: number;
  is_active: number;
  department?: {
    id: number;
    name: string;
  } | null;
  department_id?: number | null;
  mobile?: string | null;
  created_at: string;
  updated_at: string;
  last_assigned_at?: string | null;
  email_verified_at?: string | null;
  deleted_at?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  token: null,
  error: null,

  // 🔹 LOGIN
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Call APIService login
      const response = await api.login(credentials);
      console.log('Login response:', response); // Debug log

      // Extract data from response
      const { token, data: userData } = response;
      console.log('Extracted data:', { token, userData }); // Debug log

      if (!token) throw new Error('No token received from server');
      if (!userData) throw new Error('No user data received from server');

      // Validate user data structure
      if (!userData.email || !userData.role || !userData.role.name) {
        console.error('Invalid user data structure:', userData);
        throw new Error('Invalid user data received from server');
      }

      // Save token + user in localStorage
      if (typeof window !== 'undefined') {
        try {
          // First clear any existing data
          localStorage.clear();

          // Then set each item individually, with error checking
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          console.log('Saving user data:', userData); // Debug log

          if (userData) {
            localStorage.setItem('user_data', JSON.stringify(userData));
            localStorage.setItem('user_email', userData.email);
            localStorage.setItem('user_role', userData.role.name);
            localStorage.setItem('user_role_id', userData.role_id.toString());
          }

          // document.cookie = `auth_token=${token}; path=/; max-age=86400`;

          // Verify the data was saved
          console.log('Stored items:', {
            auth_token: localStorage.getItem(AUTH_TOKEN_KEY),
            user_data: localStorage.getItem('user_data'),
            user_email: localStorage.getItem('user_email'),
            user_role: localStorage.getItem('user_role'),
          });
        } catch (storageError) {
          console.error('Storage error:', storageError);
        }
      }

      // Set axios Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({
        user: userData,
        token,
        isLoading: false,
        error: null,
      });

      // Redirect to dashboard after successful login
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/dashboard';
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.';
      set({
        isLoading: false,
        error: message,
      });
      // Throw a plain Error so callers (pages) can read message and display toast
      throw new Error(message);
    }
  },

  // 🔹 LOGOUT
  logout: async () => {
    set({ isLoading: true });
    try {
      // Optional API logout call (backend)
      await api.post('/logout');

      if (typeof window !== 'undefined') {
        // Clear all auth-related items
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('user_data');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_role_id');
        // document.cookie =
        //   'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }

      delete api.defaults.headers.common['Authorization'];

      set({
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
      // Redirect to login page after successful logout
      if (typeof window !== 'undefined') {
        // Use location.href to force full reload and ensure middleware (server) sees cleared cookie
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      set({ isLoading: false });
    }
  },

  // 🔹 CHECK AUTH (restore state on refresh)
  checkAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userData = localStorage.getItem('user_data');
      const email = localStorage.getItem('user_email');
      const role = localStorage.getItem('user_role');
      const roleId = localStorage.getItem('user_role_id');

      if (token && userData && email && role && roleId) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const user = JSON.parse(userData);
        // Verify email and role match stored values for consistency
        if (
          user.email === email &&
          user.role.name === role &&
          user.role_id.toString() === roleId
        ) {
          set({
            token,
            user,
            isLoading: false,
            error: null,
          });
        } else {
          // If inconsistent, clear everything and force re-login
          useAuthStore.getState().logout();
        }
      }
    }
  },
}));

// 🔹 Persist user whenever it changes
if (typeof window !== 'undefined') {
  useAuthStore.subscribe((state) => {
    if (state.user) {
      localStorage.setItem('user_data', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user_data');
    }
  });
}
