import React, { useRef } from 'react';
import * as THREE from 'three';

export default function Stool() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // TODO: Load actual GLTF model using useGLTF
  // TODO: Add interaction logic if the stool itself is interactive

  return (
    <mesh ref={meshRef} position={[0, 0.4, 3]} castShadow receiveShadow>
      {/* Placeholder Geometry */}
      <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
      <meshStandardMaterial color="#8B4513" /> {/* SaddleBrown */}
    </mesh>
  );
}