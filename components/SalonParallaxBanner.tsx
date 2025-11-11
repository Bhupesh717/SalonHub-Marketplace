"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Scissors,
  Sparkles,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover Your Perfect Look",
    subtitle: "Premium Salon Services",
    description: "Connect with top-rated salons and stylists in your area",
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920",
    icon: <Scissors className="w-8 h-8" />,
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Luxury Treatments Await",
    subtitle: "Expert Beauty Professionals",
    description: "Book appointments with certified stylists and beauticians",
    image:
      "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920",
    icon: <Sparkles className="w-8 h-8" />,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "Pamper Yourself Today",
    subtitle: "Wellness & Beauty",
    description: "Explore exclusive deals and packages from premium salons",
    image:
      "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1920",
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function SalonParallaxBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const parallaxOffset = scrollY * 0.5;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateY(${parallaxOffset}px) scale(${
                  1.1 + scrollY * 0.0001
                })`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
              />
            </div>

            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div
                  className={`max-w-3xl transition-all duration-1000 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isActive ? "200ms" : "0ms",
                  }}
                >
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
                    <div className="text-white">{slide.icon}</div>
                    <span className="text-white/90 font-medium tracking-wide">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold shadow-2xl hover:scale-105 transition-transform"
                    >
                      Browse Salons
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 rounded-full font-semibold backdrop-blur-sm bg-white/5 hover:scale-105 transition-transform"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white disabled:opacity-50 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-white"
                  : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white disabled:opacity-50 transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <div
        className="absolute bottom-8 right-8 z-30 text-white/60 text-sm font-medium tracking-wider"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {String(currentSlide + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      <div
        className="absolute top-1/2 left-8 -translate-y-1/2 z-30 hidden lg:block"
        style={{
          transform: `translateY(calc(-50% + ${scrollY * 0.2}px))`,
        }}
      >
        <div className="flex flex-col gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-1 h-16 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Navigate to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
