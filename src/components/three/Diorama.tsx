'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

// Debug logging
console.log("Diorama component loaded");

export function Diorama() {
  // Debug logging for component lifecycle
  useEffect(() => {
    console.log("Diorama component mounted");
    return () => console.log("Diorama component unmounted");
  }, []);

  // PlayStation-inspired colors
  const psGreen = new THREE.Color('#385d41');
  const psTan = new THREE.Color('#dfbe73');
  const psSage = new THREE.Color('#7e976d');
  const psCream = new THREE.Color('#ede6d2');
  const psBrown = new THREE.Color('#5d4f4d');
  
  // References for animation
  const cloudsRef = useRef<THREE.Group>(null);
  
  // Animate clouds
  useFrame((state, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.05;
    }
  });

  // Pre-compute all random values using useMemo to ensure consistency
  // between server and client rendering
  const decorativeElements = useMemo(() => {
    console.log("Diorama: Computing decorative elements");
    // Generate cloud elements
    const clouds = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.2 + Math.sin(i * 5) * 0.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.3 + (i % 3) * 0.1; // Deterministic "random" value
      
      return { id: `cloud-${i}`, x, z, scale, angle };
    });
    
    // Generate small decorative elements
    const smallElements = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.5 + Math.sin(i * 8) * 0.3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.05 + (i % 5) * 0.02; // Deterministic "random" value
      const height = 0.1 + (i % 3) * 0.05; // Deterministic "random" value
      
      return { id: `element-${i}`, x, z, scale, height, angle };
    });
    
    return { clouds, smallElements };
  }, []);

  return (
    <group position={[0, -1.5, 0]}>
      {/* Main circular base */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial color={psCream} />
      </mesh>
      
      {/* Wooden floor */}
      <mesh receiveShadow position={[0, 0.11, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.02, 32]} />
        <meshStandardMaterial color={psTan} />
      </mesh>
      
      {/* Create wooden planks pattern on floor */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[0, 0.12, 0]} 
          rotation={[0, (i * Math.PI) / 7, 0]}
          receiveShadow
        >
          <boxGeometry args={[5.5, 0.01, 0.05]} />
          <meshStandardMaterial color={psBrown} opacity={0.1} transparent />
        </mesh>
      ))}
      
      {/* Decorative elements around the base */}
      <group ref={cloudsRef}>
        {/* Stylized "clouds" or decorative elements */}
        {decorativeElements.clouds.map((cloud) => (
          <group key={cloud.id} position={[cloud.x, 0.1, cloud.z]}>
            <mesh castShadow>
              <sphereGeometry args={[cloud.scale, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={psGreen} />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Small decorative elements */}
      {decorativeElements.smallElements.map((element) => (
        <group key={element.id} position={[element.x, element.height / 2, element.z]}>
          <mesh castShadow>
            <boxGeometry args={[element.scale, element.height, element.scale]} />
            <meshStandardMaterial color={psSage} />
          </mesh>
        </group>
      ))}
      
      {/* PlayStation controller buttons as decorative elements */}
      {['#385d41', '#dfbe73', '#7e976d', '#ede6d2'].map((color, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <RoundedBox 
            key={i} 
            args={[0.2, 0.05, 0.2]} 
            radius={0.1} 
            position={[x, 0.15, z]} 
            rotation={[0, angle, 0]}
            smoothness={4}
            castShadow
          >
            <meshStandardMaterial color={color} />
          </RoundedBox>
        );
      })}
      
      {/* Water-like effect around the base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 5, 32]} />
        <meshStandardMaterial 
          color="#7e976d" 
          transparent 
          opacity={0.3} 
          roughness={0.2} 
          metalness={0.8}
        />
      </mesh>
    </group>
  );
} 