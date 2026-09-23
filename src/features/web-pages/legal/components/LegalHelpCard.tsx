import Link from "next/link";
import { HelpCircle, Mail, ArrowRight } from "lucide-react";

export default function LegalHelpCard() {
  return (
    <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-linear-to-br from-[#004242]/5 via-emerald-50/40 to-amber-50/30 border border-[#004242]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#004242] text-accent-400 flex items-center justify-center shrink-0 shadow-sm">
          <HelpCircle size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 text-base sm:text-lg font-museo">
            Questions about our Terms or Privacy Policies?
          </h4>
          <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
            Our compliance and support teams are here to help. Reach out if you need clarification regarding data handling or agreements.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
        <Link
          href="/support"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#004242] hover:bg-[#013c42] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
        >
          <span>Help Centre</span>
          <ArrowRight size={15} />
        </Link>
        <a
          href="mailto:support@showe.app"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all"
        >
          <Mail size={15} />
          <span>Contact Legal</span>
        </a>
      </div>
    </div>
  );
}
