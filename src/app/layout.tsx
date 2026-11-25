import type { Metadata } from "next";
import { Caveat, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serif for the name and headings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

// Handwritten accents.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rujuta Tambewagh",
  description: "Software and AI/ML engineer in San Francisco. Projects, writing, and resume.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
