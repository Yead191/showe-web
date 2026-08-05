import UserFavourites from "@/features/web-pages/user-favourites"
import { getFavouriteList } from "@/helpers/next-fetch/favoriteActions"
import getProfile from "@/helpers/next-fetch/getProfile"
import { buildMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"

export const metadata = buildMetadata({
    title: "My Favourites",
    path: "/dashboard/favourites",
    noIndex: true,
})

export default async function FavouritesPage() {
    const user = await getProfile()
    if (!user) {
        redirect("/home")
    }

    const [eventsRes, venuesRes] = await Promise.all([
        getFavouriteList("Event"),
        getFavouriteList("Venue"),
    ])

    return (
        <UserFavourites
            events={eventsRes.data ?? []}
            venues={venuesRes.data ?? []}
        />
    )
}
