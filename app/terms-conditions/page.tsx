// app/terms/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Terms and Conditions | TinkerTek Labs",
  description: "Review the terms of service for using TinkerTek Labs' educational platforms and tools.",
  keywords: "terms of service, user agreement, edtech terms, TinkerTek Labs",
  openGraph: {
    title: "Terms and Conditions - TinkerTek Labs",
    description: "Legal terms governing your use of our AI and ERP solutions.",
    url: "https://schoolforschools.com/tinkertek/terms",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        width: 800,
        height: 400,
        alt: "TinkerTek Labs Terms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions - TinkerTek Labs",
    description: "By using our services, you agree to these terms.",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using TinkerTek Labs' services, you agree to these Terms and Conditions. If you do not agree, please do not use our platform. Effective: October 28, 2025.",
  },
  {
    title: "Description of Services",
    content: "We provide edtech tools including AI-powered labs, ERP systems for schools, and personalized learning platforms. Services are subject to availability and updates.",
  },
  {
    title: "User Conduct",
    content: "Users must use services ethically, respect intellectual property, and comply with applicable laws. Prohibited: Unauthorized access, harmful content, or commercial misuse.",
  },
  {
    title: "Intellectual Property",
    content: "All content, software, and materials are owned by TinkerTek Labs or licensors. Users granted limited license for educational use only.",
  },
  {
    title: "Termination",
    content: "We may suspend or terminate accounts for violations. Upon termination, access ends, but obligations (e.g., payments) survive.",
  },
  {
    title: "Limitation of Liability",
    content: "Services provided 'as is.' We are not liable for indirect damages. Liability capped at fees paid in the prior 12 months.",
  },
  {
    title: "Governing Law",
    content: "These terms governed by laws of [Your Jurisdiction, e.g., Delaware, USA]. Disputes resolved via arbitration.",
  },
  {
    title: "Changes to Terms",
    content: "We may update terms; continued use constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Navigation Bar */}
      {/* <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/" className="text-black">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 inline-block">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-primary/60" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              <p className="text-foreground/80 leading-relaxed text-[16px]">{section.content}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Card */}
      {/* <Card className="mx-auto max-w-2xl p-8 bg-gradient-to-br from-primary/5 to-muted/20 border-primary/20 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Need Clarification?</h2>
        <p className="text-muted-foreground mb-6">Contact our team for questions on these terms.</p>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </Card> */}
      <Footer />
    </div>
  );
}