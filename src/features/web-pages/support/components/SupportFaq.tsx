"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FaqItem } from "../types";

interface SupportFaqProps {
  faqs?: FaqItem[];
}

const FALLBACK_FAQS: FaqItem[] = [
  {
    _id: "faq-1",
    question: "How do I access a digital event programme with SHOWE?",
    answer:
      "Simply point your smartphone's camera at the official SHOWE QR code displayed at the venue entrance, printed on your ticket, or shown on stage displays. The interactive digital programme opens immediately in your mobile browser—no application download or account required to browse.",
  },
  {
    _id: "faq-2",
    question: "How do artists or organisations create and publish interactive programmes?",
    answer:
      "Verified artists, bands, and venues can sign in to the SHOWE Organisation Dashboard. There, you can upload stage setlists, artist biographies, upcoming tour dates, interactive merchandise links, and live social connections with real-time audience engagement metrics.",
  },
  {
    _id: "faq-3",
    question: "What should I do if a QR code isn't scanning properly?",
    answer:
      "Ensure your camera lens is clean and the lighting is sufficient. If your native camera app doesn't automatically detect the link, you can use any standard QR scanner application, or ask venue staff for the direct SHOWE event web shortlink.",
  },
  {
    _id: "faq-4",
    question: "How do Favourites work on SHOWE?",
    answer:
      "When signed into your SHOWE account, tap the Heart icon on any event, venue, or artist profile to add them to your personal 'My Favourites' collection in your dashboard. You will receive updates about new performances, tour announcements, and special programmes.",
  },
  {
    _id: "faq-5",
    question: "How can I report an incorrect listing or request content removal?",
    answer:
      "If you notice an error in an event programme, performer lineup, or venue details, please submit an inquiry through our Backstage Support form above or email us at Backstage@showe.biz with the event link and details.",
  },
  {
    _id: "faq-6",
    question: "Is SHOWE free for attendees to use?",
    answer:
      "Yes, accessing and interacting with digital programmes on SHOWE is 100% free for attendees. You can explore setlists, read performer bios, and save favourites at no cost.",
  },
];

export default function SupportFaq({ faqs = [] }: SupportFaqProps) {
  const effectiveFaqs = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="faq-section" className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-600/5 text-primary-600 text-xs font-black uppercase tracking-widest">
            <HelpCircle size={14} className="text-accent-400" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-primary-600 font-museo tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Quickly resolve common inquiries about digital programmes, artist
            portals, QR codes, and platform features.
          </p>
        </div>

        {/* Accordion Questions */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {effectiveFaqs.map((faq, i) => (
            <AccordionItem
              key={faq._id || i}
              value={faq._id || `item-${i}`}
              className="border border-gray-100 bg-white rounded-3xl px-6 md:px-8 py-2 transition-all hover:border-gray-200 hover:shadow-md data-[state=open]:border-accent-400/30 data-[state=open]:shadow-md data-[state=open]:bg-gray-50/40"
            >
              <AccordionTrigger className="text-left font-bold text-primary-600 hover:no-underline text-base md:text-lg hover:text-accent-400 transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed text-sm md:text-base pt-1 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still Need Assistance CTA Card */}
        <div className="mt-16 p-8 md:p-10 rounded-[36px] bg-linear-to-r from-primary-600 to-[#01353b] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-600/15">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-museo tracking-tight">
              Still have a question?
            </h3>
            <p className="text-white/70 text-sm md:text-base max-w-md">
              Can&apos;t find what you need? Our backstage team is ready to
              assist you directly.
            </p>
          </div>

          <Button
            type="button"
            onClick={scrollToForm}
            className="h-13 px-8 rounded-2xl bg-accent-400 hover:bg-[#e09900] text-white font-bold text-base shadow-lg shadow-accent-400/25 shrink-0 cursor-pointer active:scale-95 transition-all"
          >
            <MessageSquare size={18} />
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

