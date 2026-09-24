"use client";

import { Check, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORGANISATION_DASHBOARD_URL } from "@/constants/links";

export function RegistrationSuccess() {
  return (
    <div className="space-y-6 py-6 text-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
      {/* Success Badge / Emblem */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-3xl bg-primary-600 text-accent-400 flex items-center justify-center shadow-xl shadow-primary-600/20">
          <Check size={44} strokeWidth={3} />
        </div>
        <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-400 text-slate-900 flex items-center justify-center shadow-md">
          <Sparkles size={16} />
        </span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          Registration Complete
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-museo">
          You&apos;re all set!
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Your SHOWE organizer subscription is ready. You can now access your
          organizer dashboard and start managing your events.
        </p>
      </div>

      <div className="pt-4 flex flex-col items-center gap-3">
        <a
          href={ORGANISATION_DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-w-65 h-13 px-8 rounded-xl bg-accent-400 hover:bg-[#e09900] text-slate-950 font-bold text-base shadow-lg shadow-accent-400/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Go to Organizer Portal</span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        <p className="text-xs text-slate-400">
          Redirecting to {ORGANISATION_DASHBOARD_URL}
        </p>
      </div>
    </div>
  );
}
