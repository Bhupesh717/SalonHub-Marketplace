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
    content:
      "At GlamSync, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our salon management platform, including client management, booking, and marketing automation tools. Effective: November 11, 2025.",
  },
  {
    title: "Information We Collect",
    content:
      "We collect personal data such as names, contact details, salon information, and usage analytics to provide a customized and seamless experience. For salon clients, this may include appointment history, preferences, and feedback — always collected with consent.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information helps us improve our services, personalize your experience, and ensure smooth salon operations. We use this data to enhance scheduling, marketing automation, and customer engagement. We never sell your information to third parties.",
  },
  {
    title: "Data Sharing and Security",
    content:
      "We only share data with trusted service providers (such as payment gateways or hosting partners) under strict confidentiality agreements. All personal data is encrypted using industry-standard security measures, and we perform regular system audits to maintain protection.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "Our platform uses cookies to ensure smooth functionality and analyze usage patterns. You can control or disable cookies through your browser settings at any time. We fully respect 'Do Not Track' preferences.",
  },
  {
    title: "Your Rights",
    content:
      "You have full control over your data. You can request access, correction, or deletion of your personal information at any time by contacting us at privacy@glamsync.com. Users in regions covered by GDPR or other privacy laws have all applicable rights.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically to reflect improvements or legal updates. Any changes will be posted here with the updated effective date.",
  },
  {
    title: "Contact Us",
    content:
      "For questions or concerns about this Privacy Policy or our data protection practices, please contact us at: privacy@glamsync.com.",
  },
]


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
          <h1 className="text-4xl md:text-5xl font-bold text-pink-900 mb-6 leading-[1.15]">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Your trust is our priority. Understand how we handle your data securely.
          </p>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 border-border">
              <h2 className="text-2xl font-bold text-pink-900 mb-4">{section.title}</h2>
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