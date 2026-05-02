import AboutHero from "./components/AboutHero"
import MissionVission from "./components/MissionVission"
import FourPillars from "./components/FourPillars"
import ImpactStats from "./components/ImpactStats"
import StorySections from "./components/StorySections"
import CtaSection from "./components/CtaSection"

export default function About() {
    return (
        <main className="bg-white overflow-hidden">
            {/* ── 1. Hero Section ── */}
            <AboutHero />

            {/* ── 2. Mission & Vision ── */}
            <MissionVission />

            {/* ── 3. The Four Pillars ── */}
            <FourPillars />

            {/* ── 4. Impact Stats ── */}
            <ImpactStats />

            {/* ── 5. Story Section ── */}
            <StorySections />

            {/* ── 6. CTA Section ── */}
            <CtaSection />
        </main>
    )
}