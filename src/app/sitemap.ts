import type { MetadataRoute } from "next";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { siteConfig } from "@/lib/seo";

// Revalidate the sitemap hourly so newly published events/programmes/artists
// are picked up without a full redeploy.
export const revalidate = 3600;

type WithId = { _id?: string; id?: string };

async function safeIds(url: string): Promise<string[]> {
    try {
        const res = await nextFetch<WithId[]>(url, { method: "GET" });
        if (!res?.success || !Array.isArray(res.data)) return [];
        return res.data
            .map((item) => item._id ?? item.id)
            .filter((v): v is string => typeof v === "string");
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${siteConfig.url}/home`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${siteConfig.url}/events`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${siteConfig.url}/programmes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${siteConfig.url}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${siteConfig.url}/for-users`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${siteConfig.url}/become-creator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${siteConfig.url}/organisation-register`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ];

    const [eventIds, artistIds, programmeIds] = await Promise.all([
        safeIds("/event/search"),
        safeIds("/artist"),
        safeIds("/programmes"),
    ]);

    const eventRoutes: MetadataRoute.Sitemap = eventIds.map((id) => ({
        url: `${siteConfig.url}/events/${id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const artistRoutes: MetadataRoute.Sitemap = artistIds.map((id) => ({
        url: `${siteConfig.url}/artists/${id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    const programmeRoutes: MetadataRoute.Sitemap = programmeIds.flatMap((id) => [
        {
            url: `${siteConfig.url}/programmes/${id}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        },
        {
            url: `${siteConfig.url}/reader/${id}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.5,
        },
    ]);

    return [...staticRoutes, ...eventRoutes, ...artistRoutes, ...programmeRoutes];
}
