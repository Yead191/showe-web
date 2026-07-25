import MyProgrammesPage from "@/features/web-pages/programmes";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";

export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams

    const params = new URLSearchParams()
    if (search.category) params.set('category', search.category)

    const programmes = await nextFetch(`/booking?${params.toString()}`, {
        method: 'GET',
    })
    return (
        <MyProgrammesPage programmes={programmes?.data ?? []} />
    )
}
