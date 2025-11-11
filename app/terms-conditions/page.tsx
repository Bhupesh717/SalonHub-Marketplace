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
    content:
      "By accessing or using GlamSync’s services, you agree to these Terms and Conditions. If you do not agree, please discontinue use of our platform. Effective: November 11, 2025.",
  },
  {
    title: "Description of Services",
    content:
      "GlamSync provides digital tools for salons and spas, including client management, appointment booking, staff scheduling, and marketing automation features. Services are continuously improved and may be updated without prior notice.",
  },
  {
    title: "User Conduct",
    content:
      "Users must use our services responsibly, comply with all applicable laws, and respect the rights and privacy of others. Prohibited actions include unauthorized access, misuse of data, distribution of harmful content, or using the platform for unlawful or competitive commercial purposes.",
  },
  {
    title: "Intellectual Property",
    content:
      "All software, design elements, content, and materials on the GlamSync platform are the property of GlamSync or its licensors. Users are granted a limited, non-exclusive, non-transferable license to use the platform for lawful business purposes related to salon operations only.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate user accounts that violate these Terms. Upon termination, access to the platform will be revoked, though obligations such as outstanding payments or legal responsibilities will remain in effect.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Our services are provided 'as is' and without any warranties, express or implied. GlamSync shall not be held liable for indirect, incidental, or consequential damages. In all cases, our total liability is limited to the subscription fees paid within the preceding 12 months.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of [Your Jurisdiction, e.g., Delaware, USA]. Any disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may revise or update these Terms periodically to reflect changes in our services or legal requirements. Continued use of the platform after updates constitutes acceptance of the new Terms.",
  },
]


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
          <h1 className="text-4xl md:text-5xl font-bold text-pink-900 mb-6 leading-[1.15]">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-primary" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 border-border">
              <h2 className="text-2xl font-bold text-pink-900 mb-4">{section.title}</h2>
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