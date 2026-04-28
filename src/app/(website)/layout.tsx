import WebNavbar from "@/components/shared/navbar/WebNavbar";
import LandingFooter from "@/features/web-pages/landing/components/LandingFooter";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <WebNavbar />
            {children}
            <LandingFooter />
        </>
    )
}