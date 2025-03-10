'use client';

import { ArcadeRoom } from '@/components/three/ArcadeRoom';
import { Suspense } from 'react';

// Debug for development
console.log("Page component loaded");

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      {/* Full-screen 3D Arcade Room */}
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#385d41]">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#ede6d2]">Arcade Portfolio</h1>
            <p className="text-xl text-[#ede6d2] mb-8">Loading 3D Experience...</p>
            <div className="w-64 h-2 bg-[#5d4f4d] rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-[#dfbe73] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      }>
        <ArcadeRoom />
      </Suspense>
    </main>
  );
}
