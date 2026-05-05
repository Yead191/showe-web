"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Scale } from "lucide-react";
import { TIERS } from "@/lib/onboarding-data";
import type { OnboardingState } from "@/types/onboarding";
import { InfoBanner } from "@/components/shared/InfoBanner";
import { StepShell } from "@/components/shared/StepShell";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "ACCEPT_TIER_TERMS" }) => void;
}

/**
 * Flowchart node: "Confirm acceptance of Terms & Conditions" (post tier select).
 * Three required acknowledgements per the flowchart:
 *   - SHOWE acts as agent
 *   - You are the principal seller
 *   - You are responsible for refunds (aligned with Stripe Connect model)
 */
export function StepTierTerms({ state, dispatch }: Props) {
    const tier = TIERS.find((t) => t.id === state.selectedTier);

    const clauses = [
        {
            title: "SHOWE acts as your agent",
            body: "We collect payments on your behalf and remit them to your Stripe account, minus our commission and applicable fees.",
        },
        {
            title: "You are the principal seller",
            body: "Each programme sold is a sale by your organisation. Your name appears on receipts; you set the prices.",
        },
        {
            title: "You are responsible for refunds",
            body: "Refund decisions sit with you. The Stripe Connect model means refunds come out of your settled balance, not ours.",
        },
    ];

    return (
        <StepShell
            eyebrow="Almost there"
            title="Review and accept the subscription terms"
            subtitle={
                tier
                    ? `You've chosen ${tier.name} at £${tier.priceMonthly}/month. Here's what you're agreeing to.`
                    : "Read each clause and accept to continue."
            }
        >
            <div className="space-y-5">
                <div className="space-y-3">
                    {clauses.map((c) => (
                        <div key={c.title} className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="shrink-0 w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#014B52]">
                                <Scale size={18} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-0.5 text-sm">{c.title}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <InfoBanner variant="warning" title="Required before any financial action">
                    You can't activate your subscription or publish anything until these terms
                    are accepted.
                </InfoBanner>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#014B52] transition-colors cursor-pointer">
                    <Checkbox
                        checked={state.acceptance.tierTerms}
                        onCheckedChange={(v) => {
                            if (v) dispatch({ type: "ACCEPT_TIER_TERMS" });
                        }}
                        className="mt-0.5 data-[state=checked]:bg-[#014B52] data-[state=checked]:border-[#014B52]"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                        I confirm that I have read and accept the three clauses above and the
                        full{" "}
                        <a href="/legal/terms" target="_blank" className="text-[#014B52] font-semibold underline">
                            SHOWE Subscription Terms
                        </a>
                        .
                    </span>
                </label>
            </div>
        </StepShell>
    );
}