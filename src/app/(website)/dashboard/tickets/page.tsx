import { redirect } from "next/navigation";
import getProfile from "@/helpers/next-fetch/getProfile";
import { getTickets } from "@/helpers/next-fetch/ticketActions";
import TicketsFeature from "@/features/web-pages/tickets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Tickets — Stored Passes & Bookings",
  description: "View, upload, and manage your event tickets, entry passes, and PDF documents.",
  path: "/dashboard/tickets",
  noIndex: true,
});

interface TicketsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    search?: string;
    date?: string;
    sort?: string;
    tag?: string;
    status?: string;
  }>;
}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  // Protect route: user must be authenticated
  const user = await getProfile();
  if (!user) {
    redirect("/home");
  }

  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const limit = Number(resolvedParams?.limit) || 10;
  const searchTerm = resolvedParams?.searchTerm || resolvedParams?.search || "";
  const sort = resolvedParams?.sort || "newest";
  const date = resolvedParams?.date || "";

  // Server-side fetch with Next.js caching & revalidation tag 'user-tickets'
  const res = await getTickets({
    page,
    limit,
    searchTerm,
    sort,
    date,
  });

  const tickets = res?.data ?? [];
  const pagination = res?.pagination;

  return (
    <TicketsFeature
      initialTickets={tickets}
      initialPagination={pagination}
    />
  );
}
