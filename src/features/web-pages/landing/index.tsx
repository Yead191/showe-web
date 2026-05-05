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
// import { DEFAULT_FEATURES } from "@/constants/landing/landing-features";

export default function LandingIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <main>
                <LandingBanner />
                <AboutShowe />
                <HowItWorksProcess />
                <WhatYouCanDo />
                <EmotionalConnection />
                <LandingEvents />
                <Programmes />
                <LandingCTA />
                <LandingFAQ />
            </main>
            <LandingFooter />
        </div>
    )
}

