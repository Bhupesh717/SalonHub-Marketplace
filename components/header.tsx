// components/header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/useAuthStore';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();

  // This ensures we only render the auth-dependent UI after mounting (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Salons", href: "/salons" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  // Don't render auth-dependent UI during SSR
  const renderAuthButton = () => {
    if (!isMounted) {
      // Return a placeholder with the same dimensions to prevent layout shift
      return <div className="h-10 w-32" />;
    }

    if (isAuthenticated) {
      return (
        <Link href="/appointment">
          <Button
            variant="default"
            className=" hover:from-pink-600 hover:to-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
          >
            Book Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    }

    return (
      <Link href="/login">
        <Button
          variant="default"
          className=" text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
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
            {renderAuthButton()}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground"
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
            <div className="pt-2">
              {renderAuthButton()}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}