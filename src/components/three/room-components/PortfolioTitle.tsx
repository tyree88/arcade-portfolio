'use client';

import { Text, Float } from '@react-three/drei';

/**
 * Title component floating in 3D space
 */
export function PortfolioTitle() {
  return (
    <group position={[0, 3.5, -4]}>
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <Text
          fontSize={0.5}
          color="#ede6d2"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#385d41"
        >
          ARCADE PORTFOLIO
        </Text>
      </Float>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[0, -0.6, 0]}
      >
        <Text
          fontSize={0.15}
          color="#dfbe73"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          A nostalgic journey through my portfolio, inspired by PlayStation memories and Japanese arcade aesthetics
        </Text>
      </Float>
    </group>
  );
}
