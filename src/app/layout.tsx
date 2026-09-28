import type { Metadata, Viewport } from "next";
import { Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";
import SplashScreen from "@/components/shared/SplashScreen";
import { CookieConsentBanner } from "@/components/shared/cookies";
import { siteConfig } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "events",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
    images: [
      {
        url: `${siteConfig.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#014B52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${museoModerno.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        {children}
        <CookieConsentBanner />
        <Toaster
          position="bottom-right"
          duration={3000}
          closeButton
          style={
            {
              "--toast-close-button-start": "unset",
              "--toast-close-button-end": "12px",
              "--toast-close-button-transform": "none",
              fontFamily: "var(--font-montserrat), sans-serif",
            } as React.CSSProperties
          }
          icons={{
            info: <Info className="size-5 text-[#F2A900] shrink-0" strokeWidth={2} />,
            success: <CheckCircle2 className="size-5 text-emerald-600 shrink-0" strokeWidth={2} />,
            warning: <AlertTriangle className="size-5 text-[#F2A900] shrink-0" strokeWidth={2} />,
            error: <AlertCircle className="size-5 text-rose-600 shrink-0" strokeWidth={2} />,
            loading: <Loader2 className="size-5 text-[#F2A900] animate-spin shrink-0" strokeWidth={2} />,
          }}
          toastOptions={{
            classNames: {
              toast:
                "font-sans !bg-white !border !border-gray-200 !shadow-lg !rounded-xl !p-4 !gap-3 !items-center !pr-10 !text-gray-900",
              title: "!text-sm !font-medium !text-gray-900",
              description: "!text-xs !text-gray-500 !mt-0.5",
              icon: "!size-5 !shrink-0 !flex !items-center !justify-center",
              closeButton:
                "!left-auto !right-3 !top-3 !transform-none !border !border-gray-200 !bg-white hover:!bg-gray-100 !text-gray-400 hover:!text-gray-700 !rounded-full !size-5 !flex !items-center !justify-center !transition-colors !cursor-pointer",
              info: "!border-[#F2A900]/40",
              warning: "!border-[#F2A900]/40",
              success: "!border-emerald-500/40",
              error: "!border-rose-500/40",
            },
          }}
        />
      </body>
    </html>
  );
}
