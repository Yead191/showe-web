import type { OnboardingState } from "@/types/onboarding";
import { TIERS, COMMISSION_EXAMPLE } from "@/lib/onboarding-data";

// ============================================================================
// Submission payload — the cleaned-up shape your API actually receives.
// ============================================================================
//
// The raw OnboardingState carries some UI-only fields (currentStep,
// completedSteps) and stores values as nullable for the in-progress UI. By
// the time the wizard reaches the "complete" step every required field is
// known to be set, so we can flatten + narrow the types here.
//
// This file is the single contract between the frontend wizard and your API.
// If you change the shape of what gets submitted, change it here.
// ============================================================================

export interface OnboardingPayload {
    /** Submission metadata */
    meta: {
        submittedAt: string;        // ISO timestamp
        schemaVersion: 1;           // bump if shape changes
        flow: "venue" | "venue-via-redirect" | "producer" | "school";
    };

    /** Q1 answer — primary account type */
    accountType: "venue" | "producer" | "school";

    /** General Information from the capture step */
    organisation: {
        name: string;
        website: string;
        country: string;
        contactName: string;
        email: string;
        phone: string | null;
    };

    /** How they plan to use SHOWE — Q2 (Venue) or Q3 (Producer/School) */
    usage: {
        intent: "free_schedules" | "sell_programmes";
        /** Producer Q2 answer — null for native venues */
        hostsEventsRegularly: "no" | "yes_sometimes" | null;
        /** True if Producer/School answered yes_sometimes and got pushed onto the venue path */
        treatAsVenue: boolean;
    };

    /** Subscription details. null when the path doesn't include a subscription
     *  (e.g. school on free tier, school selling programmes). */
    subscription: {
        tier: "tier1" | "tier2" | "tier3";
        tierName: string;
        priceMonthly: number;
        modules: number[];
        active: boolean;
    } | null;

    /** Commerce details. null when the user isn't selling programmes. */
    commerce: {
        sellsProgrammes: true;
        commissionRate: number;          // 0.10 = 10%
        minimumSalePrice: number;        // £2.00
        bankConnected: boolean;
        stripeAccountId: string | null;
    } | null;

    /** Acceptance flags — what was agreed to and when */
    acceptance: {
        commissionTerms: boolean;
        subscriptionTerms: boolean;
        acceptedAt: string;              // ISO timestamp (same as meta.submittedAt)
    };

    /**
     * Effective dashboard access level. Mirrors the flowchart's terminal nodes:
     *  - "tier1_free_capped" → schools on free tier (3 programmes/year)
     *  - "tier3_seller"      → anyone selling programmes (Tier 3+, can charge)
     *  - "tier1" / "tier2" / "tier3" → standard subscription
     */
    access: {
        level: "tier1_free_capped" | "tier1" | "tier2" | "tier3" | "tier3_seller";
        canCharge: boolean;
        programmesPerYearCap: number | null;  // null = unlimited
        moduleAccess: number[];
    };
}

// ============================================================================
// Builder
// ============================================================================

/**
 * Convert the live wizard state into the API payload. Throws if called before
 * the wizard reaches a terminal state — the gate prevents this in practice,
 * but the throw is a defensive check so missing data fails loudly instead of
 * silently submitting `null`s to your backend.
 */
export function buildOnboardingPayload(state: OnboardingState): OnboardingPayload {
    // ---- guard: required fields must be populated ----
    if (!state.accountType) throw new Error("buildOnboardingPayload: accountType is missing");
    if (!state.usageIntent && state.currentStep !== "school_free_tier") {
        throw new Error("buildOnboardingPayload: usageIntent is missing");
    }
    const o = state.org;
    if (!o.organisationName || !o.website || !o.country || !o.contactName || !o.email) {
        throw new Error("buildOnboardingPayload: organisation details incomplete");
    }

    // ---- derive helpers ----
    const treatAsVenue = state.hostsEventsRegularly === "yes_sometimes";
    const isSeller = state.usageIntent === "sell_programmes";
    const flow: OnboardingPayload["meta"]["flow"] =
        state.accountType === "venue"
            ? "venue"
            : treatAsVenue
                ? "venue-via-redirect"
                : state.accountType === "producer"
                    ? "producer"
                    : "school";

    // ---- subscription block ----
    const tierInfo = state.selectedTier ? TIERS.find((t) => t.id === state.selectedTier) : null;
    const subscription: OnboardingPayload["subscription"] = tierInfo
        ? {
            tier: tierInfo.id,
            tierName: tierInfo.name,
            priceMonthly: tierInfo.priceMonthly,
            modules: tierInfo.modules,
            active: state.payment.subscriptionActive,
        }
        : null;

    // ---- commerce block ----
    const commerce: OnboardingPayload["commerce"] = isSeller
        ? {
            sellsProgrammes: true,
            commissionRate: COMMISSION_EXAMPLE.showeCommissionRate,
            minimumSalePrice: COMMISSION_EXAMPLE.minimumSalePrice,
            bankConnected: state.payment.bankConnected,
            stripeAccountId: state.payment.stripeAccountId ?? null,
        }
        : null;

    // ---- access level — mirrors the flowchart's green terminal nodes ----
    const access: OnboardingPayload["access"] = (() => {
        // School on free tier → capped Tier 1
        if (state.accountType === "school" && !isSeller) {
            return {
                level: "tier1_free_capped",
                canCharge: false,
                programmesPerYearCap: 3,
                moduleAccess: [1, 2, 3, 4],
            };
        }
        // Sellers always end up on Tier 3+ seller level with charging enabled.
        // They have full module access even if they skipped explicit tier selection.
        if (isSeller) {
            return {
                level: "tier3_seller",
                canCharge: true,
                programmesPerYearCap: null,
                moduleAccess: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            };
        }
        // Standard venue/producer subscription
        if (tierInfo) {
            return {
                level: tierInfo.id,
                canCharge: false,
                programmesPerYearCap: null,
                moduleAccess: tierInfo.modules,
            };
        }
        // Defensive fallback
        return {
            level: "tier1",
            canCharge: false,
            programmesPerYearCap: null,
            moduleAccess: [1, 2, 3, 4, 10],
        };
    })();

    const submittedAt = new Date().toISOString();

    return {
        meta: { submittedAt, schemaVersion: 1, flow },
        accountType: state.accountType,
        organisation: {
            name: o.organisationName!,
            website: o.website!,
            country: o.country!,
            contactName: o.contactName!,
            email: o.email!,
            phone: o.phone || null,
        },
        usage: {
            intent: state.usageIntent!,
            hostsEventsRegularly: state.hostsEventsRegularly,
            treatAsVenue,
        },
        subscription,
        commerce,
        acceptance: {
            commissionTerms: state.acceptance.commissionTerms,
            subscriptionTerms: state.acceptance.tierTerms,
            acceptedAt: submittedAt,
        },
        access,
    };
}