"use server";

import { nextFetch } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

export type InterestType = "Venue" | "Event" | "Performances" | "Recommendations";

/** POST /event/interest/:id  body: { type } */
export async function toggleInterest(id: string, type: InterestType) {
  const res = await nextFetch(`/event/interest/${id}`, {
    method: "POST",
    body: { type },
  });

  if (res?.success) {
    await revalidateTags(["venues", "venue-details", "user-favourites", "events"]);
  }

  return res;
}

/** POST /event/interest/:id  body: { type: "Venue" } */
export async function toggleVenueFavorite(venueId: string) {
  return toggleInterest(venueId, "Venue");
}

/** POST /event/interest/:id  body: { type: "Event" } */
export async function toggleEventFavorite(eventId: string) {
  return toggleInterest(eventId, "Event");
}

/** GET /event/interest?type=Venue | Event | ... */
export async function getFavouriteList(type: InterestType) {
  return nextFetch(`/event/interest?type=${type}`, {
    method: "GET",
    cache: "no-store",
    tags: ["user-favourites"],
  });
}
