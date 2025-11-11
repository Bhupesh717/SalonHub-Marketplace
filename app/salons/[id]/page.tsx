'use client';

import { useEffect } from 'react';
import { useParams,  useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Star, ArrowLeft } from 'lucide-react';
import { useSalonStore } from '@/stores/salonStore';
import Link from 'next/link';




const SalonDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { getSalonById } = useSalonStore();
  const id = params.id as string;
  const salon = id ? getSalonById(id) : null;
  useEffect(() => {
    if (!salon) {
      router.push('/salons');
    }
  }, [salon, router]);
  if (!salon) {
    return null;
  }

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const today = days[new Date().getDay()];
const todayHours = salon.openingHours[today] || 'Closed';
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link href="/salons">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Salons
          </Button>
        </Link>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-medium">
              <img
                src={salon.bannerImage}
                alt={salon.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{salon.name}</h1>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="text-lg font-semibold">{salon.rating}</span>
                    <span className="text-muted-foreground">(120+ reviews)</span>
                  </div>
                </div>
              </div>
             
              <p className="text-muted-foreground text-lg">{salon.description}</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {salon.services.map((service: any) => (
                    <div
                      key={service.id}
                      className="border rounded-lg p-4 hover:shadow-soft transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <Badge variant="secondary">${service.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {service.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Duration: {service.duration} mins
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">{salon.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm">{salon.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm">{salon.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">
  {today}: {todayHours}
</span>
                </div>
              </CardContent>
            </Card>
            <Link href={`/booking?salon=${salon.id}`}>
              <Button variant="default" size="lg" className="w-full">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;