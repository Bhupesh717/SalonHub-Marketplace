// app/blog/[slug]/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  authorBio: string;
  image: string;
  category: string;
  slug: string;
  tags: string[];
}

const samplePosts: Record<string, BlogPost> = {
   "digital-transformation-salons-guide": {
    id: "1",
    title: "Digital Transformation in Salons: A Complete Guide",
    excerpt:
      "Discover how modern salons are embracing technology to streamline operations, improve customer experience, and boost revenue.",
    content: `
      <h2>Introduction</h2>
      <p>In today’s fast-paced beauty industry, technology is no longer a luxury — it’s a necessity. From online bookings to AI-driven client insights, digital transformation helps salons stay competitive and efficient.</p>

      <h2>Why Digital Transformation Matters</h2>
      <p>Clients expect convenience, personalization, and instant access. Modern salon software enables owners to meet these expectations with ease.</p>

      <ul>
        <li>Automated appointment scheduling</li>
        <li>Inventory tracking and supplier integration</li>
        <li>Personalized marketing campaigns</li>
      </ul>

      <h2>Key Areas of Transformation</h2>
      <p>Automation tools, client relationship systems, and real-time data dashboards empower salon owners to make smarter business decisions.</p>

      <blockquote>
        <p>"The future of beauty is digital — and it starts with smart salon management."</p>
      </blockquote>

      <h2>How to Get Started</h2>
      <p>Begin with small steps: introduce digital bookings, use cloud-based billing, and collect client feedback through digital forms. Gradual adoption ensures smoother transitions for your team.</p>

      <h2>Conclusion</h2>
      <p>Salons that embrace digital transformation gain happier clients, improved operations, and a competitive edge. It’s time to bring your salon into the future.</p>
    `,
    date: "November 11, 2025",
    readTime: "7 min read",
    author: "Aarav Kapoor",
    authorBio: "Salon technology consultant helping beauty brands go digital.",
    image: "/blog/digital-salon-transformation.jpg",
    category: "Salon Tech",
    slug: "digital-transformation-in-salons",
    tags: ["Digital", "Automation", "Salon Software"],
  },

  "automation-changing-beauty-industry": {
    id: "2",
    title: "How Automation Is Changing the Beauty Industry",
    excerpt:
      "From smart booking systems to AI-driven marketing, automation is redefining how beauty businesses operate and grow.",
    content: `
      <h2>Introduction</h2>
      <p>Automation is reshaping every corner of the beauty world. With the right tools, salon owners can save time, reduce costs, and deliver a better client experience.</p>

      <h2>Smart Booking & Scheduling</h2>
      <p>No more double bookings or missed appointments. Automated systems handle reminders, reschedules, and confirmations — freeing up your staff’s time.</p>

      <h2>Client Retention Through AI</h2>
      <p>AI tools analyze client habits, predict booking trends, and even suggest personalized service recommendations. This creates a unique, data-backed customer journey.</p>

      <h2>Inventory & Staff Management</h2>
      <ul>
        <li>Track products in real-time</li>
        <li>Set alerts for low stock</li>
        <li>Optimize staff schedules automatically</li>
      </ul>

      <blockquote>
        <p>"Automation isn’t about replacing people — it’s about empowering them to focus on what they do best."</p>
      </blockquote>

      <h2>Conclusion</h2>
      <p>From front desk operations to marketing, automation makes running a salon smoother, faster, and more client-focused. It’s the secret weapon of modern beauty businesses.</p>
    `,
    date: "November 8, 2025",
    readTime: "6 min read",
    author: "Simran Joshi",
    authorBio: "Beauty industry strategist and salon automation expert.",
    image: "/blog/automation-in-salons.jpg",
    category: "Automation",
    slug: "automation-changing-beauty-industry",
    tags: ["Automation", "AI", "Salon Growth"],
  },

  "building-loyal-client-base": {
    id: "3",
    title: "Building a Loyal Client Base: Proven Salon Strategies",
    excerpt:
      "Client loyalty is the heart of any successful salon. Learn how to turn first-time visitors into lifelong clients with trust, care, and smart engagement.",
    content: `
      <h2>Introduction</h2>
      <p>In the salon business, retention beats acquisition. Loyal clients not only return frequently but also become your biggest promoters. Let’s explore proven methods to build lasting relationships.</p>

      <h2>1. Personalization Is Key</h2>
      <p>Use client data to remember preferences — from favorite stylists to preferred treatments. A personalized experience shows that you truly care.</p>

      <h2>2. Loyalty Programs That Work</h2>
      <p>Reward repeat visits with discounts, exclusive offers, or free add-on services. Automated systems make loyalty tracking seamless.</p>

      <h2>3. Consistent Communication</h2>
      <p>Send gentle reminders, festive greetings, and product tips. Clients love thoughtful engagement that isn’t overly promotional.</p>

      <blockquote>
        <p>"Loyal clients don’t just love your services — they trust your brand."</p>
      </blockquote>

      <h2>4. Ask for Feedback</h2>
      <p>Encourage honest reviews and take action. Responding to feedback publicly builds credibility and shows you value improvement.</p>

      <h2>Conclusion</h2>
      <p>With genuine care, smart tools, and consistent service, your salon can turn every client visit into a relationship that lasts for years.</p>
    `,
    date: "November 5, 2025",
    readTime: "7 min read",
    author: "Rhea Nair",
    authorBio: "Salon marketing specialist and client experience coach.",
    image: "/blog/building-loyal-salon-clients.jpg",
    category: "Salon Growth",
    slug: "building-loyal-client-base",
    tags: ["Client Retention", "Salon Marketing", "Loyalty"],
  },

  "power-of-data-in-salon-management": {
    id: "4",
    title: "The Power of Data in Salon Management",
    excerpt:
      "Learn how data-driven insights can help your salon grow smarter, predict trends, and improve profitability.",
    content: `
      <h2>Introduction</h2>
      <p>Every salon generates data — from bookings to product sales. The question is, how do you use it to grow your business? That’s where data-driven management comes in.</p>

      <h2>Understanding Your Clients</h2>
      <p>Analyzing booking patterns, service frequency, and preferred treatments helps you tailor offerings to each client segment.</p>

      <h2>Boosting Profitability with Analytics</h2>
      <ul>
        <li>Identify top-performing stylists</li>
        <li>Track inventory turnover</li>
        <li>Forecast peak hours for better staffing</li>
      </ul>

      <h2>Predicting Future Trends</h2>
      <p>Data helps salons spot upcoming beauty trends early. From new color styles to popular treatments, predictive insights keep you ahead of the curve.</p>

      <blockquote>
        <p>"Data is the new beauty secret — it reveals what your business truly needs."</p>
      </blockquote>

      <h2>Conclusion</h2>
      <p>Using data strategically turns guesswork into growth. With the right tools, your salon can operate smarter, serve better, and grow faster.</p>
    `,
    date: "November 2, 2025",
    readTime: "6 min read",
    author: "Tanvi Deshmukh",
    authorBio: "Business analyst and salon software consultant.",
    image: "/blog/salon-data-management.jpg",
    category: "Salon Insights",
    slug: "power-of-data-in-salon-management",
    tags: ["Salon Analytics", "Data Insights", "Management"],
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = samplePosts[params.slug];
  if (!post) {
    return {
      title: "Blog Post Not Found | TinkerTek Labs",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: `${post.title} | TinkerTek Labs Blog`,
    description: post.excerpt,
    keywords: [...post.tags, post.category, "edtech", "STEM education", "school innovation"].join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://schoolforschools.com/tinkertek/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 800, height: 400, alt: post.title }],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(samplePosts).map((slug) => ({
    slug,
  }));
}

