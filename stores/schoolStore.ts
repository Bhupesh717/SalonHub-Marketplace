import { create } from 'zustand';
import api from '@/services/api';

interface School {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

interface SchoolState {
  schools: School[];
  isLoading: boolean;
  fetchSchools: () => Promise<void>;
  addSchool: (school: Omit<School, 'id'>) => Promise<void>;
  updateSchool: (id: string, school: Partial<School>) => Promise<void>;
  deleteSchool: (id: string) => Promise<void>;
}

// Mock data for demo
const mockSchools: School[] = [
  {
    id: '1',
    name: 'Springfield High School',
    email: 'info@springfield.edu',
    address: '123 Main St',
    phone: '555-1000',
  },
  {
    id: '2',
    name: 'Riverside Academy',
    email: 'contact@riverside.edu',
    address: '456 Oak Ave',
    phone: '555-2000',
  },
  {
    id: '3',
    name: 'Hillside Elementary',
    email: 'admin@hillside.edu',
    address: '789 Pine Rd',
    phone: '555-3000',
  },
];

export const useSchoolStore = create<SchoolState>((set, get) => ({
  schools: [],
  isLoading: false,

  fetchSchools: async () => {
    set({ isLoading: true });
    try {
      // Replace with actual API call: const data = await api.getSchools()
      // For demo, using mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ schools: mockSchools, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addSchool: async (schoolData) => {
    try {
      // Replace with actual API call: const newSchool = await api.createSchool(schoolData)
      // For demo, creating mock school
      const newSchool: School = {
        id: Date.now().toString(),
        ...schoolData,
      };
      set({ schools: [...get().schools, newSchool] });
    } catch (error) {
      throw error;
    }
  },

  updateSchool: async (id, schoolData) => {
    try {
      // Replace with actual API call: await api.updateSchool(id, schoolData)
      // For demo, updating local state
      set({
        schools: get().schools.map((school) =>
          school.id === id ? { ...school, ...schoolData } : school
        ),
      });
    } catch (error) {
      throw error;
    }
  },

  deleteSchool: async (id) => {
    try {
      // Replace with actual API call: await api.deleteSchool(id)
      // For demo, removing from local state
      set({
        schools: get().schools.filter((school) => school.id !== id),
      });
    } catch (error) {
      throw error;
    }
  },
}));
