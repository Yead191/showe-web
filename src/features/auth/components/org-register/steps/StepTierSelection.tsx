"use client";

import { Check, Sparkles } from "lucide-react";
import { TIERS } from "@/lib/onboarding-data";
import type { OnboardingState, SubscriptionTier } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_TIER"; value: SubscriptionTier }) => void;
}

/**
 * Flowchart node: "Tier Information & selection".
 * Three cards — Presence / Engage / Amplify. Sellers (those who took the
 * payment-setup branch) need at least Tier 3 to charge audiences, so we lock
 * the lower tiers when state.usageIntent === "sell_programmes".
 */
export function StepTierSelection({ state, dispatch }: Props) {
    const sellerLockedToT3 = state.usageIntent === "sell_programmes";

    return (
        <StepShell
            eyebrow="Choose your plan"
            title="Pick the tier that fits today"
            subtitle="You can upgrade or downgrade any time from the dashboard. All plans bill monthly with no long-term commitment."
        >
            <div className="grid lg:grid-cols-3 gap-4">
                {TIERS.map((t) => {
                    const isLocked = sellerLockedToT3 && t.id !== "tier3";
                    const isSelected = state.selectedTier === t.id;

                    return (
                        <button
                            key={t.id}
                            type="button"
                            disabled={isLocked}
                            onClick={() => dispatch({ type: "SET_TIER", value: t.id })}
                            aria-pressed={isSelected}
                            className={`relative text-left rounded-3xl p-6 border-2 transition-all duration-300
                ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}
                ${isSelected
                                    ? "border-[#F5A800] bg-linear-to-br from-amber-50 to-white shadow-xl shadow-amber-100"
                                    : "border-slate-200 bg-white"
                                }
                ${t.recommended && !isSelected ? "border-[#014B52]/30" : ""}
              `}
                        >
                            {t.recommended && (
                                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#014B52] text-white">
                                    <Sparkles size={10} /> Most popular
                                </span>
                            )}
                            {isSelected && (
                                <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#F5A800] text-white flex items-center justify-center">
                                    <Check size={14} strokeWidth={3} />
                                </span>
                            )}

                            <div className="mb-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {t.id === "tier1" ? "Tier 1+" : t.id === "tier2" ? "Tier 2" : "Tier 3"}
                                </p>
                                <h3 className="text-2xl font-bold text-[#014B52] mt-1">{t.name}</h3>
                                <p className="text-sm text-slate-500 mt-1 min-h-[40px]">{t.tagline}</p>
                            </div>

                            <div className="mb-5">
                                <span className="text-4xl font-bold text-slate-900">£{t.priceMonthly}</span>
                                <span className="text-sm text-slate-500 ml-1">/ month</span>
                            </div>

                            <ul className="space-y-2 mb-2 text-sm">
                                {t.features.map((f) => (
                                    <li key={f} className="flex gap-2 text-slate-700">
                                        <Check size={16} className="shrink-0 mt-0.5 text-[#014B52]" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-[11px] text-slate-400 mt-4 pt-4 border-t border-slate-100">
                                Includes modules: {t.modules.join(", ")}
                            </p>

                            {isLocked && (
                                <p className="absolute inset-x-6 bottom-4 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-md text-center">
                                    Selling programmes requires Tier 3
                                </p>
                            )}
                        </button>
                    );
                })}
            </div>
        </StepShell>
    );
}