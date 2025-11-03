import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, Users, BookOpen, DollarSign, BarChart3, Clock, Shield, Zap, CheckCircle2, Database, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image";
import { CTASection } from "@/components/CTASection"
import { Testimonials } from "@/components/testimonials"
import ClientLogosSlider from "@/components/ClientLogosSlider"

export const metadata: Metadata = {
  title: "School ERP System - Complete School Management Solution",
  description:
    "Comprehensive ERP system for schools covering student management, academics, finance, and more. Streamline operations with AI-powered support.",
  keywords:
    "school ERP, school management system, student information system, school software, education ERP, AI school software",
  openGraph: {
    title: "School ERP System - Complete School Management Solution",
    description:
      "Comprehensive ERP system for schools covering student management, academics, finance, and more. Streamline operations with AI-powered support.",
    url: "https://schoolforschools.com/erp",
    type: "website",
    siteName: "School for Schools",
    locale: "en_US",
    images: [
      {
        url: "https://schoolforschools.com/images/og/erp-cover.jpg",
        width: 1200,
        height: 630,
        alt: "School ERP Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School ERP System - Complete School Management Solution",
    description:
      "Simplify school operations with an AI-powered ERP system designed for modern educational institutions.",
    images: ["https://schoolforschools.com/images/og/erp-cover.jpg"],
    creator: "@schoolforschools",
  },
  alternates: {
    canonical: "https://schoolforschools.com/erp",
  },
};

export default function ERPPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-16 lg:py-20">
                        {/* Left Content */}
                        <div className="space-y-6 lg:space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <Database className="w-4 h-4" />
                                <span className="text-sm font-medium">Complete School Management</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                School ERP
                                <br />
                                <span className="inline-block mt-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                                    System
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                                Streamline all school operations with our comprehensive ERP solution. From admissions to alumni
                                management, manage everything in one integrated platform.
                            </p>

                            {/* Feature highlights */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
                                <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                                    <Shield className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-sm mb-1">Secure</div>
                                        <div className="text-xs text-gray-400">Bank-level security</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                                    <TrendingUp className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-sm mb-1">Scalable</div>
                                        <div className="text-xs text-gray-400">Grows with you</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                                    <Database className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-sm mb-1">All-in-One</div>
                                        <div className="text-xs text-gray-400">Unified platform</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="group px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                                   
                                >
                                    Request Demo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                                   
                                >
                                    View Features
                                </button>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex items-center gap-6 pt-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Live System</span>
                                </div>
                                <div className="h-4 w-px bg-white/20"></div>
                                <span>24/7 Support</span>
                                <div className="h-4 w-px bg-white/20"></div>
                                <span>99.9% Uptime</span>
                            </div>
                        </div>

                        {/* Right Content - Dashboard Preview */}
                        <div className="relative">
                            {/* Decorative frame corners */}
                            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-white/30 rounded-tl-3xl"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-white/30 rounded-br-3xl"></div>

                            {/* Main image container */}
                            <div className="relative">
                                {/* Glow effect behind */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-3xl -z-10 scale-105"></div>

                                {/* Image frame */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-gradient-to-br from-gray-900 to-black p-1">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>

                                    {/* Browser chrome mockup */}
                                    <div className="bg-gray-900 rounded-t-xl p-3 border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                            </div>
                                            <div className="flex-1 mx-4 bg-white/5 rounded px-3 py-1 text-xs text-gray-400">
                                                school-erp.system
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard image */}
                                    <div className="relative overflow-hidden rounded-b-xl">
                                        <img
                                            src="/2150169860.jpg"
                                            alt="School ERP Dashboard"
                                            className="w-full h-full object-cover  transition-all duration-700"
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Floating metrics cards */}
                                    <div className="hidden lg:block absolute top-24 right-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
                                        <div className="text-xs text-gray-400 mb-1">Active Users</div>
                                        <div className="text-2xl font-bold">2,847</div>
                                        <div className="text-xs text-green-400 mt-1">↑ 12.5%</div>
                                    </div>

                                    <div className="hidden lg:block absolute bottom-24 left-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
                                        <div className="text-xs text-gray-400 mb-1">Uptime</div>
                                        <div className="text-2xl font-bold">99.9%</div>
                                        <div className="text-xs text-green-400 mt-1">Excellent</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Everything you need to manage your school efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Student Management",
                description: "Complete student information system with admission, enrollment, and alumni tracking",
              },
              {
                icon: BookOpen,
                title: "Academic Planning",
                description: "Curriculum management, class scheduling, and academic performance tracking",
              },
              {
                icon: DollarSign,
                title: "Financial Management",
                description: "Fee collection, payroll, budgeting, and comprehensive financial reporting",
              },
              {
                icon: BarChart3,
                title: "Analytics & Reports",
                description: "Real-time dashboards and customizable reports for data-driven decisions",
              },
              {
                icon: Clock,
                title: "Attendance Tracking",
                description: "Automated attendance management for students and staff with real-time alerts",
              },
              {
                icon: Zap,
                title: "AI-Powered Support",
                description: "Intelligent chatbot for student and parent queries, available 24/7",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all hover:border-primary animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Modules</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Integrated modules designed to work seamlessly together
            </p>
          </div>

          <Tabs defaultValue="admissions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>

            <TabsContent value="admissions" className="animate-fade-in-up">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Admissions Module</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Streamline your admission process with our comprehensive admissions module. Manage applications, track
                  applicants, generate admission letters, and maintain complete student records from day one.
                </p>
                <ul className="space-y-3">
                  {[
                    "Online application portal",
                    "Automated document verification",
                    "Merit-based selection tools",
                    "Admission letter generation",
                    "Parent communication system",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="animate-fade-in-up">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Academics Module</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Manage all academic activities efficiently. From curriculum planning to grade management, track
                  student progress and generate comprehensive academic reports.
                </p>
                <ul className="space-y-3">
                  {[
                    "Curriculum management",
                    "Class scheduling and timetables",
                    "Grade management and transcripts",
                    "Student progress tracking",
                    "Exam management and results",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="finance" className="animate-fade-in-up">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Finance Module</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Complete financial management for your school. Handle fee collection, payroll, budgeting, and generate
                  detailed financial reports with ease.
                </p>
                <ul className="space-y-3">
                  {[
                    "Fee structure and collection",
                    "Automated billing and reminders",
                    "Payroll management",
                    "Budget planning and tracking",
                    "Financial reporting and audits",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="animate-fade-in-up">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Operations Module</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Manage day-to-day school operations seamlessly. Handle attendance, leave management, transport,
                  hostel, and other operational aspects.
                </p>
                <ul className="space-y-3">
                  {[
                    "Attendance management",
                    "Leave and permission tracking",
                    "Transport management",
                    "Hostel management",
                    "Visitor management",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
{/* Why Schools Need It Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Schools Need Our ERP</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Transform traditional school management into a digital-first experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="space-y-6">
                            {[
                                { num: "1", title: "Eliminate Paper-Based Processes", desc: "Move from manual record-keeping to automated digital systems. Reduce errors, save time, and access information instantly from anywhere." },
                                { num: "2", title: "Enhance Parent-School Communication", desc: "Keep parents informed with real-time updates on attendance, grades, assignments, and school events through automated notifications." },
                                { num: "3", title: "Improve Decision Making", desc: "Make data-driven decisions with comprehensive analytics and reports on student performance, financial health, and operational efficiency." },
                                { num: "4", title: "Streamline Administrative Tasks", desc: "Automate routine tasks like fee collection, attendance marking, report card generation, and reduce administrative workload by up to 60%." },
                            ].map((item) => (
                                <div key={item.num} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">{item.num}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Card className="p-6 sm:p-8 bg-white/5 border-white/20 border-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">The Challenge Schools Face</h3>
                            <div className="space-y-4">
                                {[
                                    "Managing thousands of student records manually leads to errors and inefficiency",
                                    "Disconnected systems create data silos and communication gaps",
                                    "Parents struggle to stay informed about their child's progress",
                                    "Teachers spend more time on paperwork than teaching"
                                ].map((challenge, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                        <p className="text-sm sm:text-base text-gray-400">{challenge}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <h4 className="text-lg font-semibold text-white mb-2">Our Solution</h4>
                                <p className="text-sm sm:text-base text-gray-400">
                                    A unified platform that connects every aspect of school management, enabling seamless communication, automation, and data-driven insights.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Our ERP?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Easy Integration",
                description: "Seamlessly integrates with your existing systems and processes",
              },
              {
                title: "User-Friendly Interface",
                description: "Intuitive design that requires minimal training for staff and parents",
              },
              {
                title: "Scalable Solution",
                description: "Grows with your school, from small institutions to large networks",
              },
              {
                title: "Data Security",
                description: "Enterprise-grade security with regular backups and compliance certifications",
              },
              {
                title: "24/7 Support",
                description: "Dedicated support team available round the clock to assist you",
              },
              {
                title: "Regular Updates",
                description: "Continuous improvements and new features based on user feedback",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:border-primary animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Flexible Pricing Plans</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose a plan that fits your school's needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "₹5,000",
                period: "/month",
                description: "Perfect for small schools",
                features: ["Up to 500 students", "Basic modules", "Email support", "Monthly backups"],
              },
              {
                name: "Professional",
                price: "₹15,000",
                period: "/month",
                description: "For growing schools",
                features: [
                  "Up to 2,000 students",
                  "All modules",
                  "Priority support",
                  "Daily backups",
                  "Custom reports",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large institutions",
                features: [
                  "Unlimited students",
                  "All features",
                  "24/7 dedicated support",
                  "Real-time backups",
                  "Custom integrations",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 flex flex-col animate-fade-in-up transition-all ${
                  plan.highlighted ? "border-primary shadow-lg scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-foreground/70 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-foreground/70 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${plan.highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
{/* Demo Video Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Watch how our ERP system transforms school management
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        {/* <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20" 
                        >
                            <div className="aspect-video bg-white/5 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-white">Product Demo Video</p>
                                    <p className="text-sm text-gray-400">Click to watch a comprehensive walkthrough</p>
                                    <Link href="/contact">
                                        <Button size="lg" className="mt-4 bg-white text-black hover:bg-gray-200">
                                            Schedule Live Demo
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div> */}

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
  {/* Background video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/erp.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Optional dark overlay for readability */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Foreground content */}
  <div className="relative z-10 aspect-video flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
        <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <p className="text-lg font-semibold text-white">Product Demo Video</p>
      <p className="text-sm text-gray-300">Click to watch a comprehensive walkthrough</p>

      <Link href="/contact">
        <Button size="lg" className="mt-4 bg-white text-black hover:bg-gray-200">
          Schedule Live Demo
        </Button>
      </Link>
    </div>
  </div>
</div>


                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {[
                                { label: "Dashboard Overview", time: "2:30" },
                                { label: "Student Management", time: "3:45" },
                                { label: "Fee Collection", time: "2:15" },
                                { label: "Reports & Analytics", time: "3:00" },
                            ].map((video, index) => (
                                <Card key={index} className="p-4 hover:border-white transition-all cursor-pointer border-2 border-white/20 bg-white/5">
                                    <div className="aspect-video bg-white/10 rounded mb-2 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-white">{video.label}</p>
                                    <p className="text-xs text-gray-400">{video.time}</p>
                                </Card>
                            ))}
                        </div> */}
                    </div>
                </div>
            </section>

            {/* AI Chatbot Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full border-2 border-black mb-6">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">AI-Powered Support</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                                ERP AI Chatbot
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 mb-6">
                                Our intelligent AI chatbot provides instant answers to students, parents, and staff 24/7. No more waiting for responses or searching through documentation.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { title: "Instant Query Resolution", desc: "Answer common questions about fees, schedules, grades, and policies instantly" },
                                    { title: "Multi-Language Support", desc: "Communicate in multiple languages to serve diverse communities" },
                                    { title: "Smart Escalation", desc: "Automatically routes complex queries to the right department or staff member" },
                                    { title: "Learning & Improving", desc: "Continuously learns from interactions to provide better responses" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-black mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact">
                                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                                    Try AI Chatbot Demo
                                    <ArrowRight className="ml-2" size={20} />
                                </Button>
                            </Link>
                        </div>

                        <Card className="p-6 border-2 border-gray-200 bg-gray-50">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                                        <p className="text-sm text-gray-700">When are the parent-teacher meetings scheduled?</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 bg-black text-white rounded-lg p-3">
                                        <p className="text-sm">Parent-teacher meetings are scheduled for November 15-16, 2025. You can book your slot through the parent portal. Would you like me to guide you through the booking process?</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                                        <p className="text-sm text-gray-700">What's the status of my fee payment?</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 bg-black text-white rounded-lg p-3">
                                        <p className="text-sm">Your last payment of ₹25,000 was received on October 1, 2025. Your next installment of ₹25,000 is due on December 1, 2025. Would you like to make an early payment?</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-300 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type your question..."
                                        className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm"
                                    />
                                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">Send</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
            {/* Partner Schools Section */}
            {/* <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Trusted By Leading Schools</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Join over 150+ schools that have transformed their operations with our ERP system
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                            <Card key={index} className="p-6 flex items-center justify-center hover:shadow-lg transition-all border-2 border-white/20 bg-white/5">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-2 border border-white/20">
                                        <BookOpen className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-xs font-medium text-gray-400">School Logo {index}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            { number: "150+", label: "Partner Schools" },
                            { number: "75,000+", label: "Active Students" },
                            { number: "99.5%", label: "Satisfaction Rate" },
                        ].map((stat, index) => (
                            <Card key={index} className="p-6 text-center border-2 border-white/20 bg-white/5">
                                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}
            <ClientLogosSlider />
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
