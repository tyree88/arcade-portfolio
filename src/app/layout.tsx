
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

// Font configuration
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

// Metadata configuration
export const metadata: Metadata = {
  title: "Retro Arcade Portfolio",
  description: "A nostalgic arcade-themed portfolio",
};

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
