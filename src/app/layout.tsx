import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or choose a font suitable for the theme
import "./globals.css";

// If using a specific font like Geist Sans/Mono mentioned in the old config:
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcade Portfolio",
  description: "Interactive 3D Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" /* className={`${GeistSans.variable} ${GeistMono.variable}`} */ >
      <body className={inter.className}>{children}</body>
    </html>
  );
}