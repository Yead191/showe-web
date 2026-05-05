"use client";

import { StepShell } from "@/components/shared/StepShell";
import { COMMISSION_EXAMPLE } from "@/lib/onboarding-data";

/**
 * Flowchart node: "How commission works" — visual breakdown of an example sale.
 * Reads directly from COMMISSION_EXAMPLE so a single source of truth drives
 * both the UI and any future tests.
 */
export function StepCommissionBreakdown() {
    const c = COMMISSION_EXAMPLE;
    const fmt = (n: number) => `£${n.toFixed(2)}`;

    const rows = [
        { label: "Customer pays", value: fmt(c.customerPays), tone: "neutral" },
        { label: "SHOWE commission (10%)", value: `– ${fmt(c.showeCommission)}`, tone: "deduct" },
        { label: "VAT on commission (20%)", value: `– ${fmt(c.vatOnCommission)}`, tone: "deduct" },
        { label: "Stripe fee", value: `– ${fmt(c.stripeFee)}`, tone: "deduct" },
    ];

    return (
        <StepShell
            eyebrow="Worked example"
            title="An example sale, end to end"
            subtitle={`This is what a £${c.customerPays.toFixed(0)} programme sale looks like in practice.`}
        >
            <div className="bg-linear-to-br from-[#014B52] to-[#013138] rounded-3xl p-8 text-white shadow-2xl shadow-[#014B52]/20">
                <div className="space-y-3">
                    {rows.map((r) => (
                        <div
                            key={r.label}
                            className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                        >
                            <span className="text-white/70 text-sm">{r.label}</span>
                            <span
                                className={`font-mono text-base ${r.tone === "deduct" ? "text-rose-300" : "text-white"
                                    }`}
                            >
                                {r.value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-[#F5A800]/30 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-[#F5A800] uppercase font-bold tracking-wider">You receive</p>
                        <p className="text-sm text-white/60 mt-0.5">Settled directly to your bank</p>
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-[#F5A800] font-mono">
                        {fmt(c.organiserReceives)}
                    </span>
                </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-900">
                    <span className="font-bold">Minimum sale price: {fmt(c.minimumSalePrice)}.</span>{" "}
                    To keep the maths reasonable for everyone, programmes must be priced at
                    £2 or above when sold.
                </p>
            </div>
        </StepShell>
    );
}