"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/useAuthStore"
import type { Booking, Salon, User } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Calendar, Clock, DollarSign, MapPin } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AdminBookingsPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [salons, setSalons] = useState<Salon[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!user || user.role.name !== "Admin") {
      router.push("/admin/login")
      return
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const allSalons = JSON.parse(localStorage.getItem("salons") || "[]")
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    
    setBookings(allBookings)
    setSalons(allSalons)
    setUsers(allUsers)
  }, [user, router])

  const getSalonName = (salonId: string) => {
    const salon = salons.find((s) => s.id === salonId)
    return salon?.name || "Unknown Salon"
  }

  const getUserName = (userId: string) => {
    const u = users.find((user) => user.id === userId)
    return u?.name || "Unknown User"
  }

  const getUserEmail = (userId: string) => {
    const u = users.find((user) => user.id === userId)
    return u?.email || ""
  }

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" as const } : b
      )
      localStorage.setItem("bookings", JSON.stringify(updatedBookings))
      setBookings(updatedBookings)
      toast({
        title: "Success",
        description: "Booking cancelled",
        variant: "default",
      })
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      getSalonName(booking.salonId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserName(booking.userId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalRevenue = bookings
    .filter((b) => b.status === "completed" || b.status === "confirmed")
    .reduce((sum, b) => sum + b.price, 0)

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
     
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="default"
            onClick={() => router.push("/admin/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">View Bookings</h1>
            <div className="text-sm text-muted-foreground">
              Total Bookings: {bookings.length}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "completed").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by salon, customer, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          <div className="grid gap-4">
            {filteredBookings.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No bookings found</p>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">{booking.serviceName}</h3>
                        <Badge className={getStatusBadgeColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{getSalonName(booking.salonId)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Customer:</span>
                          <span>{getUserName(booking.userId)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Email:</span>
                          <span>{getUserEmail(booking.userId)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-green-600">${booking.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {booking.status !== "cancelled" && booking.status !== "completed" && (
                        <Button
                          variant="outline"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
