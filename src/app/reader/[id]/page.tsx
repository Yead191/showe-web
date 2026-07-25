import ReaderPage from '@/features/web-pages/reader/ReaderPage'
import { normalizeProgramme } from '@/features/web-pages/reader/programmesApi'
import { nextFetch } from '@/helpers/next-fetch/NextFetch'
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const [programme] = await Promise.all([
    nextFetch(`/programmes/${id}`, {
      method: 'GET',
      cache: "default",
      tags: [`programme-${id}`],
    }),
  ])
  if (!programme?.success || !programme.data) {
    return <div>Programme not found</div>
  }
  return (
    <ReaderPage programme={normalizeProgramme(programme.data)} />
  )
}
