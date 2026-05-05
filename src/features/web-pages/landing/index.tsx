import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingBanner from "./components/LandingBanner";
import AboutShowe from "./components/AboutShowe";
import WhatYouCanDo from "./components/WhatYouCanDo";
import EmotionalConnection from "./components/EmotionalConnection";
import WhyChooseUs from "./components/WhyChooseUs";
import LandingEvents from "./components/LandingEvents";
import Programmes from "./components/Programmes";
import LandingFAQ from "./components/LandingFAQ";
import LandingFooter from "./components/LandingFooter";
import { DEFAULT_FEATURES } from "@/constants/landing/landing-features";

export default function LandingIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <main>
                <LandingBanner />
                <AboutShowe />
                <WhatYouCanDo />
                <EmotionalConnection />
                <WhyChooseUs features={DEFAULT_FEATURES} title="Why Choose Our Platform" subtitle="A smarter way to present, manage, and experience event information in real time" />
                <LandingEvents />
                <Programmes />
                <LandingFAQ />
            </main>
            <LandingFooter />
        </div>
    )
}
