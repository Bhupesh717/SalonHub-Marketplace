// app/refund/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Refund Policy | TinkerTek Labs",
  description: "Details on our refund process for edtech subscriptions and services at TinkerTek Labs.",
  keywords: "refund policy, cancellation, edtech refunds, TinkerTek Labs",
  openGraph: {
    title: "Refund Policy - TinkerTek Labs",
    description: "Clear guidelines for refunds on our AI and ERP tools.",
    url: "https://schoolforschools.com/tinkertek/refund",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        width: 800,
        height: 400,
        alt: "TinkerTek Labs Refund",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy - TinkerTek Labs",
    description: "Hassle-free refunds for eligible purchases.",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Overview",
    content:
      "At GlamSync, we strive to ensure customer satisfaction with every subscription and service. Our Refund Policy is designed to provide clarity and fairness for all salon owners and professionals using our platform. Effective: November 11, 2025.",
  },
  {
    title: "Eligibility for Refunds",
    content:
      "Refunds are available for subscriptions canceled within 14 days of purchase (cooling-off period). Once premium features, credits, or integrations have been used, refunds are no longer applicable. For hardware or POS devices, a full refund may be issued if reported defective within 7 days of delivery.",
  },
  {
    title: "Refund Process",
    content:
      "To request a refund, contact us at support@glamsync.com with your order or subscription details. Our team will review your request within 5 business days. Approved refunds will be processed via the original payment method within 3–10 business days. Partial refunds may apply for prorated subscription periods.",
  },
  {
    title: "Non-Refundable Items",
    content:
      "Digital products, add-ons, or setup and training services are non-refundable once delivered. No refunds are provided after 30 days of active account usage or for renewals already processed.",
  },
  {
    title: "Disputes",
    content:
      "We’re committed to resolving issues amicably. If you experience a billing or service concern, please contact our support team before initiating a dispute with your payment provider.",
  },
  {
    title: "Changes to Policy",
    content:
      "We may update this Refund Policy periodically to reflect service or regulatory updates. Any changes will be posted here, and subscribers will be notified via email when applicable.",
  },
]


export default function RefundPage() {
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
            Refund Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Transparent refunds to support your educational journey.
          </p>
          <div className="flex justify-center">
            <ArrowLeftRight className="h-12 w-12 text-primary" />
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
      {/* <Card className="mx-auto max-w-2xl p-8 mb-7 bg-gradient-to-br from-primary/5 to-muted/20 border-primary/20 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Request a Refund</h2>
        <p className="text-muted-foreground mb-6">Start the process today.</p>
        <Button asChild size="lg">
          <Link href="/contact">Submit Request</Link>
        </Button>
      </Card> */}
      <Footer />
    </div>
  );
}