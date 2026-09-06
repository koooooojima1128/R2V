import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.fullName}`,
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${jbmono.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
