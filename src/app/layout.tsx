
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retro Arcade Portfolio",
  description: "PlayStation-inspired interactive arcade portfolio showcasing my work and skills",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-full relative`}
      >
        {/* PlayStation-inspired startup screen */}
        <div className="fixed inset-0 bg-ps-brown flex items-center justify-center z-50 startup-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-ps-cream mb-4 ps-title">PORTFOLIO</h1>
            <div className="ps-loading text-ps-cream">Loading experience...</div>
          </div>
        </div>
        
        {children}
        
        {/* Retro cursor effect */}
        <div id="retro-cursor" className="fixed w-4 h-4 bg-ps-tan rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"></div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // PlayStation startup screen
            setTimeout(() => {
              document.querySelector('.startup-screen').style.opacity = 0;
              setTimeout(() => {
                document.querySelector('.startup-screen').style.display = 'none';
              }, 1000);
            }, 2500);
            
            // Retro cursor effect
            document.addEventListener('mousemove', (e) => {
              const cursor = document.getElementById('retro-cursor');
              if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
              }
            });
          `
        }} />
        
        <style jsx>{`
          .startup-screen {
            transition: opacity 1s ease;
          }
        `}</style>
      </body>
    </html>
  );
}
