'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  RoundedBox,
  ContactShadows,
  Text,
  Float,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { ProjectArcadeCabinet } from './ProjectArcadeCabinet';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';
import { ProjectDetails } from '../ui/ProjectDetails';

// Instructions component that appears in 3D space
function Instructions() {
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

// Title component floating in 3D space
function PortfolioTitle() {
  return (
    <group position={[0, 3.5, -4]}>
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <Text
          fontSize={0.5}
          color="#ede6d2"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#385d41"
        >
          ARCADE PORTFOLIO
        </Text>
      </Float>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[0, -0.6, 0]}
      >
        <Text
          fontSize={0.15}
          color="#dfbe73"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          A nostalgic journey through my portfolio, inspired by PlayStation memories and Japanese arcade aesthetics
        </Text>
      </Float>
    </group>
  );
}

// Footer component in 3D space
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <group position={[0, 0.1, 3]}>
      <Text
        fontSize={0.1}
        color="#ede6d2"
        anchorX="center"
        anchorY="middle"
      >
        <meshBasicMaterial attach="material" color="#ede6d2" transparent opacity={0.7} />
        © {currentYear} Arcade Portfolio. Built with Next.js, Three.js, and nostalgia.
      </Text>
    </group>
  );
}

// Room environment component
function ArcadeRoomEnvironment() {
  // PlayStation-inspired colors
  const psGreen = new THREE.Color('#385d41');
  const psTan = new THREE.Color('#dfbe73');
  const psSage = new THREE.Color('#7e976d');
  const psCream = new THREE.Color('#ede6d2');
  const psPurple = new THREE.Color('#9b7eda');
  
  // Room dimensions - larger to accommodate all content
  const roomWidth = 12;
  const roomDepth = 12;
  const roomHeight = 6;
  
  // Spotlights for dramatic lighting
  const spotlightRef1 = useRef<THREE.SpotLight>(null);
  const spotlightRef2 = useRef<THREE.SpotLight>(null);
  const spotlightRef3 = useRef<THREE.SpotLight>(null);
  
  // Debug helpers for lights (uncomment for development)
  // useHelper(spotlightRef1, THREE.SpotLightHelper, 'red');
  // useHelper(spotlightRef2, THREE.SpotLightHelper, 'green');
  // useHelper(spotlightRef3, THREE.SpotLightHelper, 'blue');
  
  // Create decorative elements
  const decorations = useMemo(() => {
    console.log("Computing room decorations");
    
    return {
      // Wall decorations
      posters: [
        { position: [-4, 2, -5.9], rotation: [0, 0, 0], size: [1.5, 1, 0.05], color: psTan, text: "SKILLS" },
        { position: [0, 2, -5.9], rotation: [0, 0, 0], size: [2, 1.2, 0.05], color: psSage, text: "ABOUT" },
        { position: [4, 2, -5.9], rotation: [0, 0, 0], size: [1.5, 1, 0.05], color: psPurple, text: "CONTACT" },
      ],
      // Ceiling lights
      lights: [
        { position: [-3, roomHeight - 0.5, -3], color: '#ff9d5c', intensity: 1.2 },
        { position: [0, roomHeight - 0.5, 0], color: '#ff9d5c', intensity: 1.2 },
        { position: [3, roomHeight - 0.5, -3], color: '#ff9d5c', intensity: 1.2 },
      ],
      // Furniture
      furniture: [
        // Main desk against back wall
        { type: 'desk', position: [0, 0, -5], size: [5, 0.8, 1.5], color: '#5c3c2e' },
        { type: 'chair', position: [0, 0.5, -3.5], size: [0.6, 0.6, 0.6], color: '#ff9d5c' },
        
        // Side shelves
        { type: 'shelf', position: [5, 1.5, -5.5], size: [1.5, 2, 0.4], color: '#5c3c2e' },
        { type: 'shelf', position: [-5, 1.5, -5.5], size: [1.5, 2, 0.4], color: '#5c3c2e' },
        
        // Arcade cabinets as furniture items (smaller, decorative)
        { type: 'arcade', position: [4, 0, -4.5], size: [0.8, 1.6, 0.6], color: '#385d41', rotation: [0, -0.3, 0] },
        { type: 'arcade', position: [-4, 0, -4.5], size: [0.8, 1.6, 0.6], color: '#385d41', rotation: [0, 0.3, 0] },
      ],
      // Floor items
      floorItems: [
        { type: 'rug', position: [0, 0.01, 0], size: [8, 0.02, 8], color: '#7e976d', opacity: 0.7 },
      ],
      // Tech items on desk
      techItems: [
        { type: 'computer', position: [-1.5, 0.9, -5], size: [0.8, 0.5, 0.5], color: '#333333' },
        { type: 'keyboard', position: [0, 0.85, -4.5], size: [1, 0.05, 0.3], color: '#222222' },
        { type: 'monitor', position: [0, 1.3, -5], size: [1.5, 0.8, 0.1], color: '#111111', screen: '#385d41' },
      ],
      // Plants and decorative items
      plants: [
        // Corner plants
        { position: [5, 0.3, -5], size: [0.4, 0.4, 0.4], color: '#72c542' },
        { position: [-5, 0.3, -5], size: [0.3, 0.5, 0.3], color: '#72c542' },
        
        // Front area plants
        { position: [3, 0.3, 3], size: [0.5, 0.6, 0.5], color: '#72c542' },
        { position: [-3, 0.3, 3], size: [0.4, 0.5, 0.4], color: '#72c542' },
        
        // Desk plants (smaller)
        { position: [2, 0.9, -5], size: [0.2, 0.2, 0.2], color: '#72c542' },
        { position: [-2.5, 0.9, -5], size: [0.15, 0.25, 0.15], color: '#72c542' },
      ],
      // Skill icons floating in the room
      skillIcons: [
        { position: [-3, 3, -3], text: "Frontend", color: '#5b6ee1' },
        { position: [-2, 3.5, -2], text: "3D Design", color: '#df3131' },
        { position: [-1, 3, -1], text: "UI/UX", color: '#72c542' },
        { position: [1, 3, -1], text: "Backend", color: '#9b7eda' },
        { position: [2, 3.5, -2], text: "Mobile", color: '#dfbe73' },
        { position: [3, 3, -3], text: "AR/VR", color: '#5b6ee1' },
      ],
      // Contact info
      contactInfo: [
        { position: [5, 1.2, -5.3], text: "GitHub", color: psCream, url: "https://github.com" },
        { position: [5, 0.9, -5.3], text: "LinkedIn", color: psCream, url: "https://linkedin.com" },
        { position: [5, 0.6, -5.3], text: "Email", color: psCream, url: "mailto:example@example.com" },
      ],
      // Decorative cubes
      cubes: [
        { position: [2, 0.5, 2], size: [1, 1, 1], color: '#385d41' },
        { position: [-2, 0.5, 2], size: [1, 1, 1], color: '#385d41' },
        { position: [0, 0.5, 3], size: [1, 1, 1], color: '#385d41' },
      ]
    };
  }, [psTan, psSage, psPurple, psCream]);
  
  // Animate spotlights
  useFrame(({ clock }) => {
    if (spotlightRef1.current) {
      spotlightRef1.current.position.x = Math.sin(clock.getElapsedTime() * 0.3) * 2 - 3;
      spotlightRef1.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 2 - 3;
    }
    if (spotlightRef2.current) {
      spotlightRef2.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 2;
      spotlightRef2.current.position.z = Math.cos(clock.getElapsedTime() * 0.3) * 2;
    }
    if (spotlightRef3.current) {
      spotlightRef3.current.position.x = Math.sin(clock.getElapsedTime() * 0.25) * 2 + 3;
      spotlightRef3.current.position.z = Math.cos(clock.getElapsedTime() * 0.35) * 2 - 3;
    }
  });
  
  return (
    <>
      {/* Room structure */}
      <group>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshStandardMaterial color="#e0c9a6" />
        </mesh>
        
        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshStandardMaterial color="#d8d8d8" />
        </mesh>
        
        {/* Back wall */}
        <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshStandardMaterial color={psGreen} />
        </mesh>
        
        {/* Left wall */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-roomWidth / 2, roomHeight / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color={psGreen} />
        </mesh>
        
        {/* Right wall */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[roomWidth / 2, roomHeight / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color={psGreen} />
        </mesh>
        
        {/* Windows on walls */}
        <group position={[-roomWidth / 2 + 0.01, roomHeight / 2, -2]}>
          <mesh>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
        
        <group position={[roomWidth / 2 - 0.01, roomHeight / 2, -2]}>
          <mesh>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
      </group>
      
      {/* Decorative elements */}
      <group>
        {/* Wall posters/sections */}
        {decorations.posters.map((poster, index) => (
          <group key={`poster-${index}`} position={poster.position}>
            <RoundedBox
              args={poster.size}
              radius={0.05}
              smoothness={4}
            >
              <meshStandardMaterial color={poster.color} />
            </RoundedBox>
            <Text
              position={[0, 0, poster.size[2] + 0.01]}
              fontSize={0.15}
              color="#ede6d2"
              anchorX="center"
              anchorY="middle"
            >
              {poster.text}
            </Text>
          </group>
        ))}
        
        {/* Ceiling lights */}
        {decorations.lights.map((light, index) => (
          <group key={`light-${index}`} position={light.position}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
              <meshStandardMaterial 
                color={light.color} 
                emissive={light.color} 
                emissiveIntensity={0.5} 
              />
            </mesh>
            <pointLight 
              color={light.color} 
              intensity={light.intensity} 
              distance={8}
              castShadow
            />
          </group>
        ))}
        
        {/* Furniture */}
        {decorations.furniture.map((item, index) => {
          if (item.type === 'desk') {
            return (
              <group key={`furniture-${index}`} position={item.position}>
                <mesh position={[0, item.size[1] / 2, 0]}>
                  <boxGeometry args={[item.size[0], 0.1, item.size[2]]} />
                  <meshStandardMaterial color={item.color} />
                </mesh>
                {/* Desk legs */}
                {[
                  [item.size[0] / 2 - 0.1, -item.size[1] / 2 + 0.1, item.size[2] / 2 - 0.1],
                  [-(item.size[0] / 2) + 0.1, -item.size[1] / 2 + 0.1, item.size[2] / 2 - 0.1],
                  [item.size[0] / 2 - 0.1, -item.size[1] / 2 + 0.1, -(item.size[2] / 2) + 0.1],
                  [-(item.size[0] / 2) + 0.1, -item.size[1] / 2 + 0.1, -(item.size[2] / 2) + 0.1]
                ].map((pos, i) => (
                  <mesh key={`leg-${i}`} position={pos}>
                    <boxGeometry args={[0.1, item.size[1], 0.1]} />
                    <meshStandardMaterial color="#3d2817" />
                  </mesh>
                ))}
              </group>
            );
          } else if (item.type === 'chair') {
            return (
              <group key={`furniture-${index}`} position={item.position}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[item.size[0] / 2, item.size[0] / 2, 0.1, 16]} />
                  <meshStandardMaterial color={item.color} />
                </mesh>
                <mesh position={[0, -0.3, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[0, -0.6, 0]}>
                  <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
              </group>
            );
          } else if (item.type === 'shelf') {
            return (
              <group key={`furniture-${index}`} position={item.position}>
                <mesh>
                  <boxGeometry args={item.size} />
                  <meshStandardMaterial color={item.color} />
                </mesh>
                {/* Shelf dividers */}
                {[0.5, 0, -0.5].map((y, i) => (
                  <mesh key={`shelf-${i}`} position={[0, y, 0]}>
                    <boxGeometry args={[item.size[0] - 0.1, 0.05, item.size[2] - 0.1]} />
                    <meshStandardMaterial color="#3d2817" />
                  </mesh>
                ))}
              </group>
            );
          } else if (item.type === 'arcade') {
            // Mini arcade cabinet as decoration
            return (
              <group 
                key={`furniture-${index}`} 
                position={item.position}
                rotation={item.rotation || [0, 0, 0]}
              >
                <RoundedBox args={item.size} radius={0.05} smoothness={4}>
                  <meshStandardMaterial color={item.color} />
                </RoundedBox>
                {/* Screen */}
                <mesh position={[0, 0.2, item.size[2]/2 + 0.01]}>
                  <planeGeometry args={[item.size[0] * 0.7, item.size[0] * 0.5]} />
                  <meshStandardMaterial color="#222" emissive="#222" emissiveIntensity={0.2} />
                </mesh>
                {/* Controls */}
                <mesh position={[0, -0.3, item.size[2]/2 + 0.01]}>
                  <planeGeometry args={[item.size[0] * 0.7, item.size[0] * 0.3]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
              </group>
            );
          }
          return null;
        })}
        
        {/* Floor items */}
        {decorations.floorItems.map((item, index) => (
          <mesh 
            key={`floor-item-${index}`} 
            position={item.position}
          >
            <boxGeometry args={item.size} />
            <meshStandardMaterial 
              color={item.color} 
              transparent={item.opacity < 1} 
              opacity={item.opacity} 
            />
          </mesh>
        ))}
        
        {/* Tech items */}
        {decorations.techItems.map((item, index) => {
          if (item.type === 'monitor') {
            return (
              <group key={`tech-${index}`} position={item.position}>
                <mesh>
                  <boxGeometry args={item.size} />
                  <meshStandardMaterial color={item.color} />
                </mesh>
                <mesh position={[0, 0, 0.051]}>
                  <planeGeometry args={[item.size[0] - 0.1, item.size[1] - 0.1]} />
                  <meshStandardMaterial 
                    color={item.screen} 
                    emissive={item.screen} 
                    emissiveIntensity={0.2} 
                  />
                </mesh>
                {/* Display "About Me" text on the monitor screen */}
                <group position={[0, 0, 0.052]}>
                  <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.06}
                    color="#ede6d2"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1}
                  >
                    ABOUT ME
                  </Text>
                  <Text
                    position={[0, 0, 0]}
                    fontSize={0.04}
                    color="#ede6d2"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.2}
                    textAlign="center"
                  >
                    Developer with a passion for nostalgic digital experiences
                  </Text>
                  <Text
                    position={[0, -0.15, 0]}
                    fontSize={0.04}
                    color="#ede6d2"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.2}
                    textAlign="center"
                  >
                    Influenced by PlayStation-era design and Japanese arcade culture
                  </Text>
                </group>
              </group>
            );
          }
          return (
            <mesh 
              key={`tech-${index}`} 
              position={item.position}
            >
              <boxGeometry args={item.size} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          );
        })}
        
        {/* Plants */}
        {decorations.plants.map((plant, index) => (
          <group key={`plant-${index}`} position={plant.position}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[plant.size[0] / 2, plant.size[0] / 2 * 1.2, 0.1, 16]} />
              <meshStandardMaterial color="#5c3c2e" />
            </mesh>
            <mesh position={[0, plant.size[1] / 2, 0]}>
              <sphereGeometry args={[plant.size[0], 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={plant.color} />
            </mesh>
          </group>
        ))}
        
        {/* Decorative cubes */}
        {decorations.cubes.map((cube, index) => (
          <RoundedBox
            key={`cube-${index}`}
            position={cube.position}
            args={cube.size}
            radius={0.05}
            smoothness={4}
          >
            <meshStandardMaterial color={cube.color} />
          </RoundedBox>
        ))}
        
        {/* Floating skill icons */}
        {decorations.skillIcons.map((skill, index) => (
          <Float 
            key={`skill-${index}`}
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.5}
            position={skill.position}
          >
            <group>
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial 
                  color={skill.color} 
                  emissive={skill.color} 
                  emissiveIntensity={0.3} 
                />
              </mesh>
              <Text
                position={[0, 0, 0.25]}
                fontSize={0.1}
                color="#ede6d2"
                anchorX="center"
                anchorY="middle"
              >
                {skill.text}
              </Text>
            </group>
          </Float>
        ))}
        
        {/* Contact info on shelf with clickable links */}
        {decorations.contactInfo.map((contact, index) => (
          <group key={`contact-${index}`} position={contact.position}>
            <Text
              fontSize={0.1}
              color={contact.color}
              anchorX="center"
              anchorY="middle"
              onClick={() => window.open(contact.url, '_blank')}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
            >
              {contact.text}
            </Text>
          </group>
        ))}
      </group>
      
      {/* Dynamic spotlights */}
      <spotLight
        ref={spotlightRef1}
        position={[-3, 5, -3]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1}
        color="#ff9d5c"
        castShadow
      />
      <spotLight
        ref={spotlightRef2}
        position={[0, 5, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1}
        color="#5b6ee1"
        castShadow
      />
      <spotLight
        ref={spotlightRef3}
        position={[3, 5, -3]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1}
        color="#72c542"
        castShadow
      />
      
      {/* Environment lighting */}
      <ambientLight intensity={0.3} />
      <ContactShadows 
        position={[0, 0.01, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={1.5} 
        far={10} 
      />
      
      {/* Add title, instructions, and footer */}
      <PortfolioTitle />
      <Instructions />
      <Footer />
    </>
  );
}

// Project cabinets display
function ProjectCabinets({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Handle project selection
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    onSelectProject(project);
  };
  
  return (
    <group>
      {/* Position cabinets in a semi-circle in front of desk */}
      {projects.map((project, index) => {
        // Calculate position in a semi-circle
        const totalProjects = projects.length;
        const angle = ((index / (totalProjects - 1)) * Math.PI * 0.6) - Math.PI * 0.3;
        const radius = 3;
        const position: [number, number, number] = [
          Math.sin(angle) * radius,
          0,
          Math.cos(angle) * radius - 1 // Offset to position in front of desk
        ];
        
        // Calculate rotation - facing center
        const rotation: [number, number, number] = [0, Math.PI - angle, 0];
        
        return (
          <ProjectArcadeCabinet
            key={project.id}
            project={project}
            position={position}
            rotation={rotation}
            onSelect={handleSelectProject}
            isSelected={selectedProject?.id === project.id}
          />
        );
      })}
    </group>
  );
}

// About Me section as a 3D element
function AboutMeSection() {
  return (
    <group position={[0, 2, -5.8]}>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.12}
        color="#ede6d2"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        A developer with a passion for creating nostalgic digital experiences that blend modern technology with retro aesthetics.
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.12}
        color="#ede6d2"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Influenced by PlayStation-era design, Japanese arcade culture, and 90s gaming.
      </Text>
    </group>
  );
}

// Main component
export function ArcadeRoom() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <div className="w-full h-screen relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 3, 6], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #385d41, #5d4f4d)' }}
      >
        <PerspectiveCamera makeDefault position={[0, 3, 6]} />
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={3}
          maxDistance={15}
          target={[0, 1.5, 0]}
        />
        
        <ArcadeRoomEnvironment />
        <ProjectCabinets onSelectProject={setSelectedProject} />
        <AboutMeSection />
        
        <Environment preset="apartment" />
      </Canvas>
      
      {/* Project details overlay */}
      {selectedProject && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 max-h-[40%] overflow-y-auto">
          <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      )}
    </div>
  );
} 