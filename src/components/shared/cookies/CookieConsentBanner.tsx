"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CookiePreferencesModal from "./CookiePreferencesModal";
import {
  getCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  DEFAULT_PREFERENCES,
  OPEN_COOKIE_MODAL_EVENT,
  type CookiePreferences,
} from "./cookieUtils";

export default function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setMounted(true);
    const existing = getCookiePreferences();

    if (existing) {
      setPreferences(existing);
      setShowBanner(false);
    } else {
      // Delay entrance slightly for a smooth, non-jarring appearance
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for programmatic requests to open the preferences modal (e.g. from footer link)
  useEffect(() => {
    const handleOpenModal = () => {
      const current = getCookiePreferences() || DEFAULT_PREFERENCES;
      setPreferences(current);
      setShowModal(true);
    };

    window.addEventListener(OPEN_COOKIE_MODAL_EVENT, handleOpenModal);
    return () =>
      window.removeEventListener(OPEN_COOKIE_MODAL_EVENT, handleOpenModal);
  }, []);

  const handleAcceptAll = () => {
    const saved = acceptAllCookies();
    setPreferences(saved);
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    const saved = rejectNonEssentialCookies();
    setPreferences(saved);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSavedPreferences = (newPrefs: CookiePreferences) => {
    setPreferences(newPrefs);
    setShowBanner(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Consent Banner Card */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 pointer-events-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-6 text-slate-800 relative">
            {/* Close / Dismiss as non-essential */}
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              title="Dismiss & continue with essential only"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3.5 mb-3 pr-6">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary-600 to-[#003838] text-accent-400 flex items-center justify-center shrink-0 shadow-sm">
                <Cookie size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold font-museo text-slate-900 leading-snug">
                  Cookie Preferences
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  We care about your privacy
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              SHOWE uses cookies to ensure platform security, analyze event
              engagement, and personalize your digital programme experiences.
              See our{" "}
              <Link
                href="/privacy"
                className="text-primary-600 font-semibold underline hover:text-primary-700"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCustomize}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary-600 transition-colors py-2 px-1 cursor-pointer order-last sm:order-first"
              >
                <SlidersHorizontal size={14} />
                <span>Customize</span>
              </button>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-none text-xs font-semibold text-slate-700 rounded-xl h-9 px-3.5"
                >
                  Reject Non-Essential
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none text-xs font-semibold bg-primary-600 hover:bg-[#003838] text-white rounded-xl shadow-xs h-9 px-4"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Customization Dialog */}
      <CookiePreferencesModal
        open={showModal}
        onOpenChange={setShowModal}
        currentPreferences={preferences}
        onSaved={handleSavedPreferences}
      />
    </>
  );
}
