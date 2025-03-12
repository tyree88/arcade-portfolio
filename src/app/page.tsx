
'use client';

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { ProjectsSection } from "@/components/ProjectsSection";

// Dynamically import the 3D scene component with no SSR to prevent hydration issues
const ArcadeRoom = dynamic(() => import("@/components/three/ArcadeRoom").then(mod => ({ default: mod.ArcadeRoom })), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-xl mb-2">Loading 3D Environment</h2>
        <p>Please wait...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="h-screen w-full relative bg-black">
      {/* Full-screen 3D scene */}
      <ArcadeRoom />
    </main>
  );
}
