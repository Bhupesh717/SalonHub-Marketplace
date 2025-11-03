// app/careers/page.tsx
import React from "react";
import { Metadata } from "next";
import Image from "next/image"; // For better image handling, though using inline style for background
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Lightbulb, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"; // Replace react-router-dom with Next.js router
import backgroundImage from "@/public/15861.jpg"; // Adjust path to public/assets for Next.js static serving
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Careers | School for Schools",
  description: "Explore career opportunities at TinkerTek Labs in AI, robotics, and STEM education. Join our team and shape the future of learning.",
  keywords: "careers, jobs, AI instructor, robotics trainer, software engineer, full stack developer, customer success, STEM education careers, innovation jobs",
  openGraph: {
    title: "Careers | School for Schools",
    description: "Explore career opportunities at TinkerTek Labs in AI, robotics, and STEM education. Join our team and shape the future of learning.",
    url: "https://schoolforschools.com/careers",
    type: "website",
    images: [
      {
        url: "https://schoolforschools.com/15861.jpg", 
        width: 1200,
        height: 630,
        alt: "Careers - Join Us in Transforming Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | School for Schools",
    description: "Explore career opportunities at TinkerTek Labs in AI, robotics, and STEM education. Join our team and shape the future of learning.",
    images: ["https://schoolforschools.com/15861.jpg"],
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

export default function Careers() {

    return (
        <>
        <Header />
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Help us transform education and make a difference in the lives of students and educators
                    </p>
                </div>
            </section>
            {/* Job Categories */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                icon: Users,
                                title: "Teaching & Training",
                                description: "Join our team of educators and trainers.",
                                roles: ["AI Instructors", "Robotics Trainers", "Curriculum Designers"],
                            },
                            {
                                icon: Briefcase,
                                title: "Technical Roles",
                                description: "Help build and maintain our technology platform.",
                                roles: ["Software Engineers", "DevOps Engineers", "QA Engineers"],
                            },
                            {
                                icon: Lightbulb,
                                title: "Support & Operations",
                                description: "Provide excellent support to our school partners.",
                                roles: ["Customer Success", "Implementation Specialists", "Support Engineers"],
                            },
                        ].map((category, index) => {
                            const Icon = category.icon
                            return (
                                <Card
                                    key={index}
                                    className="p-8 hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Icon className="w-12 h-12 text-black mb-4" />
                                    <h3 className="text-2xl font-bold text-black mb-3">{category.title}</h3>
                                    <p className="text-gray-600 mb-6">{category.description}</p>
                                    <ul className="space-y-2">
                                        {category.roles.map((role) => (
                                            <li key={role} className="flex items-center gap-2 text-black">
                                                <div className="w-2 h-2 bg-black rounded-full" />
                                                {role}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Open Positions */}
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-8">Open Positions</h2>
                        <div className="space-y-4">
                            {[
                                { title: "Senior AI Instructor", location: "Delhi", type: "Full-time" },
                                { title: "Robotics Lab Manager", location: "Mumbai", type: "Full-time" },
                                { title: "Full Stack Developer", location: "Bangalore", type: "Full-time" },
                                { title: "Customer Success Manager", location: "Remote", type: "Full-time" },
                            ].map((job, index) => (
                                <Card
                                    key={index}
                                    className="p-6 hover:shadow-lg transition-shadow animate-fade-in-up flex justify-between items-center border border-gray-200"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-black">{job.title}</h3>
                                        <p className="text-gray-600">
                                            {job.location} • {job.type}
                                        </p>
                                    </div>
                                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                                        Apply
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't see a position that fits?</h2>
                    <p className="text-lg opacity-90 mb-8">
                        Send us your resume and let us know how you'd like to contribute to transforming education.
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                        Send Your Resume
                    </Button>
                </div>
            </section>
               {/* <CTASection
                                title="Ready to Empower Your Students?"
                                subtitle="Join hundreds of schools using TinkerTek Labs to prepare students for the future."
                                primaryLabel="Request a Demo"
                                primaryLink="/contact"
                                secondaryLabel="Join / Partner With Us"
                                secondaryLink="/contact"
                              /> */}
                              <Footer />
        </>
    )
}