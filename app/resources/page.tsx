// app/resources/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, HelpCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import backgroundImage from "@/public/modern-classroom-tech.png";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title:
    "Resources & Learning Center | School for Schools",
  description:
    "Explore blogs, whitepapers, FAQs, and featured articles on education technology, AI in schools, digital transformation, and innovation in STEM education.",
  keywords:
    "education resources, school management blog, AI in education whitepapers, STEM articles, school ERP guides, digital transformation FAQs",
  openGraph: {
    title: "Resources & Learning Center | School for Schools",
    description:
      "Access in-depth articles, whitepapers, and resources to stay ahead in educational innovation and school management.",
    url: "https://schoolforschools.com/resources",
    type: "website",
    images: [
      {
        url: "https://schoolforschools.com/tinkertek/modern-classroom-tech.png", // Replace with actual hero image if available
        width: 1200,
        height: 630,
        alt: "TinkerTek Labs Resources - Blogs, Whitepapers & Educational Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | School for Schools",
    description:
      "Latest insights on edtech, AI labs, and school management. Download whitepapers and read featured articles.",
    images: [
      "https://schoolforschools.com/tinkertek/modern-classroom-tech.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Resources() {
  return (
    <>
      <Header />
      {/* Hero Section */}

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
            Resources & Learning Center
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Explore our collection of blogs, whitepapers, and resources to help
            you make informed decisions
          </p>
        </div>
      </section>
      {/* Resources Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: BookOpen,
                title: "Blog & Articles",
                description:
                  "Latest insights on education technology, school management, and innovation.",
                count: "25+ Articles",
                link: "/blog",
              },
              {
                icon: FileText,
                title: "Whitepapers",
                description:
                  "In-depth guides on digital transformation and best practices in education.",
                count: "8 Whitepapers",
                link: "/",
              },
              {
                icon: HelpCircle,
                title: "FAQs",
                description:
                  "Answers to common questions about our products and services.",
                count: "Comprehensive",
                link: "/faq",
              },
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center hover:shadow-lg transition-shadow animate-fade-in-up border border-gray-200 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={resource.link}
                    className=" w-full h-full flex flex-col items-center justify-center group-hover:text-primary transition-colors"
                  >
                    <Icon className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-primary">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 group-hover:text-foreground/80">
                      {resource.description}
                    </p>
                    <p className="text-sm font-semibold text-black">
                      {resource.count}
                    </p>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Featured Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Digital Transformation in Schools: A Complete Guide",
                  date: "Oct 15, 2024",
                  category: "Education Tech",
                  link: "digital-transformation-schools-guide", // Add actual article paths
                },
                {
                  title: "How AI is Revolutionizing Student Learning",
                  date: "Oct 10, 2024",
                  category: "AI & Innovation",
                  link: "ai-revolutionizing-student-learning",
                },
              ].map((article, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 animate-fade-in-up cursor-pointer border border-gray-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/blog/${article.link}`}>
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.date}</p>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get the latest updates, insights, and resources delivered to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-600"
            />
            <Button className="bg-white text-black hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
