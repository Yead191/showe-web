"use server";

import { revalidatePath } from "next/cache";
import { nextFetch, type FetchResponse } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

export interface UserTicket {
  _id: string;
  name: string;
  date: string;
  file: string;
  tags?: string[];
  tags_image?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface GetTicketsQuery {
  page?: number | string;
  limit?: number | string;
  searchTerm?: string;
  search?: string;
  date?: string;
  sort?: string;
}

/**
 * GET /ticket
 * Retrieves user's tickets with pagination, search, and filtering options.
 * Cached with tag 'user-tickets' and 30-second revalidation.
 */
export async function getTickets(
  query: GetTicketsQuery = {},
): Promise<FetchResponse<UserTicket[]>> {
  const params = new URLSearchParams();

  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.searchTerm?.trim()) {
    params.set("searchTerm", query.searchTerm.trim());
    params.set("search", query.searchTerm.trim());
  }
  if (query.date?.trim()) params.set("date", query.date.trim());
  if (query.sort?.trim()) params.set("sort", query.sort.trim());

  const queryString = params.toString();
  const endpoint = queryString ? `/ticket?${queryString}` : "/ticket";

  return nextFetch<UserTicket[]>(endpoint, {
    method: "GET",
    cache: "default",
    tags: ["user-tickets"],
    next: {
      revalidate: 30,
    },
  });
}

/**
 * POST /ticket
 * Creates a new ticket upload using multipart/form-data.
 * Expected payload: name, date, file, tags[], tags_image
 */
export async function createTicket(
  formData: FormData,
): Promise<FetchResponse<UserTicket>> {
  const res = await nextFetch<UserTicket>("/ticket", {
    method: "POST",
    body: formData,
  });

  if (res?.success) {
    await revalidateTags(["user-tickets"]);
    try {
      revalidatePath("/dashboard/tickets");
    } catch {
      // Revalidation is best-effort
    }
  }

  return res;
}

/**
 * PATCH /ticket/:id
 * Updates an existing ticket with multipart/form-data.
 */
export async function updateTicket(
  ticketId: string,
  formData: FormData,
): Promise<FetchResponse<UserTicket>> {
  const res = await nextFetch<UserTicket>(`/ticket/${ticketId}`, {
    method: "PATCH",
    body: formData,
  });

  if (res?.success) {
    await revalidateTags(["user-tickets"]);
    try {
      revalidatePath("/dashboard/tickets");
    } catch {
      // Revalidation is best-effort
    }
  }

  return res;
}

/**
 * DELETE /ticket/:id
 * Deletes a ticket by ID.
 */
export async function deleteTicket(
  ticketId: string,
): Promise<FetchResponse<unknown>> {
  const res = await nextFetch(`/ticket/${ticketId}`, {
    method: "DELETE",
  });

  if (res?.success) {
    await revalidateTags(["user-tickets"]);
    try {
      revalidatePath("/dashboard/tickets");
    } catch {
      // Revalidation is best-effort
    }
  }

  return res;
}
