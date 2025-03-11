'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Html, PerspectiveCamera, useProgress, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SSAO } from '@react-three/postprocessing';
import { Project } from '@/types/project';
import { useResponsive } from '@/hooks/useResponsive';

// Import the extracted components
import { DioramaContainer } from './room-components/DioramaContainer';
import { ArcadeRoomEnvironment } from './room-components/ArcadeRoomEnvironment';
import { ProjectCabinets } from './room-components/ProjectCabinets';
import { AboutMeSection } from './room-components/AboutMeSection';
import { ProjectDetails } from './room-components/ProjectDetails';

// Loading component with progress indicator
function LoadingIndicator() {
  const { progress, active } = useProgress();
  
  // Only render the loading screen when active to prevent unnecessary re-renders
  if (!active && progress === 100) return null;
  
  return (
    <Html center>
      <div className="bg-black/80 text-white p-6 rounded-lg max-w-xs text-center">
        <h3 className="text-lg font-bold mb-2">Loading Arcade Portfolio</h3>
        <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm opacity-80">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

// Main component
export function ArcadeRoom() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const { isMobile } = useResponsive();
  
  // Handle project selection with memoization
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);
  
  // Hide instructions after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 10000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-screen relative">
      <Canvas 
        shadows 
        dpr={isMobile ? 1 : [1, 2]} // Lower DPR for mobile devices
        style={{ background: 'linear-gradient(to bottom, #e6e6fa, #f0f8ff)' }}
        camera={{ position: [8, 8, 8], fov: 35 }} // Define camera in Canvas props for better initialization
        performance={{ min: 0.5 }} // Allow performance adaptations
      >
        <color attach="background" args={['#e6e6fa']} />
        
        <Suspense fallback={<LoadingIndicator />}>
          <PerspectiveCamera
            makeDefault
            position={[8, 8, 8]}
            fov={35}
          />
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={isMobile ? 4 : 3} // Adjust for mobile
            maxDistance={15}
            target={[0, 1.5, 0]}
            enableDamping
            dampingFactor={0.05}
          />
        
        <DioramaContainer>
          <ArcadeRoomEnvironment />
          <ProjectCabinets onSelectProject={handleSelectProject} />
          <AboutMeSection />
          
          {/* Portfolio Title - Using group instead of direct Text components */}
          <group position={[0, 3.5, -4]}>
            <mesh>
              <planeGeometry args={[4, 1]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <Text
              position={[0, 0, 0]}
              fontSize={0.5}
              color="#ede6d2"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#385d41"
              // Add text performance optimizations
              font="/fonts/Poppins-Bold.ttf"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
              sdfGlyphSize={64}
            >
              ARCADE PORTFOLIO
            </Text>
          </group>
          
          {/* Subtitle */}
          <group position={[0, 3, -4]}>
            <mesh>
              <planeGeometry args={[4, 0.5]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <Text
              position={[0, 0, 0]}
              fontSize={0.15}
              color="#dfbe73"
              anchorX="center"
              anchorY="middle"
              maxWidth={4}
              textAlign="center"
              // Add text performance optimizations
              font="/fonts/Poppins-Regular.ttf"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,'"
              sdfGlyphSize={32}
            >
              A nostalgic journey through my portfolio
            </Text>
          </group>
        </DioramaContainer>
        <Preload all />
        
        <Environment preset="city" background={false} />
        
        {/* Conditionally render effects based on device capability */}
        {!isMobile ? (
          <EffectComposer enableNormalPass>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} />
            <Vignette eskil={false} offset={0.1} darkness={0.2} />
            <SSAO radius={0.05} intensity={0.15} luminanceInfluence={0.6} />
          </EffectComposer>
        ) : (
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} /> 
            <Vignette eskil={false} offset={0.1} darkness={0.2} />
          </EffectComposer>
        )}
        </Suspense>
        
        {/* Instructions overlay */}
        {showInstructions && (
          <Html position={[0, 0, 0]} center>
            <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs text-center">
              <h3 className="text-lg font-bold mb-2">Welcome to Arcade Portfolio</h3>
              <p className="mb-2">Use mouse to orbit around the scene</p>
              <p className="mb-2">Click on arcade cabinets to view projects</p>
              <p className="text-xs opacity-70">This message will disappear in a few seconds</p>
            </div>
          </Html>
        )}
      </Canvas>
      
      {/* Project details overlay */}
      {selectedProject && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 max-h-[40%] overflow-y-auto">
          <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      )}
      
      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Arcade Portfolio. Built with Next.js, Three.js, and nostalgia.
      </div>
    </div>
  );
}