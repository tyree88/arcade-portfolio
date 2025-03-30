import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import { usePortfolioStore } from '@/stores/portfolioStore'; // Import store when needed

export default function Coin() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isVisible, setIsVisible] = useState(true);
  // const addCoin = usePortfolioStore((state) => state.addCoin); // Get store action

  // TODO: Load actual GLTF model using useGLTF
  // TODO: Add GSAP animation for collection

  const handleClick = () => {
    // addCoin(); // Add coin to store
    setIsVisible(false); // Hide coin after clicking
    // TODO: Play sound effect
    // TODO: Trigger collection animation
    console.log('Coin collected!');
  };

  // Simple rotation animation
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  if (!isVisible) return null; // Don't render if collected

  return (
    <mesh
      ref={meshRef}
      position={[-2, 0.5, -2]} // Example position
      castShadow
      receiveShadow
      onClick={handleClick}
      onPointerOver={(e) => (e.stopPropagation(), document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* Placeholder Geometry */}
      <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} /> {/* Gold */}
    </mesh>
  );
}