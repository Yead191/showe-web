"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import type { PackageItem } from "../types";

interface PackageSelectionProps {
  selectedPackage: PackageItem | null;
  onSelectPackage: (pkg: PackageItem) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function PackageSelection({
  selectedPackage,
  onSelectPackage,
  onContinue,
  onBack,
}: PackageSelectionProps) {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await nextFetch<PackageItem[]>("/package", {
        method: "GET",
      });

      if (response?.success && Array.isArray(response?.data)) {
        // Filter only active packages
        const activePackages = response.data.filter(
          (p) => (p.status || "").toLowerCase() === "active",
        );
        setPackages(activePackages);

        // Auto-select recommended or first package if none selected
        if (!selectedPackage && activePackages.length > 0) {
          const rec =
            activePackages.find((p) => p.recommended) || activePackages[0];
          onSelectPackage(rec);
        }
      } else {
        setError(response?.message || "Unable to fetch subscription plans");
      }
    } catch (err) {
      console.error("Failed to load packages:", err);
      setError("Network error while loading plans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-[#014B52] text-xs font-semibold tracking-wide uppercase">
          Step 3 · Subscription Plans
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-museo">
          Choose Your Plan
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select the tier that best matches your venue or organisation scale.
          You can upgrade, downgrade, or cancel anytime.
        </p>
      </header>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 py-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 animate-pulse"
            >
              <div className="h-6 w-24 bg-slate-200 rounded-md" />
              <div className="h-9 w-32 bg-slate-200 rounded-md" />
              <div className="h-14 w-full bg-slate-100 rounded-md" />
              <div className="space-y-2 pt-4 border-t">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
              </div>
              <div className="h-10 w-full bg-slate-200 rounded-xl mt-6" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="p-8 rounded-2xl border border-rose-200 bg-rose-50 text-center space-y-4">
          <p className="text-rose-800 font-semibold">{error}</p>
          <Button
            onClick={fetchPackages}
            variant="outline"
            className="border-rose-300 text-rose-800 hover:bg-rose-100 gap-2 cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </Button>
        </div>
      )}

      {/* Packages Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 pt-2">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?._id === pkg._id;

            return (
              <div
                key={pkg._id}
                onClick={() => onSelectPackage(pkg)}
                className={`relative flex flex-col justify-between p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#F5A800] bg-linear-to-b from-amber-50/40 to-white shadow-xl shadow-amber-500/10 ring-2 ring-[#F5A800]/20"
                    : "border-slate-200/90 bg-white hover:border-primary-600/40 hover:shadow-lg hover:shadow-slate-200/50"
                }`}
              >
                {/* Recommended Badge */}
                {pkg.recommended && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-600 text-[#F5A800] shadow-sm">
                    <Sparkles size={12} /> Most Popular
                  </span>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {pkg.short || "TIER"}
                        </span>
                        {pkg.audience && (
                          <span
                            className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]"
                            title={pkg.audience}
                          >
                            {pkg.audience}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">
                        {pkg.label}
                      </h3>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#F5A800] text-slate-950 shadow-sm"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-museo">
                        £{pkg.priceMonthly}
                      </span>
                      <span className="text-slate-500 text-sm font-medium">
                        / month
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 min-h-[36px] line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Limits & Capabilities Badges */}
                  <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs font-medium text-slate-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Venues Allowed</span>
                      <span className="font-semibold text-slate-800">
                        {pkg.vanues === 0
                          ? "Unlimited"
                          : `${pkg.vanues} venue${pkg.vanues > 1 ? "s" : ""}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Programmes Limit</span>
                      <span className="font-semibold text-slate-800">
                        {pkg.programmes === 0
                          ? "Unlimited"
                          : `${pkg.programmes} programme${pkg.programmes > 1 ? "s" : ""}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Selling Capability</span>
                      <span className="font-semibold text-[#014B52]">
                        {pkg.is_proggramme_sell ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    {pkg.minimum_programme_price &&
                    pkg.minimum_programme_price > 0 ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Min Programme Price
                        </span>
                        <span className="font-semibold text-slate-800">
                          £{pkg.minimum_programme_price}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Features List */}
                  {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        What&apos;s Included
                      </p>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              size={14}
                              className="shrink-0 text-[#014B52] mt-0.5"
                            />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Selection Button */}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(pkg);
                  }}
                  className={`w-full h-11 font-semibold rounded-xl text-sm transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary-600 hover:bg-[#013c42] text-white shadow-md shadow-[#014B52]/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {isSelected ? "Selected Plan" : "Select Plan"}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to How It Works</span>
        </Button>

        <Button
          type="button"
          disabled={!selectedPackage}
          onClick={onContinue}
          className="w-full sm:w-auto min-w-[200px] h-12 bg-primary-600 hover:bg-[#013c42] text-white font-bold rounded-xl shadow-lg shadow-[#014B52]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>Review & Continue</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
