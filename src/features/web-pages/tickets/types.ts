import type { UserTicket } from "@/helpers/next-fetch/ticketActions";

export type { UserTicket };

export interface TicketPaginationInfo {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export type TicketStatusFilter = "all" | "upcoming" | "past";

export type TicketSortOption =
  | "newest"
  | "oldest"
  | "eventDateSoonest"
  | "eventDateLatest"
  | "nameAsc";

export interface TicketFilterState {
  searchTerm: string;
  status: TicketStatusFilter;
  selectedTag: string | null;
  sort: TicketSortOption;
}
