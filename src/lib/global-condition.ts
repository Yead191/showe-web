import type { GlobalConditions, OnboardingState } from "@/types/onboarding";


export interface GlobalConditionsResult {
    satisfied: boolean;
    conditions: GlobalConditions;
    /** Human-readable reasons each condition isn't met yet */
    missing: string[];
}

export function evaluateGlobalConditions(state: OnboardingState): GlobalConditionsResult {
    const isVenue = state.accountType === "venue" || state.hostsEventsRegularly === "yes_sometimes";
    const isSeller = state.usageIntent === "sell_programmes";
    const isProducer = state.accountType === "producer";

    // Payment setup is required for anyone selling programmes (venue/producer/school).
    const paymentRequired = isSeller;
    // Subscription is required for venues and producers (not schools/amateurs).
    const subscriptionRequired = isVenue || isProducer;

    const conditions: GlobalConditions = {
        paymentSetupComplete: !paymentRequired || state.payment.bankConnected,
        subscriptionActive: !subscriptionRequired || state.payment.subscriptionActive,
        termsAccepted:
            (!paymentRequired || state.acceptance.commissionTerms) &&
            (!subscriptionRequired || state.acceptance.tierTerms),
    };

    const missing: string[] = [];
    if (!conditions.paymentSetupComplete) missing.push("Payment setup is incomplete — connect your bank via Stripe.");
    if (!conditions.subscriptionActive) missing.push("Subscription is not yet active.");
    if (!conditions.termsAccepted) missing.push("Required terms have not been accepted.");

    return {
        satisfied: conditions.paymentSetupComplete && conditions.subscriptionActive && conditions.termsAccepted,
        conditions,
        missing,
    };
}

/**
 * Convenience check used in dashboard route guards. Throw / redirect when
 * `satisfied` is false to prevent the user from publishing or enabling
 * payments before all conditions are met.
 */
export function canPerformPrivilegedAction(state: OnboardingState): boolean {
    return evaluateGlobalConditions(state).satisfied;
}