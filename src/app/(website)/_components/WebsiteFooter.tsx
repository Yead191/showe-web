"use client";

import { usePathname } from "next/navigation";
import LandingFooter from "@/features/web-pages/landing/components/LandingFooter";

export default function WebsiteFooter() {
  const pathname = usePathname();

  // Hide footer on /programmes and any /programmes/* sub-routes
  const isProgrammes =
    pathname === "/programmes" || pathname?.startsWith("/programmes/");

  if (isProgrammes) {
    return null;
  }

  return <LandingFooter />;
}
