"use server";

import { nextFetch } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

export type InterestType =
  | "Venue"
  | "Event"
  | "Artist"
  | "Performances"
  | "Recommendations";

/** POST /event/interest/:id  body: { type } */
export async function toggleInterest(id: string, type: InterestType) {
  const res = await nextFetch(`/event/interest/${id}`, {
    method: "POST",
    body: { type },
  });

  if (res?.success) {
    await revalidateTags([
      "venues",
      "venue-details",
      "user-favourites",
      "events",
      "artists",
      "artist-details",
    ]);
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

/** POST /event/interest/:id  body: { type: "Artist" } */
export async function toggleArtistFavorite(artistId: string) {
  return toggleInterest(artistId, "Artist");
}

/** GET /event/interest?type=Venue | Event | Artist | ... */
export async function getFavouriteList(type: InterestType) {
  return nextFetch(`/event/interest?type=${type}`, {
    method: "GET",
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 2,
    },
    tags: ["user-favourites"],
  });
}
