"use client";

import { Sparkles, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="banner"
      className="bg-primary-600 pt-32 pb-20 md:pb-24 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-48 bg-accent-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent-400 text-xs font-black uppercase tracking-[0.25em] shadow-sm">
            <Sparkles size={14} className="animate-pulse" />
            <span>SHOWE Backstage Support</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-museo tracking-tight leading-tight">
            How can we <span className="text-accent-400">help you?</span>
          </h1>

          <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Need assistance with your interactive digital programme, artist
            profile, or account? Explore our help topics below or send a
            direct message to our backstage team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              onClick={() => scrollTo("contact-form")}
              className="h-12 px-7 rounded-2xl bg-accent-400 hover:bg-[#e09900] text-white font-bold text-sm shadow-lg shadow-accent-400/25 cursor-pointer active:scale-95 transition-all gap-2"
            >
              <MessageSquare size={17} />
              Contact Support
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => scrollTo("faq-section")}
              className="h-12 px-7 rounded-2xl bg-white/10 hover:bg-white/20 border-0 text-white font-bold text-sm backdrop-blur-sm cursor-pointer active:scale-95 transition-all gap-2"
            >
              <HelpCircle size={17} />
              View FAQs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
