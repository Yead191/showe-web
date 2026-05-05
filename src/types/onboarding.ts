// ============================================================================
// Onboarding Types - SHOWE Platform
// Maps directly to the SHOWE Onboarding flowchart
// ============================================================================

/** Q1: "What best describes you?" — top-level account type */
export type AccountType = "venue" | "producer" | "school";

/** Q2 (Venue) / Q3 (Producer/School): how the org will use SHOWE */
export type UsageIntent = "free_schedules" | "sell_programmes";

/**
 * Subscription tiers available to Venues and Producers.
 * Tiers map to module bundles (per flowchart "Tier Information & selection").
 *  - Tier 1 (Presence): Modules 1, 2, 3, 4, 10            — £40/month
 *  - Tier 2 (Engage):   Modules 1, 2, 3, 4, 5, 6, 7, 8, 10 — £75/month
 *  - Tier 3 (Amplify):  Modules 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 — £150/month
 */
export type SubscriptionTier = "tier1" | "tier2" | "tier3";

/**
 * The wizard navigates a directed graph of steps. Each id below is one node
 * in the flowchart. Not every account type visits every step.
 */
export type StepId =
    | "account_type"          // Q1
    | "org_capture"           // Capture: org name, website, country, contact, email
    | "venue_question"        // Venue Q2
    | "venue_redirect"        // Producer Q2 — Yes/Sometimes redirect to venue flow
    | "how_showe_works"       // Info screen (Modules / Blocks / Distribution / Benefits)
    | "producer_question"     // Producer Q3
    | "commission_info"       // Commission How SHOWE works (only if selling programmes)
    | "commission_breakdown"  // "How commission works" example screen
    | "payment_setup"         // Stripe Connect setup
    | "tier_selection"        // Tier Information & selection
    | "tier_terms"            // Confirm acceptance of Terms (acts as agent / principal seller)
    | "subscription_payment"  // Setup subscription payments — £40 / £75 / £150
    | "school_free_tier"      // Schools default Tier 1 with 3 programmes/year cap
    | "complete";             // Welcome to dashboard

/** General Information — collected once, shared across all account types */
export interface OrgCapture {
    organisationName: string;
    website: string;
    country: string;
    contactName: string;
    email: string;
    phone?: string;
}

/** Acceptance flags collected throughout the flow */
export interface Acceptance {
    /** Commission T&Cs (10% commission, VAT, minimum £2 sale price) */
    commissionTerms: boolean;
    /** Subscription / tier T&Cs (SHOWE acts as agent, principal seller, refunds) */
    tierTerms: boolean;
}

/** Payment / Stripe Connect status — populated by Stripe webhook in production */
export interface PaymentSetupState {
    /** Stripe Connect account created and bank linked */
    bankConnected: boolean;
    /** Subscription is active (Stripe billing) — only relevant for venues */
    subscriptionActive: boolean;
    /** Stripe customer/account id for reference */
    stripeAccountId?: string;
}

/** Master wizard state — flows from start to finish and is what the API receives */
export interface OnboardingState {
    // What the user picked
    accountType: AccountType | null;
    usageIntent: UsageIntent | null;
    /** Producer Q2 — only set if accountType is "producer" or "school" */
    hostsEventsRegularly: "no" | "yes_sometimes" | null;

    // Captured details
    org: Partial<OrgCapture>;

    // Subscription
    selectedTier: SubscriptionTier | null;

    // Acceptance + payments
    acceptance: Acceptance;
    payment: PaymentSetupState;

    // Bookkeeping
    currentStep: StepId;
    completedSteps: StepId[];
}

/** Static data shape for tier cards on the selection screen */
export interface TierInfo {
    id: SubscriptionTier;
    name: string;
    tagline: string;
    priceMonthly: number;
    modules: number[];
    features: string[];
    recommended?: boolean;
}

/**
 * GLOBAL CONDITION LAYER (per flowchart, top-center red bubble).
 * The user CANNOT publish events / enable payments / access backend UNTIL:
 *   - payment setup complete (if required by their flow)
 *   - subscription active (if venue or producer-paid)
 *   - terms accepted
 * This shape is what the dashboard checks on every privileged action.
 */
export interface GlobalConditions {
    paymentSetupComplete: boolean;
    subscriptionActive: boolean;
    termsAccepted: boolean;
}