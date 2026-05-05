"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Banknote, ShieldCheck, ExternalLink, CheckCircle2 } from "lucide-react";
import type { OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { InfoBanner } from "@/components/shared/InfoBanner";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_PAYMENT_BANK_CONNECTED"; value: boolean }) => void;
}

/**
 * Flowchart node: "Go to Payment Setup" + the red "cannot progress if no
 * payment setup done" guard. In production this triggers a Stripe Connect
 * onboarding flow; here we simulate it with a button that flips the bool.
 */
export function StepPaymentSetup({ state, dispatch }: Props) {
    const [connecting, setConnecting] = useState(false);
    const connected = state.payment.bankConnected;

    const handleConnect = () => {
        // In production: redirect to Stripe Connect's OAuth/onboarding URL,
        // then handle the return webhook to flip bankConnected.
        setConnecting(true);
        setTimeout(() => {
            dispatch({ type: "SET_PAYMENT_BANK_CONNECTED", value: true });
            setConnecting(false);
        }, 1400);
    };

    return (
        <StepShell
            eyebrow="Payment setup"
            title="Connect your bank to start receiving payouts"
            subtitle="We use Stripe Connect to handle all transactions securely. Your bank details never touch our servers."
        >
            <div className="space-y-5">
                {!connected ? (
                    <>
                        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#635bff]">
                                    <Banknote size={22} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 mb-1">Stripe Connect</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        Stripe is the world's leading payments platform, trusted by
                                        millions of businesses. Setup takes around 3 minutes — you'll
                                        need your bank details and a form of ID.
                                    </p>
                                    <Button
                                        onClick={handleConnect}
                                        disabled={connecting}
                                        className="bg-[#635bff] hover:bg-[#534ce6] text-white shadow-md"
                                    >
                                        {connecting ? (
                                            "Redirecting…"
                                        ) : (
                                            <>
                                                Connect with Stripe
                                                <ExternalLink size={14} className="ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <InfoBanner variant="lock" title="Non-skippable. Required before any financial action.">
                            You won't be able to publish paid programmes, enable subscriptions,
                            or access financial features in the dashboard until this is complete.
                        </InfoBanner>
                    </>
                ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-emerald-900 mb-1">Bank connected</h3>
                                <p className="text-sm text-emerald-700">
                                    Your Stripe account is linked. Payouts will arrive on your standard
                                    Stripe schedule (typically 2–7 business days).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-3 text-xs text-slate-500 pt-2">
                    <ShieldCheck size={16} className="shrink-0 mt-0.5 text-slate-400" />
                    <p>
                        Your information is encrypted and handled directly by Stripe. SHOWE
                        never sees your full bank details or card numbers.
                    </p>
                </div>
            </div>
        </StepShell>
    );
}