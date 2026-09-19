"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrganizerRegistration } from "./OrganizerRegistration";

export default function OrganisationRegister() {
  const router = useRouter();

  return (
    <div className="min-h-screen lg:h-screen bg-slate-50 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* ------------------------------------------------------------------
        Left side — SHOWE branding & platform vision (Fixed & Non-scrolling)
      ------------------------------------------------------------------ */}
      <div className="w-full lg:w-2/5 xl:w-1/3 bg-primary-600 relative flex flex-col justify-between p-8 lg:p-12 text-white shrink-0 lg:h-screen lg:overflow-hidden">
        {/* Glow ambient effects */}
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#F5A800]/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-[#F5A800]/5 rounded-full blur-3xl -ml-20 -mb-20" />

        <div className="relative z-10">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-fit p-0 h-auto font-medium"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Button>

          <div className="mt-12 lg:mt-16">
            <Image
              src="/logo.png"
              width={200}
              height={60}
              alt="SHOWE Logo"
              priority
              className="mb-8 h-10 lg:h-12 w-fit object-contain"
            />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A800]/15 text-[#F5A800] text-xs font-bold uppercase tracking-wider mb-4 border border-[#F5A800]/20">
              <Sparkles size={13} />
              <span>Organizer Onboarding</span>
            </div>
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold font-museo leading-tight mb-4 text-white">
              Empower Your <span className="text-[#F5A800]">Organisation</span>{" "}
              With Digital Intelligence.
            </h1>
            <p className="text-sm xl:text-base text-white/80 font-light leading-relaxed">
              Join leading theatres, venues, and live event producers who have
              transformed print programmes into interactive, revenue-generating
              digital experiences.
            </p>
          </div>
        </div>

        {/* Organizer quick portal link & copyright */}
        <div className="relative z-10 pt-8 mt-8 border-t border-white/10 space-y-4">
          <div className="text-xs text-white/70">
            Already registered?{" "}
            <a
              href="https://admin.showe.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5A800] font-semibold underline hover:text-white transition-colors"
            >
              Sign in to Organizer Portal →
            </a>
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} SHOWE Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------
        Right side — Progressive multi-step wizard viewport (Scrollable)
      ------------------------------------------------------------------ */}
      <div className="flex-1 w-full bg-slate-50/50 flex flex-col justify-start items-center p-4 sm:p-8 lg:p-12 overflow-y-auto lg:h-screen">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 my-auto">
          <Suspense
            fallback={
              <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#014B52]" />
                <p className="text-sm text-slate-500">Loading onboarding...</p>
              </div>
            }
          >
            <OrganizerRegistration />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
