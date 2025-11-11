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
  title: "Salon Marketplace",
  description:
    "Salon Marketplace - Find the best salons and services",
  keywords: "salon marketplace, salon management, salon software, salon booking, salon appointment",
  generator: "v0.app",
  metadataBase: new URL("https://salonmarketplace.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salonmarketplace.com",
    siteName: "Salon Marketplace",
    title: "Salon Marketplace - Find the best salons and services",
    description: "Salon Marketplace - Find the best salons and services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salon Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Marketplace - Find the best salons and services",
    description: "Salon Marketplace - Find the best salons and services",
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
        <link rel="canonical" href="https://salonmarketplace.com" />
        {/* ✅ Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Salon Marketplace",
              "url": "https://salonmarketplace.com",
              "logo": "https://salonmarketplace.com/logo.png",
              "description":
                "Salon Marketplace - Find the best salons and services",
              "sameAs": [
                "https://www.facebook.com/salonmarketplace",
                "https://www.instagram.com/salonmarketplace",
                "https://www.linkedin.com/company/salonmarketplace"
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
