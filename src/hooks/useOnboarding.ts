"use client";

import { AccountType, OnboardingState, OrgCapture, StepId, SubscriptionTier, UsageIntent } from "@/types/onboarding";
import { useCallback, useMemo, useReducer } from "react";



// ============================================================================
// Initial state
// ============================================================================
const INITIAL_STATE: OnboardingState = {
    accountType: null,
    usageIntent: null,
    hostsEventsRegularly: null,
    org: {},
    selectedTier: null,
    acceptance: { commissionTerms: false, tierTerms: false },
    payment: { bankConnected: false, subscriptionActive: false },
    currentStep: "account_type",
    completedSteps: [],
};

// ============================================================================
// Reducer actions — every state mutation flows through one of these
// ============================================================================
type Action =
    | { type: "SET_ACCOUNT_TYPE"; value: AccountType }
    | { type: "SET_ORG"; value: Partial<OrgCapture> }
    | { type: "SET_USAGE_INTENT"; value: UsageIntent }
    | { type: "SET_HOSTS_EVENTS"; value: "no" | "yes_sometimes" }
    | { type: "SET_TIER"; value: SubscriptionTier }
    | { type: "ACCEPT_COMMISSION_TERMS" }
    | { type: "ACCEPT_TIER_TERMS" }
    | { type: "SET_PAYMENT_BANK_CONNECTED"; value: boolean }
    | { type: "SET_SUBSCRIPTION_ACTIVE"; value: boolean }
    | { type: "GO_TO"; step: StepId }
    | { type: "MARK_COMPLETE"; step: StepId }
    | { type: "RESET" };

function reducer(state: OnboardingState, action: Action): OnboardingState {
    switch (action.type) {
        case "SET_ACCOUNT_TYPE":
            return { ...state, accountType: action.value };
        case "SET_ORG":
            return { ...state, org: { ...state.org, ...action.value } };
        case "SET_USAGE_INTENT":
            return { ...state, usageIntent: action.value };
        case "SET_HOSTS_EVENTS":
            return { ...state, hostsEventsRegularly: action.value };
        case "SET_TIER":
            return { ...state, selectedTier: action.value };
        case "ACCEPT_COMMISSION_TERMS":
            return { ...state, acceptance: { ...state.acceptance, commissionTerms: true } };
        case "ACCEPT_TIER_TERMS":
            return { ...state, acceptance: { ...state.acceptance, tierTerms: true } };
        case "SET_PAYMENT_BANK_CONNECTED":
            return { ...state, payment: { ...state.payment, bankConnected: action.value } };
        case "SET_SUBSCRIPTION_ACTIVE":
            return { ...state, payment: { ...state.payment, subscriptionActive: action.value } };
        case "GO_TO":
            return { ...state, currentStep: action.step };
        case "MARK_COMPLETE":
            return state.completedSteps.includes(action.step)
                ? state
                : { ...state, completedSteps: [...state.completedSteps, action.step] };
        case "RESET":
            return INITIAL_STATE;
        default:
            return state;
    }
}

