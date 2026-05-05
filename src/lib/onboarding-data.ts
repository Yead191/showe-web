import type { TierInfo } from "@/types/onboarding";

// ============================================================================
// Tier catalogue — drives the cards on the Tier Selection screen
// ============================================================================
export const TIERS: TierInfo[] = [
    {
        id: "tier1",
        name: "Presence",
        tagline: "Establish your venue's digital footprint",
        priceMonthly: 40,
        modules: [1, 2, 3, 4, 10],
        features: [
            "Digital programme creation",
            "Basic event scheduling",
            "QR distribution",
            "Brand customisation",
            "Standard support",
        ],
    },
    {
        id: "tier2",
        name: "Engage",
        tagline: "Deeper audience connection & insights",
        priceMonthly: 75,
        modules: [1, 2, 3, 4, 5, 6, 7, 8, 10],
        features: [
            "Everything in Presence",
            "Audience analytics",
            "Cross-promotion blocks",
            "Sponsorship modules",
            "Multi-language support",
            "Priority support",
        ],
        recommended: true,
    },
    {
        id: "tier3",
        name: "Amplify",
        tagline: "Maximum reach with the full toolset",
        priceMonthly: 150,
        modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        features: [
            "Everything in Engage",
            "Advanced distribution network",
            "Custom integrations",
            "Dedicated account manager",
            "White-label options",
            "API access",
        ],
    },
];

// ============================================================================
// Commission breakdown — example used on the commission screen
// All figures in GBP. Customer pays £10 (the example sale price).
// ============================================================================
export const COMMISSION_EXAMPLE = {
    customerPays: 10.0,
    showeCommissionRate: 0.1, // 10%
    showeCommission: 1.0,
    vatOnCommission: 0.2, // 20% VAT on the £1 commission
    stripeFee: 0.3,
    organiserReceives: 8.5,
    minimumSalePrice: 2.0,
};

// ============================================================================
// Module catalogue (referenced by tier IDs above)
// Names are illustrative — wire these to the real module list once defined.
// ============================================================================
export const MODULES: Record<number, { name: string; description: string }> = {
    1: { name: "Programme Builder", description: "Create digital event programmes" },
    2: { name: "Schedule", description: "Publish event schedules" },
    3: { name: "Distribution", description: "QR codes & shareable links" },
    4: { name: "Branding", description: "Customise look & feel" },
    5: { name: "Analytics", description: "Audience insights & reporting" },
    6: { name: "Cross-promotion", description: "Promote across the network" },
    7: { name: "Sponsorship", description: "Sell sponsor placements" },
    8: { name: "Multi-language", description: "Translate content automatically" },
    9: { name: "API & Integrations", description: "Connect external systems" },
    10: { name: "Support", description: "Customer support access" },
};