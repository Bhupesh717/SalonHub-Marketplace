// app/services/page.tsx
import React from "react";
import { Metadata } from "next"; // Import Metadata for SEO
import Image from "next/image"; // For better image handling, though using inline style for background
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Users, BookOpen, Lightbulb, ArrowRight } from "lucide-react"
import backgroundImage from "@/public/robotics-lab-students-learning.jpg"; // Adjust path to public/assets for Next.js static serving
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
        url: "https://schoolforschools.com/robotics-lab-students-learning.jpg", // Use absolute URL for OG image; replace with optimized image if available
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
    images: ["https://schoolforschools.com/robotics-lab-students-learning.jpg"],
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
                    <div className="absolute inset-0 bg-black/60" />
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
            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Wrench,
                                title: "ERP Customization",
                                description: "Tailor our ERP system to match your school's unique workflows and requirements.",
                                features: ["Custom modules", "Integration setup", "Data migration", "System optimization"],
                            },
                            {
                                icon: Lightbulb,
                                title: "AI Lab Setup",
                                description: "Complete setup of AI and robotics labs with curriculum integration.",
                                features: ["Infrastructure setup", "Equipment procurement", "Curriculum design", "Lab management"],
                            },
                            {
                                icon: Users,
                                title: "Training & Support",
                                description: "Comprehensive training programs for educators, staff, and administrators.",
                                features: ["Staff training", "Educator workshops", "Student programs", "Ongoing support"],
                            },
                            {
                                icon: BookOpen,
                                title: "Implementation Consulting",
                                description: "Expert guidance throughout your digital transformation journey.",
                                features: ["Change management", "Process optimization", "Best practices", "Strategic planning"],
                            },
                        ].map((service, index) => {
                            const Icon = service.icon
                            return (
                                <Card
                                    key={index}
                                    className="overflow-hidden p-8 hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Icon className="w-12 h-12 text-gray-900 mb-4" />
                                    <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground mb-6">{service.description}</p>
                                    <ul className="space-y-2">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-foreground">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )
                        })}
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