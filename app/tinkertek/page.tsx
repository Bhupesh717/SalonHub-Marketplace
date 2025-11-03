
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Lightbulb, Users, Rocket, CheckCircle2, Star, Sparkles, Target, Globe, BookOpen, Award, Camera, TrendingUp, Shield, Briefcase } from "lucide-react"
import type { Metadata } from "next"
import { CTASection } from "@/components/CTASection"

export const metadata: Metadata = {
  title: "TinkerTek Labs - AI, Robotics & Innovation Programs",
  description:
    "Empower students with future-ready skills through TinkerTek Labs — hands-on learning in AI, robotics, machine learning, and STEM innovation.",
  keywords:
    "robotics labs, AI learning, innovation programs, STEM education, robotics kits, AI for schools, STEM robotics lab, school innovation programs",
  openGraph: {
    title: "TinkerTek Labs - AI, Robotics & Innovation Programs",
    description:
      "Hands-on innovation programs combining AI, robotics, and STEM education. Build curiosity, creativity, and critical thinking in students.",
    url: "https://schoolforschools.com/tinkertek",
    type: "website",
    siteName: "School for Schools",
    locale: "en_US",
    images: [
      {
        url: "https://schoolforschools.com/images/og/tinkertek-labs-og.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "TinkerTek Labs - AI & Robotics for Schools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TinkerTek Labs - AI, Robotics & Innovation Programs",
    description:
      "Explore AI, robotics, and STEM innovation labs designed for schools to inspire the next generation of innovators.",
    images: ["https://schoolforschools.com/images/og/tinkertek-labs-og.jpg"],
    creator: "@schoolforschools",
  },
  alternates: {
    canonical: "https://schoolforschools.com/tinkertek",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function TinkerTekPage() {

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
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-12 sm:py-16 lg:py-20">
                        {/* Left Content */}
                        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">Future-Ready Learning</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                TinkerTek
                                <span className="inline-block mt-2 ms-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Labs
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                                Empower your students with cutting-edge AI, robotics, and innovation programs.
                                Build the problem-solvers and innovators of tomorrow.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-8 border-t border-b border-white/10">
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">500+</div>
                                    <div className="text-sm text-gray-400">Students</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">50+</div>
                                    <div className="text-sm text-gray-400">Schools</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">15+</div>
                                    <div className="text-sm text-gray-400">Programs</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="group px-6 sm:px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"

                                >
                                    Get Started
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    className="px-6 sm:px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                                    
                                >
                                    Explore Programs
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Image with modern frame */}
                        <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-l-2 border-white/30 hidden lg:block"></div>
                            <div className="absolute -bottom-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-r-2 border-white/30 hidden lg:block"></div>

                            {/* Image container */}
                            <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10"></div>
                                <img
                                    src="/2148863381.jpg"
                                    alt="TinkerTek Labs - Students learning robotics"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />

                                {/* Floating badge on image */}
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-white" />
                                        <span className="text-xs sm:text-sm font-medium">Innovation Lab</span>
                                    </div>
                                </div>
                            </div>

                            {/* Glowing effect */}
                            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </section>
            {/* Overview - Concept & Vision */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full border-2 border-black mb-6">
                                <Target className="w-4 h-4" />
                                <span className="text-sm font-medium">Our Vision</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                                Transforming Education Through Innovation
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                                TinkerTek Labs is dedicated to bridging the gap between traditional education and the skills needed for tomorrow's world. We believe in hands-on, experiential learning that sparks curiosity and builds confidence.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                                Our mission is to make cutting-edge technology education accessible to every student, empowering them to become innovators, problem-solvers, and leaders in their fields.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Lightbulb, text: "Foster creative thinking and innovation" },
                                    { icon: Users, text: "Build collaborative and leadership skills" },
                                    { icon: Rocket, text: "Prepare students for future careers in tech" },
                                    { icon: Globe, text: "Create a community of lifelong learners" },
                                ].map((item, idx) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-gray-700">{item.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6 border-2 border-gray-200 bg-white hover:border-black transition-all">
                                <h3 className="text-xl font-bold text-black mb-3">The Challenge</h3>
                                <p className="text-gray-600 text-sm">
                                    Traditional education often fails to prepare students for rapidly evolving technology careers. Many students graduate without exposure to AI, robotics, or modern innovation practices.
                                </p>
                            </Card>

                            <Card className="p-6 border-2 border-gray-200 bg-white hover:border-black transition-all">
                                <h3 className="text-xl font-bold text-black mb-3">Our Solution</h3>
                                <p className="text-gray-600 text-sm">
                                    We provide comprehensive, age-appropriate programs that integrate seamlessly with school curricula. From basic coding to advanced AI, students learn through projects, competitions, and real-world applications.
                                </p>
                            </Card>

                            <Card className="p-6 border-2 border-gray-200 bg-white hover:border-black transition-all">
                                <h3 className="text-xl font-bold text-black mb-3">The Impact</h3>
                                <p className="text-gray-600 text-sm">
                                    Students develop critical 21st-century skills: computational thinking, creativity, collaboration, and communication. They gain confidence to pursue STEM careers and become innovation leaders.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Offerings Section */}
            <section id="offerings" className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Comprehensive programs and resources for schools, students, and communities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {[
                            {
                                icon: Users,
                                title: "Community & Activity Programs",
                                description: "Weekend workshops, summer camps, and after-school programs for students of all ages",
                                features: ["Coding Bootcamps", "Robotics Workshops", "Innovation Camps", "Tech Meetups"]
                            },
                            {
                                icon: BookOpen,
                                title: "AI & Robotics Labs for Schools",
                                description: "Complete lab setup with equipment, curriculum, and teacher training for schools",
                                features: ["Lab Infrastructure", "Teacher Training", "Curriculum Design", "Ongoing Support"]
                            },
                            {
                                icon: Award,
                                title: "Competitions & Innovation Challenges",
                                description: "National and international competitions to showcase student innovations",
                                features: ["Robotics Competitions", "AI Hackathons", "Innovation Challenges", "Science Fairs"]
                            },
                            {
                                icon: Rocket,
                                title: "E-Commerce Kits & Resources",
                                description: "Ready-to-use learning kits that can be purchased individually or in bulk",
                                features: ["Starter Kits", "Advanced Modules", "Online Resources", "Community Access"]
                            },
                        ].map((offering, index) => {
                            const Icon = offering.icon
                            return (
                                <Card key={index} className="p-6 sm:p-8 border-2 border-white/20 bg-white/5 hover:border-white transition-all">
                                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4" />
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{offering.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-400 mb-4">{offering.description}</p>
                                    <ul className="space-y-2">
                                        {offering.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                                                <span className="text-sm text-gray-400">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why TinkerTek Section */}
            {/* <section className="pt-12 sm:pt-16 md:pt-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Why TinkerTek Labs?</h2>
                        <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
                            Comprehensive learning ecosystem designed to develop critical thinking, creativity, and technical skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            {
                                icon: Cpu,
                                title: "AI & ML Programs",
                                description: "Hands-on learning in artificial intelligence and machine learning concepts",
                            },
                            {
                                icon: Zap,
                                title: "Robotics Labs",
                                description: "Build and program robots to solve real-world problems and challenges",
                            },
                            {
                                icon: Lightbulb,
                                title: "Innovation Challenges",
                                description: "Participate in competitions and challenges that spark creativity",
                            },
                            {
                                icon: Users,
                                title: "Collaborative Learning",
                                description: "Team-based projects that develop communication and leadership skills",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Card
                                    key={index}
                                    className="p-4 sm:p-6 hover:shadow-lg transition-all hover:border-accent animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-4 text-gray-900" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-sm sm:text-base text-foreground/70">{item.description}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section> */}

            {/* How It Works / For Whom */}
            <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Simple steps to bring TinkerTek Labs to your school or community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { num: "01", title: "Connect", desc: "Reach out to us through our contact form or schedule a demo call" },
                            { num: "02", title: "Assess", desc: "We understand your needs, student demographics, and goals" },
                            { num: "03", title: "Setup", desc: "We provide equipment, training, and curriculum for your program" },
                            { num: "04", title: "Launch", desc: "Start teaching with ongoing support and regular updates" },
                        ].map((step, idx) => (
                            <Card key={idx} className="p-6 border-2 border-white/20 bg-white/5 hover:border-white transition-all text-center">
                                <div className="text-4xl font-bold text-white/30 mb-4">{step.num}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-400">{step.desc}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="border-t border-white/20 pt-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">Who Can Benefit?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "K-12 Schools",
                                    points: ["Integrated lab programs", "Teacher training", "Curriculum support", "Assessment tools"]
                                },
                                {
                                    title: "Students & Parents",
                                    points: ["After-school programs", "Weekend workshops", "Summer camps", "Online courses"]
                                },
                                {
                                    title: "Organizations",
                                    points: ["CSR initiatives", "Community programs", "Skill development", "Youth empowerment"]
                                },
                            ].map((audience, idx) => (
                                <Card key={idx} className="p-6 border-2 border-white/20 bg-white/5">
                                    <h4 className="text-xl font-bold text-white mb-4">{audience.title}</h4>
                                    <ul className="space-y-2">
                                        {audience.points.map((point, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                                                <span className="text-sm text-gray-400">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources & Kits Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">E-Commerce Kits</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Complete learning packages with hardware, software, and curriculum
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { title: "Robotics Starter Kit", description: "Complete kit for beginners with robots, sensors, and programming environment", price: "₹8,999" },
                            { title: "AI Learning Suite", description: "Comprehensive AI and machine learning tools with pre-built models and datasets", price: "₹12,999" },
                            { title: "IoT Development Kit", description: "Build connected devices with sensors, microcontrollers, and cloud integration", price: "₹10,999" },
                            { title: "E-Commerce Lab Kit", description: "Learn e-commerce development with practical projects and real-world scenarios", price: "₹9,999" },
                            { title: "Advanced Robotics Kit", description: "Professional-grade robotics platform for advanced projects and competitions", price: "₹24,999" },
                            { title: "Complete Lab Bundle", description: "All-in-one solution with all kits, curriculum, and teacher training", price: "₹59,999" },
                        ].map((kit, index) => (
                            <Card key={index} className="p-4 sm:p-6 hover:shadow-xl transition-all hover:border-black border-2 border-gray-200 bg-white">
                                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-black mb-4" />
                                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">{kit.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">{kit.description}</p>
                                <p className="text-xl sm:text-2xl font-bold text-black mb-4">{kit.price}</p>
                                <Button variant="outline" className="w-full border-2 bg-black text-white hover:bg-black hover:text-white">
                                    Learn More
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery / Showcase */}
            <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Gallery & Showcase</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            See our labs, programs, and student innovations in action
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg border-2 border-white/20 aspect-square">
                                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all flex items-center justify-center">
                                    <Camera className="w-12 h-12 text-white/50" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                                    <p className="text-xs text-white font-medium">Gallery Image {index}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200" >
                            View Full Gallery
                            <ArrowRight className="ml-2" size={20} />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Case Studies / Impact Stories */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">Success Stories & Impact</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Real stories of transformation from students, schools, and communities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                        {[
                            {
                                name: "Arjun Sharma",
                                achievement: "Won National Robotics Championship",
                                quote: "TinkerTek Labs gave me the skills and confidence to compete at the national level. The hands-on learning approach was incredible.",
                            },
                            {
                                name: "Priya Desai",
                                achievement: "Developed AI-powered App",
                                quote: "I learned machine learning concepts that helped me build an app that won a startup competition. Amazing mentorship!",
                            },
                            {
                                name: "Rohan Gupta",
                                achievement: "Secured Scholarship",
                                quote: "The advanced program prepared me perfectly for my engineering entrance exams. I got a full scholarship to my dream college.",
                            },
                        ].map((story, index) => (
                            <Card key={index} className="p-6 sm:p-8 border-2 border-gray-200 bg-white hover:border-black transition-all">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-black text-black" />
                                    ))}
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 mb-4 italic">"{story.quote}"</p>
                                <div className="border-t-2 border-gray-200 pt-4">
                                    <p className="font-semibold text-black">{story.name}</p>
                                    <p className="text-sm text-gray-600">{story.achievement}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* School Case Studies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                school: "Delhi Public School, Bangalore",
                                impact: "200+ students enrolled in robotics program",
                                results: ["40% increase in STEM interest", "3 national competition wins", "100% teacher satisfaction", "Parent engagement up 60%"]
                            },
                            {
                                school: "Ryan International School, Mumbai",
                                impact: "Complete AI lab setup with 50 students",
                                results: ["5 students won state-level AI competition", "2 patents filed by students", "Featured in national media", "Partnership with tech companies"]
                            },
                        ].map((caseStudy, idx) => (
                            <Card key={idx} className="p-6 sm:p-8 border-2 border-gray-200 bg-gray-50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-black">{caseStudy.school}</h3>
                                        <p className="text-sm text-gray-600">{caseStudy.impact}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black mb-2">Key Results:</h4>
                                    {caseStudy.results.map((result, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                                            <span className="text-sm text-gray-700">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Impact Metrics */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: "500+", label: "Students Trained" },
                            { number: "50+", label: "Partner Schools" },
                            { number: "25+", label: "Competition Wins" },
                            { number: "95%", label: "Student Satisfaction" },
                        ].map((metric, idx) => (
                            <div key={idx} className="text-center p-6 border-2 border-gray-200 rounded-lg">
                                <div className="text-3xl sm:text-4xl font-bold text-black mb-2">{metric.number}</div>
                                <div className="text-sm text-gray-600">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LMS / Community Platform Links */}
            <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Learning & Community</h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Access our learning management system and connect with our community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: BookOpen,
                                title: "Learning Portal",
                                description: "Access courses, video tutorials, and learning resources anytime, anywhere",
                                features: ["Video Lessons", "Interactive Quizzes", "Project Submissions", "Progress Tracking"],
                                cta: "Access LMS"
                            },
                            {
                                icon: Users,
                                title: "Community Forum",
                                description: "Connect with fellow learners, share projects, and get help from mentors",
                                features: ["Discussion Forums", "Project Showcase", "Peer Learning", "Expert Q&A"],
                                cta: "Join Community"
                            },
                            {
                                icon: Zap,
                                title: "Live Sessions",
                                description: "Attend live workshops, webinars, and interactive sessions with experts",
                                features: ["Weekly Webinars", "Live Coding Sessions", "Guest Lectures", "Competition Prep"],
                                cta: "View Schedule"
                            },
                        ].map((platform, idx) => {
                            const Icon = platform.icon
                            return (
                                <Card key={idx} className="p-6 sm:p-8 border-2 border-white/20 bg-white/5 hover:border-white transition-all">
                                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4" />
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{platform.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-400 mb-4">{platform.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {platform.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                                                <span className="text-sm text-gray-400">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="w-full bg-white text-black hover:bg-gray-200">
                                        {platform.cta}
                                        <ArrowRight className="ml-2" size={16} />
                                    </Button>
                                </Card>
                            )
                        })}
                    </div>

                    {/* <div className="mt-12 text-center p-8 border-2 border-white/20 rounded-lg bg-white/5">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Stay Connected</h3>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            Join our newsletter to receive updates on new programs, competitions, and exclusive learning resources
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                            />
                            <Button className="bg-white text-black hover:bg-gray-200">Subscribe</Button>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Careers Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">Join Our Team</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Help shape the future of education by becoming a TinkerTek Labs educator or trainer
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">Why Join TinkerTek Labs?</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Lightbulb, text: "Make a real impact on young minds and future innovators" },
                                    { icon: TrendingUp, text: "Grow your skills with continuous professional development" },
                                    { icon: Users, text: "Join a passionate community of educators and technologists" },
                                    { icon: Shield, text: "Competitive compensation and benefits package" },
                                    { icon: Rocket, text: "Flexible work arrangements and creative freedom" },
                                    { icon: Award, text: "Recognition and awards for excellence in teaching" },
                                ].map((item, idx) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-gray-700 pt-2">{item.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6 border-2 border-gray-200 bg-white">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-8 h-8 text-black flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-bold text-black mb-2">Robotics Trainer</h4>
                                        <p className="text-sm text-gray-600 mb-3">Teach robotics concepts to students aged 8-15. Experience with Arduino/Raspberry Pi preferred.</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">Full-time</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">On-site</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">2+ years exp</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white">
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border-2 border-gray-200 bg-white">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-8 h-8 text-black flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-bold text-black mb-2">AI/ML Instructor</h4>
                                        <p className="text-sm text-gray-600 mb-3">Design and deliver AI/ML curriculum for high school students. Python expertise required.</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">Full-time</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">Hybrid</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">3+ years exp</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white">
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border-2 border-gray-200 bg-white">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-8 h-8 text-black flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-bold text-black mb-2">Curriculum Developer</h4>
                                        <p className="text-sm text-gray-600 mb-3">Create engaging learning materials and assessments. Education background preferred.</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">Full-time</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">Remote</span>
                                            <span className="px-2 py-1 bg-gray-100 text-xs rounded">1+ years exp</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white">
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            <div className="text-center p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                                <p className="text-gray-700 mb-3">Don't see the right position?</p>
                                <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white" >
                                    View All Openings
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Shield, title: "Health Insurance", desc: "Comprehensive coverage" },
                            { icon: Rocket, title: "Learning Budget", desc: "₹50,000 annually" },
                            { icon: Users, title: "Team Bonding", desc: "Quarterly events" },
                            { icon: TrendingUp, title: "Career Growth", desc: "Clear advancement path" },
                        ].map((benefit, idx) => {
                            const Icon = benefit.icon
                            return (
                                <div key={idx} className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-black transition-all">
                                    <Icon className="w-8 h-8 text-black mx-auto mb-3" />
                                    <h4 className="font-semibold text-black mb-1">{benefit.title}</h4>
                                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
{/* CTA Section */}
      <CTASection
        title="Ready to Empower Your Students?"
        subtitle="Join hundreds of schools using TinkerTek Labs to prepare students for the future."
        primaryLabel="Request a Demo"
        primaryLink="/contact"
        secondaryLabel="Join / Partner With Us"
        secondaryLink="/contact"
      />
      <Footer />
    </div>
  )
}
