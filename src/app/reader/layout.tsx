import React from 'react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: "Programme Reader",
  description:
    "Read interactive digital programmes on SHOWE—an immersive, mobile-first playbill experience with rich media and artist profiles.",
  path: "/reader",
  keywords: ["programme reader", "digital programme", "interactive playbill"],
})

export default function ReaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
