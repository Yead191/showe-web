import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from 'next/link';

const FAQ_DATA = [
  {
    question: "How do I buy a ticket?",
    answer: "You can buy a ticket by clicking the 'Book Your Ticket' button on any event page. Simply follow the checkout process and your digital program will be delivered instantly."
  },
  {
    question: "Can I get a refund if I can't attend?",
    answer: "Refund policies vary by event organizer. Please check the specific event terms or contact the organizer directly through the platform."
  },
  {
    question: "Do I need to print my ticket?",
    answer: "No! SHOWE is entirely digital. Your ticket and program are accessible via QR code on your mobile device."
  },
  {
    question: "How do I know if an event is genuine?",
    answer: "We verify event organizers and use secure payment processing to ensure all events listed on SHOWE are legitimate."
  },
  {
    question: "How do I list my event?",
    answer: "Click on 'Become a Creator' in the navigation menu to start listing your events and creating digital programs today."
  },
  {
    question: "How does affiliate marketing work for my event?",
    answer: "Our platform includes built-in affiliate tools that allow you to partner with influencers and promoters to expand your event's reach."
  }
];

export default function LandingFAQ() {
  return (
    <section id='support' className="bg-[#004242] pt-20 lg:pt-32 ">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-b-2 border-[#5E8792] pb-20 lg:pb-32">
        {/* Left Side: Title & Contact */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-museo leading-tight">
              Frequently Asked<br />Question
            </h2>
          </div>

          <div className="space-y-6 pt-12 border-t border-white/20">
            <p className="text-gray-300 text-sm max-w-[280px]">
              Can't find the ans you're looking for? We are here for help
            </p>
            <Link href={'/support'}>

              <Button variant="outline" className="text-white hover:bg-white/10 hover:text-white h-12 px-6 gap-3 bg-transparent">
                Get in touch
                <MessageCircle className="size-5" />
              </Button>

            </Link>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="bg-transparent">
          <Accordion type="single" collapsible className="space-y-3 w-full">
            {FAQ_DATA.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
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
        </div>
      </div>
    </section>
  );
}
