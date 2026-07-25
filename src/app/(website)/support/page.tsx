import Support from '@/features/web-pages/support'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
    title: "Support & Help Centre",
    description:
        "Need a hand? Browse SHOWE FAQs or contact our support team for help with events, tickets, digital programmes and your account.",
    path: "/support",
    keywords: [
        "SHOWE support",
        "help centre",
        "contact SHOWE",
        "SHOWE FAQ",
        "customer service",
        "event app help",
        "ticket support",
        "programme help",
    ],
})

export default function page() {
    return (
        <Support />
    )
}
