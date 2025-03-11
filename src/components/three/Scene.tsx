'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Import the WebGL detection utilities with proper error handling
import { isWebGLSupported, logWebGLInfo } from '@/utils/webglDetection';

// Add debug logging
console.log("Scene component initializing");

// Dynamically import the Canvas component with no SSR to prevent hydration mismatches
const Scene3D = dynamic(
  () => {
    console.log("Dynamic import of Scene3D executing");
    return import('./Scene3D').then(mod => {
      console.log("Scene3D module loaded successfully");
      return mod;
    }).catch(err => {
      console.error("Error loading Scene3D:", err);
      throw err;
    });
  }, 
  { 
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg three-scene-container">
        <div className="text-center">
          <p className="text-ps-cream">Loading 3D scene...</p>
          <p className="text-ps-cream text-sm mt-2 opacity-70">
            Initializing WebGL and preparing 3D environment
          </p>
        </div>
      </div>
    )
  }
);

export function Scene() {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true); // Assume supported until we check

  // Ensure we're running on the client and check WebGL support
  useEffect(() => {
    console.log("Scene component mounted on client");
    setIsClient(true);
    
    // Check if WebGL is supported
    try {
      const supported = isWebGLSupported();
      setWebGLSupported(supported);
      
      // Log detailed WebGL information to help with debugging
      if (supported) {
        logWebGLInfo();
      } else {
        console.error("WebGL is not supported in this browser");
        setHasError(true);
      }
    } catch (error) {
      console.error("Error checking WebGL support:", error);
      setHasError(true);
    }
  }, []);

  // Handle errors with proper type
  const handleError = (error: Error | unknown) => {
    // Log the error to the console with detailed information
    console.error("3D rendering error:", error);
    
    // Set the error state to trigger the fallback UI
    setHasError(true);
    
    // You could also send this error to an analytics service here
    // Example: analytics.captureException(error);
  };

  // Show error if WebGL is not supported or there was a rendering error
  if (hasError || !webGLSupported) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg three-scene-container">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-xl font-bold mb-2 text-ps-cream">
            {!webGLSupported ? 'WebGL Not Supported' : '3D Rendering Error'}
          </h3>
          <p className="text-ps-cream mb-4">
            {!webGLSupported 
              ? 'Your browser does not support WebGL, which is required for 3D graphics.' 
              : 'We encountered an issue loading the 3D scene. This could be due to:'}
          </p>
          {webGLSupported && (
            <ul className="text-ps-cream text-sm list-disc list-inside mb-4">
              <li>Insufficient GPU resources</li>
              <li>A bug in our 3D rendering code</li>
              <li>Browser compatibility issues</li>
            </ul>
          )}
          <p className="text-ps-cream text-sm">
            Please try using a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    );
  }

  // Don't render the 3D scene until we're on the client
  if (!isClient) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg three-scene-container">
        <p className="text-ps-cream">Initializing...</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video relative three-scene-container">
      <Scene3D onError={handleError} />
    </div>
  );
}
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Simple floating arcade cabinet
function ArcadeCabinet() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.8, 0.8]} />
        <meshStandardMaterial color="#385d41" />
      </mesh>
      <mesh position={[0, 0.3, 0.41]}>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.3, 0.44]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial color="#000055" emissive="#0000ff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function Scene() {
  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          
          <ArcadeCabinet />
          
          <OrbitControls 
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
