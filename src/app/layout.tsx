import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Add meta tags for proper rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body 
        className="font-sans bg-[#385d41] text-[#ede6d2] overscroll-none"
      >
        {/* Debug script to check WebGL support */}
        <Script id="webgl-check" strategy="beforeInteractive">
          {`
            try {
              const canvas = document.createElement('canvas');
              const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
              if (!gl) {
                console.warn('WebGL not supported - 3D content may not render correctly');
                window.__WEBGL_SUPPORTED = false;
              } else {
                console.log('WebGL is supported');
                window.__WEBGL_SUPPORTED = true;
              }
            } catch (e) {
              console.error('Error checking WebGL support:', e);
              window.__WEBGL_SUPPORTED = false;
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}