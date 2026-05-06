"use client"
import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingFAQ from "../landing/components/LandingFAQ";
import LandingFooter from "../landing/components/LandingFooter";
import PageBanner from "@/components/shared/PageBanner";
import OrgStrategicSummary from "./components/OrgStrategicSummary";
import OrgBenefits from "./components/OrgBenefits";
import OrgVisualShowcase from "./components/OrgVisualShowcase";
import OrgUseCases from "./components/OrgUseCases";
import { useRouter } from "next/navigation";

export default function BecomeCreator() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar isCreator={true} />
            <main>
                <PageBanner
                    title="Transform your programme into a powerful digital experience."
                    description="Engage your audience, unlock new revenue streams, and replace print with a flexible, data-driven platform."
                    bgImage="/assets/bg/programmes/community.png"
                    buttons={[
                        { label: "Get Started", onClick: () => router.push("/organisation-register"), variant: "default" },
                        { label: "Book a Demo", onClick: () => router.push("/support"), },
                    ]}
                />

                <OrgStrategicSummary />
                <OrgBenefits />
                <OrgVisualShowcase />
                <OrgUseCases />

                {/* Commenting out sections that no longer match the strategic goals */}
                {/* 
                <WhyChooseUs features={becomeCreatorFeatures} title="Why Venues & Producers Choose SHOWE" subtitle="Powerful tools designed to simplify operations and elevate audience engagement" />
                <MakeOwnProgramme />
                */}

                <LandingFAQ />
            </main>
            <LandingFooter />
        </div>
    )
}
