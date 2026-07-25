import Home from "@/features/web-pages/home";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";

export default async function page() {
    const events = await nextFetch("/event/search", {
        method: "GET",
        // cache: "force-cache",
    })
    // console.log(events)

    const artists = await nextFetch("/artist", {
        method: "GET",
    })
    // console.log("artists", artists)

    return (
        <Home events={events.data??[]} artists={artists.data??[]} />
    )
}
