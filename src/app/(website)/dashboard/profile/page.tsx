import UserProfilePage from "@/features/web-pages/user-profile"
import getProfile from "@/helpers/next-fetch/getProfile"
import { buildMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"

export const metadata = buildMetadata({ title: "My Profile", path: "/dashboard/profile", noIndex: true })

export default async function ProfilePage() {
    const user = await getProfile()

    if (!user) {
        redirect("/home")
    }

    return <UserProfilePage user={user} />
}
