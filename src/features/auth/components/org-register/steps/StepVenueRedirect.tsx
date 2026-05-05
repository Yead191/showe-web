"use client";

import { Building2 } from "lucide-react";
import type { OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { OptionCard } from "@/components/shared/OptionCard";
import { InfoBanner } from "@/components/shared/InfoBanner";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_HOSTS_EVENTS"; value: "no" | "yes_sometimes" }) => void;
}

/**
 * Flowchart node: "Producer/Education Question 2 — Do you operate a venue or
 * host events regularly?"
 *
 * If "Yes / Sometimes" the flow shows a redirect message — they're really a
 * venue and should sit on the venue subscription model — and the wizard pushes
 * them onto the venue path. "No" continues on the producer/school path.
 */
export function StepVenueRedirect({ state, dispatch }: Props) {
    const v = state.hostsEventsRegularly;

    return (
        <StepShell
            eyebrow="One more question"
            title="Do you operate a venue or host events regularly?"
            subtitle="This affects which plan suits you best. Be honest — we'll route you to the right place."
        >
            <div className="grid gap-3">
                <OptionCard
                    title="No"
                    description="I don't run a permanent venue or a regular event schedule. I produce shows that travel or run as one-offs."
                    selected={v === "no"}
                    onClick={() => dispatch({ type: "SET_HOSTS_EVENTS", value: "no" })}
                />
                <OptionCard
                    icon={<Building2 size={22} />}
                    title="Yes, or sometimes"
                    description="I do operate a venue or host events on a regular schedule."
                    selected={v === "yes_sometimes"}
                    onClick={() => dispatch({ type: "SET_HOSTS_EVENTS", value: "yes_sometimes" })}
                />
            </div>

            {v === "yes_sometimes" && (
                <div className="mt-6">
                    <InfoBanner variant="info" title="It looks like you may be a venue.">
                        Venues use a subscription model with access to more powerful tools.
                        We'll switch you over now — your details have been saved.
                    </InfoBanner>
                </div>
            )}
        </StepShell>
    );
}