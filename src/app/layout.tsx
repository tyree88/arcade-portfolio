'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font configuration
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

// Metadata is moved to a separate file

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}