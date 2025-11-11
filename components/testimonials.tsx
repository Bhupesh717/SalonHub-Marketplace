"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  salon: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Ms. Riya Kapoor",
    role: "Owner",
    salon: "Glow & Grace Salon",
    content:
      "SalonPro Suite has completely streamlined our appointments and billing. Managing clients is now effortless, and productivity has improved greatly.",
    rating: 5,
  },
  {
    name: "Mr. Karan Mehta",
    role: "Creative Director",
    salon: "Style Studio Mumbai",
    content:
      "The marketing tools helped us attract new clients and retain loyal ones. The digital loyalty program is a big hit with our customers!",
    rating: 5,
  },
  {
    name: "Ms. Neha Bansal",
    role: "Manager",
    salon: "Luxe Look Salon & Spa",
    content:
      "Their support team is outstanding. They guided us through setup and training, making the entire transition smooth and stress-free.",
    rating: 5,
  },
  {
    name: "Mr. Rohit Sharma",
    role: "Franchise Owner",
    salon: "Urban Chic Beauty Lounge",
    content:
      "An exceptional platform! The staff scheduling and client reminder features have reduced no-shows and improved our daily operations.",
    rating: 5,
  },
  {
    name: "Ms. Meera Joshi",
    role: "Senior Stylist",
    salon: "Bliss Hair & Beauty",
    content:
      "The client history tracking feature is a game changer. It helps us personalize services and provide a premium experience every time.",
    rating: 5,
  },
  {
    name: "Dr. Nidhi Verma",
    role: "Founder",
    salon: "SkinLab Aesthetics",
    content:
      "Implementing this system was one of our best decisions. Our operational efficiency has increased by 45% within a few months.",
    rating: 5,
  },
  {
    name: "Mr. Arjun Reddy",
    role: "Finance Manager",
    salon: "Elegance Salon Hyderabad",
    content:
      "The billing and inventory modules are robust and easy to use. Tracking expenses and stock has never been this convenient.",
    rating: 5,
  },
  {
    name: "Ms. Kavya Nair",
    role: "Training Head",
    salon: "Serene Spa & Salon Kochi",
    content:
      "The employee performance dashboard gives us clear insights into service quality and sales. It’s an excellent tool for team growth.",
    rating: 5,
  },
];


export function Testimonials() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!api) return

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        api.scrollNext()
      }, 5000)
    }

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }

    const resumeAutoPlay = () => {
      stopAutoPlay()
      setTimeout(startAutoPlay, 3000)
    }

    startAutoPlay()

    api.on("pointerDown", stopAutoPlay)
    api.on("pointerUp", resumeAutoPlay)

    return () => {
      stopAutoPlay()
      api.off("pointerDown", stopAutoPlay)
      api.off("pointerUp", resumeAutoPlay)
    }
  }, [api])

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-4">What Educators Say About Us</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover how educators and administrators are transforming learning with our solutions.
          </p>
        </div>

        <div className="relative group">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent className="px-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 sm:p-8 flex flex-col border-2 border-gray-200 bg-white hover:border-pink-900 transition-all h-full">
                    <div className="flex-grow">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-pink-900 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 italic mb-6">"{testimonial.content}"</p>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <p className="font-semibold text-pink-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.salon}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {api && (
              <>
                <button
                  onClick={() => {
                    try {
                      api.scrollPrev()
                    } catch (e) {
                      console.error('Error navigating to previous slide:', e)
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-primary hover:bg-pink-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => {
                    try {
                      api.scrollNext()
                    } catch (e) {
                      console.error('Error navigating to next slide:', e)
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-primary hover:bg-pink-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
