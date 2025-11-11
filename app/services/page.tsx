// app/services/page.tsx
import React from "react";
import { Metadata } from "next"; // Import Metadata for SEO
import Image from "next/image"; // For better image handling, though using inline style for background

import { Scissors, Calendar, Users, Megaphone, BarChart3, HeartHandshake } from 'lucide-react'
import backgroundImage from "@/public/assets/salon-hero-1.jpg"; // Adjust path to public/assets for Next.js static serving
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Our Services | School for Schools",
  description: "End-to-end ERP, AI lab, and training services to drive innovation and seamless STEM implementation.",
  keywords: "ERP customization, AI lab setup, training support, implementation consulting, STEM education services, robotics labs, AI learning",
  openGraph: {
    title: "Our Services | School for Schools",
    description: "Tailored services for schools: ERP customization, AI & robotics lab setup, educator training, and digital transformation consulting.",
    url: "https://schoolforschools.com/services",
    type: "website",
    images: [
      {
        url: "https://schoolforschools.com/assets/salon-hero-1.jpg", // Use absolute URL for OG image; replace with optimized image if available
        width: 1200,
        height: 630,
        alt: "School for Schools Services - Empowering Schools with AI and Robotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | School for Schools",
    description: "Professional services for AI, robotics, and innovation in education.",
    images: ["https://schoolforschools.com/assets/salon-hero-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface ServicesProps { }
const services = [
  {
    icon: Scissors,
    title: 'Client Management',
    description: 'Keep track of appointments, preferences, and history effortlessly for a seamless client experience.',
  },
  {
    icon: Calendar,
    title: 'Staff Scheduling',
    description: 'Simplify shift planning and boost productivity with smart scheduling tools.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Automation',
    description: 'Engage clients with personalized campaigns and automated reminders that reduce no-shows.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Gain valuable insights into your salon performance and make informed business decisions.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Manage your staff, roles, and communication all in one intuitive dashboard.',
  },
  {
    icon: HeartHandshake,
    title: 'Salon Community',
    description: 'Connect with other professionals, share success stories, and grow together.',
  },
]
const Services: React.FC<ServicesProps> = () => {
    return (
        <>
        <Header />
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`, // Use .src for Next.js Image import
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Comprehensive support and professional services to ensure successful implementation and adoption.
                    </p>
                </div>
            </section>
            <section className="py-20 bg-gradient-to-b from-white to-pink-50" id="services">
      <div className="container mx-auto px-6 text-center">
        

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-8 text-left"
            >
              <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 text-rose-700 mx-auto">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-pink-900 text-center mb-2">{title}</h3>
              <p className="text-gray-600 text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
            
                <CTASection
                    title="Ready to Empower Your Students?"
                    subtitle="Join hundreds of schools using TinkerTek Labs to prepare students for the future."
                    primaryLabel="Request a Demo"
                    primaryLink="/contact"
                    secondaryLabel="Join / Partner With Us"
                    secondaryLink="/contact"
                  />
                  <Footer />
        </>
    )
}

export default Services;