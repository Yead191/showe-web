import WebNavbar from "@/components/shared/navbar/WebNavbar";
import LandingFooter from "@/features/web-pages/landing/components/LandingFooter";
import getProfile from "@/helpers/next-fetch/getProfile";

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
    const user = await getProfile()
    return (
        <>
            <WebNavbar user={user} />
            {children}
            <LandingFooter />
        </>
    )
}