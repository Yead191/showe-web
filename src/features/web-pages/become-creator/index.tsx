"use client"
import LandingNavbar from "@/components/shared/navbar/LandingNavbar";
import LandingFAQ from "../landing/components/LandingFAQ";
import LandingFooter from "../landing/components/LandingFooter";
import PageBanner from "@/components/shared/PageBanner";
import WhyChooseUs from "../landing/components/WhyChooseUs";
import { becomeCreatorFeatures } from "@/constants/landing/become-creator-data";
import MakeOwnProgramme from "./components/MakeOwnProgramme";
import { useState } from "react";
import AuthModal from "@/features/auth/components/AuthModal";

export default function BecomeCreator() {
    const [authModalOpen, setAuthModalOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <main>
                <PageBanner
                    title="Create Smarter Event Experiences"
                    description="Engage your audience, reduce costs, and manage everything in one place"
                    bgImage="/assets/bg/banner/creator-banner.jpg"
                    buttons={[
                        { label: "Get Started", onClick: () => setAuthModalOpen(true), variant: "default" },
                        { label: "Login", onClick: () => setAuthModalOpen(true) }
                    ]}
                />
                <WhyChooseUs features={becomeCreatorFeatures} title="Why Venues & Producers Choose SHOWE" subtitle="Powerful tools designed to simplify operations and elevate audience engagement" />
                <MakeOwnProgramme />
                <LandingFAQ />
            </main>
            <LandingFooter />
            <AuthModal open={authModalOpen} onOpenChange={() => setAuthModalOpen(false)} />
        </div>
    )
}
