import type { Metadata } from "next";
import { Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ScrollToTop from "@/helpers/ScrollToTop";
import SplashScreen from "@/components/shared/SplashScreen";

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
  title: "Showe",
  description: "SHOWE turns traditional event programs into dynamic, interactive experiences-accessible instantly through a simple QR scan.",
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
        <Toaster position="top-center" richColors duration={2000} />
      </body>
    </html>
  );
}
