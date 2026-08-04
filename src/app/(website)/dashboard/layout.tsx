import React from "react"
import getProfile from "@/helpers/next-fetch/getProfile"
import DashboardSidebar from "./_components/DashboardSidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getProfile()

    return (
        <div className="min-h-screen bg-[#F8FAFB] pt-20 pb-8 md:pt-28 md:pb-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* ── Sidebar / Mobile Nav ── */}
                    <DashboardSidebar user={user} />

                    {/* ── Main Content Area ── */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white rounded-[32px] lg:rounded-[40px] p-5 lg:p-12 shadow-sm border border-gray-100/50 min-h-[500px] lg:min-h-[600px]">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    )
}