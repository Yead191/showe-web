"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { TIERS } from "@/lib/onboarding-data";
import type { OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_SUBSCRIPTION_ACTIVE"; value: boolean }) => void;
}

/**
 * Flowchart node: "Setup subscription payments — £40/£75/£150/month".
 * In production this opens Stripe Billing's checkout. Here we mock it to
 * flip subscriptionActive on the wizard state.
 */
export function StepSubscriptionPayment({ state, dispatch }: Props) {
    const [activating, setActivating] = useState(false);
    const tier = TIERS.find((t) => t.id === state.selectedTier);
    const active = state.payment.subscriptionActive;

    if (!tier) return null;

    const subtotal = tier.priceMonthly;
    const vat = subtotal * 0.2;
    const total = subtotal + vat;

    const handleActivate = () => {
        setActivating(true);
        setTimeout(() => {
            dispatch({ type: "SET_SUBSCRIPTION_ACTIVE", value: true });
            setActivating(false);
        }, 1400);
    };

    return (
        <StepShell
            eyebrow="Subscription"
            title="Activate your plan"
            subtitle="Set up monthly billing to unlock your dashboard. Cancel any time from settings."
        >
            <div className="space-y-5">
                {/* Plan summary card */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#014B52] to-[#013138] text-white shadow-xl shadow-[#014B52]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A800]/15 rounded-full blur-3xl" />
                    <div className="relative flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A800] mb-2">
                                Selected plan
                            </p>
                            <h3 className="text-3xl font-bold mb-1">{tier.name}</h3>
                            <p className="text-white/70 text-sm">{tier.tagline}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold font-mono">£{total.toFixed(2)}</p>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Total / month</p>
                        </div>
                    </div>
                </div>

                {!active ? (
                    <>
                        <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50/50">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#635bff]">
                                    <CreditCard size={22} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 mb-1">Payment Breakdown</h3>
                                    
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">{tier.name} Subscription</span>
                                            <span className="font-medium text-slate-700">£{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">VAT (20%)</span>
                                            <span className="font-medium text-slate-700">£{vat.toFixed(2)}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold">
                                            <span className="text-slate-900">Total Monthly</span>
                                            <span className="text-[#014B52]">£{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        Your first payment
                                        of <span className="font-bold text-slate-900">£{total.toFixed(2)}</span> will be
                                        taken today via Stripe Billing.
                                    </p>
                                    
                                    <Button
                                        onClick={handleActivate}
                                        disabled={activating}
                                        className="w-full sm:w-auto bg-[#635bff] hover:bg-[#534ce6] text-white shadow-md h-11 px-8"
                                    >
                                        {activating ? "Activating subscription…" : `Activate & pay £${total.toFixed(2)}`}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs text-slate-500">
                            <Lock size={14} className="shrink-0 mt-0.5 text-slate-400" />
                            <p>Card details are securely processed by Stripe. SHOWE does not store your card information.</p>
                        </div>
                    </>
                ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-emerald-900 mb-1">Subscription active</h3>
                                <p className="text-sm text-emerald-700">
                                    Your {tier.name} plan is live. Your monthly payment of £{total.toFixed(2)} has been scheduled.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StepShell>
    );
}