export default function BlogPost({ params }: Props) {
  const post = samplePosts[params.slug];

  if (!post) {
    notFound();
  }

 const renderContent = () => {
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-p:leading-relaxed prose-p:mb-6
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary 
                prose-blockquote:pl-4 prose-blockquote:my-6
                prose-a:text-primary hover:prose-a:underline
                prose-strong:font-semibold
                prose-img:rounded-lg prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
};

  return (
    <div className="min-h-screen bg-background">
        <Header />
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2 text-black">
              <Link href="/blog">
                <ArrowLeft size={18} />
                Back to Blog
              </Link>
            </Button>
            <Button variant="default" size="lg" className="gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 pb-0 md:pt-12 md:pb-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Category Badge */}
          <div className="mb-6">
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border mb-8">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Featured Image */}
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {renderContent()}

          {/* Divider */}
          <div className="my-12 border-t border-border" />

          {/* Tags */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <Card className="p-8 bg-gradient-to-br from-muted/30 to-muted/10 border-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-primary/20">
                <User size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Written by
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-2">{post.author}</h3>
                <p className="text-muted-foreground leading-relaxed">{post.authorBio}</p>
              </div>
            </div>
          </Card>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Continue Reading
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore more insights and stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.values(samplePosts)
              .filter(p => p.slug !== params.slug)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={relatedPost.image.replace('800&h=400', '400&h=300')}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground hover:bg-background">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {relatedPost.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {relatedPost.date}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}