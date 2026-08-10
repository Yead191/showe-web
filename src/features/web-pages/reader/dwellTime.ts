"use server";

import { nextFetch } from "@/helpers/next-fetch/NextFetch";

export type DwellTimeType = "Event" | "Recommendations" | "Ad" | "Programmes";

export interface DwellTimePayload {
  item: string;
  type: DwellTimeType;
  startTime: string;
  endTime: string;
}

export async function trackDwellTime(payload: DwellTimePayload) {
  const response = await nextFetch("/ads/dwell-time", {
    method: "POST",
    body: payload,
  });
  return response;
}
