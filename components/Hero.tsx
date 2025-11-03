"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "lg" | "base";
  variant?: "outline" | "default";
  asChild?: boolean;
}

const Button = ({
  children,
  className = "",
  size = "base",
  variant = "default",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-2 text-base";
  const variantClasses =
    variant === "outline"
      ? "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900"
      : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = "" }: BadgeProps) => (
  <span
    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${className}`}
  >
    {children}
  </span>
);

interface Slide {
  id: number;
  badge: string;
  title: [string, string, string];
  description: string;
  image: string;
  primaryCTA: string;
  secondaryCTA: string;
  stats: string[];
}

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      badge: "Smart Management",
      title: ["Modern", "School", "Solutions"],
      description:
        "Transform your educational institution with our comprehensive school management system designed for the digital age.",
      image: "/2149507650.jpg",
      primaryCTA: "Start Free Trial",
      secondaryCTA: "Book Demo",
      stats: ["99.9% Uptime", "24/7 Support", "Easy Setup"],
    },
    {
      id: 2,
      badge: "Academic Excellence",
      title: ["Complete", "Learning", "Platform"],
      description:
        "Empower teachers and students with powerful tools for seamless classroom management, assignments, and assessments.",
      image: "/students-learning-robotics-ai-lab.jpg",
      primaryCTA: "Start Free Trial",
      secondaryCTA: "Book Demo",
      stats: ["All-in-One", "Cloud-Based", "Mobile Ready"],
    },
    {
      id: 3,
      badge: "Smart Analytics",
      title: ["Data-Driven", "Education", "Insights"],
      description:
        "Make informed decisions with comprehensive analytics and reporting tools that track student progress and institutional performance.",
      image: "/school-management-dashboard.png",
      primaryCTA: "Start Free Trial",
      secondaryCTA: "Book Demo",
      stats: ["Real-time Data", "Custom Reports", "Easy Export"],
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(75, 75, 75, 0.1) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(50, 50, 50, 0.1) 2px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-gray-100/60 to-gray-200/60 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-200/40 to-gray-300/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-gray-300/50 to-gray-200/50 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-gray-100/20 to-gray-200/20 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16 items-center">
          {/* Left Side - Content with Fade Transitions */}
          <div className="space-y-8 relative order-2 lg:order-1">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                  } transition-all duration-700 ease-out space-y-6 ${index !== currentSlide
                    ? "absolute inset-0 pointer-events-none"
                    : ""
                  }`}
              >
                <div className="relative inline-block">
                  <Badge className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 shadow-sm">
                    <Sparkles
                      className="w-4 h-4 mr-2 text-gray-500 animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                    {slide.badge}
                  </Badge>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-full blur opacity-60 animate-pulse"></div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {slide.title[0]}
                  </span>
                  <span className="block bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                    {slide.title[1]}
                  </span>
                  <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {slide.title[2]}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-xl font-light leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => router.push("/contact")}
                    size="lg"
                    className="group rounded-2xl transform hover:scale-105 hover:shadow-xl focus:ring-blue-500"
                  >
                    {slide.primaryCTA}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => router.push("/contact")}
                    variant="outline"
                    size="lg"
                    className="group rounded-2xl focus:ring-slate-500"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    {slide.secondaryCTA}
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  {slide.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image with Enhanced Styling */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full  aspect-[4/3] rounded-3xl overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                    }`}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title.join(" ")} - Hero Image`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>

            <div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            {/* <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div> */}
          </div>
        </div>
        {/* Dots Centered at Bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`banner-dots h-2 rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${index === currentSlide
                ? "bg-gradient-to-r from-gray-600 to-gray-800 w-10 shadow-lg"
                : "bg-slate-300 hover:bg-slate-400 w-3"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="hidden  absolute top-1/2 w-full z-20 lg:flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={goToPrevSlide}
          className="w-12 h-12 bg-white/80 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNextSlide}
          className="w-12 h-12 bg-white/80 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
