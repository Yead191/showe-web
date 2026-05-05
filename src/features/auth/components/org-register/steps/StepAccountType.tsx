"use client";

import { Building2, Megaphone, GraduationCap } from "lucide-react";
import type { AccountType, OnboardingState } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";
import { OptionCard } from "@/components/shared/OptionCard";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_ACCOUNT_TYPE"; value: AccountType }) => void;
}

/**
 * Flowchart node: "Question 1 — What best describes you?"
 * Three top-level paths fork from here: Venue / Producer / School-College-Amateur.
 */
export function StepAccountType({ state, dispatch }: Props) {
    const set = (value: AccountType) => dispatch({ type: "SET_ACCOUNT_TYPE", value });

    return (
        <StepShell
            eyebrow="Question 1"
            title="What best describes you?"
            subtitle="Tell us a bit about your organisation so we can tailor the experience and pricing."
        >
            <div className="grid gap-3">
                <OptionCard
                    icon={<Building2 size={22} />}
                    title="Venue"
                    description="A theatre, concert hall, arts centre, or any venue that hosts ticketed events on a regular schedule."
                    selected={state.accountType === "venue"}
                    onClick={() => set("venue")}
                />
                <OptionCard
                    icon={<Megaphone size={22} />}
                    title="Producer"
                    description="A production company, touring show, or independent producer creating events without a permanent home venue."
                    selected={state.accountType === "producer"}
                    onClick={() => set("producer")}
                />
                <OptionCard
                    icon={<GraduationCap size={22} />}
                    title="School, College or Amateur Group"
                    description="An educational institution or community group running shows, concerts, and performances."
                    selected={state.accountType === "school"}
                    onClick={() => set("school")}
                />
            </div>
        </StepShell>
    );
}