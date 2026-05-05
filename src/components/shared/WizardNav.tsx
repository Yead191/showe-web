"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardNavProps {
    onBack?: () => void;
    onNext: () => void;
    canGoBack?: boolean;
    canProceed: boolean;
    /** Reason shown as a tooltip / hint when canProceed is false */
    blockReason?: string;
    isLast?: boolean;
    isLoading?: boolean;
    nextLabel?: string;
}

/**
 * Navigation row at the bottom of every step. Disabling logic comes from the
 * `canProceed` gate in the wizard hook so the rules live in one place.
 */
export function WizardNav({
    onBack,
    onNext,
    canGoBack = true,
    canProceed,
    blockReason,
    isLast,
    isLoading,
    nextLabel,
}: WizardNavProps) {
    return (
        <div className="pt-8 mt-8 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onBack}
                    disabled={!canGoBack || isLoading}
                    className="text-slate-600 hover:text-[#014B52] hover:bg-slate-100 -ml-3"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                </Button>

                <Button
                    type="button"
                    onClick={onNext}
                    disabled={!canProceed || isLoading}
                    className="h-12 px-8 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold rounded-xl
                     transition-all shadow-md hover:shadow-lg active:scale-[0.98]
                     disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                    {isLoading ? (
                        "Please wait…"
                    ) : isLast ? (
                        <>
                            <Check size={18} className="mr-2" />
                            {nextLabel ?? "Finish"}
                        </>
                    ) : (
                        <>
                            {nextLabel ?? "Continue"}
                            <ArrowRight size={18} className="ml-2" />
                        </>
                    )}
                </Button>
            </div>

            {!canProceed && blockReason && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                    {blockReason}
                </p>
            )}
        </div>
    );
}