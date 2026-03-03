import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thermostat Democracy",
  description:
    "Measure employee temperature preferences, correct for perception bias, and find the best shared thermostat setting for your office.",
  keywords: [
    "office temperature tool",
    "office thermostat optimization",
    "workplace temperature survey",
    "thermal comfort in offices",
    "office comfort analytics",
    "optimal office temperature",
    "shared thermostat solution",
    "employee comfort survey",
    "improve workplace comfort",
    "reduce office complaints",
    "office wellbeing tool",
    "employee satisfaction tool",
    "workplace environment optimization",
    "how to find the best office temperature",
    "office climate policy",
    "how to reduce office temperature complaints",
    "data-driven thermostat setting",
    "office temperature conflict solution",
    "how to balance hot and cold coworkers",
    "workplace thermal comfort calculator",
    "office temperature overlap analysis",
    "employee temperature preference survey",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Link href="/">
          <Image
            className={"absolute top-3 left-3"}
            src="/logo.svg"
            alt="Thermostat Democracy logo"
            width={200}
            height={40}
            priority
          />
        </Link>
        {children}
      </body>
    </html>
  );
}
