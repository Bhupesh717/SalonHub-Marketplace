'use client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

// Read raw env value and normalize it to avoid malformed URLs
const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
// Remove any stray quotes, commas or whitespace and strip trailing slash
const BASE_URL = String(RAW_BASE_URL)
  .replace(/['",\s]+/g, '')
  .replace(/\/$/, '');

// Configure axios defaults
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

interface RawUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role_id: number;
  department_id: number;
  is_active: number;
  role: { id: number; name: string };
  department: { id: number; name: string };
  // Other fields ignored
}

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  department: { id: string; name: string };
  role: { id: string; name: string };
  isActive: boolean;
}

interface Department {
  id: string;
  name: string;
  is_active: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Role {
  id: string;
  name: string;
  department_id: string;
  is_active: number;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface CreateUserForm {
  name: string;
  email: string;
  mobile: string;
  department_id: string;
  role_id: string;
}

interface EditUserForm extends CreateUserForm {
  isActive: boolean;
}

type ApiMessage = { message: string };

interface UserState {
  users: User[];
  departments: Department[];
  roles: Role[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  fetchUsers: (
    page?: number,
    limit?: number | string,
    search?: string
  ) => Promise<void>;
  fetchDepartments: () => Promise<void>;
  fetchRolesByDepartment: (department_id: string) => Promise<void>;
  addUser: (userData: CreateUserForm) => Promise<ApiMessage>;
  updateUser: (id: string, userData: EditUserForm) => Promise<ApiMessage>;
  deleteUser: (id: string) => Promise<ApiMessage>;
  changeUserStatus: (id: string, status: boolean) => Promise<ApiMessage>;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    users: [],
    departments: [],
    roles: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
    fetchUsers: async (
      pageNum = 1,
      limit: number | string = 10,
      search: string = ''
    ) => {
      set({ isLoading: true });
      try {
        const limitValue = limit === 'all' ? 100000 : Number(limit || 10);
        const response = await api.get(
          `users?limit=${limitValue}&page=${pageNum}&search=${encodeURIComponent(
            search
          )}`
        );
        const data = response.data.data || {};
        const rawUsers = data.records || [];
        const mappedUsers = rawUsers.map((u: RawUser) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          mobile: u.mobile || '',
          department: {
            id: String(u.department.id),
            name: u.department.name,
          },
          role: {
            id: String(u.role.id),
            name: u.role.name,
          },
          isActive: !!u.is_active,
        }));
        set({
          users: mappedUsers,
          isLoading: false,
          currentPage: data.current_page || 1,
          totalPages: data.last_page || 0,
          totalUsers: data.total || 0,
        });
      } catch (error: any) {
        console.error(
          'Error fetching users:',
          error.response?.data?.message || error.message
        );
        set({ isLoading: false });
        throw error;
      }
    },
    fetchDepartments: async () => {
      try {
        const response = await api.get('departments');
        set({
          departments: (response.data.data || []).map((d: any) => ({
            ...d,
            id: String(d.id),
          })),
        });
      } catch (error: any) {
        console.error(
          'Error fetching departments:',
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },
    fetchRolesByDepartment: async (department_id: string) => {
      try {
        const response = await api.get(`roles/${department_id}`);
        set({
          roles: (response.data.data || []).map((r: any) => ({
            ...r,
            id: String(r.id),
            department_id: String(r.department_id),
          })),
        });
      } catch (error: any) {
        console.error(
          'Error fetching roles:',
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },
    addUser: async (userData: CreateUserForm) => {
      set({ isLoading: true });
      try {
        const response = await api.post('users', userData);
        if (response.data.status !== 200 && response.data.status !== 201) {
          throw new Error(response.data.message || 'Failed to create user');
        }
        set({ isLoading: false });
        return {
          message: response.data.message || 'User created successfully',
        };
      } catch (error: any) {
        set({ isLoading: false });
        // Handle validation errors
        if (error.response?.data?.errors) {
          const errorMessages = Object.values(error.response.data.errors)
            .flat()
            .join('\n');
          throw new Error(errorMessages);
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    },
    updateUser: async (id: string, userData: EditUserForm) => {
      set({ isLoading: true });
      try {
        const payload = { ...userData, is_active: userData.isActive ? 1 : 0 };
        const response = await api.put(`users/${id}`, payload);
        if (response.data.status !== 200) {
          throw new Error(response.data.message || 'Failed to update user');
        }
        set({ isLoading: false });
        return {
          message: response.data.message || 'User updated successfully',
        };
      } catch (error: any) {
        set({ isLoading: false });
        console.error(
          'Error updating user:',
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },
    deleteUser: async (id: string) => {
      set({ isLoading: true });
      try {
        const response = await api.delete(`users/${id}`);
        if (response.data.status !== 200) {
          throw new Error(response.data.message || 'Failed to delete user');
        }
        set({ isLoading: false });
        return {
          message: response.data.message || 'User deleted successfully',
        };
      } catch (error: any) {
        set({ isLoading: false });
        console.error(
          'Error deleting user:',
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },

    changeUserStatus: async (id: string, status: boolean) => {
      set({ isLoading: true });
      try {
        const payload = {
          id: Number(id),
          status: status ? 1 : 0,
          type: 'User',
        };

        const response = await api.post('change-status', payload);
        if (response.data.status !== 200) {
          throw new Error(
            response.data.message || 'Failed to change user status'
          );
        }
        set({ isLoading: false });
        return {
          message: response.data.message || 'User status updated successfully',
        };
      } catch (error: any) {
        set({ isLoading: false });
        console.error(
          'Error changing user status:',
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },
  }))
);
