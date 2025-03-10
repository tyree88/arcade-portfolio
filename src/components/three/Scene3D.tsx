'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useProgress,
  Html,
  ContactShadows
} from '@react-three/drei';
import { ArcadeCabinet } from './ArcadeCabinet';
import { Diorama } from './Diorama';

// Debug logging
console.log("Scene3D module loaded");

// Simple test component to verify Three.js is working
function TestCube() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// Loading indicator for 3D content
function Loader() {
  const { progress } = useProgress();
  console.log("Loading 3D assets:", progress.toFixed(0) + "%");
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="text-ps-tan text-xl mb-2">Loading...</div>
        <div className="w-40 h-2 bg-ps-brown rounded-full overflow-hidden">
          <div 
            className="h-full bg-ps-tan transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-ps-cream text-sm mt-2">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

interface Scene3DProps {
  onError: (error: Error | unknown) => void;
}

export default function Scene3D({ onError }: Scene3DProps) {
  const [showTestScene, setShowTestScene] = useState(false);
  
  // Check if we should show the test scene
  useEffect(() => {
    console.log("Scene3D component mounted");
    
    // Try to detect if Three.js is working properly
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl');
      
      if (!context) {
        console.warn("WebGL not supported - showing test scene");
        setShowTestScene(true);
      }
    } catch (error) {
      console.error("Error checking WebGL support:", error);
      setShowTestScene(true);
    }
    
    return () => {
      console.log("Scene3D component unmounting");
    };
  }, []);

  // Handle errors in the Canvas
  // The Canvas onError prop expects a ReactEventHandler<HTMLDivElement> which receives a SyntheticEvent
  // not an Error object as we were previously trying to pass
  const handleCanvasError = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
    // Extract any error information from the event if available
    console.error("Canvas error event:", event);
    
    // Create a more descriptive error to pass to the parent component
    const error = new Error("Canvas rendering error occurred");
    
    // Pass the error to the parent component's error handler
    onError(error);
  };

  return (
    <Canvas 
      onError={handleCanvasError}
      shadows
      dpr={[1, 2]} // Responsive pixel ratio
      camera={{ position: [5, 5, 5], fov: 35 }}
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0,
        left: 0,
        touchAction: 'none' 
      }}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          maxDistance={10}
          minDistance={4}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        {/* Improved lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={0.5} 
          angle={0.3} 
          penumbra={0.8} 
          castShadow
        />
        
        {/* Show either the test scene or the full scene */}
        {showTestScene ? (
          <TestCube />
        ) : (
          <>
            {/* Diorama base and environment */}
            <Diorama />
            
            {/* Arcade Cabinet */}
            <ArcadeCabinet />
            
            {/* Contact shadows for realistic grounding */}
            <ContactShadows 
              position={[0, -1.4, 0]} 
              opacity={0.75} 
              scale={10} 
              blur={2.5} 
              far={4} 
            />
          </>
        )}
        
        {/* Background environment */}
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
} 