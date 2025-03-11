'use client';

import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Retro Arcade Portfolio</h1>
      <p className="text-xl mb-10">An interactive 3D showcase of projects</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Arcade Experience</h2>
          <p>Interact with 3D arcade machines to explore projects</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Retro Aesthetics</h2>
          <p>Nostalgic design with modern web technologies</p>
        </div>
      </div>
    </main>
  );
}