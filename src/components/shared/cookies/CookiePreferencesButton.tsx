"use client";

import { openCookiePreferences } from "./cookieUtils";

interface CookiePreferencesButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookiePreferencesButton({
  className = "hover:text-white transition-colors cursor-pointer",
  children = "Cookie Preferences",
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
    >
      {children}
    </button>
  );
}
