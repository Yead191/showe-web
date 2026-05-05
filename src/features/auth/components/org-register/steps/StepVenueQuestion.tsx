"use client";

import { CalendarDays, Wallet } from "lucide-react";

import type { OnboardingState, UsageIntent } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { OptionCard } from "@/components/shared/OptionCard";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_USAGE_INTENT"; value: UsageIntent }) => void;
}

export function StepVenueQuestion({ state, dispatch }: Props) {
    const set = (value: UsageIntent) => dispatch({ type: "SET_USAGE_INTENT", value });

    return (
        <StepShell
            eyebrow="Question 2"
            title="How will you use Showe?"
            subtitle="You can change this later — pick the option that best matches what you'd like to do first."
        >
            <div className="grid gap-3">
                <OptionCard
                    icon={<CalendarDays size={22} />}
                    title="Create and publish event schedules"
                    description="Free forever. Publish event programmes for your venue and let audiences access them by QR or link."
                    selected={state.usageIntent === "free_schedules"}
                    onClick={() => set("free_schedules")}
                />
                <OptionCard
                    icon={<Wallet size={22} />}
                    title="Sell digital programmes for your events"
                    description="Charge audiences for premium programmes. We handle payments via Stripe — you take home around 85% of every sale."
                    selected={state.usageIntent === "sell_programmes"}
                    onClick={() => set("sell_programmes")}
                    badge="Earn revenue"
                />
            </div>
        </StepShell>
    );
}