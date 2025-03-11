'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Room environment component with diorama-style design
 */
export function ArcadeRoomEnvironment() {
  // Diorama-inspired pastel colors
  const wallColor = new THREE.Color('#d8c5e2'); // Soft lavender
  const woodColor = new THREE.Color('#e6b17e'); // Warm wood tone
  const waterColor = new THREE.Color('#a3d9e9'); // Light blue water
  const lilypadColor = new THREE.Color('#8fbc8f'); // Soft green
  
  // Room dimensions - smaller for diorama feel
  const roomWidth = 8;
  const roomDepth = 8;
  const roomHeight = 6;
  
  // Base dimensions for the diorama
  const baseRadius = 10;
  const baseHeight = 0.5;
  
  // Spotlights for dramatic lighting
  const spotlightRef1 = useRef<THREE.SpotLight>(null);
  const spotlightRef2 = useRef<THREE.SpotLight>(null);
  const spotlightRef3 = useRef<THREE.SpotLight>(null);
  
  // Create decorative elements
  const decorations = useMemo(() => {
    // Diorama-inspired pastel colors defined inside useMemo to avoid recreation on every render
    const psTan = new THREE.Color('#ffccd5'); // Soft pink
    const psSage = new THREE.Color('#c5e2d8'); // Mint green
    const psCream = new THREE.Color('#f5f0e5'); // Cream
    const psPurple = new THREE.Color('#d8c5e2'); // Soft lavender
    
    return {
      // Wall decorations
      posters: [
        { position: [-2.5, 2, -3.9], rotation: [0, 0, 0], size: [1.2, 0.8, 0.03], color: psTan, text: "SKILLS" },
        { position: [0, 2, -3.9], rotation: [0, 0, 0], size: [1.5, 1, 0.03], color: psSage, text: "ABOUT" },
        { position: [2.5, 2, -3.9], rotation: [0, 0, 0], size: [1.2, 0.8, 0.03], color: psPurple, text: "CONTACT" },
      ],
      // Ceiling lights
      lights: [
        { position: [-2, roomHeight - 0.5, -2], color: '#ffe0cc', intensity: 1.2 },
        { position: [0, roomHeight - 0.5, 0], color: '#ffe0cc', intensity: 1.2 },
        { position: [2, roomHeight - 0.5, -2], color: '#ffe0cc', intensity: 1.2 },
      ],
      // Furniture
      furniture: [
        // Main desk against back wall
        { type: 'desk', position: [0, 0, -3.5], size: [4, 0.8, 1.2], color: '#d4a76a' },
        { type: 'chair', position: [0, 0.5, -2.5], size: [0.6, 0.6, 0.6], color: '#ffccd5' },
        
        // Side shelves
        { type: 'shelf', position: [3, 1.5, -3.5], size: [1.2, 1.8, 0.4], color: '#d4a76a' },
        { type: 'shelf', position: [-3, 1.5, -3.5], size: [1.2, 1.8, 0.4], color: '#d4a76a' },
        
        // Arcade cabinets as furniture items (smaller, decorative)
        { type: 'arcade', position: [2.5, 0, -3], size: [0.7, 1.4, 0.5], color: '#c5e2d8', rotation: [0, -0.3, 0] },
        { type: 'arcade', position: [-2.5, 0, -3], size: [0.7, 1.4, 0.5], color: '#c5e2d8', rotation: [0, 0.3, 0] },
        
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
  }, []);
  
  // Animate spotlights with performance optimization
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Using a single time calculation and applying it to all spotlights
    if (spotlightRef1.current) {
      spotlightRef1.current.position.x = Math.sin(time * 0.3) * 2 - 3;
      spotlightRef1.current.position.z = Math.cos(time * 0.2) * 2 - 3;
    }
    if (spotlightRef2.current) {
      spotlightRef2.current.position.x = Math.sin(time * 0.2) * 2;
      spotlightRef2.current.position.z = Math.cos(time * 0.3) * 2;
    }
    if (spotlightRef3.current) {
      spotlightRef3.current.position.x = Math.sin(time * 0.25) * 2 + 3;
      spotlightRef3.current.position.z = Math.cos(time * 0.35) * 2 - 3;
    }
  });
  
  return (
    <>
      {/* Diorama base */}
      <group position={[0, -0.1, 0]}>
        {/* Main circular base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[roomWidth/1.5, roomWidth/1.5, 0.2, 32]} />
          <meshStandardMaterial color="#b3d9ff" /> {/* Light blue for water */}
        </mesh>
        
        {/* Water details */}
        {Array.from({length: 12}).map((_, i) => (
          <mesh 
            key={`lily-${i}`} 
            position={[
              Math.sin(i/12 * Math.PI * 2) * (roomWidth/1.8), 
              -0.05, 
              Math.cos(i/12 * Math.PI * 2) * (roomWidth/1.8)
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
            <meshStandardMaterial color="#e6f2ff" />
          </mesh>
        ))}
        
        {/* Add stylized trees/plants around the base using instanced meshes for better performance */}
        <group>
          <instancedMesh args={[undefined, undefined, 8]} ref={useMemo(() => {
            return (mesh: THREE.InstancedMesh | null) => {
              if (mesh) {
                const tempObject = new THREE.Object3D();
                
                for (let i = 0; i < 8; i++) {
                  tempObject.position.set(
                    Math.sin(i/8 * Math.PI * 2) * (roomWidth/1.7),
                    0.2,
                    Math.cos(i/8 * Math.PI * 2) * (roomWidth/1.7)
                  );
                  tempObject.updateMatrix();
                  mesh.setMatrixAt(i, tempObject.matrix);
                }
                
                mesh.instanceMatrix.needsUpdate = true;
              }
            };
          }, [roomWidth])}>
            <group>
              <mesh position={[0, 0.4, 0]}>
                <coneGeometry args={[0.3, 0.8, 8]} />
                <meshStandardMaterial color="#7fbf7f" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
                <meshStandardMaterial color="#5c3c2e" />
              </mesh>
            </group>
          </instancedMesh>
        </group>
      </group>

      {/* Room structure - cutaway diorama style */}
      <group>
        {/* Wooden floor with planks */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshStandardMaterial color="#d4a76a" />
        </mesh>
        
        {/* Back wall */}
        <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
        
        {/* Left wall */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-roomWidth / 2, roomHeight / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
        
        {/* Wooden trim around the top edges */}
        <mesh position={[0, roomHeight, -roomDepth/2 + 0.1]}>
          <boxGeometry args={[roomWidth + 0.2, 0.3, 0.3]} />
          <meshStandardMaterial color="#b38048" />
        </mesh>
        
        <mesh position={[-roomWidth/2 + 0.1, roomHeight, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[roomDepth + 0.2, 0.3, 0.3]} />
          <meshStandardMaterial color="#b38048" />
        </mesh>
        
        {/* Windows on walls */}
        <group position={[-roomWidth / 2 + 0.01, roomHeight / 2, -2]}>
          <mesh>
            <planeGeometry args={[2.5, 1.8]} />
            <meshStandardMaterial color="#b3e6ff" emissive="#b3e6ff" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.5, 1.8]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
        
        {/* Second window */}
        <group position={[-roomWidth / 2 + 0.01, roomHeight / 2, 2]}>
          <mesh>
            <planeGeometry args={[2.5, 1.8]} />
            <meshStandardMaterial color="#b3e6ff" emissive="#b3e6ff" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.5, 1.8]} />
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
          <group key={`poster-${index}`} position={[poster.position[0], poster.position[1], poster.position[2]]}>
            <RoundedBox
              args={[poster.size[0], poster.size[1], poster.size[2]]} // Explicitly specify each element
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
          <group key={`light-${index}`} position={[light.position[0], light.position[1], light.position[2]]}>
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
              <group key={`furniture-${index}`} position={[item.position[0], item.position[1], item.position[2]]}>
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
                  <mesh 
                    key={`leg-${i}`} 
                    position={[pos[0], pos[1], pos[2]] as [number, number, number]}
                  >
                    <boxGeometry args={[0.1, item.size[1], 0.1]} />
                    <meshStandardMaterial color="#3d2817" />
                  </mesh>
                ))}
              </group>
            );
          } else if (item.type === 'chair') {
            return (
              <group key={`furniture-${index}`} position={[item.position[0], item.position[1], item.position[2]]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[item.size[0] / 2, item.size[0] / 2 * 1.2, 0.1, 16]} />
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
              <group key={`furniture-${index}`} position={[item.position[0], item.position[1], item.position[2]]}>
                <mesh>
                  <boxGeometry args={[item.size[0], item.size[1], item.size[2]]} />
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
                position={[item.position[0], item.position[1], item.position[2]]}
                rotation={item.rotation ? [item.rotation[0], item.rotation[1], item.rotation[2]] : [0, 0, 0]}
              >
                <RoundedBox args={[item.size[0], item.size[1], item.size[2]]} radius={0.05} smoothness={4}>
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
            position={[item.position[0], item.position[1], item.position[2]]}
          >
            <boxGeometry args={[item.size[0], item.size[1], item.size[2]]} />
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
              <group key={`tech-${index}`} position={[item.position[0], item.position[1], item.position[2]]}>
                <mesh>
                  <boxGeometry args={[item.size[0], item.size[1], item.size[2]]} />
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
                    Developer with a passion for creating nostalgic digital experiences that blend modern technology with retro aesthetics.
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
                    Influenced by PlayStation-era design, Japanese arcade culture, and 90s gaming.
                  </Text>
                </group>
              </group>
            );
          }
          return (
            <mesh 
              key={`tech-${index}`} 
              position={[item.position[0], item.position[1], item.position[2]]}
            >
              <boxGeometry args={[item.size[0], item.size[1], item.size[2]]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          );
        })}
        
        {/* Plants */}
        {decorations.plants.map((plant, index) => (
          <group key={`plant-${index}`} position={[plant.position[0], plant.position[1], plant.position[2]]}>
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
            position={[cube.position[0], cube.position[1], cube.position[2]]}
            args={[cube.size[0], cube.size[1], cube.size[2]]}
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
            position={[skill.position[0], skill.position[1], skill.position[2]]}
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
          <group key={`contact-${index}`} position={[contact.position[0], contact.position[1], contact.position[2]]}>
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
      
      {/* Diorama water base */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, baseHeight, 64]} />
        <meshStandardMaterial color={waterColor} metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Lily pads on water */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = baseRadius * 0.7 * Math.random() + baseRadius * 0.2;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const scale = 0.2 + Math.random() * 0.3;
        
        return (
          <group key={`lilypad-${i}`} position={[x, -0.95, z]} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI * 2]}>
            <mesh>
              <circleGeometry args={[scale, 8]} />
              <meshStandardMaterial color={lilypadColor} />
            </mesh>
          </group>
        );
      })}
      
      {/* Wooden trim on top of the room - like in the diorama */}
      <mesh position={[0, roomHeight / 2, 0]}>
        <boxGeometry args={[roomWidth + 0.4, 0.2, roomDepth + 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>
      
      {/* Small decorative plants around the base */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * (baseRadius - 0.5);
        const z = Math.sin(angle) * (baseRadius - 0.5);
        const height = 0.3 + Math.random() * 0.4;
        
        return (
          <group key={`plant-${i}`} position={[x, -0.9, z]}>
            {/* Plant stem */}
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry args={[0.05, height, 0.05]} />
              <meshStandardMaterial color="#2e7d32" />
            </mesh>
            {/* Plant leaves */}
            <mesh position={[0, height, 0]}>
              <sphereGeometry args={[0.15, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={lilypadColor} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
