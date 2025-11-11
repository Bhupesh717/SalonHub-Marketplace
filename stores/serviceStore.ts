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

const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Haircut & Styling',
    description: 'Professional haircut with wash and blow-dry.',
    price: '45.00',
    duration_minutes: 60,
    salon: { id: '1', name: 'Glow Spa' },
    isActive: true,
  },
  {
    id: '2',
    name: 'Facial Treatment',
    description: 'Deep cleansing and hydration facial.',
    price: '85.00',
    duration_minutes: 90,
    salon: { id: '1', name: 'Glow Spa' },
    isActive: true,
  },
]

interface RawService {
  id: number
  name: string
  description: string
  price: string
  duration_minutes: number
  salon_id: number
  is_active: number
  salon: { id: number; name: string }
}

export interface Service {
  id: string
  name: string
  description: string
  price: string
  duration_minutes: number
  salon: { id: string; name: string }
  isActive: boolean
}

interface ServiceForm {
  salon_id: string
  name: string
  description: string
  price: string
  duration_minutes: string  // string in form
}

type ApiMessage = { message: string }

interface ServiceState {
  services: Service[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  totalServices: number

  fetchServices: (
    page?: number,
    limit?: number | string,
    search?: string,
    salon_id?: string
  ) => Promise<void>
  addService: (data: ServiceForm) => Promise<ApiMessage>
  updateService: (id: string, data: ServiceForm) => Promise<ApiMessage>
  changeServiceStatus: (id: string, status: boolean) => Promise<ApiMessage>
}

export const useServiceStore = create<ServiceState>()(
  devtools((set) => ({
    services: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
    totalServices: 0,

    fetchServices: async (page = 1, limit: number | string = 10, search = '', salon_id = '') => {
      set({ isLoading: true })
      try {
        const limitVal = limit === 'all' ? 100_000 : Number(limit || 10)
        let url = `services?limit=${limitVal}&page=${page}&search=${encodeURIComponent(search)}`
        if (salon_id) url += `&salon_id=${salon_id}`

        const res = await api.get(url)
        const payload = res.data.data || {}
        const raw = payload.records || []

        const mapped: Service[] = raw.map((s: RawService) => ({
          id: String(s.id),
          name: s.name,
          description: s.description,
          price: s.price,
          duration_minutes: s.duration_minutes, // number
          salon: { id: String(s.salon.id), name: s.salon.name },
          isActive: !!s.is_active,
        }))

        set({
          services: mapped,
          currentPage: payload.current_page || 1,
          totalPages: payload.last_page || 1,
          totalServices: payload.total || mapped.length,
          isLoading: false,
        })
      } catch (err) {
        console.warn('API failed → using mock')
        const filtered = salon_id ? MOCK_SERVICES.filter(s => s.salon.id === salon_id) : MOCK_SERVICES
        const searched = search
          ? filtered.filter(s =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.description.toLowerCase().includes(search.toLowerCase())
            )
          : filtered

        set({
          services: searched,
          currentPage: 1,
          totalPages: 1,
          totalServices: searched.length,
          isLoading: false,
        })
      }
    },

    addService: async (data) => {
      set({ isLoading: true })
      try {
        const payload = {
          ...data,
          duration_minutes: Number(data.duration_minutes), // convert
        }
        const r = await api.post('services', payload)
        set({ isLoading: false })
        return { message: r.data.message || 'Service added' }
      } catch (e: any) {
        set({ isLoading: false })
        const msg =
          e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join('\n')
            : e.response?.data?.message || 'Failed'
        throw new Error(msg)
      }
    },

    updateService: async (id, data) => {
      set({ isLoading: true })
      try {
        const payload = {
          ...data,
          duration_minutes: Number(data.duration_minutes),
        }
        const r = await api.put(`services/${id}`, payload)
        set({ isLoading: false })
        return { message: r.data.message || 'Updated' }
      } catch (e: any) {
        set({ isLoading: false })
        throw e
      }
    },

    changeServiceStatus: async (id, status) => {
      set({ isLoading: true })
      try {
        const r = await api.post('change-status', {
          id: Number(id),
          status: status ? 1 : 0,
          type: 'Service',
        })
        set({ isLoading: false })
        return { message: r.data.message || 'Status updated' }
      } catch (e: any) {
        set({ isLoading: false })
        throw e
      }
    },
  }))
)