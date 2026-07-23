/* eslint-disable @typescript-eslint/no-explicit-any */

// Loads the Google Maps JS API (with the Places library) exactly once and
// resolves with the global `google` namespace. Safe to call repeatedly.
let mapsPromise: Promise<any> | null = null

export function loadGoogleMaps(apiKey: string): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only be loaded in the browser"))
  }

  const existing = (window as any).google
  if (existing?.maps?.importLibrary) {
    return Promise.resolve(existing)
  }

  if (mapsPromise) return mapsPromise

  mapsPromise = new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error("Missing Google Maps API key"))
      return
    }

    const script = document.createElement("script")
    // Force the region and language to UK for search/autocomplete results
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&v=weekly&region=GB&language=en`
    script.async = true
    script.defer = true
    script.onload = () => resolve((window as any).google)
    script.onerror = () => {
      mapsPromise = null
      reject(new Error("Failed to load Google Maps script"))
    }
    document.head.appendChild(script)
  })

  return mapsPromise
}
