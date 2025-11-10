import React from 'react';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface SalonCardProps {
  imageSrc: string;
  rating: number;
  name: string;
  description: string;
  address: string;
  phone: string;
}

const SalonCard: React.FC<SalonCardProps> = ({
  imageSrc,
  rating,
  name,
  description,
  address,
  phone,
}) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-3.5 h-3.5 fill-yellow-400/50 text-yellow-400" />}
        <span className="ml-1.5 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
          {renderStars()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Info Section */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-pink-600" />
              </div>
              <p className="text-sm text-gray-700 leading-snug">{address}</p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{phone}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button className="flex-1 px-4 py-2 border-2 text-white border-gray-200 rounded-xl font-medium hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 group/btn">
            Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button className="flex-1 px-4 py-2   rounded-xl font-medium border-pink-500 text-pink-500 bg-pink-50 hover:border-pink-800 hover:text-white hover:bg-primary hover:shadow-lg hover:shadow-pink-500/50 hover:-translate-y-0.5 transition-all duration-300">
            Book Now
          </Button>        </div>
      </div>
    </div>
  );
};

export default SalonCard;