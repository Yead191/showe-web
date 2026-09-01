"use server";

import { revalidatePath } from "next/cache";
import { nextFetch } from "./NextFetch";
import { revalidateTags } from "./revalidateTags";

/**
 * DELETE /booking/:id
 */
export async function deleteBooking(bookingId: string) {
  const res = await nextFetch(`/booking/${bookingId}`, {
    method: "DELETE",
  });

  // console.log(res);
  if (res?.success) {
    await revalidateTags(["programmes"]);
    try {
      revalidatePath("/programmes");
    } catch {
      // Revalidation path is best-effort
    }
  }

  return res;
}
