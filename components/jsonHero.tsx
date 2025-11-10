
'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const HeroNew = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              WELCOME TO SALONBIZ
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              The ultimate marketplace for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                salons
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                beauty services
              </span>{" "}
              success!
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Find top-rated beauty salons for your perfect look or list your salon
              and connect with thousands of clients worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Browse Salons
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            {/* Large Image - Top Left */}
            <div
              className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredImage(1)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src='/assets/salon-hero-1.jpg'
                alt="Professional Salon Interior"
                className="w-full h-[300px] object-cover"
              />
              
              {/* Overlay Card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1,240+</p>
                  <p className="text-sm text-muted-foreground">Verified Salons</p>
                </div>
              </div>
            </div>

            {/* Bottom Left Image */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.05]"
              onMouseEnter={() => setHoveredImage(2)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src='/assets/salon-dashboard.jpg'
                alt="Salon Analytics Dashboard"
                className="w-full h-[250px] object-cover"
              />
            </div>

            {/* Bottom Right Image */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.05]"
              onMouseEnter={() => setHoveredImage(3)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src='/assets/salon-hero-2.jpg'
                alt="Happy Salon Clients"
                className="w-full h-[250px] object-cover"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Your Perfect Salon</h3>
            <p className="text-muted-foreground">
              Browse through thousands of verified salons and beauty professionals
              in your area.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Booking System</h3>
            <p className="text-muted-foreground">
              Book appointments instantly with real-time availability and instant
              confirmation.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Grow Your Business</h3>
            <p className="text-muted-foreground">
              List your salon and reach thousands of potential clients actively
              searching for services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroNew;