// ============================================================================
// Step graph — implements the directed edges of the flowchart.
// `nextStep(state)` returns the next StepId given the current state, encoding
// every branch in one place so the UI never has to reason about flow.
// ============================================================================
function nextStep(state: OnboardingState): StepId | null {
    const s = state.currentStep;

    // 1. After Q1 → always capture org details
    if (s === "account_type") return "org_capture";

    // 2. After capture → branch on account type
    if (s === "org_capture") {
        if (state.accountType === "venue") return "venue_question";
        // Producers and schools answer "do you operate a venue?" first
        return "venue_redirect";
    }

    // 3. Producer/School redirect — if they actually run a venue, push them onto the venue path
    if (s === "venue_redirect") {
        if (state.hostsEventsRegularly === "yes_sometimes") {
            // Treat them as a venue from here on. Keep their answers; just switch the path.
            return "venue_question";
        }
        return "how_showe_works";
    }

    // 4. Venue Q2 → "How SHOWE works" (free) OR "Commission info" (selling)
    if (s === "venue_question") {
        return "how_showe_works";
    }

    // 5. How SHOWE works info → next depends on usageIntent + accountType
    if (s === "how_showe_works") {
        if (state.usageIntent === "sell_programmes") {
            return "commission_info";
        }
        // Free path
        if (state.accountType === "venue" || state.hostsEventsRegularly === "yes_sometimes") {
            return "tier_selection"; // venues still need a subscription even on free programmes
        }
        if (state.accountType === "producer") {
            return "producer_question";
        }
        // school / amateur — free Tier 1 with cap
        return "school_free_tier";
    }

    // 6. Producer Q3 — "How do you plan to use Showe?"
    if (s === "producer_question") {
        if (state.usageIntent === "sell_programmes") return "commission_info";
        return "tier_selection";
    }

    // 7. Commission flow — info → breakdown → payment setup
    if (s === "commission_info") return "commission_breakdown";
    if (s === "commission_breakdown") return "payment_setup";

    // 8. Payment setup → next stop depends on who they are
    if (s === "payment_setup") {
        // Sellers (Venues + Producers + Schools) now move straight to complete
        // if they are selling, skipping tier selection/subscription
        if (state.usageIntent === "sell_programmes") return "complete";

        // Fallback for anyone else hitting payment (standard tier selection)
        return "tier_selection";
    }

    // 9. Tier selection → terms → subscription payment → done
    if (s === "tier_selection") return "tier_terms";
    if (s === "tier_terms") return "subscription_payment";
    if (s === "subscription_payment") return "complete";

    // 10. School free tier endpoint
    if (s === "school_free_tier") return "complete";

    return null;
}

/**
 * Determines the previous step. We don't store full history because the graph
 * has predictable single-parent edges for each node — this mirror function
 * keeps the back button logic next to the forward logic for easy auditing.
 */
function prevStep(state: OnboardingState): StepId | null {
    const s = state.currentStep;
    switch (s) {
        case "account_type":
            return null;
        case "org_capture":
            return "account_type";
        case "venue_question":
            // Could have arrived from org_capture (venue) or venue_redirect (producer/school yes)
            return state.accountType === "venue" ? "org_capture" : "venue_redirect";
        case "venue_redirect":
            return "org_capture";
        case "how_showe_works":
            return state.accountType === "venue" || state.hostsEventsRegularly === "yes_sometimes"
                ? "venue_question"
                : "venue_redirect";
        case "producer_question":
            return "how_showe_works";
        case "commission_info":
            // came from venue_question, producer_question, or how_showe_works
            if (state.accountType === "venue" || state.hostsEventsRegularly === "yes_sometimes")
                return "how_showe_works";
            if (state.accountType === "producer") return "producer_question";
            return "how_showe_works";
        case "commission_breakdown":
            return "commission_info";
        case "payment_setup":
            return "commission_breakdown";
        case "tier_selection":
            // Arrived directly from how_showe_works/producer_question (free path)
            // (Sellers skip this and go from payment_setup to complete)
            if (state.accountType === "producer") return "producer_question";
            return "how_showe_works";
        case "tier_terms":
            return "tier_selection";
        case "subscription_payment":
            return "tier_terms";
        case "school_free_tier":
            return "how_showe_works";
        case "complete":
            return null;
        default:
            return null;
    }
}

