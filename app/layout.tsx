import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font: no layout shift, no external request.
const display = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-display-src", display: "swap" });
const body = Geist({ subsets: ["latin"], variable: "--font-body-src", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.fullName}`, template: `%s | ${site.name}` },
  description: site.description,
};
export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-white font-sans text-neutral-900 antialiased">
        <MotionProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
