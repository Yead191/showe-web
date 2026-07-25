import type { Metadata } from "next";

/**
 * Central SEO configuration for SHOWE.
 *
 * `siteConfig` holds brand-level defaults; `buildMetadata()` produces a fully
 * formed Next.js `Metadata` object (title, description, keywords, canonical,
 * Open Graph + Twitter cards, robots directives) for any page so every route
 * ships consistent, crawler-friendly tags.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in your environment to the production origin
 * (e.g. https://showe.app) so canonical + Open Graph URLs resolve correctly.
 */
export const siteConfig = {
  name: "SHOWE",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://showe.app").replace(/\/$/, ""),
  tagline: "Turn every performance into an interactive experience",
  description:
    "SHOWE turns traditional event programmes into dynamic, interactive experiences—accessible instantly through a simple QR scan. Discover events, explore digital programmes, meet the artists, and engage with the story before, during, and after the show.",
  ogImage: "/logo.png",
  locale: "en_GB",
  twitter: "@showe",
  /** Brand keywords merged into every page. */
  keywords: [
    "SHOWE",
    "interactive event programmes",
    "digital event programme",
    "QR event programme",
    "digital playbill",
    "interactive playbill",
    "event app",
    "live event experience",
    "theatre programme app",
    "event engagement platform",
  ],
} as const;

type BuildMetadataArgs = {
  /** Page title (site name is appended via the layout title template). */
  title?: string;
  description?: string;
  /** Page-specific keywords, merged with the brand keyword set. */
  keywords?: string[];
  /** Absolute path from the site root, e.g. "/events". */
  path?: string;
  /** OG/Twitter image (absolute URL or root-relative path). */
  image?: string;
  /** Set true for private/utility pages that should not be indexed. */
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
};

const toAbsolute = (value: string) =>
  value.startsWith("http") ? value : `${siteConfig.url}${value.startsWith("/") ? "" : "/"}${value}`;

export function buildMetadata({
  title,
  description = siteConfig.description,
  keywords = [],
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  type = "website",
}: BuildMetadataArgs = {}): Metadata {
  const url = toAbsolute(path);
  const ogImage = toAbsolute(image);
  const mergedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));
  const ogTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      url,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** Strip HTML tags + collapse whitespace, then clamp to a meta-safe length. */
export function toMetaDescription(html: string | undefined | null, max = 160): string {
  if (!html) return siteConfig.description;
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}
