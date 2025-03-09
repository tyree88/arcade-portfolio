'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

export function ArcadeCabinet() {
  const cabinetRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cabinetRef.current) {
      cabinetRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={cabinetRef} position={[0, 0, 0]}>
      {/* Cabinet body */}
      <Box args={[1.5, 3, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#84a98c" />
      </Box>

      {/* Screen */}
      <Box args={[1.2, 1, 0.1]} position={[0, 0.5, 0.55]}>
        <meshStandardMaterial color="#e0d8c0" emissive="#e0d8c0" emissiveIntensity={0.2} />
      </Box>

      {/* Controls */}
      <Box args={[1.2, 0.5, 0.3]} position={[0, -0.7, 0.65]}>
        <meshStandardMaterial color="#2b2d42" />
      </Box>

      {/* Joystick */}
      <group position={[-0.3, -0.7, 0.8]}>
        <Box args={[0.1, 0.1, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ff9e64" />
        </Box>
        <Box args={[0.05, 0.2, 0.05]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#ff9e64" />
        </Box>
      </group>

      {/* Buttons */}
      {[0, 0.2, 0.4].map((x, i) => (
        <Box key={i} args={[0.1, 0.05, 0.1]} position={[x, -0.7, 0.8]}>
          <meshStandardMaterial color={['#ff9e64', '#e5383b', '#457b9d'][i]} />
        </Box>
      ))}

      {/* Text on cabinet */}
      <Text
        position={[0, 1.2, 0.55]}
        fontSize={0.2}
        color="#333"
        font="/fonts/retroserif.woff2"
        anchorX="center"
        anchorY="middle"
      >
        ARCADE
      </Text>
    </group>
  );
}