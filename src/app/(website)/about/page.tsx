import About from '@/features/web-pages/about'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
    title: "About Us",
    description:
        "Learn how SHOWE reimagines the event programme—turning printed playbills into dynamic, QR-accessible interactive experiences that connect audiences, artists and organisers.",
    path: "/about",
    keywords: [
        "about SHOWE",
        "interactive event technology",
        "digital programme platform",
        "event engagement",
        "QR programme technology",
        "future of event programmes",
        "audience engagement platform",
    ],
})

export default function page() {
    return (
        <About />
    )
}
