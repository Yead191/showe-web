import ProgramDetailsPage from "@/features/web-pages/programmes/program-details"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { buildMetadata } from "@/lib/seo"
import { getImageUrl } from "@/lib/getImageUrl"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await nextFetch<any>(`/programmes/${id}`, { method: "GET", tags: [`programme-${id}`] })
    const programme = res?.data

    return buildMetadata({
        title: programme?.title ?? "Programme",
        description: programme?.title
            ? `Explore “${programme.title}” on SHOWE—an interactive digital programme with rich media, artist profiles and behind-the-scenes content.`
            : "Explore this interactive digital programme on SHOWE—rich media, artist profiles and behind-the-scenes content in an immersive playbill.",
        path: `/programmes/${id}`,
        image: programme?.cover_image ? getImageUrl(programme.cover_image) : undefined,
        keywords: [
            "digital programme",
            "interactive programme reader",
            "event programme",
            "playbill",
            "show notes",
            ...(programme?.title ? [programme.title] : []),
        ],
        type: "article",
    })
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    void id
    const book = '/assets/books/book-pdf.pdf'
    return (
        <ProgramDetailsPage book={book} />
    )
}
