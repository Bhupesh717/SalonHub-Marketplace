"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Transform Your School?",
  subtitle = "Join thousands of schools worldwide that are already benefiting from our platform.",
  primaryLabel = "Request a Demo",
  primaryLink = "/contact",
  secondaryLabel = "Join / Partner With Us",
  secondaryLink = "/contact",
}) => {
  const router = useRouter();

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 flex-wrap">
          <Button
            size="lg"
            variant="secondary"
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 w-full sm:w-auto"
            onClick={() => router.push(primaryLink)}
          >
            {primaryLabel}
            <ArrowRight className="ml-2" size={20} />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-transparent hover:border-gray-950 w-full sm:w-auto"
            onClick={() => router.push(secondaryLink)}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};