// ============================================================================
// Step gating — when can the user move forward from the current step?
// Each rule maps to a flowchart guard. Returning `null` means "ok to proceed".
// ============================================================================
export function canProceed(state: OnboardingState): { ok: boolean; reason?: string } {
    switch (state.currentStep) {
        case "account_type":
            return state.accountType
                ? { ok: true }
                : { ok: false, reason: "Please choose what best describes you." };
        case "org_capture": {
            const o = state.org;
            const filled =
                o.organisationName && o.website && o.country && o.contactName && o.email;
            return filled
                ? { ok: true }
                : { ok: false, reason: "Please complete all required fields." };
        }
        case "venue_question":
        case "producer_question":
            return state.usageIntent
                ? { ok: true }
                : { ok: false, reason: "Please pick an option to continue." };
        case "venue_redirect":
            return state.hostsEventsRegularly
                ? { ok: true }
                : { ok: false, reason: "Please answer to continue." };
        case "commission_info":
            return state.acceptance.commissionTerms
                ? { ok: true }
                : { ok: false, reason: "You must accept the Terms & Conditions to continue." };
        case "payment_setup":
            // Flowchart: cannot progress if no payment setup done — bank must be connected
            return state.payment.bankConnected
                ? { ok: true }
                : { ok: false, reason: "Connect a bank account via Stripe to continue." };
        case "tier_selection":
            return state.selectedTier
                ? { ok: true }
                : { ok: false, reason: "Please select a tier." };
        case "tier_terms":
            return state.acceptance.tierTerms
                ? { ok: true }
                : { ok: false, reason: "You must accept the subscription terms." };
        case "subscription_payment":
            return state.payment.subscriptionActive
                ? { ok: true }
                : { ok: false, reason: "Subscription must be activated to continue." };
        default:
            return { ok: true };
    }
}

// ============================================================================
// Progress helpers — for the progress bar in the layout
// ============================================================================
function totalStepsFor(state: OnboardingState): number {
    // Walk the graph from the current state's known choices to estimate the total.
    // We only count visible steps (skip "complete").
    const map: Record<AccountType | "default", StepId[]> = {
        venue: state.usageIntent === "sell_programmes"
            ? ["account_type", "org_capture", "venue_question", "how_showe_works",
                "commission_info", "commission_breakdown", "payment_setup"]
            : ["account_type", "org_capture", "venue_question", "how_showe_works",
                "tier_selection", "tier_terms", "subscription_payment"],
        producer: state.usageIntent === "sell_programmes"
            ? ["account_type", "org_capture", "venue_redirect", "how_showe_works",
                "producer_question", "commission_info", "commission_breakdown", "payment_setup"]
            : ["account_type", "org_capture", "venue_redirect", "how_showe_works",
                "producer_question", "tier_selection", "tier_terms", "subscription_payment"],
        school: state.usageIntent === "sell_programmes"
            ? ["account_type", "org_capture", "venue_redirect", "how_showe_works",
                "commission_info", "commission_breakdown", "payment_setup"]
            : ["account_type", "org_capture", "venue_redirect", "how_showe_works", "school_free_tier"],
        default: ["account_type", "org_capture"],
    };
    const path = state.accountType ? map[state.accountType] : map.default;
    return path.length;
}

function currentIndexIn(state: OnboardingState): number {
    const total = totalStepsFor(state);
    // Approximate progress by counting how far through `completedSteps` we are.
    // Plus one for the active step.
    const done = state.completedSteps.length;
    return Math.min(done + 1, total);
}

// ============================================================================
// Public hook
// ============================================================================
export function useOnboarding() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const goNext = useCallback(() => {
        const next = nextStep(state);
        if (!next) return;
        dispatch({ type: "MARK_COMPLETE", step: state.currentStep });
        dispatch({ type: "GO_TO", step: next });
    }, [state]);

    const goBack = useCallback(() => {
        const prev = prevStep(state);
        if (!prev) return;
        dispatch({ type: "GO_TO", step: prev });
    }, [state]);

    const gate = useMemo(() => canProceed(state), [state]);

    const progress = useMemo(() => {
        const total = totalStepsFor(state);
        const current = currentIndexIn(state);
        return { current, total, percent: Math.round((current / total) * 100) };
    }, [state]);

    return {
        state,
        dispatch,
        goNext,
        goBack,
        canProceed: gate,
        progress,
    };
}