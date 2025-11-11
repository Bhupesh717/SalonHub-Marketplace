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
  "digital-transformation-schools-guide": {
    id: "1",
    title: "Digital Transformation in Schools: A Complete Guide",
    excerpt: "Explore how schools can leverage ERP systems and AI tools to streamline operations and enhance learning experiences.",
    content: `
      <h2>Introduction to Digital Transformation</h2>
      <p>Digital transformation is no longer a buzzword—it's a necessity for modern schools. With the rapid evolution of technology, educational institutions must adapt to stay competitive and provide the best learning environments.</p>
      
      <h2>The Role of ERP Systems</h2>
      <p>Enterprise Resource Planning (ERP) systems integrate various school functions into a single platform. From admissions to fee management, ERP reduces administrative burdens and allows educators to focus on teaching.</p>
      
      <ul>
        <li>Streamlined admissions process</li>
        <li>Real-time attendance tracking</li>
        <li>Automated grading and reporting</li>
      </ul>
      
      <h2>Integrating AI and Robotics</h2>
      <p>AI-powered tools like chatbots and personalized learning platforms are revolutionizing student engagement. Combined with robotics labs, they prepare students for future careers in STEM fields.</p>
      
      <blockquote>
        <p>"Technology doesn't replace teachers; it empowers them to teach better." — Anonymous Educator</p>
      </blockquote>
      
      <h2>Challenges and Solutions</h2>
      <p>While implementation can be daunting, starting small with pilot programs ensures smooth adoption. Training staff and involving stakeholders early leads to higher success rates.</p>
      
      <h2>Conclusion</h2>
      <p>Embracing digital transformation positions schools as leaders in education. Contact us to start your journey today.</p>
    `,
    date: "October 15, 2025",
    readTime: "8 min read",
    author: "Dr. Priya Sharma",
    authorBio: "Head of Educational Innovation at TinkerTek Labs, with 15+ years in edtech research.",
    image: "/modern-classroom-tech.png",
    category: "Education Tech",
    slug: "digital-transformation-schools-guide",
    tags: ["ERP", "Digital Transformation", "School Management"],
  },
  "ai-revolutionizing-student-learning": {
    id: "2",
    title: "How AI is Revolutionizing Student Learning",
    excerpt: "Discover the impact of AI-powered labs on student engagement and future-ready skills development.",
    content: `
      <h2>The Dawn of AI in Education</h2>
      <p>Artificial Intelligence is transforming classrooms from passive learning spaces to dynamic, interactive environments tailored to individual needs.</p>
      
      <h2>Personalized Learning Paths</h2>
      <p>AI algorithms analyze student performance to create customized lesson plans, ensuring no child is left behind.</p>
      
      <h2>Hands-On AI Labs</h2>
      <p>With TinkerTek Labs, students build and program AI models, fostering creativity and problem-solving skills essential for the 21st century.</p>
      
      <ul>
        <li>Interactive coding challenges</li>
        <li>Real-world data analysis</li>
        <li>Collaborative AI projects</li>
      </ul>
      
      <h2>Measuring Impact</h2>
      <p>Studies show a 30% increase in retention rates and improved critical thinking when AI is integrated thoughtfully.</p>
      
      <h2>Future Outlook</h2>
      <p>As AI evolves, so will education. Schools adopting these tools today will shape tomorrow's innovators.</p>
    `,
    date: "October 10, 2025",
    readTime: "6 min read",
    author: "Rajesh Kumar",
    authorBio: "AI Specialist at TinkerTek Labs, passionate about ethical AI in education.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "AI & Innovation",
    slug: "ai-revolutionizing-student-learning",
    tags: ["AI", "Student Engagement", "Personalized Learning"],
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
            <Button variant="outline" size="sm" className="gap-2">
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