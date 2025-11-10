'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SalonCard from '@/components/SalonCard';
import { useSalonStore } from '@/stores/salonStore';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const Salons = () => {
  const { salons, fetchSalons } = useSalonStore();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);
  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <Header/>
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse <span className="">Premium Salons</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the perfect salon for your beauty needs
          </p>
         
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search salons by name, service, or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon, index) => (
            <div
              key={salon.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SalonCard imageSrc={salon.bannerImage} rating={salon.rating} name={salon.name} description={salon.description} address={salon.address} phone={salon.phone} />
            </div>
          ))}
        </div>
        {filteredSalons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No salons found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Salons;