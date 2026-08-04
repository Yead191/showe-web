"use server";

import { nextFetch } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

/** POST /event/interest/:id  body: { type: "Venue" } */
export async function toggleVenueFavorite(venueId: string) {
  const res = await nextFetch(`/event/interest/${venueId}`, {
    method: "POST",
    body: {
      type: "Venue",
    },
  });

  // Revalidate so next render pulls fresh isFavorited from backend
  if (res?.success) {
    await revalidateTags(["venues", "venue-details", "user-favourites"]);
  }

  return res;
}
