
'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Html, useTexture, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// PlayStation-inspired design colors
const PS_COLORS = {
  green: '#385d41',
  tan: '#dfbe73',
  sage: '#7e976d',
  cream: '#ede6d2',
  brown: '#5d4f4d',
};

type ProjectData = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

type ProjectArcadeMachineProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  projectData: ProjectData;
  index: number;
};

export function ProjectArcadeMachine({ 
  position, 
  rotation, 
  projectData,
  index 
}: ProjectArcadeMachineProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { viewport } = useThree();
  
  // Load project image texture
  const texture = useTexture(
    projectData.image || '/textures/project-placeholder.jpg'
  );
  
  // Handle hover state
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  // Animate on mount
  useEffect(() => {
    if (groupRef.current) {
      // Initial position (start from below)
      groupRef.current.position.y = -2;
      
      // Animate entrance with a delay based on index
      gsap.to(groupRef.current.position, {
        y: position[1],
        duration: 1.2,
        delay: index * 0.2 + 0.5,
        ease: "elastic.out(1, 0.75)"
      });
    }
  }, [position, index]);
  
  // Hover animation
  useFrame(() => {
    if (groupRef.current && !clicked) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + index) * 0.05;
      
      // Scale up slightly when hovered
      gsap.to(groupRef.current.scale, {
        x: hovered ? 1.05 : 1,
        y: hovered ? 1.05 : 1,
        z: hovered ? 1.05 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Glow effect on screen when hovered
      if (screenRef.current) {
        gsap.to(screenRef.current.material, {
          emissiveIntensity: hovered ? 0.8 : 0.5,
          duration: 0.3
        });
      }
    }
  });
  
  // Handle click to show project details
  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    setClicked(!clicked);
    
    if (groupRef.current) {
      if (!clicked) {
        // Zoom in when clicked
        gsap.to(groupRef.current.position, {
          z: position[2] + 1,
          y: position[1] + 0.5,
          duration: 0.8,
          ease: "power2.out"
        });
        gsap.to(groupRef.current.rotation, {
          y: rotation[1] + Math.PI * 0.02,
          duration: 0.8,
          ease: "power2.out"
        });
      } else {
        // Return to original position
        gsap.to(groupRef.current.position, {
          x: position[0],
          y: position[1],
          z: position[2],
          duration: 0.8,
          ease: "power2.inOut"
        });
        gsap.to(groupRef.current.rotation, {
          x: rotation[0],
          y: rotation[1],
          z: rotation[2],
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    }
  };

  return (
    <group 
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cabinet base */}
      <mesh 
        castShadow 
        receiveShadow
        position={[0, 0.8, 0]}
      >
        <boxGeometry args={[1.2, 2, 0.8]} />
        <meshStandardMaterial 
          color={PS_COLORS.green} 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Cabinet top part */}
      <mesh 
        castShadow 
        position={[0, 2.1, -0.1]}
      >
        <boxGeometry args={[1.2, 0.6, 0.6]} />
        <meshStandardMaterial 
          color={PS_COLORS.brown} 
          roughness={0.5}
        />
      </mesh>
      
      {/* Screen */}
      <mesh 
        ref={screenRef}
        position={[0, 1.5, 0.41]}
        castShadow
      >
        <planeGeometry args={[0.9, 0.7]} />
        <meshStandardMaterial 
          map={texture}
          emissive="white"
          emissiveMap={texture}
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Control panel */}
      <mesh 
        position={[0, 0.7, 0.3]} 
        rotation={[-Math.PI * 0.15, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1, 0.1, 0.5]} />
        <meshStandardMaterial color={PS_COLORS.tan} />
      </mesh>
      
      {/* Joystick */}
      <group position={[-0.3, 0.77, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.07, 0.05, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
      
      {/* Buttons */}
      {[0, 0.15, 0.3].map((x, i) => (
        <mesh 
          key={i}
          position={[0.2 + x, 0.77, 0.3]} 
          castShadow
        >
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial 
            color={i === 0 ? 'red' : i === 1 ? 'blue' : 'green'} 
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Project title */}
      <Text
        position={[0, 2.45, 0.3]}
        rotation={[0, 0, 0]}
        fontSize={0.1}
        color={PS_COLORS.cream}
        font="/fonts/RetroSerif.ttf"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {projectData.title}
      </Text>
      
      {/* HTML overlay for project details (only show when clicked) */}
      {clicked && (
        <Html
          position={[0, 1.5, 0.8]}
          transform
          distanceFactor={1.5}
          zIndexRange={[100, 0]}
          sprite
        >
          <div 
            className="bg-ps-brown/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-ps-tan/50 w-64 transform transition-all"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            <h3 className="text-ps-cream text-lg font-bold mb-2">{projectData.title}</h3>
            <p className="text-ps-cream/80 text-sm mb-3">{projectData.description}</p>
            <a 
              href={projectData.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ps-green/90 text-ps-cream px-3 py-1 rounded text-sm hover:bg-ps-green transition-colors"
            >
              View Project →
            </a>
          </div>
        </Html>
      )}
    </group>
  );
}
'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  thumbnail?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

// CRT screen shader for arcade cabinet displays
const crtFragmentShader = `
  uniform sampler2D projectTexture;
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    // Distortion effect
    vec2 uv = vUv;
    float distortion = sin(uv.y * 100.0 + time) * 0.001;
    uv.x += distortion;
    
    // Scanline effect
    float scanline = sin(uv.y * 200.0) * 0.04;
    
    // Vignette effect
    float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 15.0;
    vignette = pow(vignette, 0.25);
    
    // Sample texture with effects
    vec4 texColor = texture2D(projectTexture, uv);
    texColor.rgb *= 0.8 + 0.2 * vignette;
    texColor.rgb *= 0.95 + scanline;
    
    // Add slight RGB shift for CRT effect
    float r = texture2D(projectTexture, uv + vec2(0.001, 0.0)).r;
    float g = texColor.g;
    float b = texture2D(projectTexture, uv - vec2(0.001, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, texColor.a);
  }
`;

const crtVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

interface ProjectArcadeMachineProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (project: Project) => void;
  isSelected?: boolean;
}

export function ProjectArcadeMachine({ 
  project, 
  position, 
  rotation = [0, 0, 0], 
  onSelect,
  isSelected = false
}: ProjectArcadeMachineProps) {
  const cabinetRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const joystickRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [timeUniform] = useState({ value: 0 });
  
  // Load project thumbnail texture
  const texture = useTexture(project.thumbnail || '/textures/project-placeholder.jpg');
  
  // PlayStation-inspired colors
  const psGreen = new THREE.Color('#385d41');
  const psCream = new THREE.Color('#ede6d2');
  const psPurple = new THREE.Color('#9b7eda');
  
  // Animation for joystick and cabinet
  useFrame((state) => {
    if (!cabinetRef.current || !joystickRef.current) return;
    
    // Update shader time uniform
    timeUniform.value = state.clock.getElapsedTime();
    
    // Animate joystick if hovered
    if (hovered) {
      joystickRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    } else {
      joystickRef.current.rotation.z = THREE.MathUtils.lerp(
        joystickRef.current.rotation.z,
        0,
        0.1
      );
    }
    
    // Subtle cabinet hover animation
    if (hovered) {
      cabinetRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 3) * 0.03 + position[1];
    } else {
      cabinetRef.current.position.y = THREE.MathUtils.lerp(
        cabinetRef.current.position.y,
        position[1],
        0.1
      );
    }
  });
  
  // Handle selection animation
  useEffect(() => {
    if (!cabinetRef.current) return;
    
    if (isSelected) {
      gsap.to(cabinetRef.current.scale, {
        x: 1.1, 
        y: 1.1, 
        z: 1.1, 
        duration: 0.5, 
        ease: "elastic.out(1, 0.5)"
      });
    } else {
      gsap.to(cabinetRef.current.scale, {
        x: 1, 
        y: 1, 
        z: 1, 
        duration: 0.5, 
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, [isSelected]);
  
  // Handle pointer events
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  const handleClick = () => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      onSelect(project);
    }, 0);
  };
  
  // Reset cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <group 
      ref={cabinetRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Cabinet base */}
      <RoundedBox args={[1.2, 2, 0.8]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color={psGreen} />
      </RoundedBox>
      
      {/* Screen bezel */}
      <RoundedBox position={[0, 0.4, 0.41]} args={[0.9, 0.7, 0.05]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#222" />
      </RoundedBox>
      
      {/* Project screen with CRT shader */}
      <mesh ref={screenRef} position={[0, 0.4, 0.44]}>
        <planeGeometry args={[0.85, 0.65]} />
        <shaderMaterial
          uniforms={{
            projectTexture: { value: texture },
            time: timeUniform
          }}
          vertexShader={crtVertexShader}
          fragmentShader={crtFragmentShader}
          transparent
        />
      </mesh>
      
      {/* Marquee with project title */}
      <RoundedBox position={[0, 0.95, 0.3]} args={[1, 0.2, 0.4]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#333" />
      </RoundedBox>
      
      <Text
        position={[0, 0.95, 0.51]}
        fontSize={0.08}
        color={psCream.getHexString()}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.9}
      >
        {project.title}
      </Text>
      
      {/* Control panel */}
      <RoundedBox position={[0, -0.2, 0.5]} args={[0.9, 0.4, 0.2]} radius={0.05} smoothness={4} rotation={[-0.3, 0, 0]}>
        <meshStandardMaterial color="#222" />
      </RoundedBox>
      
      {/* Joystick */}
      <group position={[-0.25, -0.15, 0.55]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh ref={joystickRef} position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
      
      {/* Buttons - PlayStation colors */}
      <group position={[0.2, -0.15, 0.55]}>
        <mesh position={[-0.15, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#5b6ee1" /> {/* Square - blue */}
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#df3131" /> {/* Circle - red */}
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#72c542" /> {/* Triangle - green */}
        </mesh>
      </group>
      
      {/* Project type indicator */}
      <Text
        position={[0, -0.6, 0.41]}
        fontSize={0.05}
        color={psCream.getHexString()}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.8}
      >
        {project.category || 'Project'}
      </Text>
      
      {/* Selection indicator */}
      {isSelected && (
        <RoundedBox position={[0, -0.9, 0]} args={[1.3, 0.1, 0.9]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={psPurple} emissive={psPurple} emissiveIntensity={0.5} />
        </RoundedBox>
      )}
    </group>
  );
}
