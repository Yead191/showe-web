import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingBanner from "./components/LandingBanner";
import AboutShowe from "./components/AboutShowe";
import WhatYouCanDo from "./components/WhatYouCanDo";
import EmotionalConnection from "./components/EmotionalConnection";
import LandingEvents from "./components/LandingEvents";
import Programmes from "./components/Programmes";
import LandingFAQ from "./components/LandingFAQ";
import LandingCTA from "./components/LandingCTA";
import LandingFooter from "./components/LandingFooter";
import HowItWorksProcess from "./components/HowItWorksProcess";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import type { LandingEventItem } from "./types";

export default async function LandingIndex() {
  const res = await nextFetch<LandingEventItem[]>("/event/search", {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 60 },
  });

  const events = res?.data ?? [];

  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavbar />
      <main>
        <LandingBanner />
        <AboutShowe />
        <HowItWorksProcess />
        <WhatYouCanDo />
        <EmotionalConnection />
        <LandingEvents event={events[0]} />
        <Programmes events={events} />
        <LandingCTA />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </div>
  );
}
