// app/faq/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


export const metadata: Metadata = {
  title: "Frequently Asked Questions | TinkerTek Labs",
  description:
    "Get answers to common questions about our AI-powered educational tools, ERP systems, and school transformation services.",
  keywords:
    "FAQ, edtech, AI in education, school ERP, TinkerTek Labs, STEM labs",
  openGraph: {
    title: "FAQ - TinkerTek Labs",
    description:
      "Answers to your questions on digital transformation for schools.",
    url: "https://schoolforschools.com/tinkertek/faq",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        width: 800,
        height: 400,
        alt: "TinkerTek Labs FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - TinkerTek Labs",
    description: "Common questions about our edtech solutions answered.",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function FAQPage() {
    const faqs = [
  {
    question: "What is digital transformation in education?",
    answer:
      "Digital transformation involves integrating technologies like AI, ERP systems, and interactive labs to modernize school operations and enhance student learning. At TinkerTek Labs, we help schools shift from traditional methods to dynamic, data-driven environments.",
    category: "Basics",
  },
  {
    question: "How do your AI labs benefit students?",
    answer:
      "Our Hands-On AI Labs allow students to build and program AI models, fostering critical thinking, creativity, and 21st-century skills. Studies show a 30% improvement in retention and engagement when integrated thoughtfully.",
    category: "AI & Innovation",
  },
  {
    question: "What ERP features do you offer for schools?",
    answer:
      "Our ERP solutions streamline admissions, attendance, grading, and fee management into one platform, reducing administrative time by up to 50% and freeing educators to focus on teaching.",
    category: "School Management",
  },
  {
    question: "How much does implementation cost?",
    answer:
      "Costs vary by school size and features, starting from affordable pilot programs. Contact our team for a customized quote—many schools see ROI within the first year through efficiency gains.",
    category: "Pricing",
  },
  {
    question: "Can we start with a trial or demo?",
    answer:
      "Absolutely! We offer free demos and 30-day pilots for AI labs and ERP modules. Schedule a call to see how it fits your curriculum.",
    category: "Getting Started",
  },
  {
    question: "Is your technology secure and compliant?",
    answer:
      "Yes, all our tools comply with GDPR, FERPA, and COPPA standards. We use enterprise-grade encryption and regular audits to protect student data.",
    category: "Security",
  },
];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Navigation Bar - Back to Home */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2 text-black">
              <Link href="/" className="text-black">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 inline-block">
            Support
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Find quick answers to common queries about our edtech solutions.
            Can&apos;t find what you need?{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </Link>
            .
          </p>
          <div className="flex justify-center">
            <HelpCircle className="h-12 w-12 text-primary/60" />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <FAQAccordion faqs={faqs} /> {/* Render the Client Component here */}

          {/* CTA Card */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-muted/20 border-primary/20 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re here to help tailor our solutions to your
                school&apos;s needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Request a Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full text-black">
                  <Link href="/blog">Read Our Blog</Link>
                </Button>
              </div>
            </div>
          </Card>
         
        </div>
      </section>
      <Footer />
    </div>
  );
}