import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingBanner from "./components/LandingBanner";
import AboutShowe from "./components/AboutShowe";
import Features from "./components/WhyChooseUs";
import LandingEvents from "./components/LandingEvents";


export default function LandingIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <main>
                <LandingBanner />
                <AboutShowe />
                <Features />
                <LandingEvents />
            </main>
        </div>
    )
}