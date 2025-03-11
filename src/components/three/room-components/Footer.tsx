'use client';

import { Text } from '@react-three/drei';

/**
 * Footer component in 3D space
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <group position={[0, 0.1, 3]}>
      <Text
        fontSize={0.1}
        color="#ede6d2"
        anchorX="center"
        anchorY="middle"
      >
        <meshBasicMaterial attach="material" color="#ede6d2" transparent opacity={0.7} />
        &copy; {currentYear} Arcade Portfolio. Built with Next.js, Three.js, and nostalgia.
      </Text>
    </group>
  );
}
