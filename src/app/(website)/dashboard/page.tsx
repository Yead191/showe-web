import { redirect } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: "Dashboard", path: "/dashboard", noIndex: true })

export default function DashboardPage() {
    redirect('/dashboard/profile')
}
