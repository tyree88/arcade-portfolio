'use client';

import { Text } from '@react-three/drei';

/**
 * About Me section as a 3D element
 */
export function AboutMeSection() {
  return (
    <group position={[0, 2, -5.8]}>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.12}
        color="#ede6d2"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        A developer with a passion for creating nostalgic digital experiences that blend modern technology with retro aesthetics.
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.12}
        color="#ede6d2"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Influenced by PlayStation-era design, Japanese arcade culture, and 90s gaming.
      </Text>
    </group>
  );
}
