import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ResQGrid — Disaster Management Platform",
  description:
    "Before/During/After disaster management. Real-time alerts, SOS, offline BLE relay, and recovery coordination.",
  keywords: ["disaster", "SOS", "emergency", "safety", "India", "NDMA"],
  authors: [{ name: "Team Noir" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1D1D1D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#F5F5F5] antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
