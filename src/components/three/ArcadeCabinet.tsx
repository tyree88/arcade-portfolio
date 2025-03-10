'use client';

import { useRef, useState, useEffect } from 'react';
import { Box, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Debug logging
console.log("ArcadeCabinet component loaded");

export function ArcadeCabinet() {
  const cabinetRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Debug logging for component lifecycle
  useEffect(() => {
    console.log("ArcadeCabinet component mounted");
    return () => console.log("ArcadeCabinet component unmounted");
  }, []);

  // PlayStation-inspired colors
  const psGreen = new THREE.Color('#385d41');
  const psTan = new THREE.Color('#dfbe73');
  const psSage = new THREE.Color('#7e976d');
  const psCream = new THREE.Color('#ede6d2');
  const psBrown = new THREE.Color('#5d4f4d');

  // Debug logging for interactions
  const handlePointerOver = () => {
    console.log("ArcadeCabinet: pointer over");
    setHovered(true);
  };

  const handlePointerOut = () => {
    console.log("ArcadeCabinet: pointer out");
    setHovered(false);
  };

  const handleClick = () => {
    console.log("ArcadeCabinet: clicked");
    setClicked(!clicked);
  };

  return (
    <group 
      ref={cabinetRef} 
      position={[0, 0, 0]}
      scale={0.5}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Cabinet body - main structure */}
      <RoundedBox args={[2, 4, 1.5]} radius={0.05} position={[0, 1, 0]} smoothness={4} castShadow>
        <meshStandardMaterial color={psGreen} />
      </RoundedBox>

      {/* Cabinet top */}
      <RoundedBox args={[2.2, 0.2, 1.7]} radius={0.05} position={[0, 3.1, 0]} smoothness={4} castShadow>
        <meshStandardMaterial color={psBrown} />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox args={[1.8, 1.4, 0.2]} radius={0.05} position={[0, 1.8, 0.75]} smoothness={4} castShadow>
        <meshStandardMaterial color={psBrown} />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox args={[1.6, 1.2, 0.1]} radius={0.02} position={[0, 1.8, 0.85]} smoothness={4} castShadow>
        <meshStandardMaterial 
          color={psCream} 
          emissive={psCream} 
          emissiveIntensity={clicked ? 0.5 : 0.2} 
        />
      </RoundedBox>

      {/* Screen content - only visible when clicked */}
      {clicked && (
        <RoundedBox args={[1.5, 1.1, 0.05]} radius={0.01} position={[0, 1.8, 0.9]} smoothness={4}>
          <meshBasicMaterial color="#000000" />
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.15}
            color={psTan}
            // No font specified, using default
            anchorX="center"
            anchorY="middle"
            maxWidth={1.3}
            textAlign="center"
          >
            PORTFOLIO
            {"\n"}
            PROJECTS
          </Text>
        </RoundedBox>
      )}

      {/* Control panel */}
      <RoundedBox args={[1.8, 0.8, 0.6]} radius={0.05} position={[0, 0.5, 0.65]} smoothness={4} castShadow>
        <meshStandardMaterial color={psBrown} />
      </RoundedBox>

      {/* Joystick base */}
      <RoundedBox args={[0.3, 0.1, 0.3]} radius={0.02} position={[-0.5, 0.5, 0.9]} smoothness={4} castShadow>
        <meshStandardMaterial color={psBrown} />
      </RoundedBox>

      {/* Joystick */}
      <group position={[-0.5, 0.5, 0.9]}>
        <Box args={[0.1, 0.1, 0.1]} position={[0, 0.05, 0]} castShadow>
          <meshStandardMaterial color={psTan} />
        </Box>
        <Box args={[0.05, 0.25, 0.05]} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color={psTan} />
        </Box>
        <Box args={[0.12, 0.05, 0.12]} position={[0, 0.35, 0]} castShadow>
          <meshStandardMaterial color={psTan} />
        </Box>
      </group>

      {/* Buttons */}
      {[0.2, 0.5, 0.8].map((x, i) => (
        <group key={i} position={[x, 0.5, 0.9]}>
          <RoundedBox args={[0.15, 0.05, 0.15]} radius={0.05} position={[0, 0, 0]} smoothness={4} castShadow>
            <meshStandardMaterial color={psBrown} />
          </RoundedBox>
          <RoundedBox 
            args={[0.12, 0.07, 0.12]} 
            radius={0.06} 
            position={[0, 0.02, 0]} 
            smoothness={4}
            castShadow
          >
            <meshStandardMaterial 
              color={i === 0 ? psTan : i === 1 ? psSage : psCream} 
              emissive={i === 0 ? psTan : i === 1 ? psSage : psCream}
              emissiveIntensity={hovered ? 0.3 : 0.1}
            />
          </RoundedBox>
        </group>
      ))}

      {/* Cabinet base */}
      <RoundedBox args={[2.2, 0.2, 1.7]} radius={0.05} position={[0, -1.1, 0]} smoothness={4} castShadow>
        <meshStandardMaterial color={psBrown} />
      </RoundedBox>

      {/* Text on cabinet header */}
      <Text
        position={[0, 2.5, 0.76]}
        rotation={[0, 0, 0]}
        fontSize={0.25}
        color={psTan}
        // No font specified, using default
        anchorX="center"
        anchorY="middle"
      >
        ARCADE
      </Text>

      {/* Side decorations */}
      <Box args={[0.05, 3.8, 1.4]} position={[-1.025, 1, 0]} castShadow>
        <meshStandardMaterial color={psSage} />
      </Box>
      <Box args={[0.05, 3.8, 1.4]} position={[1.025, 1, 0]} castShadow>
        <meshStandardMaterial color={psSage} />
      </Box>
    </group>
  );
}