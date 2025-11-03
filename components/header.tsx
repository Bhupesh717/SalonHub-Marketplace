"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoRequest from "./demo-request";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "ERP App", href: "/erp" },
    { label: "TinkerTek Labs", href: "/tinkertek" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                SFS
              </div>
              <span className="hidden sm:inline">School for Schools</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                variant="default"
                className="bg-primary hover:bg-primary/90 flex items-center"
              >
                Request a Demo
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden bg-[#f9f9f9]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                variant="default"
                className="w-full mt-4 bg-primary hover:bg-primary/90 flex items-center justify-center"
              >
                Request a Demo
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </nav>
          )}
        </div>
      </header>
      <DemoRequest open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </>
  );
}
