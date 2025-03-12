
'use client';

import React from "react";
import { Scene } from "@/components/three/Scene";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="h-screen w-full relative bg-black">
      {/* Full-screen 3D scene */}
      <Scene />
    </main>
  );
}
