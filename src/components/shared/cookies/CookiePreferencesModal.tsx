"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BarChart3,
  Sliders,
  Sparkles,
  Cookie,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  saveCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  type CookiePreferences,
} from "./cookieUtils";

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPreferences: CookiePreferences;
  onSaved: (prefs: CookiePreferences) => void;
}

export default function CookiePreferencesModal({
  open,
  onOpenChange,
  currentPreferences,
  onSaved,
}: CookiePreferencesModalProps) {
  const [analytics, setAnalytics] = useState(currentPreferences.analytics);
  const [functional, setFunctional] = useState(currentPreferences.functional);
  const [marketing, setMarketing] = useState(currentPreferences.marketing);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const handleSave = () => {
    const saved = saveCookiePreferences({ analytics, functional, marketing });
    onSaved(saved);
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    const saved = acceptAllCookies();
    setAnalytics(true);
    setFunctional(true);
    setMarketing(true);
    onSaved(saved);
    onOpenChange(false);
  };

  const handleRejectNonEssential = () => {
    const saved = rejectNonEssentialCookies();
    setAnalytics(false);
    setFunctional(false);
    setMarketing(false);
    onSaved(saved);
    onOpenChange(false);
  };

  const sections = [
    {
      id: "necessary",
      icon: <ShieldCheck size={18} className="text-emerald-600" />,
      title: "Strictly Necessary Cookies",
      badge: "Always Active",
      badgeClass: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
      description:
        "These cookies are required for core features like authentication, security verification, shopping cart sessions, and digital programme access. The platform cannot function without them.",
      alwaysActive: true,
      enabled: true,
      onToggle: () => {},
    },
    {
      id: "analytics",
      icon: <BarChart3 size={18} className="text-primary-600" />,
      title: "Analytics & Performance",
      description:
        "These cookies collect aggregated, anonymous data on how visitors interact with event listings, programme pages, and features. They help us pinpoint issues and improve speed and usability.",
      alwaysActive: false,
      enabled: analytics,
      onToggle: setAnalytics,
    },
    {
      id: "functional",
      icon: <Sliders size={18} className="text-accent-500" />,
      title: "Functional & Preferences",
      description:
        "These enable customized digital experiences, such as remembering your programme reader view modes, volume preferences, and saved search filters.",
      alwaysActive: false,
      enabled: functional,
      onToggle: setFunctional,
    },
    {
      id: "marketing",
      icon: <Sparkles size={18} className="text-amber-500" />,
      title: "Marketing & Event Alerts",
      description:
        "These cookies allow us and authorized organizers to highlight premiere shows, discount promotions, and tailored recommendations relevant to your interests.",
      alwaysActive: false,
      enabled: marketing,
      onToggle: setMarketing,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl border-slate-200 bg-white"
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600/10 text-primary-600 flex items-center justify-center shrink-0">
              <Cookie size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold font-museo text-slate-900">
                Cookie Preferences
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Manage how SHOWE collects and utilizes your data
              </DialogDescription>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
            We respect your privacy choices. You can customize which cookie
            categories you permit while using SHOWE. Read our{" "}
            <Link
              href="/privacy"
              onClick={() => onOpenChange(false)}
              className="text-primary-600 font-medium underline hover:text-primary-700"
            >
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>
        </div>

        {/* Scrollable Category Options */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100">
          {sections.map((sec) => (
            <div key={sec.id} className="pt-3.5 first:pt-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-0.5 shrink-0">{sec.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">
                        {sec.title}
                      </span>
                      {sec.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sec.badgeClass}`}
                        >
                          {sec.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
                      {sec.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleExpand(sec.id)}
                      className="text-[11px] text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 font-medium mt-1 cursor-pointer"
                    >
                      <span>
                        {expandedSection === sec.id
                          ? "Show less"
                          : "More details"}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          expandedSection === sec.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="shrink-0 pt-0.5">
                  {sec.alwaysActive ? (
                    <Switch checked={true} disabled={true} />
                  ) : (
                    <Switch
                      checked={sec.enabled}
                      onCheckedChange={sec.onToggle}
                    />
                  )}
                </div>
              </div>

              {expandedSection === sec.id && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed border border-slate-100 flex items-start gap-2">
                  <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>{sec.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleRejectNonEssential}
            className="w-full sm:w-auto text-xs sm:text-sm font-semibold text-slate-700 rounded-xl"
          >
            Reject Non-Essential
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleSave}
              className="flex-1 sm:flex-none text-xs sm:text-sm font-semibold rounded-xl"
            >
              Save Preferences
            </Button>
            <Button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none text-xs sm:text-sm font-semibold bg-primary-600 hover:bg-[#003838] text-white rounded-xl shadow-xs"
            >
              Accept All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
