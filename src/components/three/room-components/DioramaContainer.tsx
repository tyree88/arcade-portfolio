'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DioramaContainerProps {
  children: React.ReactNode;
}

/**
 * DioramaContainer component that provides subtle animation for the diorama
 */
export function DioramaContainer({ children }: DioramaContainerProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 + 0.05;
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}
