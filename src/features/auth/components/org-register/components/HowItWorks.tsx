"use client";

import { CalendarPlus, Ticket, BarChart3, QrCode, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  onContinue: () => void;
}

export function HowItWorks({ onContinue }: HowItWorksProps) {
  const cards = [
    {
      icon: <CalendarPlus size={24} />,
      title: "CREATE YOUR EVENT",
      description:
        "Set up your event with the essential details, schedule, venue information, and programme content.",
    },
    {
      icon: <Ticket size={24} />,
      title: "LINK TICKET SALES",
      description:
        "Direct audiences seamlessly to your official ticket vendor or box office links right from your event.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "TRACK ENGAGEMENT",
      description:
        "Keep track of programme views, reader interactions, and audience engagement through your dashboard.",
    },
    {
      icon: <QrCode size={24} />,
      title: "QR DOWNLOADS",
      description:
        "Download print-ready QR codes for event signage, brochures, and displays for instant mobile access.",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-xs font-semibold tracking-wide uppercase">
          How It Works
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-museo">
          The SHOWE platform in 30 seconds
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
          Here&apos;s how SHOWE helps you create, manage, and run your events.
        </p>
      </header>

      {/* 2x2 Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-primary-600/40 hover:shadow-md transition-all duration-200 flex flex-col justify-start"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-600 text-accent-400 flex items-center justify-center mb-4 shadow-sm shadow-primary-600/20">
              {card.icon}
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-wide uppercase mb-2">
              {card.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="pt-4">
        <Button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-auto min-w-55 h-13 bg-primary-600 hover:bg-[#013c42] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 cursor-pointer float-right"
        >
          <span>Choose Your Plan</span>
          <ArrowRight size={18} />
        </Button>
        <div className="clear-both" />
      </div>
    </div>
  );
}
