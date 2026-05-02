"use client"

import SupportHero from "./components/SupportHero"
import SupportCategories from "./components/SupportCategories"
import SupportForm from "./components/SupportForm"
import SupportFaq from "./components/SupportFaq"

export default function Support() {
    return (
        <main className="">
            {/* Hero Section with Search */}
            <SupportHero />

            {/* Categorized Help Topics */}
            <SupportCategories />

            {/* Main Contact Form & Info */}
            <SupportForm />

            {/* Common FAQ Section */}
            <SupportFaq />
        </main>
    )
}