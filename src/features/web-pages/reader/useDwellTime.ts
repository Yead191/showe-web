"use client";

import { useEffect, useRef } from "react";
import { trackDwellTime, type DwellTimeType } from "./dwellTime";

/** Ignore very short sessions (accidental opens / React Strict Mode remounts). */
const MIN_DWELL_MS = 2000;

/**
 * Tracks how long a user stays on a page and POSTs start/end times to
 * `/ads/dwell-time` when they leave (client navigation, refresh, or close).
 */
export function useDwellTime(
  itemId: string | undefined | null,
  type: DwellTimeType = "Programmes",
) {
  const startTimeRef = useRef<string | null>(null);
  const startMsRef = useRef<number>(0);
  const sentRef = useRef(false);
  const itemIdRef = useRef(itemId);
  const typeRef = useRef(type);

  itemIdRef.current = itemId;
  typeRef.current = type;

  useEffect(() => {
    if (!itemId) return;

    // Fresh session for this item.
    startTimeRef.current = new Date().toISOString();
    startMsRef.current = Date.now();
    sentRef.current = false;

    const send = () => {
      if (sentRef.current) return;
      if (!startTimeRef.current || !itemIdRef.current) return;

      const elapsed = Date.now() - startMsRef.current;
      if (elapsed < MIN_DWELL_MS) return;

      sentRef.current = true;
      const endTime = new Date().toISOString();

      void trackDwellTime({
        item: itemIdRef.current,
        type: typeRef.current,
        startTime: startTimeRef.current,
        endTime,
      });
    };

    // Covers tab close / refresh / mobile Safari unload better than beforeunload.
    const onPageHide = () => send();
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      // Next.js client navigations away from the reader.
      send();
    };
  }, [itemId, type]);
}
