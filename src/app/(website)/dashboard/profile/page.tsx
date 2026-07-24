import UserProfilePage from "@/features/web-pages/user-profile"
import getProfile from "@/helpers/next-fetch/getProfile"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const user = await getProfile()

    if (!user) {
        redirect("/home")
    }

    return <UserProfilePage user={user} />
}
