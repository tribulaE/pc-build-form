import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Gaming PC Request",
  description: "Submit your build request",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-blue-900">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Prevent iOS/Safari white flash/bars */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-screen bg-blue-900 text-gray-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}