import LandingIndex from "@/features/web-pages/landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SHOWE for Audiences",
  description:
    "Scan, explore and engage. SHOWE gives event-goers instant access to interactive programmes—discover the cast, follow the story and relive every show from your phone.",
  path: "/for-users",
  keywords: [
    "SHOWE for attendees",
    "event app for fans",
    "interactive programmes for audiences",
    "discover shows",
    "engage with events",
    "digital programme for audiences",
    "scan event QR code",
    "event experience app",
  ],
});

export default function ForUsersPage() {
  return (
    <LandingIndex />
  );
}
