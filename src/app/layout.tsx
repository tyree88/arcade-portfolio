'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import type { Metadata as NextMetadata } from "next";

// Metadata needs to be in a separate file when using 'use client'
// The actual metadata is now in src/app/metadata.ts

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <Script
          id="arcade-theme"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Theme initialization script
                document.documentElement.classList.add('arcade-theme');
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}