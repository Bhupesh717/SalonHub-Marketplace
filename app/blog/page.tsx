'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import backgroundImage from "@/public/school-management-dashboard.png";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  category: string;
  slug: string;
  url: string;
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Digital Transformation in Schools: A Complete Guide",
    excerpt:
      "Explore how schools can leverage ERP systems and AI tools to streamline operations and enhance learning experiences.",
    date: "October 15, 2025",
    readTime: "8 min read",
    author: "Dr. Priya Sharma",
    image: "/modern-classroom-tech.png",
    category: "Education Tech",
    slug: "digital-transformation-schools-guide",
    url: "/blog/digital-transformation-schools-guide",
  },
  {
    id: "2",
    title: "How AI is Revolutionizing Student Learning",
    excerpt:
      "Discover the impact of AI-powered labs on student engagement and future-ready skills development.",
    date: "October 10, 2025",
    readTime: "6 min read",
    author: "Rajesh Kumar",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    category: "AI & Innovation",
    slug: "ai-revolutionizing-student-learning",
    url: "/blog/ai-revolutionizing-student-learning",
  },
  {
    id: "3",
    title: "Building Robotics Labs: Best Practices for Schools",
    excerpt:
      "Step-by-step guide to setting up TinkerTek Labs for hands-on STEM education.",
    date: "October 5, 2025",
    readTime: "10 min read",
    author: "Ms. Anita Desai",
    image: "/students-learning-robotics-ai-lab.jpg",
    category: "STEM Education",
    slug: "building-robotics-labs-schools",
    url: "/blog/building-robotics-labs-schools",
  },
  {
    id: "4",
    title: "The Role of ERP in Modern School Management",
    excerpt:
      "How integrated ERP solutions can reduce administrative burdens by up to 50%.",
    date: "September 28, 2025",
    readTime: "7 min read",
    author: "Finance Head, Modern School",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    category: "School Management",
    slug: "erp-modern-school-management",
    url: "/blog/erp-modern-school-management",
  },
];

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(samplePosts.map((p) => p.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? samplePosts
      : samplePosts.filter((p) => p.category === selectedCategory);

  return (
    <>
    <Header/>
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
            Blog & Articles
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Latest insights on education technology, school management, and innovation in STEM.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border text-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-[8px_8px_0_0_#000] transition-all hover:-translate-y-1 border border-border"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <User size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{post.author}</span>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full text-black border-2 border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link
                href="/blog?page=2"
                className="text-gray-900 hover:text-black hover:border hover:border-black transition-colors"
              >
                Load More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get the latest updates, insights, and resources delivered to your inbox.
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
      <Footer/>
    </>
  );
}
