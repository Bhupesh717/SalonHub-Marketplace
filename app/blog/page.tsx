'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import backgroundImage from "@/public/assets/9292964_2913.jpg";
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
    title: "Digital Transformation in Salons: A Complete Guide",
    excerpt:
      "Explore how modern salons can use all-in-one management platforms to streamline operations, attract more clients, and grow revenue effortlessly.",
    date: "October 15, 2025",
    readTime: "8 min read",
    author: "Sonia Mehta",
    image: "/assets/78804.png",
    category: "Salon Tech",
    slug: "digital-transformation-salons-guide",
    url: "/blog/digital-transformation-salons-guide",
  },
  {
    id: "2",
    title: "How Automation Is Changing the Beauty Industry",
    excerpt:
      "Discover how AI, automation, and smart scheduling tools are helping salons save time, boost client satisfaction, and grow faster.",
    date: "October 10, 2025",
    readTime: "6 min read",
    author: "Rahul Verma",
    image:
      "/assets/78804.png",
    category: "Innovation",
    slug: "automation-changing-beauty-industry",
    url: "/blog/automation-changing-beauty-industry",
  },
  {
    id: "3",
    title: "Building a Loyal Client Base: Proven Salon Strategies",
    excerpt:
      "A step-by-step guide to improving client retention through personalized experiences, loyalty programs, and consistent branding.",
    date: "October 5, 2025",
    readTime: "10 min read",
    author: "Anjali Kapoor",
    image: "/assets/78804.png",
    category: "Business Growth",
    slug: "building-loyal-client-base",
    url: "/blog/building-loyal-client-base",
  },
  {
    id: "4",
    title: "The Power of Data in Salon Management",
    excerpt:
      "Learn how insights and analytics can transform salon operations — from tracking performance to understanding customer behavior.",
    date: "September 28, 2025",
    readTime: "7 min read",
    author: "Vikram Singh",
    image:
      "/assets/78804.png",
    category: "Analytics",
    slug: "power-of-data-in-salon-management",
    url: "/blog/power-of-data-in-salon-management",
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
          <div className="absolute inset-0 bg-black/20" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))" }} />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Latest trends, success stories, and strategies in salon management,
            technology, and business growth.
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
                className="overflow-hidden hover:shadow-[8px_8px_0_0_#831843] transition-all hover:-translate-y-1 border border-border"
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
                  <h3 className="text-xl font-bold text-pink-900 mb-3 hover:text-pink-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <User size={16} className="text-pink-900" />
                    <span className="text-sm text-foreground">{post.author}</span>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full text-pink-900 border-2 border-pink-900 hover:bg-pink-900 hover:text-white transition-colors"
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
                className="text-pink-900 hover:text-pink-900 hover:border hover:border-pink-900 transition-colors"
              >
                Load More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-pink-50 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-900">
            Join the GlamSync Community
          </h2>
          <p className="text-lg opacity-90 mb-8 text-pink-900">
            Get the latest salon business tips, growth hacks, and industry
            insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-pink-900 bg-white text-pink-900 focus:border-pink-900 outline-none focus:ring-2 focus:ring-pink-900 placeholder-gray-600"
            />
            <Button className="bg-pink-900 text-white hover:bg-pink-900 hover:text-white hover:border hover:border-pink-900">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
