// app/API/contactStore.ts
'use client';
import { create } from 'zustand';
import axios from 'axios';

interface ContactForm {
  name: string;
  email: string;
  mobile: string;
  schoolName: string;
  subject: string;
  message: string;
}

interface ContactStore {
  form: ContactForm;
  loading: boolean;
  success: boolean;
  error: string | null;
  setField: (field: keyof ContactForm, value: string) => void;
  resetForm: () => void;
  submitForm: (toast: any) => Promise<void>;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useContactStore = create<ContactStore>((set, get) => ({
  form: {
    name: '',
    email: '',
    mobile: '',
    schoolName: '',
    subject: '',
    message: '',
  },
  loading: false,
  success: false,
  error: null,

  setField: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),

  resetForm: () =>
    set({
      form: {
        name: '',
        email: '',
        mobile: '',
        schoolName: '',
        subject: '',
        message: '',
      },
      success: false,
      error: null,
    }),

  submitForm: async (toast) => {
    const { form } = get();
    set({ loading: true, success: false, error: null });

    try {
      // Validate required fields before submission
      const requiredFields: (keyof ContactForm)[] = [
        'name',
        'email',
        'message',
      ];
      const missingFields = requiredFields.filter((field) => !form[field]);

      if (missingFields.length > 0) {
        const errorMessage = `Please fill in required fields: ${missingFields.join(
          ', '
        )}`;
        toast({
          title: 'Validation Error',
          description: errorMessage,
          variant: 'destructive',
        });
        set({ loading: false, error: errorMessage });
        return;
      }

      const response = await api.post('/materials', form);

      // Show success toast with auto-dismiss
      toast({
        title: 'Success!',
        description:
          response.data.message || 'Your message has been sent successfully!',
        variant: 'default',
        duration: 3000, // Auto dismiss after 3 seconds
      });

      set({ loading: false, success: true });
      get().resetForm();
    } catch (error: any) {
      let errorMessage = 'Failed to send message. Please try again.';
      const responseData = error.response?.data;

      // Handle validation errors (status 422)
      if (error.response?.status === 422 && responseData?.errors) {
        const errorMessages = Object.entries(responseData.errors)
          .map(([field, errors]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            return `${fieldName}: ${
              Array.isArray(errors) ? errors.join(', ') : errors
            }`;
          })
          .join('\n');

        errorMessage = `Validation failed:\n${errorMessages}`;
      }
      // Handle other types of errors
      else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error toast
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000, // Show errors longer
      });

      set({
        loading: false,
        error: errorMessage,
      });

      // Optional: Reset form on certain errors
      if (error.response?.status === 500) {
        get().resetForm();
      }
    }
  },
}));
