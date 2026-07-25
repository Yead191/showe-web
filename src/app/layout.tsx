import type { Metadata, Viewport } from "next";
import { Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ScrollToTop from "@/helpers/ScrollToTop";
import SplashScreen from "@/components/shared/SplashScreen";
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
    images: [{ url: `${siteConfig.url}/logo.png`, width: 1200, height: 630, alt: siteConfig.name }],
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
        <ScrollToTop />
        {children}
        <Toaster position="bottom-right" richColors duration={2000} closeButton={true} />
      </body>
    </html>
  );
}
