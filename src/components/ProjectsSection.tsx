
'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "3D Portfolio",
    description: "Interactive 3D portfolio with Three.js and React",
    tags: ["React", "Three.js", "TypeScript"],
    thumbnail: "/images/project1.jpg"
  },
  {
    id: 2,
    title: "Arcade Game",
    description: "Retro-styled game using modern web technologies",
    tags: ["JavaScript", "Canvas", "GSAP"],
    thumbnail: "/images/project2.jpg"
  },
  {
    id: 3,
    title: "UI Design System",
    description: "PlayStation-inspired design system for modern web apps",
    tags: ["Design", "CSS", "Components"],
    thumbnail: "/images/project3.jpg"
  }
];

// Diorama component for a single project
function ProjectDiorama({ project, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#dfbe73" />
      </mesh>
      
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#ede6d2" />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, 1.5, -1.5]}>
        <boxGeometry args={[3, 3, 0.1]} />
        <meshStandardMaterial color="#385d41" />
      </mesh>
      
      {/* Side wall left */}
      <mesh position={[-1.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 3, 0.1]} />
        <meshStandardMaterial color="#5d4f4d" />
      </mesh>
      
      {/* Project display board */}
      <mesh position={[0, 1.5, -1.4]}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#7e976d" />
      </mesh>
      
      {/* Project title */}
      <Text
        position={[0, 2.2, -1.3]}
        fontSize={0.2}
        color="#ede6d2"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.title}
      </Text>
      
      {/* Project description */}
      <Text
        position={[0, 1.5, -1.3]}
        fontSize={0.1}
        color="#ede6d2"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.description}
      </Text>
      
      {/* Project tags */}
      <group position={[0, 0.9, -1.3]}>
        {project.tags.map((tag, index) => (
          <Text
            key={index}
            position={[(index - 1) * 0.6, 0, 0]}
            fontSize={0.08}
            color="#dfbe73"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.5}
          >
            {tag}
          </Text>
        ))}
      </group>
      
      {/* Small desk */}
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#af9f86" />
      </mesh>
      
      {/* Computer/workstation */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#5b6ee1" />
      </mesh>
      
      {/* Chair */}
      <mesh position={[0, 0.3, 0.6]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#df3131" />
      </mesh>
      
      {/* Decorative elements */}
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#72c542" />
      </mesh>
      
      <mesh position={[-0.8, 0.5, 0.1]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#9b7eda" />
      </mesh>
      
      {/* Plants around base */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI / 4) * 2.3, 
            0.15, 
            Math.sin(i * Math.PI / 4) * 2.3
          ]}
        >
          <coneGeometry args={[0.2, 0.4, 4]} />
          <meshStandardMaterial color="#7e976d" />
        </mesh>
      ))}
    </group>
  );
}

export function ProjectsSection() {
  const containerRef = useRef();
  const [currentProject, setCurrentProject] = useState(0);
  
  // Rotate projects with arrow keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentProject((prev) => (prev + 1) % projectsData.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentProject((prev) => (prev - 1 + projectsData.length) % projectsData.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <section className="py-16 bg-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 ps-title text-ps-cream text-center">FEATURED PROJECTS</h2>
        
        <div className="h-[60vh] w-full" ref={containerRef}>
          <Canvas shadows dpr={[1, 2]}>
            <color attach="background" args={['#121212']} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.6} castShadow />
            <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={35} />
            
            <group>
              {projectsData.map((project, index) => (
                <ProjectDiorama 
                  key={project.id}
                  project={project}
                  position={[
                    (index - currentProject) * 6, 
                    0, 
                    0
                  ]}
                />
              ))}
            </group>
            
            <Environment preset="sunset" />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.5}
              minDistance={4}
              maxDistance={12}
            />
          </Canvas>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            onClick={() => setCurrentProject((prev) => (prev - 1 + projectsData.length) % projectsData.length)}
            className="btn-playstation-small"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {projectsData.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full ${index === currentProject ? 'bg-ps-tan' : 'bg-ps-cream opacity-50'}`}
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrentProject((prev) => (prev + 1) % projectsData.length)}
            className="btn-playstation-small"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
