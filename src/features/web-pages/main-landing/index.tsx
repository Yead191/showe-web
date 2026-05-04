import MainLandingNavbar from "./components/MainLandingNavbar";
import MainLandingHero from "./components/MainLandingHero";
import MainLandingInfo from "./components/MainLandingInfo";
import MainLandingSplit from "./components/MainLandingSplit";
import MainLandingRelatable from "./components/MainLandingRelatable";
import LandingFooter from "@/features/web-pages/landing/components/LandingFooter";

export default function MainLandingIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <MainLandingNavbar />
            <main className="grow">
                <MainLandingHero />
                <MainLandingInfo />
                <MainLandingSplit />
                <MainLandingRelatable />
            </main>
            <LandingFooter />
        </div>
    );
}
