// components/FAQAccordion.tsx
'use client';

import React from "react";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full space-y-4"
    >
      {faqs.map((faq, index) => (
        <AccordionPrimitive.Item key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className="
                flex flex-1 items-center justify-between bg-[#f9f9f9] p-4 text-sm font-medium
                transition-all hover:bg-muted/50
                [&[data-state=open]>svg]:rotate-180
              "
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs bg-[#f9f9f9]">
                  {faq.category}
                </Badge>
                <span className="text-left">{faq.question}</span>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="p-4 pt-0 text-muted-foreground">
              {faq.answer}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}