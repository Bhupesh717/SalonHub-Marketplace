import { create } from 'zustand';
import api from '@/services/api';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  phone?: string;
}

interface StudentState {
  students: Student[];
  isLoading: boolean;
  fetchStudents: () => Promise<void>;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

// Mock data for demo
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    grade: '10',
    phone: '555-0101',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    grade: '11',
    phone: '555-0102',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    grade: '12',
    phone: '555-0103',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    grade: '9',
    phone: '555-0104',
  },
];

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  isLoading: false,

  fetchStudents: async () => {
    set({ isLoading: true });
    try {
      // Replace with actual API call: const data = await api.getStudents()
      // For demo, using mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ students: mockStudents, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addStudent: async (studentData) => {
    try {
      // Replace with actual API call: const newStudent = await api.createStudent(studentData)
      // For demo, creating mock student
      const newStudent: Student = {
        id: Date.now().toString(),
        ...studentData,
      };
      set({ students: [...get().students, newStudent] });
    } catch (error) {
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      // Replace with actual API call: await api.updateStudent(id, studentData)
      // For demo, updating local state
      set({
        students: get().students.map((student) =>
          student.id === id ? { ...student, ...studentData } : student
        ),
      });
    } catch (error) {
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      // Replace with actual API call: await api.deleteStudent(id)
      // For demo, removing from local state
      set({
        students: get().students.filter((student) => student.id !== id),
      });
    } catch (error) {
      throw error;
    }
  },
}));
