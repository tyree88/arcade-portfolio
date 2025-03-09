'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ArcadeCabinet } from './ArcadeCabinet';

export function Scene() {
  return (
    <div className="w-full h-[50vh] md:h-[70vh]">
      <Canvas>
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