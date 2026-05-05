"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartyPopper, ArrowRight, BookOpen, Settings, Wallet, Terminal } from "lucide-react";
import { TIERS } from "@/lib/onboarding-data";
import type { OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";

interface Props {
    state: OnboardingState;
}

/**
 * Flowchart node: "Go to Dashboard with access to..." — the terminal node.
 * Different account types land here in different states; we render a summary
 * of what was set up plus the recommended next actions.
 */
export function StepComplete({ state }: Props) {
    const tier = TIERS.find((t) => t.id === state.selectedTier);
    const orgName = state.org.organisationName ?? "your organisation";

    const summaryRows = [
        state.accountType && {
            label: "Account type",
            value:
                state.accountType === "venue"
                    ? "Venue"
                    : state.accountType === "producer"
                        ? "Producer"
                        : "School / College / Amateur",
        },
        tier && { label: "Plan", value: `${tier.name} — £${tier.priceMonthly}/mo` },
        state.payment.bankConnected && { label: "Stripe", value: "Bank connected" },
        state.payment.subscriptionActive && {
            label: "Subscription",
            value: "Active",
        },
    ].filter(Boolean) as { label: string; value: string }[];

    return (
        <StepShell
            eyebrow="All done"
            title={`Welcome aboard, ${orgName}`}
            subtitle="Your account is ready. Here's what's next."
        >
            <div className="space-y-6">
                {/* Hero card */}
                <div className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-[#014B52] via-[#015d65] to-[#013138] text-white">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F5A800]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#F5A800]/10 rounded-full blur-3xl" />
                    <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-[#F5A800] text-[#014B52] flex items-center justify-center mb-4 shadow-lg">
                            <PartyPopper size={26} />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">You're set up.</h3>
                        <p className="text-white/70 max-w-md">
                            Head into the dashboard to build your first programme. We've sent a
                            copy of your account details to{" "}
                            <span className="font-semibold text-white">{state.org.email}</span>.
                        </p>
                    </div>
                </div>

                {/* Console hint — remove this card in production */}
                {/* <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-100 border border-slate-800">
                    <Terminal size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-semibold text-emerald-400 font-mono text-xs uppercase tracking-wider mb-0.5">
                            Dev mode
                        </p>
                        <p className="text-slate-300">
                            The full collected payload has been logged to the browser console.
                            Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono">F12</kbd>{" "}
                            to inspect it.
                        </p>
                    </div>
                </div> */}

                {/* Summary */}
                {summaryRows.length > 0 && (
                    <div className="rounded-2xl border border-slate-100 overflow-hidden">
                        {summaryRows.map((r, i) => (
                            <div
                                key={r.label}
                                className={`flex items-center justify-between px-5 py-3 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"
                                    }`}
                            >
                                <span className="text-sm text-slate-500">{r.label}</span>
                                <span className="text-sm font-semibold text-slate-900">{r.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Next actions */}
                <div className="grid sm:grid-cols-3 gap-3">
                    <NextAction
                        icon={<BookOpen size={18} />}
                        title="Build your first programme"
                        description="The fastest way to learn is by doing."
                    />
                    <NextAction
                        icon={<Settings size={18} />}
                        title="Customise your branding"
                        description="Add your logo, colours and fonts."
                    />
                    <NextAction
                        icon={<Wallet size={18} />}
                        title="Review billing settings"
                        description="Manage your plan and invoices."
                    />
                </div>

                {/* CTA */}
                <Button
                    asChild
                    className="w-full h-14 bg-[#F5A800] hover:bg-[#e09900] text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99]"
                >
                    <Link href="/dashboard">
                        Go to dashboard
                        <ArrowRight size={20} className="ml-2" />
                    </Link>
                </Button>
            </div>
        </StepShell>
    );
}

function NextAction({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#014B52] mb-2">
                {icon}
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
        </div>
    );
}