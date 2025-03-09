'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ArcadeCabinet } from './ArcadeCabinet';

export function Scene() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-[50vh] md:h-[70vh] flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg">
        <p className="text-foreground">Failed to load 3D scene. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] md:h-[70vh]">
      <Canvas onError={() => setHasError(true)}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <ArcadeCabinet />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}