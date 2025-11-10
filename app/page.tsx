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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Salon Marketplace?</h2>
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empowering Salons Worldwide
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform connects salons with the resources and community they need to thrive. From curriculum development to administrative tools, we've got you covered.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Streamlined administrative processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Enhanced student engagement tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Data-driven insights and analytics</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Our Offerings Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Offerings</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive solutions designed for modern educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ERP App */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in-up">
              <img src="/school-management-dashboard.png" alt="ERP Dashboard" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">School ERP System</h3>
                <p className="text-foreground/70 mb-4">
                  Complete school management solution for academics, finance, and beyond.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li>✓ Student Information Management</li>
                  <li>✓ Academic Planning & Scheduling</li>
                  <li>✓ Financial Management</li>
                  <li>✓ AI-Powered Chatbot Support</li>
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/erp">Explore ERP</Link>
                </Button>
              </div>
            </Card>

            {/* TinkerTek Labs */}
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <img src="/robotics-lab-students-learning.jpg" alt="TinkerTek Labs" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">TinkerTek Labs</h3>
                <p className="text-foreground/70 mb-4">
                  Advanced learning solutions blending AI, robotics, and practical experiments.                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li>✓ AI & Machine Learning Programs</li>
                  <li>✓ Robotics & Automation Labs</li>
                  <li>✓ Innovation Challenges</li>
                  <li>✓ E-Commerce Kits & Resources</li>
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/tinkertek">Explore TinkerTek</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your School?"
        subtitle="Join hundreds of schools already using School for Schools to enhance their educational experience."
        primaryLabel="Request a Demo"
        primaryLink="/contact"
        secondaryLabel="Join / Partner With Us"
        secondaryLink="/contact"
      />

      <Footer />
    </div>
  )
}
