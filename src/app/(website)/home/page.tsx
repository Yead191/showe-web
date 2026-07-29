import Home from "@/features/web-pages/home";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Discover Live Events & Interactive Programmes",
  description:
    "Discover live events, theatre, concerts and performances near you. Explore rich interactive programmes, meet the artists, and engage with every show through SHOWE.",
  path: "/home",
  keywords: [
    "discover events",
    "events near me",
    "book event tickets",
    "live performances",
    "theatre shows",
    "concerts near me",
    "upcoming events",
    "what's on",
    "event discovery",
    "find shows",
  ],
});

export default async function page() {
    const events = await nextFetch("/event/search", {
        method: "GET",
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 // 1 hour
        }
    })
    // console.log(events)

    const artists = await nextFetch("/artist", {
        method: "GET",
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 // 1 hour
        }
    })
    // console.log("artists", artists)

    return (
        <Home events={events.data??[]} artists={artists.data??[]} />
    )
}
