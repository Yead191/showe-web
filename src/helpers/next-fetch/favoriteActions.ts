"use server";

import { nextFetch } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

export async function toggleVenueFavorite(venueId: string) {
  const res = await nextFetch(`/event/interest/${venueId}`, {
    method: "POST",
    body: {
      type: "Venue",
    },
  });

  if (res?.success) {
    await revalidateTags(["venues", "venue-details", "user-profile", "user-favourites"]);
  }

  return res;
}
