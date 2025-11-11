import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Users, Lightbulb, BarChart3 } from "lucide-react"
import type { Metadata } from "next"
import { CTASection } from "@/components/CTASection"
import ClientLogosSlider from "@/components/ClientLogosSlider"
import Hero from "@/components/Hero"
import HeroNew from "@/components/jsonHero"
import SalonParallaxBanner from "@/components/SalonParallaxBanner"

export const metadata: Metadata = {
  title: "Salon Marketplace",
  description:
    "Salon Marketplace - Find the best salons and services",
  keywords:
    "salon, salon marketplace ",
  openGraph: {
    title: "Salon Marketplace",
    description:
      "Salon Marketplace - Find the best salons and services",
    url: "https://salonmarketplace.com",
    type: "website",
    siteName: "Salon Marketplace",
    locale: "en_US",
    images: [
      {
        url: "https://salonmarketplace.com/og-image.jpg", // ← your OG image (1200×630 recommended)
        width: 1200,
        height: 630,
        alt: "Salon Marketplace - Find the best salons and services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Marketplace",
    description:
      "Salon Marketplace - Find the best salons and services",
    images: ["https://salonmarketplace.com/og-image.jpg"],
    creator: "@SalonMarketplace", // optional if you have a Twitter handle
  },
  metadataBase: new URL("https://salonmarketplace.com"),
};

import { Scissors, Calendar, Megaphone, HeartHandshake } from 'lucide-react'

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

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      {/* <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/2149507650.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transforming Education Together
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Empowering schools with cutting-edge tools and resources to create exceptional learning experiences
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/tinkertek">
              <Button size="lg" variant="default" className="border-black">
                Explore TinkerTek Labs
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                Join / Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      <Hero />
      {/* <HeroNew/> */}
      <ClientLogosSlider />
      {/* Why SFS Section */}
    
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-900">
                Empowering Salons Worldwide
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
               We help salons grow with powerful tools and a supportive community. Manage clients, automate marketing, and focus on what you do best — creating great experiences.
              </p>
              <ul className="space-y-4 mb-8">
                 <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Insightful analytics for refined business growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Effortless appointment and billing management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Personalized client engagement and loyalty solutions</span>
                </li>
               
              </ul>
              <Link href="/salons">
                    <Button
            size="lg"
            variant="default"
            className=" w-full sm:w-auto"
          >
            Explore Salons
            <ArrowRight className="ml-2" size={20} />
          </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/assets/hero-salon-1.jpg"
                alt="Salon"
                width={400}
                height={400}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
        <section className="py-16  bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-pink-900">Why Salon Marketplace?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
           We bring together artistry and innovation to help salons deliver exceptional beauty experiences every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
    icon: BarChart3,
    title: "All-in-One Management",
    description: "Manage appointments, staff, inventory, and payments seamlessly in one platform",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Use AI-powered analytics to understand trends and grow your salon business",
  },
  {
    icon: Users,
    title: "Customer Engagement",
    description: "Enhance client relationships with personalized offers and loyalty programs",
  },
  {
    icon: Zap,
    title: "Future Ready",
    description: "Stay ahead with new features, marketplace integrations, and beauty tech innovation",
  },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all hover:border-primary animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-pink-900 mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      {/* Our Offerings Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-pink-900">Our Offerings</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive solutions designed for modern salons
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-8 text-left"
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-700 mx-auto">
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-pink-900 text-center mb-2">{title}</h3>
              <p className="text-gray-600 text-center">{description}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Salon?"
        subtitle="Join hundreds of salons already using SalonHub Marketplace to elevate their client experience and streamline daily operations."
        primaryLabel="Book Appointment"
        primaryLink="/booking"
        secondaryLabel="Join / Partner With Us"
        secondaryLink="/contact"
      />

      <Footer />
    </div>
  )
}
