"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Lock,
  Loader2,
  ArrowLeft,
  Check,
  ShieldCheck,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { LegalModal } from "./LegalModal";
import type { PackageItem } from "../types";

interface SubscriptionReviewProps {
  selectedPackage: PackageItem;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  onToggleTerms: (checked: boolean) => void;
  onTogglePrivacy: (checked: boolean) => void;
  onBack: () => void;
}

export function SubscriptionReview({
  selectedPackage,
  agreedToTerms,
  agreedToPrivacy,
  onToggleTerms,
  onTogglePrivacy,
  onBack,
}: SubscriptionReviewProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const canProceed = agreedToTerms && agreedToPrivacy && !isCreatingCheckout;

  const handleCreateCheckout = async () => {
    if (!canProceed) return;

    setIsCreatingCheckout(true);

    try {
      const response = await nextFetch<{ data?: string } | string>(
        "/subscription/stripe",
        {
          method: "POST",
          body: {
            receipt: selectedPackage._id,
          },
        },
      );

      // Response data may be a direct URL string or an object with data property
      const stripeUrl =
        typeof response?.data === "string"
          ? response.data
          : (response?.data as { url?: string })?.url ||
            (response as unknown as { url?: string })?.url;

      if (response?.success && stripeUrl) {
        toast.success("Redirecting to secure Stripe Checkout...");
        // Redirect directly to Stripe Checkout URL (not iframe)
        window.location.href = stripeUrl;
      } else {
        const errorMsg =
          response?.message ||
          (Array.isArray(response?.error) ? response.error[0]?.message : "") ||
          "Unable to create Stripe checkout session. Please try again.";
        toast.error(errorMsg);
        setIsCreatingCheckout(false);
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      toast.error(
        "Network error while creating checkout session. Please try again.",
      );
      setIsCreatingCheckout(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-[#014B52] text-xs font-semibold tracking-wide uppercase">
          Step 4 · Final Review & Agreement
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-museo">
          Review Your Subscription
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Review your selected plan and accept the SHOWE terms to activate your
          organizer account.
        </p>
      </header>

      {/* Selected Plan Summary Box */}
      <div className="p-6 rounded-3xl bg-linear-to-br from-[#014B52] to-[#013138] text-white shadow-xl shadow-[#014B52]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A800]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-[#F5A800] mb-3">
              <ShieldCheck size={14} /> Selected Plan
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {selectedPackage.label}
            </h3>
            <p className="text-white/80 text-sm mt-1 max-w-md">
              {selectedPackage.description}
            </p>
          </div>

          <div className="sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-museo text-[#F5A800]">
                £{selectedPackage.priceMonthly}
              </span>
              <span className="text-white/70 text-sm font-medium">/ month</span>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-wider mt-1">
              Billed monthly via Stripe
            </p>
          </div>
        </div>

        {/* Plan Limits Highlights */}
        <div className="relative pt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-white/60 block">Venues Allowance</span>
            <span className="font-semibold text-white text-sm">
              {selectedPackage.vanues === 0
                ? "Unlimited"
                : `${selectedPackage.vanues} venues`}
            </span>
          </div>
          <div>
            <span className="text-white/60 block">Programmes Allowance</span>
            <span className="font-semibold text-white text-sm">
              {selectedPackage.programmes === 0
                ? "Unlimited"
                : `${selectedPackage.programmes} programmes`}
            </span>
          </div>
          <div>
            <span className="text-white/60 block">
              Selling Digital Programmes
            </span>
            <span className="font-semibold text-[#F5A800] text-sm">
              {selectedPackage.is_proggramme_sell ? "Supported" : "Free only"}
            </span>
          </div>
        </div>
      </div>

      {/* Security & Agreement Section */}
      <div className="space-y-4 pt-2">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Terms & Confirmation
        </h4>

        {/* Checkbox 1: Terms */}
        <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:border-[#014B52]/50 transition-colors bg-white cursor-pointer shadow-xs">
          <Checkbox
            id="terms-checkbox"
            checked={agreedToTerms}
            onCheckedChange={(checked) => onToggleTerms(Boolean(checked))}
            className="mt-0.5 data-[state=checked]:bg-primary-600 data-[state=checked]:border-[#014B52]"
          />
          <div className="text-sm text-slate-700 leading-relaxed">
            I agree to the{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalType("terms");
              }}
              className="text-[#014B52] font-bold underline hover:text-[#F5A800] transition-colors"
            >
              SHOWE Terms & Conditions
            </button>{" "}
            and acknowledge that my organisation is the principal seller of
            published programmes.
          </div>
        </label>

        {/* Checkbox 2: Privacy */}
        <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:border-[#014B52]/50 transition-colors bg-white cursor-pointer shadow-xs">
          <Checkbox
            id="privacy-checkbox"
            checked={agreedToPrivacy}
            onCheckedChange={(checked) => onTogglePrivacy(Boolean(checked))}
            className="mt-0.5 data-[state=checked]:bg-primary-600 data-[state=checked]:border-[#014B52]"
          />
          <div className="text-sm text-slate-700 leading-relaxed">
            I have read and accepted the{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalType("privacy");
              }}
              className="text-[#014B52] font-bold underline hover:text-[#F5A800] transition-colors"
            >
              SHOWE Privacy Policy
            </button>{" "}
            regarding data processing and platform security.
          </div>
        </label>

        {/* Security badge */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-xs text-slate-500">
          <Lock size={15} className="text-slate-400 shrink-0" />
          <span>
            Payment details are securely encrypted and processed directly by
            Stripe. SHOWE does not store payment credentials.
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
        <Button
          type="button"
          onClick={onBack}
          disabled={isCreatingCheckout}
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Plans</span>
        </Button>

        <Button
          type="button"
          disabled={!canProceed}
          onClick={handleCreateCheckout}
          className="w-full sm:w-auto min-w-[240px] h-13 bg-primary-600 hover:bg-[#013c42] text-white font-bold text-base rounded-xl shadow-lg shadow-[#014B52]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isCreatingCheckout ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating secure checkout...</span>
            </>
          ) : (
            <>
              <CreditCard size={18} />
              <span>Continue to Stripe Checkout</span>
            </>
          )}
        </Button>
      </div>

      {/* In-flow legal popup modal */}
      {modalType && (
        <LegalModal
          isOpen={Boolean(modalType)}
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
