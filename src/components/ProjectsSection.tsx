
'use client';

<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
=======
import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  useProgress,
  Html,
  Sky,
  ContactShadows
} from '@react-three/drei';
import { ProjectArcadeMachine } from './three/ProjectArcadeMachine';
import { gsap } from 'gsap';
>>>>>>> c645395 (Assistant checkpoint: Implement 3D arcade machine showcase)

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
<<<<<<< HEAD
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
=======
    title: "Retro Game UI",
    description: "A nostalgic blend of PlayStation-era aesthetics with Japanese anime influences.",
    image: "/textures/project-placeholder.jpg",
    link: "#project1"
  },
  {
    id: 2,
    title: "Arcade Portfolio",
    description: "Interactive 3D arcade machines showcase different projects in an immersive environment.",
    image: "/textures/project-placeholder.jpg",
    link: "#project2"
  },
  {
    id: 3,
    title: "Pixel Art Gallery",
    description: "A collection of handcrafted pixel art animations and illustrations.",
    image: "/textures/project-placeholder.jpg",
    link: "#project3"
>>>>>>> c645395 (Assistant checkpoint: Implement 3D arcade machine showcase)
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
      
<<<<<<< HEAD
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
=======
      {/* Add reflections to floor */}
      <ContactShadows
        position={[0, -1.09, 0]}
        opacity={0.4}
        scale={30}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />
      
      {/* Environment map for reflections */}
      <Environment preset="night" />
      
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      
      {/* Camera controls */}
      <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={10}
        target={[0, 0, 0]}
      />
    </>
  );
}

// 2D fallback component for mobile
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="bg-ps-brown rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/textures/project-placeholder.jpg';
          }}
        />
>>>>>>> c645395 (Assistant checkpoint: Implement 3D arcade machine showcase)
      </div>
      <div className="p-4">
        <h3 className="text-ps-cream text-xl font-bold mb-2 font-serif">{project.title}</h3>
        <p className="text-ps-cream/80 text-sm mb-4">{project.description}</p>
        <a 
          href={project.link} 
          className="inline-block bg-ps-green/90 text-ps-cream px-4 py-2 rounded font-mono text-sm hover:bg-ps-green transition-colors"
        >
          View Project →
        </a>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Animate section on mount
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="pt-24 pb-32 relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-ps-cream mb-6 text-center">
          Featured Projects
        </h2>
        <p className="text-ps-cream/80 text-lg mb-16 text-center max-w-2xl mx-auto">
          Explore my work through this interactive arcade. Click on any machine to learn more.
        </p>
        
        {isMobile ? (
          // Mobile fallback - grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          // 3D arcade scene for desktop
          <div className="h-[600px] -mx-4 relative">
            <Canvas shadows>
              <Suspense fallback={<LoadingIndicator />}>
                <ArcadeScene />
              </Suspense>
            </Canvas>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-ps-cream/70 text-sm">
              Click and drag to look around
            </div>
          </div>
        )}
      </div>
      
      {/* Grain overlay for texture */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />
    </section>
  );
}
