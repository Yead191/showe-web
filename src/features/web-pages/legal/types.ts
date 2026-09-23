export type DisclaimerType =
  | "terms-user"
  | "terms-organization"
  | "privacy-user"
  | "privacy-organization"
  | "about";

export type LegalAudience = "user" | "organizer";
export type LegalCategory = "terms" | "privacy";

export interface LegalDocConfig {
  type: DisclaimerType;
  category: LegalCategory;
  audience: LegalAudience;
  title: string;
  categoryLabel: string;
  audienceLabel: string;
  shortAudience: string;
  badge: string;
  description: string;
  path: string;
  alternateAudiencePath: string;
  alternateCategoryPath: string;
}

export const LEGAL_DOCS: Record<DisclaimerType, LegalDocConfig> = {
  "terms-user": {
    type: "terms-user",
    category: "terms",
    audience: "user",
    title: "Terms & Conditions",
    categoryLabel: "Terms & Conditions",
    audienceLabel: "For Audience & Event Attendees",
    shortAudience: "Users",
    badge: "User Terms",
    description:
      "These terms govern your access to and use of the SHOWE platform, digital programmes, tickets, and interactive event experiences.",
    path: "/terms/user",
    alternateAudiencePath: "/terms/organizer",
    alternateCategoryPath: "/privacy/user",
  },
  "terms-organization": {
    type: "terms-organization",
    category: "terms",
    audience: "organizer",
    title: "Terms & Conditions",
    categoryLabel: "Terms & Conditions",
    audienceLabel: "For Event Creators, Producers & Venues",
    shortAudience: "Organizers",
    badge: "Organizer Terms",
    description:
      "These terms govern the creation, publishing, and management of digital programmes, ticket links, analytics, and organizer tools on SHOWE.",
    path: "/terms/organizer",
    alternateAudiencePath: "/terms/user",
    alternateCategoryPath: "/privacy/organizer",
  },
  "privacy-user": {
    type: "privacy-user",
    category: "privacy",
    audience: "user",
    title: "Privacy Policy",
    categoryLabel: "Privacy Policy",
    audienceLabel: "For Audience & Registered Users",
    shortAudience: "Users",
    badge: "User Privacy",
    description:
      "Learn how SHOWE collects, protects, and handles your personal data, attendance preferences, and interaction history.",
    path: "/privacy/user",
    alternateAudiencePath: "/privacy/organizer",
    alternateCategoryPath: "/terms/user",
  },
  "privacy-organization": {
    type: "privacy-organization",
    category: "privacy",
    audience: "organizer",
    title: "Privacy Policy",
    categoryLabel: "Privacy Policy",
    audienceLabel: "For Organizers, Venues & Partners",
    shortAudience: "Organizers",
    badge: "Organizer Privacy",
    description:
      "How SHOWE safeguards organization data, administrative access, event audience analytics, and compliance standards.",
    path: "/privacy/organizer",
    alternateAudiencePath: "/privacy/user",
    alternateCategoryPath: "/terms/organizer",
  },
  about: {
    type: "about",
    category: "terms",
    audience: "user",
    title: "About Us",
    categoryLabel: "About",
    audienceLabel: "General",
    shortAudience: "General",
    badge: "About",
    description: "About SHOWE",
    path: "/about",
    alternateAudiencePath: "/about",
    alternateCategoryPath: "/about",
  },
};

export function resolveDisclaimerType(
  category: LegalCategory,
  audience: string
): DisclaimerType {
  const isOrg =
    audience === "organizer" ||
    audience === "organization" ||
    audience === "organisers" ||
    audience === "organizers";

  if (category === "terms") {
    return isOrg ? "terms-organization" : "terms-user";
  }
  return isOrg ? "privacy-organization" : "privacy-user";
}
