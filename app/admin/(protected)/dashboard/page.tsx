'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scissors, Calendar, DollarSign, Clock, Star } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useServiceStore } from '@/stores/serviceStore'
import { useBookingStore } from '@/stores/bookingStore'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
    const router = useRouter()
    const { user } = useAuthStore()
    const { services, fetchServices } = useServiceStore()
    const { 
        bookings, 
        fetchBookings, 
        isLoading: isLoadingBookings 
    } = useBookingStore()

    useEffect(() => {
        fetchServices()
        fetchBookings()
    }, [fetchServices, fetchBookings])
    
    // Calculate dashboard metrics
    const today = new Date().toISOString().split('T')[0]
    const todayBookings = bookings.filter(booking => booking.bookingDate === today)
    const upcomingBookings = bookings
        .filter(booking => booking.bookingDate >= today)
        .sort((a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime())
        .slice(0, 5)
    
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)
    const averageRating = 4.7 // This would come from your review system

    const stats = [
        {
            title: 'Total Services',
            value: services.length.toString(),
            icon: Scissors,
            description: 'Available services',
            show: true,
        },
        {
            title: "Today's Appointments",
            value: todayBookings.length.toString(),
            icon: Calendar,
            description: 'Bookings for today',
            show: true,
        },
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            description: 'All time earnings',
            show: true,
        },
        {
            title: 'Average Rating',
            value: averageRating.toFixed(1),
            icon: Star,
            description: 'Customer satisfaction',
            show: true,
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user?.name || user?.email}! {user?.role?.name === 'Admin' ? '(Administrator)' : '(Staff)'}
                        </p>
                    </div>
                    <Button onClick={() => router.push('/admin/bookings/new')}>
                        <Calendar className="mr-2 h-4 w-4" /> New Booking
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.filter(stat => stat.show).map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Upcoming Appointments</CardTitle>
                                <CardDescription>Next scheduled services</CardDescription>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => router.push('/admin/bookings')}
                                className="text-primary"
                            >
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {upcomingBookings.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                <Calendar className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{booking.serviceName}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">
                                            ${booking.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Popular Services</CardTitle>
                                <CardDescription>Most booked services</CardDescription>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => router.push('/admin/services')}
                                className="text-primary"
                            >
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {services.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No services available</p>
                        ) : (
                            <div className="space-y-4">
                                {services.slice(0, 5).map((service) => (
                                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                <Scissors className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{service.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {service.duration_minutes} min • ${service.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{service.duration_minutes} min</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}