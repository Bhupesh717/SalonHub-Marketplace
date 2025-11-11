"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useContactStore } from "@/stores/contactStore"

export default function Contact() {
  const { toast } = useToast()
  const { form, loading, setField, submitForm, resetForm } = useContactStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setField(name as keyof typeof form, value)
  }

  const handleSelectChange = (value: string) => {
    setField("subject", value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submitForm(toast)
      resetForm()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1600&h=900&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Have questions about our ERP system or TinkerTek Labs? We'd love to hear from you. Reach out to our team and let's discuss how we can help transform your school.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>Send us an email anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">info@schoolforschools.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  support@schoolforschools.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Mon-Fri from 8am to 5pm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">+1 (555) 987-6543</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>Come say hello at our office</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">123 Education Street</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Learning City, LC 12345
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FORM */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card className="p-8 animate-fade-in-up">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & School Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Phone Number</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+91 (555) 123-4567"
                        value={form.mobile}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        placeholder="Your School Name"
                        value={form.schoolName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Enquiry Type *</Label>
                    <Select value={form.subject} onValueChange={handleSelectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a enquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ERP Inquiry">ERP System Inquiry</SelectItem>
                        <SelectItem value="TinkerTek Inquiry">TinkerTek Labs Inquiry</SelectItem>
                        <SelectItem value="Demo Request">Demo Request</SelectItem>
                        <SelectItem value="Partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="Support">Technical Support</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-sm text-foreground/70 text-center">
                    We respect your privacy. Your information will only be used to respond to your inquiry.
                  </p>
                </form>
              </Card>
            </div>

            {/* MAP SECTION */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Find Us</h2>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=800&fit=crop"
                  alt="Office location"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Office Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
