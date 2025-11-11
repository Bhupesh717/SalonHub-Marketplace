// app/privacy/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | TinkerTek Labs",
  description: "Learn how TinkerTek Labs protects your personal information and ensures data privacy in our edtech services.",
  keywords: "privacy policy, data protection, edtech privacy, GDPR, FERPA, TinkerTek Labs",
  openGraph: {
    title: "Privacy Policy - TinkerTek Labs",
    description: "Our commitment to safeguarding your data in educational technology.",
    url: "https://schoolforschools.com/tinkertek/privacy",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        width: 800,
        height: 400,
        alt: "TinkerTek Labs Privacy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - TinkerTek Labs",
    description: "Data privacy practices for our AI and ERP tools.",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Introduction",
    content: "At TinkerTek Labs, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our educational technology services, including AI labs, ERP systems, and related tools. Effective: October 28, 2025.",
  },
  {
    title: "Information We Collect",
    content: "We collect personal data such as names, emails, school affiliations, and usage analytics to provide personalized learning experiences. For students and educators, this includes performance data from AI interactions, always with consent.",
  },
  {
    title: "How We Use Your Information",
    content: "Your data helps us improve services, personalize content, and ensure compliance with educational standards like FERPA and GDPR. We do not sell your data to third parties.",
  },
  {
    title: "Data Sharing and Security",
    content: "We share data only with service providers (e.g., cloud hosts) under strict agreements. All data is encrypted using industry-standard protocols, and we conduct regular security audits.",
  },
  {
    title: "Cookies and Tracking",
    content: "Our site uses cookies for functionality and analytics. You can manage preferences via browser settings. We respect Do Not Track signals.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your data. Contact us at privacy@tinkerteklabs.com for requests. For EU users, GDPR rights apply.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this policy; changes will be posted here with the effective date.",
  },
  {
    title: "Contact Us",
    content: "If you have questions about this Privacy Policy or our privacy practices, please contact us at:",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Navigation Bar */}
      {/* <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/">
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
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Your trust is our priority. Understand how we handle your data securely.
          </p>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary/60" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              <p className="text-foreground/80 leading-relaxed text-[16px]">{section.content}</p>
            </Card>
          ))}
        </div>
      </section>
 <Card className="mx-auto max-w-2xl p-8 mb-7 mt-[-2rem] bg-gradient-to-br from-primary/5 to-muted/20 border-primary/20 text-center">
                  <p className="font-semibold text-foreground">School for Schools</p>
                  <p className="text-foreground/70">Email: privacy@schoolforschools.com</p>
                  <p className="text-foreground/70">Phone: +91 (555) 123-4567</p>
                  <p className="text-foreground/70">Address: 123 Education Street, New Delhi, India 110001</p>
                </Card>
   
      <Footer />
    </div>
  );
}