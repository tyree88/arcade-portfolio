import React from 'react';

// Placeholder components for room elements
function Floor() {
  // TODO: Implement tatami mats, wooden borders
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#d2b48c" roughness={0.8} /> {/* Placeholder Tan color */}
    </mesh>
  );
}

function Walls() {
  // TODO: Implement walls, shoji screens, sliding doors
  // Example placeholder wall
  return (
    <mesh position={[-5, 2.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.1, 5, 10]} />
      <meshStandardMaterial color="#f5f5dc" /> {/* Placeholder Beige color */}
    </mesh>
  );
}

function Ceiling() {
  // TODO: Implement ceiling beams, hanging elements
  return (
    <mesh position={[0, 5.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#8b4513" /> {/* Placeholder SaddleBrown color */}
    </mesh>
  );
}

export default function Room() {
  return (
    <group>
      <Floor />
      <Walls />
      {/* TODO: Add more walls */}
      <Ceiling />
      {/* TODO: Add decorative elements */}
      {/* TODO: Add neon accents */}
    </group>
  );
}