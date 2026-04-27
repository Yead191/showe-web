import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingBanner from "./components/LandingBanner";
import AboutShowe from "./components/AboutShowe";
import Features from "./components/WhyChooseUs";
import LandingEvents from "./components/LandingEvents";
import Programmes from "./components/Programmes";
import FeatureSections from "./components/FeatureSections";
import LandingFAQ from "./components/LandingFAQ";
import LandingFooter from "./components/LandingFooter";


export default function LandingIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <main>
                <LandingBanner />
                <AboutShowe />
                <Features />
                <LandingEvents />
                <Programmes />
                <FeatureSections />
                <LandingFAQ />
            </main>
            <LandingFooter />
        </div>
    )
}