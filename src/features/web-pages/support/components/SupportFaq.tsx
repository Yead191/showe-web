"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "../types";

interface SupportFaqProps {
  faqs?: FaqItem[];
}

export default function SupportFaq({ faqs = [] }: SupportFaqProps) {
  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent-400 uppercase tracking-[0.3em] mb-3">
            Questions?
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary-600 font-museo">
            Frequently Asked Questions
          </h3>
        </div>

        {faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq._id || i}
                value={faq._id || `item-${i}`}
                className="border border-gray-100 rounded-2xl px-6 py-2 transition-all hover:bg-gray-50/50 data-[state=open]:bg-gray-50 data-[state=open]:border-accent-400/20"
              >
                <AccordionTrigger className="text-left font-bold text-primary-600 hover:no-underline text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed text-base pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No frequently asked questions available at this time.
          </div>
        )}
      </div>
    </section>
  );
}

