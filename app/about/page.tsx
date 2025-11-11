import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link"
import {Target, Lightbulb, Eye, Heart } from "lucide-react"
import type { Metadata } from "next"
import ClientLogosSlider from "@/components/ClientLogosSlider";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "About Us - School for Schools",
  description:
    "Learn about School for Schools mission to transform education through innovative ERP solutions and AI-powered learning labs.",
  keywords: "about school for schools, education technology company, school management solutions",
  openGraph: {
    title: "About Us - School for Schools",
    description: "Learn about our mission to transform education through technology",
    url: "https://schoolforschools.com/about",
    type: "website",
  },
}

export default function About() {
  const leaders = [
    {
      name: "Dr. Amit Singh",
      role: "Founder & CEO",
      bio: "20+ years in education technology",
      initials: "AS",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",

    },
    {
      name: "Ms. Neha Gupta",
      role: "CTO",
      bio: "AI & ML expert with 15+ years experience",
      initials: "NG",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",

    },
    {
      name: "Mr. Vikram Patel",
      role: "COO",
      bio: "School operations specialist",
      initials: "VP",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",

    },
  ];

  const partnerSchools = [
    "Delhi Public School",
    "St. Xavier's Academy",
    "Riverside International",
    "Modern School",
    "Cathedral School",
    "Doon School",
    "Mayo College",
    "Welham Girls",
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
<section className="relative  h-[100vh]  md:h-[450px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/assets/3824607_1143.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
            About SalonHub Marketplace
          </h1>
          <p className="text-lg md:text-xl text-justify md:text-center text-gray-200 max-w-3xl mx-auto mb-10">
            Our platform empowers salons and spas with innovative technology that simplifies operations, enhances client experiences, and drives business growth.
          </p>
          {/* Stats */}
    {/* Stats with Glass Effect */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-center">
      {[
        { value: "500+", label: "Salons Empowered" },
        { value: "50K+", label: "Clients Served" },

        { value: "98%", label: "Satisfaction Rate" },
      ].map((item, i) => (
        <div
          key={i}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
        >
          <h2 className="text-3xl  font-bold text-white drop-shadow-md">
            {item.value}
          </h2>
          <p className="text-gray-300 font-medium">{item.label}</p>
        </div>
      ))}
    </div>
        </div>
      </section>
  <ClientLogosSlider />
      <section className="pb-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-900">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
             Our journey began with a simple idea — to help salon owners focus on creativity and client satisfaction instead of daily management hassles.
We understand the challenges of running a modern salon — from bookings to client retention — and we’re here to make it effortless with all-in-one, intelligent solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-pink-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To equip salons with accessible, powerful, and easy-to-use tools that streamline operations, elevate customer experiences, and empower every stylist, manager, and owner to grow their business with confidence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-pink-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading global platform for salon transformation — a community where professionals can connect, learn, and access technology that helps them thrive in the ever-evolving beauty industry.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-pink-900">Client-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every feature we design focuses on delivering value to salon owners and enhancing client satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-pink-900"  >Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                   We constantly explore new ideas and technologies to keep salons ahead of the curve.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-pink-900">Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in growing together — uniting salon professionals, and partners for mutual success.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Schools Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Students Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg shadow-2xl overflow-hidden ">
              <Image
                src="/assets/hero-salon-1.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-900">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-6">
                When you partner with us, you’re joining a passionate network of beauty professionals who believe in growth through innovation.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Together, we’re shaping the future of the salon industry — one client, one appointment, one success story at a time.
              </p>
              <p className="text-lg text-muted-foreground">
                Let’s transform the beauty business together.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Leadership Section */}
      <section className="py-16 md:py-24 bg-gray-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-pink-900">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced educators and technologists leading the transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-[8px_8px_0_0_#831843] transition-all hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold ">
                  <Image src={leader.image} alt={leader.name} width={80} height={80} className="w-full rounded-full" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-pink-900">{leader.name}</h3>
                <p className="font-semibold mb-2 text-pink-950">{leader.role}</p>
                <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                {/* <div className="flex gap-3 justify-center">
                  <a
                    href={leader.linkedin}
                    className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all font-bold text-xs"
                    title="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href={leader.twitter}
                    className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all font-bold text-xs"
                    title="Twitter"
                  >
                    𝕏
                  </a>
                </div> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-pink-900  ">
              Partner Schools
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by leading educational institutions across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnerSchools.map((school, index) => (
              <Card
                key={index}
                className="p-6 flex items-center justify-center text-center hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 animate-fade-in-up min-h-[100px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="font-semibold text-sm">{school}</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
    
      {/* Testimonials */}
      <Testimonials />

      <Footer />
    </div>
  )
}
