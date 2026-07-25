import ReaderPage from '@/features/web-pages/reader/ReaderPage'
import { normalizeProgramme } from '@/features/web-pages/reader/programmesApi'
import { nextFetch } from '@/helpers/next-fetch/NextFetch'
import { buildMetadata } from '@/lib/seo'
import { getImageUrl } from '@/lib/getImageUrl'
import { cache } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProgramme = cache((id: string) =>
  nextFetch<any>(`/programmes/${id}`, {
    method: 'GET',
    cache: "default",
    tags: [`programme-${id}`],
  })
)

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getProgramme(id)
  const programme = res?.data

  return buildMetadata({
    title: programme?.title ? `${programme.title} — Programme` : "Programme Reader",
    description: programme?.title
      ? `Read “${programme.title}” — an interactive digital programme on SHOWE with rich media, artist profiles and behind-the-scenes content.`
      : "Read this interactive digital programme on SHOWE—an immersive, mobile-first playbill experience.",
    path: `/reader/${id}`,
    image: programme?.cover_image ? getImageUrl(programme.cover_image) : undefined,
    keywords: [
      "programme reader",
      "digital programme",
      "interactive playbill",
      ...(programme?.title ? [programme.title] : []),
    ],
    type: "article",
  })
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const [programme] = await Promise.all([getProgramme(id)])
  if (!programme?.success || !programme.data) {
    return <div>Programme not found</div>
  }
  return (
    <ReaderPage programme={normalizeProgramme(programme.data)} />
  )
}
