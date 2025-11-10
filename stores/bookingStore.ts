import { create } from 'zustand';
import { Booking } from '@/lib/types';

interface BookingStore {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    fetchBookings: () => Promise<void>;
    createBooking: (booking: Omit<Booking, 'id' | 'status'>) => Promise<{ success: boolean; message: string }>;
    updateBooking: (id: string, updates: Partial<Booking>) => Promise<{ success: boolean; message: string }>;
    cancelBooking: (id: string) => Promise<{ success: boolean; message: string }>;
    getBooking: (id: string) => Booking | undefined;
    getBookingsByDate: (date: string) => Booking[];
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    bookings: [],
    isLoading: false,
    error: null,

    fetchBookings: async () => {
        set({ isLoading: true, error: null });
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            set({ bookings: data, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch bookings',
                isLoading: false 
            });
        }
    },

    createBooking: async (booking) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create booking');
            }
            
            const newBooking = await response.json();
            set(state => ({
                bookings: [...state.bookings, newBooking],
                isLoading: false
            }));
            
            return { success: true, message: 'Booking created successfully' };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create booking';
            set({ error: message, isLoading: false });
            return { success: false, message };
        }
    },

    updateBooking: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update booking');
            }
            
            const updatedBooking = await response.json();
            set(state => ({
                bookings: state.bookings.map(b => 
                    b.id === id ? { ...b, ...updatedBooking } : b
                ),
                isLoading: false
            }));
            
            return { success: true, message: 'Booking updated successfully' };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update booking';
            set({ error: message, isLoading: false });
            return { success: false, message };
        }
    },

    cancelBooking: async (id) => {
        return get().updateBooking(id, { status: 'cancelled' });
    },

    getBooking: (id) => {
        return get().bookings.find(booking => booking.id === id);
    },

    getBookingsByDate: (date) => {
        return get().bookings.filter(booking => booking.bookingDate === date);
    }
}));
