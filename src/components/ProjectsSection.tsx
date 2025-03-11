
'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  useProgress,
  Html
} from '@react-three/drei';
import { ProjectArcadeMachine } from './three/ProjectArcadeMachine';

// Sample project data
const PROJECTS = [
  {
    id: 1,
    title: "Retro Game UI",
    description: "A nostalgic blend of PlayStation-era aesthetics with Japanese anime influences.",
    image: "/textures/project1.jpg",
    link: "#project1"
  },
  {
    id: 2,
    title: "Arcade Portfolio",
    description: "Interactive 3D arcade machines showcase different projects in an immersive environment.",
    image: "/textures/project2.jpg",
    link: "#project2"
  },
  {
    id: 3,
    title: "Pixel Art Gallery",
    description: "A collection of handcrafted pixel art animations and illustrations.",
    image: "/textures/project3.jpg",
    link: "#project3"
  }
];

function LoadingIndicator() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="bg-ps-brown/80 p-6 rounded-lg flex items-center">
        <div className="w-40 h-2 bg-ps-cream/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-ps-tan transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-ps-cream ml-3 text-sm">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

function ArcadeScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize={1024} 
      />
      
      {/* Position arcade machines in an arc */}
      {PROJECTS.map((project, index) => {
        // Calculate positions in an arc
        const angle = (Math.PI / 3) * (index - 1);
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius;
        
        return (
          <ProjectArcadeMachine
            key={project.id}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            projectData={project}
            index={index}
          />
        );
      })}
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -1.1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#5d4f4d" roughness={0.8} />
      </mesh>
      
      {/* Environment map for reflections */}
      <Environment preset="night" />
      
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

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-ps-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-ps-brown mb-12 ps-title">FEATURED PROJECTS</h2>
        
        <div className="w-full h-[500px] md:h-[600px] relative mb-12 rounded-lg overflow-hidden shadow-xl">
          <Canvas shadows>
            <Suspense fallback={<LoadingIndicator />}>
              <ArcadeScene />
            </Suspense>
          </Canvas>
          
          {/* Instructions overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-ps-brown/70 p-3 text-ps-cream text-sm text-center">
            Drag to rotate • Scroll to zoom • Click on a machine to view project details
          </div>
        </div>
        
        {/* Mobile fallback or additional info */}
        <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
          {PROJECTS.map(project => (
            <div key={project.id} className="bg-ps-brown p-4 rounded-lg">
              <h3 className="text-xl font-bold text-ps-tan mb-2">{project.title}</h3>
              <p className="text-ps-cream text-sm mb-3">{project.description}</p>
              <a 
                href={project.link}
                className="bg-ps-green hover:bg-ps-green/80 text-ps-cream px-3 py-1 rounded text-sm inline-block"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from '@react-three/drei';
import { ProjectArcadeMachine } from './three/ProjectArcadeMachine';
import * as THREE from 'three';

// Sample project data - you can replace this with actual data from an API or data file
const projects = [
  {
    id: 'project-1',
    title: 'Sonic Wave',
    description: 'A music visualization app that transforms audio into stunning visual patterns.',
    category: 'Web App',
    thumbnail: '/textures/project-placeholder.jpg',
    technologies: ['React', 'Web Audio API', 'Three.js'],
    demoUrl: 'https://example.com/sonic-wave',
    githubUrl: 'https://github.com/user/sonic-wave'
  },
  {
    id: 'project-2',
    title: 'Pixel Dreams',
    description: 'A retro-styled game inspired by 90s console classics.',
    category: 'Game',
    thumbnail: '/textures/project-placeholder.jpg',
    technologies: ['JavaScript', 'Canvas API', 'Howler.js'],
    demoUrl: 'https://example.com/pixel-dreams',
    githubUrl: 'https://github.com/user/pixel-dreams'
  },
  {
    id: 'project-3',
    title: 'Urban Beats',
    description: 'A collaborative music production platform with real-time features.',
    category: 'Full Stack',
    thumbnail: '/textures/project-placeholder.jpg',
    technologies: ['Next.js', 'Socket.io', 'Tone.js', 'MongoDB'],
    demoUrl: 'https://example.com/urban-beats',
    githubUrl: 'https://github.com/user/urban-beats'
  }
];

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <div className="flex justify-center items-center h-64 bg-ps-brown/50 rounded-lg">
      <div className="text-center">
        <div className="mb-4 w-16 h-16 relative mx-auto">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-ps-cream rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-ps-cream font-bold">
            {Math.round(progress)}%
          </div>
        </div>
        <p className="text-ps-cream text-sm">Loading projects...</p>
      </div>
    </div>
  );
}

// Project details component
function ProjectDetails({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <div className="bg-ps-brown rounded-lg p-6 shadow-md text-ps-cream">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <button 
          onClick={onClose}
          className="text-ps-cream hover:text-ps-tan transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <p className="mb-4">{project.description}</p>
      
      {project.technologies && (
        <div className="mb-4">
          <h4 className="text-sm uppercase text-ps-tan mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="bg-ps-green/30 text-ps-cream px-2 py-1 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex space-x-4 mt-6">
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-playstation-small"
          >
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-playstation-small bg-ps-brown border-2 border-ps-cream"
          >
            View Code
          </a>
        )}
      </div>
    </div>
  );
}

// Main component
export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <>
      {/* For desktop: 3D arcade view */}
      {!isMobile ? (
        <div className="col-span-full h-[500px] mb-12 relative rounded-lg overflow-hidden border-4 border-ps-brown">
          <Canvas shadows camera={{ position: [0, 3, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              
              {/* Arrange arcade machines in a semicircle */}
              {projects.map((project, index) => {
                const angle = (index - (projects.length - 1) / 2) * (Math.PI / 4);
                const x = Math.sin(angle) * 3;
                const z = Math.cos(angle) * 3;
                
                return (
                  <ProjectArcadeMachine
                    key={project.id}
                    project={project}
                    position={[x, 0, z]}
                    rotation={[0, -angle, 0]}
                    onSelect={setSelectedProject}
                    isSelected={selectedProject?.id === project.id}
                  />
                );
              })}
              
              {/* Floor */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#3a3a3a" roughness={0.8} metalness={0.2} />
              </mesh>
              
              <Environment preset="city" />
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                minDistance={5}
                maxDistance={10}
                target={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
          
          {/* Loading indicator */}
          <Suspense fallback={<Loader />}>
            <div className="absolute inset-0 pointer-events-none" />
          </Suspense>
          
          {/* Selected project details overlay */}
          {selectedProject && (
            <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-black/50">
              <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
            </div>
          )}
          
          {/* Instructions */}
          <div className="absolute top-4 left-4 bg-ps-brown/80 px-3 py-2 rounded text-ps-cream text-sm">
            Drag to rotate view • Click on arcade machines to view projects
          </div>
        </div>
      ) : (
        // For mobile: Regular grid view
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-ps-brown rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div 
                className="w-full h-48 mb-4 rounded overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${project.thumbnail || '/textures/project-placeholder.jpg'})` }}
              />
              <h3 className="text-xl font-bold text-ps-cream mb-2">{project.title}</h3>
              <p className="text-ps-cream/80 text-sm mb-3">{project.category}</p>
              <p className="text-ps-cream/90 mb-4">{project.description}</p>
              <div className="mt-auto">
                <button className="btn-playstation-small">View Details</button>
              </div>
            </div>
          ))}
          
          {/* Mobile project details modal */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedProject(null)}>
              <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
