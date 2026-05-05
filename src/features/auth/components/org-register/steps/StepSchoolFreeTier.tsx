"use client";

import { InfoBanner } from "@/components/shared/InfoBanner";
import { StepShell } from "@/components/shared/StepShell";
import { GraduationCap, AlertCircle } from "lucide-react";


export function StepSchoolFreeTier() {
    return (
        <StepShell
            eyebrow="Your free tier"
            title="You're all set with Free Tier 1"
            subtitle="Schools, colleges and amateur groups can use SHOWE for free, with a few sensible limits."
        >
            <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-linear-to-br from-emerald-50 to-white border border-emerald-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                            <GraduationCap size={22} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-900 mb-1">Free Tier 1 — included</h3>
                            <p className="text-sm text-emerald-700 leading-relaxed">
                                Modules 1–4: programme builder, schedule, distribution, branding.
                                Up to <span className="font-bold">3 programmes per year</span>.
                            </p>
                        </div>
                    </div>
                </div>

                <InfoBanner variant="info" title="What's not included on the free tier">
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        <li>You cannot charge audiences for programmes.</li>
                        <li>Analytics, sponsorship and integration modules are unavailable.</li>
                        <li>If you outgrow the free tier, switch to a paid plan from your dashboard.</li>
                    </ul>
                </InfoBanner>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
                    <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
                    <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-bold">Switching to paid later?</span>{" "}
                        You'll need to complete payment setup with Stripe before your first paid
                        programme can be published. We'll guide you through it then.
                    </p>
                </div>
            </div>
        </StepShell>
    );
}