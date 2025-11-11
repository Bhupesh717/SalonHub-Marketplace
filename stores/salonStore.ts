'use client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'

const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const BASE_URL = String(RAW_BASE_URL).replace(/['",\s]+/g, '').replace(/\/$/, '')

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem('token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    return cfg
  },
  (err) => Promise.reject(err)
)

/* ---------- Mock data (used when API fails) ---------- */
const MOCK_SERVICES = [
  {
    id: 's1',
    name: 'Haircut',
    description: 'Professional haircut with styling',
    price: 35,
    duration: 60,
    isActive: true
  },
  {
    id: 's2',
    name: 'Hair Coloring',
    description: 'Full hair coloring service',
    price: 80,
    duration: 120,
    isActive: true
  },
  {
    id: 's3',
    name: 'Manicure',
    description: 'Classic manicure with polish',
    price: 25,
    duration: 45,
    isActive: true
  }
];

const DEFAULT_OPENING_HOURS = {
  monday: '9:00 AM - 8:00 PM',
  tuesday: '9:00 AM - 8:00 PM',
  wednesday: '9:00 AM - 8:00 PM',
  thursday: '9:00 AM - 8:00 PM',
  friday: '9:00 AM - 9:00 PM',
  saturday: '10:00 AM - 6:00 PM',
  sunday: 'Closed'
};

const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Glow Spa',
    description: 'A premier salon offering high-end beauty treatments and personalized care for all clients.',
    email: 'glow@example.com',
    phone: '9876543210',
    address: '12 Sunset Blvd, City',
    bannerImage: '/assets/hero-salon-1.jpg',
    rating: 4.5,
    isActive: true,
    services: MOCK_SERVICES,
    openingHours: DEFAULT_OPENING_HOURS
  },
  {
    id: '2',
    name: 'Urban Cuts',
    description: 'A trendy salon offering modern haircuts and styling services.',
    email: 'urban@example.com',
    phone: '9123456789',
    address: '45 High St, Town',
    bannerImage: '/assets/hero-salon-2.jpg',
    rating: 4.5,
    isActive: false,
    services: MOCK_SERVICES,
    openingHours: DEFAULT_OPENING_HOURS
  },
  {
    id: '3',
    name: 'Glow Spa',
    description: 'A premier salon offering high-end beauty treatments and personalized care for all clients.',
    email: 'glow@example.com',
    phone: '9876543210',
    address: '12 Sunset Blvd, City',
    bannerImage: '/assets/hero-salon-3.jpg',
    rating: 4.5,
    isActive: true,
    services: MOCK_SERVICES,
    openingHours: DEFAULT_OPENING_HOURS
  },
]

interface RawSalon {
  id: number
  name: string
  description: string
  email: string
  phone: string
  address: string
  rating: number
  banner_image: string
  is_active: number
}

export interface Service {
  id: string
  name: string
  description?: string
  price: number
  duration?: number
  isActive: boolean
}

export interface OpeningHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
  [key: string]: string | undefined
}

export interface Salon {
  id: string
  name: string
  description: string
  email: string
  phone: string
  address: string
  bannerImage: string
  rating: number
  isActive: boolean
  services: Service[]
  openingHours: OpeningHours
}

interface CreateSalonForm {
  name: string
  description: string
  email: string
  phone: string
  address: string
  rating: number
  bannerImage: string
}
interface EditSalonForm extends CreateSalonForm {
  isActive: boolean
}

type ApiMessage = { message: string }

interface SalonState {
  salons: Salon[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  totalSalons: number

  fetchSalons: (page?: number, limit?: number | string, search?: string) => Promise<void>
  addSalon: (data: CreateSalonForm) => Promise<ApiMessage>
  updateSalon: (id: string, data: EditSalonForm) => Promise<ApiMessage>
  changeSalonStatus: (id: string, status: boolean) => Promise<ApiMessage>
  getSalonById: (id: string) => Salon | undefined
}

/* ---------------------------------------------------- */
export const useSalonStore = create<SalonState>()(
devtools((set, get) => ({
    salons: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
    totalSalons: 0,

    fetchSalons: async (page = 1, limit: number | string = 10, search = '') => {
      set({ isLoading: true });
      try {
        const limitVal = limit === 'all' ? 100_000 : Number(limit || 10);
        const res = await api.get(
          `salons?limit=${limitVal}&page=${page}&search=${encodeURIComponent(search)}`
        );

        const payload = res.data.data || {};
        const raw = payload.records || [];

        if (raw.length === 0 && !search) throw new Error('empty');

        const mapped: Salon[] = raw.map((s: RawSalon) => ({
          id: String(s.id),
          name: s.name,
          description: s.description,
          email: s.email,
          phone: s.phone || '',
          address: s.address,
          bannerImage: s.banner_image,
          rating: s.rating,
          isActive: !!s.is_active,
        }));

        set({
          salons: mapped,
          currentPage: payload.current_page || 1,
          totalPages: payload.last_page || 1,
          totalSalons: payload.total || mapped.length,
          isLoading: false,
        });
      } catch (err) {
        console.warn('API error → using mock salons');
        set({
          salons: search ? [] : MOCK_SALONS,
          currentPage: 1,
          totalPages: 1,
          totalSalons: search ? 0 : MOCK_SALONS.length,
          isLoading: false,
        });
      }
    },

    addSalon: async (data) => {
      set({ isLoading: true })
      try {
        const r = await api.post('salons', data)
        set({ isLoading: false })
        return { message: r.data.message || 'Salon created' }
      } catch (e: any) {
        set({ isLoading: false })
        const msg =
          e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join('\n')
            : e.response?.data?.message || 'Failed to create salon'
        throw new Error(msg)
      }
    },

    updateSalon: async (id, data) => {
      set({ isLoading: true })
      try {
        const payload = { ...data, is_active: data.isActive ? 1 : 0 }
        const r = await api.put(`salons/${id}`, payload)
        set({ isLoading: false })
        return { message: r.data.message || 'Salon updated' }
      } catch (e: any) {
        set({ isLoading: false })
        throw e
      }
    },

    changeSalonStatus: async (id, status) => {
      set({ isLoading: true })
      try {
        const payload = { id: Number(id), status: status ? 1 : 0, type: 'Salon' }
        const r = await api.post('change-status', payload)
        set({ isLoading: false })
        return { message: r.data.message || 'Status changed' }
      } catch (e: any) {
        set({ isLoading: false })
        throw e
      }
    },
    getSalonById: (id: string) => {
      const salons = get().salons;
      return salons.find((s) => s.id === id);
    },
  }))
)