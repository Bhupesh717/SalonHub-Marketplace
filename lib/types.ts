export interface User {
  id: string
  name: string
  email: string
  role: {
    name: 'Admin' | 'User' | 'SalonOwner'
  }
}

export interface Salon {
  id: string
  name: string
  address?: string
  // Add other salon properties as needed
}

export interface Booking {
  id: string
  userId: string
  salonId: string
  salonName: string
  serviceId: string
  serviceName: string
  price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  bookingDate: string
  bookingTime: string
  duration: number
  customerName: string
  customerEmail: string
  
  // customerPhone: any
  // Add other booking properties as needed
}