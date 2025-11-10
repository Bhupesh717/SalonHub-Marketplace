'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useSalonStore } from '@/stores/salonStore';
import { useBookingStore } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Booking = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const salonId = searchParams.get('salon');
  const { getSalonById } = useSalonStore();
  const { createBooking } = useBookingStore();
  const { user, isAuthenticated } = useAuthStore();
 
  const salon = salonId ? getSalonById(salonId) : null;
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });
  useEffect(() => {
    if (!salon) {
      router.push('/salons');
    }
  }, [salon, router]);
  useEffect(() => {
    if (user) {
      setCustomerInfo({
        name: user.name,
        email: user.email,
        phone: '',
      });
    }
  }, [user]);
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    const service = salon?.services.find((s) => s.id === selectedService);
    if (!service || !salon) return;
    try {
      await createBooking({
        salonId: salon.id,
        salonName: salon.name,
        serviceId: service.id,
        serviceName: service.name,
        bookingDate: selectedDate.toISOString().split('T')[0],
        bookingTime: selectedTime,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        price: service.price,
      });
      toast({
        title: 'Booking confirmed!',
        description: `Your appointment at ${salon.name} has been booked.`,
      });
      router.push(isAuthenticated ? '/bookings' : '/');
    } catch (error) {
      toast({
        title: 'Booking failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };
  if (!salon) {
    return null;
  }
  const selectedServiceDetails = salon.services.find((s) => s.id === selectedService);
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href={`/salon/${salon.id}`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Salon
          </Button>
        </Link>
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Book Appointment</h1>
          <p className="text-lg text-muted-foreground">{salon.name}</p>
        </div>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Select Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {salon.services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration} mins)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedServiceDetails && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedServiceDetails.description}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border mt-2"
                  />
                </div>
                <div>
                  <Label>Select Time</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              {selectedServiceDetails && selectedDate && selectedTime && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Service:</span> {selectedServiceDetails.name}</p>
                      <p><span className="text-muted-foreground">Date:</span> {selectedDate.toLocaleDateString()}</p>
                      <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
                      <p><span className="text-muted-foreground">Duration:</span> {selectedServiceDetails.duration} minutes</p>
                      <p className="text-lg font-bold pt-2">Total: ${selectedServiceDetails.price}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Button type="submit" variant="default" size="lg" className="w-full">
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;