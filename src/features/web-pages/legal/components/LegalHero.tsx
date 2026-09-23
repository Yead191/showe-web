"use client";

import { Share2, Printer, Check, ShieldCheck, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LegalDocConfig } from "../types";

interface LegalHeroProps {
  config: LegalDocConfig;
}

export default function LegalHero({ config }: LegalHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isTerms = config.category === "terms";

  return (
    <section
      id="banner"
      className="bg-primary-600 pt-32 pb-20 relative overflow-hidden text-white"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-36 -mt-36 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400/10 rounded-full -ml-40 -mb-40 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-semibold text-accent-400 tracking-wider uppercase">
            {isTerms ? <FileText size={14} /> : <ShieldCheck size={14} />}
            <span>SHOWE Legal & Compliance</span>
            <span className="w-1 h-1 rounded-full bg-accent-400" />
            <span className="text-white/90">{config.badge}</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-museo tracking-tight text-white">
              {config.title}{" "}
              <span className="text-accent-400 block sm:inline">
                ({config.shortAudience})
              </span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Action Bar: Audience Tag + Copy/Print Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 text-white/85 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {config.audienceLabel}
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer font-medium"
              title="Copy page link"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer font-medium"
              title="Print policy"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
