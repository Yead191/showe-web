"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import type { FaqItem } from "@/features/web-pages/support/types";

export interface LandingFAQProps {
  faqs?: FaqItem[];
}

export default function LandingFAQ({ faqs = [] }: LandingFAQProps) {
  return (
    <section id="support" className="bg-[#004242] pt-20 lg:pt-32 ">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-b-2 border-[#5E8792] pb-20 lg:pb-32">
        {/* Left Side: Title & Contact */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-museo leading-tight">
              Frequently Asked
              <br />
              Question
            </h2>
          </div>

          <div className="space-y-6 pt-12 border-t border-white/20">
            <p className="text-gray-300 text-sm max-w-70">
              Can&apos;t find the ans you&apos;re looking for? We are here for
              help
            </p>
            <Link href={"/support"}>
              <Button
                variant="outline"
                className="text-white hover:bg-white/10 hover:text-white h-12 px-6 gap-3 bg-transparent"
              >
                Get in touch
                <MessageCircle className="size-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="bg-transparent">
          {faqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3 w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq._id || index}
                  value={faq._id || `item-${index}`}
                  className="bg-[#F8F9FA] rounded-sm border-none overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-[#1C1C1C] hover:no-underline text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-[#494949] leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-gray-300">
              No frequently asked questions available at this time.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
