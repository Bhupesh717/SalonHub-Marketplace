"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  school: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Principal",
    school: "Delhi Public School",
    content:
      "School for Schools has transformed how we manage our operations. The ERP system is intuitive and has reduced administrative burden significantly.",
    rating: 5,
  },
  {
    name: "Ms. Priya Sharma",
    role: "Head of Innovation",
    school: "Mumbai International School",
    content:
      "TinkerTek Labs has inspired our students to think creatively. The AI and robotics programs are engaging and educational.",
    rating: 5,
  },
  {
    name: "Mr. Arun Patel",
    role: "IT Director",
    school: "Bangalore Academy",
    content:
      "The support team is exceptional. They helped us implement the system smoothly without any disruption to our daily operations.",
    rating: 5,
  },
  {
    name: "Ms. Anjali Verma",
    role: "Vice Principal",
    school: "Chennai Global School",
    content:
      "Outstanding platform! The student management features have streamlined our enrollment process and improved communication with parents.",
    rating: 5,
  },
  {
    name: "Mr. Vikram Singh",
    role: "Academic Coordinator",
    school: "Pune Excellence Academy",
    content:
      "The analytics dashboard provides valuable insights into student performance. It helps us identify areas for improvement quickly.",
    rating: 5,
  },
  {
    name: "Dr. Neha Gupta",
    role: "Director",
    school: "Kolkata International",
    content:
      "Implementing this system was the best decision we made. Our administrative efficiency has increased by 40% in just three months.",
    rating: 5,
  },
  {
    name: "Mr. Suresh Reddy",
    role: "Finance Manager",
    school: "Hyderabad Central School",
    content:
      "The financial management module is comprehensive and user-friendly. It has simplified our accounting processes tremendously.",
    rating: 5,
  },
  {
    name: "Ms. Deepika Nair",
    role: "Head of Academics",
    school: "Kochi Modern School",
    content:
      "The curriculum planning tools are innovative and flexible. Teachers love how easy it is to organize and track learning outcomes.",
    rating: 5,
  },
]

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Educators Say About Us</h2>
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
                  <Card className="p-6 sm:p-8 flex flex-col border-2 border-gray-200 bg-white hover:border-black transition-all h-full">
                    <div className="flex-grow">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-black fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 italic mb-6">"{testimonial.content}"</p>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <p className="font-semibold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.school}</p>
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-black hover:bg-gray-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-black hover:bg-gray-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
