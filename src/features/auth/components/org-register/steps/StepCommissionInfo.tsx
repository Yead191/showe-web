"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Handshake } from "lucide-react";
import type { OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { InfoBanner } from "@/components/shared/InfoBanner";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "ACCEPT_COMMISSION_TERMS" }) => void;
}

/**
 * Flowchart node: "Commission How SHOWE works" — bullet list explaining the
 * commission model + a Terms & Conditions checkbox the user must tick before
 * they can move on.
 */
export function StepCommissionInfo({ state, dispatch }: Props) {
    const points = [
        "SHOWE will act as an agent for payments and collect funds on your behalf.",
        "We agree to a 10% commission on paid programmes.",
        "VAT will be applied where applicable.",
        "Payments are processed via Stripe Connect — funds settle directly to your account.",
    ];

    return (
        <StepShell
            eyebrow="Commission"
            title="How we handle payments"
            subtitle="If you sell programmes, here's exactly how the money flows. No surprises."
        >
            <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-[#014B52] text-white relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#F5A800]/10 rounded-full blur-2xl" />
                    <div className="relative">
                        <Handshake size={28} className="text-[#F5A800] mb-3" />
                        <ul className="space-y-3">
                            {points.map((p, i) => (
                                <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed">
                                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
                                    <span className="text-white/90">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <InfoBanner variant="warning" title="Required before any financial action">
                    Acceptance of the commission terms is non-skippable. You won't be able
                    to publish paid programmes until this is agreed and your bank is
                    connected via Stripe.
                </InfoBanner>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#014B52] transition-colors cursor-pointer">
                    <Checkbox
                        checked={state.acceptance.commissionTerms}
                        onCheckedChange={(v) => {
                            if (v) dispatch({ type: "ACCEPT_COMMISSION_TERMS" });
                        }}
                        className="mt-0.5 data-[state=checked]:bg-[#014B52] data-[state=checked]:border-[#014B52]"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                        I have read and accept the{" "}
                        <a href="/legal/commission-terms" target="_blank" className="text-[#014B52] font-semibold underline">
                            Commission Terms &amp; Conditions
                        </a>
                        , including the 10% commission rate and VAT treatment described above.
                    </span>
                </label>
            </div>
        </StepShell>
    );
}