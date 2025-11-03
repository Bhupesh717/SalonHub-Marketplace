// app/case-studies/page.tsx
import React, { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Download, Quote } from "lucide-react"
import backgroundImage from "@/public/643.jpg"; // Adjust path to public/assets for Next.js static serving
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Case Studies & Success Stories | School for Schools",
  description: "Discover how schools across India use ERP and TinkerTek Labs to simplify operations and enhance STEM learning.",
  keywords: "case studies, success stories, ERP implementation, TinkerTek Labs, AI robotics education, school digital transformation, STEM success stories",
  openGraph: {
    title: "Case Studies & Success Stories | School for Schools",
    description: "Discover how schools across India use ERP and TinkerTek Labs to simplify operations and enhance STEM learning.",
    url: "https://schoolforschools.com/case-studies",
    type: "website",
    images: [
      {
        url: "https://schoolforschools.com/tinkertek/643.jpg", 
        width: 1200,
        height: 630,
        alt: "Case Studies - Transforming Schools with AI and ERP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | School for Schools",
    description: "Real testimonials from schools on ERP, AI labs, and digital shifts. See the impact on education.",
    images: ["https://schoolforschools.com/tinkertek/643.jpg"],
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

interface CaseStudy {
    title: string;
    description: string;
    quote: string;
    author: string;
    image: string;
    category: 'erp' | 'tinkertek' | 'full';
}

// Client Component for Interactive Tabs
const ClientTabs = () => {
    'use client';

    const caseStudies: CaseStudy[] = [
        {
            title: "Delhi Public School - ERP Implementation",
            description: "Implemented our ERP system to streamline admissions and academic management, reducing administrative time by 40%.",
            quote: "The system has revolutionized our daily operations!",
            author: "Dr. Rajesh Kumar, Principal",
            image: "/2150169860.jpg",
            category: 'erp'
        },
        {
            title: "St. Xavier's Academy - AI Lab Launch",
            description: "Set up TinkerTek Labs, enhancing STEM education and preparing students for future tech careers.",
            quote: "Students are more engaged than ever before.",
            author: "Ms. Priya Sharma, Head of STEM",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
            category: 'tinkertek'
        },
        {
            title: "Riverside International - Full Digital Shift",
            description: "Complete digital transformation with ERP and innovation programs, improving parent communication and analytics.",
            quote: "A game-changer for our institution.",
            author: "Admin Director, Riverside",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
            category: 'full'
        },
        {
            title: "Modern School - ERP Optimization",
            description: "Optimized ERP for better fee management and reporting, resulting in 30% faster financial processing.",
            quote: "Our financial operations are now seamless and error-free.",
            author: "Finance Head, Modern School",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
            category: 'erp'
        },
        {
            title: "Cathedral School - Robotics Innovation",
            description: "Introduced TinkerTek robotics kits, boosting student participation in tech competitions by 60%.",
            quote: "The labs have sparked creativity and innovation in our students.",
            author: "Science Coordinator, Cathedral School",
            image: "/2148863381.jpg",
            category: 'tinkertek'
        },
        {
            title: "Doon School - Comprehensive Tech Upgrade",
            description: "Full suite implementation of ERP and TinkerTek, leading to enhanced learning outcomes and operational efficiency.",
            quote: "Transformed our school into a modern educational powerhouse.",
            author: "Principal, Doon School",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
            category: 'full'
        },
    ];

    const allStudies = caseStudies;
    const erpStudies = caseStudies.filter(study => study.category === 'erp');
    const tinkertekStudies = caseStudies.filter(study => study.category === 'tinkertek');
    const fullStudies = caseStudies.filter(study => study.category === 'full');

    const renderStudiesGrid = (studies: CaseStudy[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map((study, index) => (
                <Card
                    key={index}
                    className="overflow-hidden hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <Image
                        src={study.image}
                        alt={study.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-3">{study.title}</h3>
                        <p className="text-muted-foreground mb-4">{study.description}</p>
                        <div className="flex items-center gap-2 mb-4">
                            <Quote className="w-5 h-5 text-primary flex-shrink-0" />
                            <p className="italic font-semibold">"{study.quote}"</p>
                        </div>
                        <p className="text-sm text-primary">{study.author}</p>
                    </div>
                </Card>
            ))}
        </div>
    );

    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Case Studies & Testimonials</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real success stories from schools transforming education with our solutions
                    </p>
                </div>
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-10">
                        <TabsTrigger value="all" className="bg-[#f9f9f9]">All Solutions</TabsTrigger>
                        <TabsTrigger value="erp" className="bg-[#f9f9f9]">ERP Implementation</TabsTrigger>
                        <TabsTrigger value="tinkertek" className="bg-[#f9f9f9]">TinkerTek Labs</TabsTrigger>
                        <TabsTrigger value="full" className="bg-[#f9f9f9]">Full Implementation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="animate-fade-in-up">
                        {renderStudiesGrid(allStudies)}
                    </TabsContent>
                    <TabsContent value="erp" className="animate-fade-in-up">
                        {renderStudiesGrid(erpStudies)}
                    </TabsContent>
                    <TabsContent value="tinkertek" className="animate-fade-in-up">
                        {renderStudiesGrid(tinkertekStudies)}
                    </TabsContent>
                    <TabsContent value="full" className="animate-fade-in-up">
                        {renderStudiesGrid(fullStudies)}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

// Download Resources Component (Static, SSR)
const DownloadResources = () => (
    <section className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Download Resources</h2>
                <p className="text-lg text-muted-foreground">Get detailed PDFs and reports of our case studies</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "ERP Implementation Guide", size: "2.4 MB" },
                    { title: "TinkerTek Success Metrics", size: "1.8 MB" },
                    { title: "Digital Transformation Roadmap", size: "3.2 MB" },
                ].map((resource, index) => (
                    <Card
                        key={index}
                        className="p-6 animate-fade-in-up flex items-center justify-between hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div>
                            <h3 className="font-semibold text-foreground">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.size}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link className="text-gray-900" href="/resources/erp-guide.pdf" target="_blank" download> {/* Adjust to actual PDF paths */}
                                <Download size={20} />
                            </Link>
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    </section>
)

const CaseStudies = () => {
    return (
        <>
        <Header />
            {/* Hero Section - Static */}
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
                        Case Studies & Success Stories
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Discover how schools across India have transformed their operations and enhanced student outcomes
                    </p>
                </div>
            </section>

            {/* Interactive Tabs - Client Component */}
            <Suspense fallback={<div className="py-8 text-center">Loading case studies...</div>}>
                <ClientTabs />
            </Suspense>

            {/* Download Resources - Static */}
            <DownloadResources />

            {/* CTA Section - Static */}
            <section className="py-12 sm:py-16 md:py-24 bg-accent text-accent-foreground">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Empower Your Students?</h2>
                    <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                        Join hundreds of schools using TinkerTek Labs to prepare students for the future.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 flex-wrap">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 w-full sm:w-auto"
                            asChild
                        >
                            <Link href="/contact">
                                Request a Demo <ArrowRight className="ml-2" size={20} />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent hover:border-gray-950 w-full sm:w-auto" asChild>
                            <Link href="/contact" className="text-gray-900">
                                Join / Partner With Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CaseStudies;