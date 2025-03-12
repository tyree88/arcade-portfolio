'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#385d41" />
          </mesh>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}