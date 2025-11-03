import type React from "react"
import type { Metadata } from "next"
import { Inter } from "@next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotWidget } from "@/components/chatbot-widget"
import WhatsAppButton from "@/components/WhatsAppButton"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "School for Schools - Transforming Education with Technology",
  description:
    "School for Schools (SFS) provides innovative ERP solutions and AI-powered learning labs for modern education. Empower your school with cutting-edge technology.",
  keywords: "school management, ERP system, education technology, AI learning, robotics labs, school software",
  generator: "v0.app",
  metadataBase: new URL("https://schoolforschools.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schoolforschools.com",
    siteName: "School for Schools",
    title: "School for Schools - Transforming Education with Technology",
    description: "Innovative ERP solutions and AI-powered learning labs for modern education",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "School for Schools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School for Schools - Transforming Education with Technology",
    description: "Innovative ERP solutions and AI-powered learning labs for modern education",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://schoolforschools.com" />
        {/* ✅ Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "School for Schools",
              "url": "https://schoolforschools.com",
              "logo": "https://schoolforschools.com/logo.png",
              "description":
                "School for Schools (SFS) provides innovative ERP and AI-powered learning solutions for modern education.",
              "sameAs": [
                "https://www.facebook.com/schoolforschools",
                "https://www.instagram.com/schoolforschools",
                "https://www.linkedin.com/company/schoolforschools"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "Customer Support",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              }
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased ${inter.className}`}>
        {children}
        <Analytics />
        <Toaster />
        <ChatbotWidget />
        {/* <WhatsAppButton /> */}
      </body>
    </html>
  )
}
