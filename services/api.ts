'use client';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY,
} from '@/config/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(AUTH_TOKEN_KEY);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Expose axios.defaults for global access
  get defaults() {
    return this.api.defaults;
  }

  // Generic HTTP methods
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.get(url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, config);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.delete(url, config);
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    // Backend returns: { status, message, token, data: { ...user } }
    const { data } = await this.api.post(API_ENDPOINTS.LOGIN, credentials);
    console.log('API response:', data); // Debug log
    return data; // Return the raw response
  }

  async forgotPassword(email: string) {
    const { data } = await this.api.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });
    return data;
  }

  async resetPassword(token: string, password: string) {
    const { data } = await this.api.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password,
    });
    return data;
  }

  // Example student APIs (optional)
  async getStudents() {
    const { data } = await this.api.get(API_ENDPOINTS.STUDENTS);
    return data;
  }
}

const api = new ApiService();
export default api;
