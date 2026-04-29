import ProgramDetailsPage from "@/features/web-pages/programmes/program-details"

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const book = '/assets/books/book-pdf.pdf'
    return (
        <ProgramDetailsPage book={book} />
    )
}
