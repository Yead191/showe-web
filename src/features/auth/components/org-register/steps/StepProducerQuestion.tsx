"use client";

import { CalendarDays, Wallet } from "lucide-react";
import type { OnboardingState, UsageIntent } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { OptionCard } from "@/components/shared/OptionCard";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_USAGE_INTENT"; value: UsageIntent }) => void;
}

/**
 * Flowchart node: "Producer/Education Question 3 — How do you plan to use Showe?"
 * Identical to the venue Q2 in shape, but the next branch differs:
 *  - Producers: continue to subscription tiers
 *  - Schools: free tier with limits, OR commission flow if they want to sell
 */
export function StepProducerQuestion({ state, dispatch }: Props) {
    const set = (value: UsageIntent) => dispatch({ type: "SET_USAGE_INTENT", value });
    const isSchool = state.accountType === "school";

    return (
        <StepShell
            eyebrow="Question 3"
            title="How do you plan to use Showe?"
            subtitle={
                isSchool
                    ? "Schools and amateur groups get a free tier. You'll need payment setup if you decide to charge."
                    : "Pick the option that best matches your plans. You can change this later."
            }
        >
            <div className="grid gap-3">
                <OptionCard
                    icon={<CalendarDays size={22} />}
                    title="Create and distribute free programmes"
                    description={
                        isSchool
                            ? "Free Tier 1 access. Up to 3 programmes per year — perfect for school productions and community events."
                            : "Publish digital programmes for your shows at no cost. Great for free or external-ticketed events."
                    }
                    selected={state.usageIntent === "free_schedules"}
                    onClick={() => set("free_schedules")}
                />
                <OptionCard
                    icon={<Wallet size={22} />}
                    title="Create and sell digital programmes"
                    description="Charge audiences for premium programmes. We handle Stripe, take a 10% commission, and you keep the rest."
                    selected={state.usageIntent === "sell_programmes"}
                    onClick={() => set("sell_programmes")}
                    badge="Earn revenue"
                />
            </div>
        </StepShell>
    );
}