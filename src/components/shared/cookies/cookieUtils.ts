import Cookies from "js-cookie";

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
}

export const COOKIE_CONSENT_KEY = "showe_cookie_consent";
export const OPEN_COOKIE_MODAL_EVENT = "showe:open-cookie-preferences";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  functional: true,
  marketing: false,
  timestamp: "",
};

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      Cookies.get(COOKIE_CONSENT_KEY) ||
      localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(
  prefs: Partial<Omit<CookiePreferences, "necessary" | "timestamp">>
): CookiePreferences {
  const fullPrefs: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics ?? false,
    functional: prefs.functional ?? false,
    marketing: prefs.marketing ?? false,
    timestamp: new Date().toISOString(),
  };

  const serialized = JSON.stringify(fullPrefs);
  Cookies.set(COOKIE_CONSENT_KEY, serialized, {
    expires: 365,
    sameSite: "Lax",
  });

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
  } catch {
    // LocalStorage might be restricted
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("showe:cookie-consent-updated", { detail: fullPrefs })
    );
  }

  return fullPrefs;
}

export function acceptAllCookies(): CookiePreferences {
  return saveCookiePreferences({
    analytics: true,
    functional: true,
    marketing: true,
  });
}

export function rejectNonEssentialCookies(): CookiePreferences {
  return saveCookiePreferences({
    analytics: false,
    functional: false,
    marketing: false,
  });
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_MODAL_EVENT));
  }
}
