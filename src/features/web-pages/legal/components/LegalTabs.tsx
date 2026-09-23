import Link from "next/link";
import { FileText, ShieldCheck, User, Building2 } from "lucide-react";
import type { LegalDocConfig } from "../types";

interface LegalTabsProps {
  config: LegalDocConfig;
}

export default function LegalTabs({ config }: LegalTabsProps) {
  const isTerms = config.category === "terms";
  const isPrivacy = config.category === "privacy";
  const isUser = config.audience === "user";
  const isOrg = config.audience === "organizer";

  return (
    <div className="w-full max-w-5xl mx-auto -mt-8 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-3 sm:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Document Category Toggle */}
          <div className="flex items-center w-full md:w-auto p-1 bg-slate-100 rounded-xl">
            <Link
              href={`/terms/${config.audience}`}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isTerms
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <FileText size={16} />
              <span>Terms & Conditions</span>
            </Link>

            <Link
              href={`/privacy/${config.audience}`}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isPrivacy
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <ShieldCheck size={16} />
              <span>Privacy Policy</span>
            </Link>
          </div>

          {/* Audience Segment Toggle */}
          <div className="flex items-center w-full md:w-auto p-1 bg-slate-100 rounded-xl">
            <Link
              href={`/${config.category}/user`}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isUser
                  ? "bg-white text-primary-600 shadow-sm border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <User size={16} />
              <span>For Users</span>
            </Link>

            <Link
              href={`/${config.category}/organizer`}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isOrg
                  ? "bg-white text-primary-600 shadow-sm border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Building2 size={16} />
              <span>For Organizers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
