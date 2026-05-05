"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useOnboarding } from "@/hooks/useOnboarding";
import { buildOnboardingPayload } from "@/lib/buildOnboardingPayload";
import { ProgressBar } from "@/components/shared/Progressbar ";
import { WizardNav } from "@/components/shared/WizardNav";
import { StepAccountType } from "../steps/StepAccountType";
import { StepOrgCapture } from "../steps/StepOrgCapture";
import { StepVenueQuestion } from "../steps/StepVenueQuestion";
import { StepVenueRedirect } from "../steps/StepVenueRedirect";
import { StepHowItWorks } from "../steps/StepHowItWorks";
import { StepProducerQuestion } from "../steps/StepProducerQuestion";
import { StepCommissionInfo } from "../steps/StepCommissionInfo";
import { StepCommissionBreakdown } from "../steps/StepCommissionBreakdown";
import { StepPaymentSetup } from "../steps/StepPaymentSetup";
import { StepTierSelection } from "../steps/StepTierSelection";
import { StepTierTerms } from "../steps/StepTierTerms";
import { StepSubscriptionPayment } from "../steps/StepSubscriptionPayment";
import { StepSchoolFreeTier } from "../steps/StepSchoolFreeTier";
import { StepComplete } from "../steps/StepComplete";

/**
 * Top-level wizard component. Owns the wizard state via useOnboarding() and
 * routes to the right step based on state.currentStep.
 *
 * On completion, logs the full collected payload to the browser console.
 * Open DevTools (F12) → Console tab to inspect everything the user entered.
 *
 * The useRef guard ensures we don't log twice — important because React 18
 * strict mode runs effects twice in development.
 */
export function OnboardingWizard() {
    const { state, dispatch, goNext, goBack, canProceed, progress } = useOnboarding();
    const loggedRef = useRef(false);

    // ---- Log the collected data once we hit the terminal step ----
    useEffect(() => {
        if (state.currentStep !== "complete") return;
        if (loggedRef.current) return;
        loggedRef.current = true;

        const payload = buildOnboardingPayload(state);

        // Pretty-print to the console
        console.log(
            "%c📋 SHOWE Onboarding — Collected Data",
            "background:#014B52;color:#F5A800;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:13px;"
        );
        console.log(payload);

        // Also log the raw wizard state, in case you want to see it pre-shaping
        console.log(
            "%c🔧 Raw wizard state",
            "background:#475569;color:#fff;font-weight:bold;padding:2px 6px;border-radius:4px;font-size:11px;"
        );
        console.log(state);

        toast.success("Account created!", {
            description: "Check the browser console (F12) to see all collected data.",
        });
    }, [state]);

    const isComplete = state.currentStep === "complete";
    const isFirst = state.currentStep === "account_type";
    const showNav = !isComplete;

    const renderStep = () => {
        switch (state.currentStep) {
            case "account_type":
                return <StepAccountType state={state} dispatch={dispatch} />;
            case "org_capture":
                return <StepOrgCapture state={state} dispatch={dispatch} />;
            case "venue_question":
                return <StepVenueQuestion state={state} dispatch={dispatch} />;
            case "venue_redirect":
                return <StepVenueRedirect state={state} dispatch={dispatch} />;
            case "how_showe_works":
                return <StepHowItWorks />;
            case "producer_question":
                return <StepProducerQuestion state={state} dispatch={dispatch} />;
            case "commission_info":
                return <StepCommissionInfo state={state} dispatch={dispatch} />;
            case "commission_breakdown":
                return <StepCommissionBreakdown />;
            case "payment_setup":
                return <StepPaymentSetup state={state} dispatch={dispatch} />;
            case "tier_selection":
                return <StepTierSelection state={state} dispatch={dispatch} />;
            case "tier_terms":
                return <StepTierTerms state={state} dispatch={dispatch} />;
            case "subscription_payment":
                return <StepSubscriptionPayment state={state} dispatch={dispatch} />;
            case "school_free_tier":
                return <StepSchoolFreeTier />;
            case "complete":
                return <StepComplete state={state} />;
            default:
                return null;
        }
    };

    const lastBeforeCompleteSteps = ["subscription_payment", "school_free_tier"];
    const isLast = lastBeforeCompleteSteps.includes(state.currentStep);

    return (
        <div className="w-full max-w-3xl mx-auto">
            {!isComplete && (
                <div className="mb-10">
                    <ProgressBar
                        current={progress.current}
                        total={progress.total}
                        percent={progress.percent}
                    />
                </div>
            )}

            <div className="min-h-[400px]">{renderStep()}</div>

            {showNav && (
                <WizardNav
                    onBack={goBack}
                    onNext={goNext}
                    canGoBack={!isFirst}
                    canProceed={canProceed.ok}
                    blockReason={canProceed.reason}
                    isLast={isLast}
                    nextLabel={isLast ? "Go to dashboard" : undefined}
                />
            )}
        </div>
    );
}