'use client';

import { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

/**
 * Instructions component that appears in 3D space
 */
export function Instructions() {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Hide instructions after 10 seconds
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  return (
    <Html
      position={[0, 0, -2]}
      center
      distanceFactor={10}
      zIndexRange={[100, 0]}
      transform
      sprite
    >
      <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs text-center">
        <h3 className="text-lg font-bold mb-2">Welcome to Arcade Portfolio</h3>
        <p className="mb-2">Use mouse to orbit around the scene</p>
        <p className="mb-2">Click on arcade cabinets to view projects</p>
        <p className="text-xs opacity-70">This message will disappear in a few seconds</p>
      </div>
    </Html>
  );
}
