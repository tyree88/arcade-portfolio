'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { Mesh } from 'three';

export function ArcadeCabinet() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Arcade cabinet body */}
      <Box args={[2, 4, 1.5]} position={[0, 0, 0]} ref={meshRef}>
        <meshStandardMaterial color="#222" />
      </Box>
      
      {/* Screen */}
      <Box args={[1.6, 1.2, 0.1]} position={[0, 0.8, 0.8]}>
        <meshStandardMaterial color="#111" />
      </Box>
      
      {/* Text */}
      <Text
        position={[0, 2, 0.76]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ARCADE
      </Text>
    </group>
  );
}