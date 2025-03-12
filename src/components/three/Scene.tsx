
'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Html, 
  useProgress, 
  Environment, 
  Text,
  RoundedBox,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs text-center">
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

// Diorama Room component
function DioramaRoom() {
  // PlayStation-inspired colors
  const psGreen = new THREE.Color('#385d41');
  const psTan = new THREE.Color('#dfbe73');
  const psCream = new THREE.Color('#ede6d2');
  const psBrown = new THREE.Color('#5d4f4d');
  const psPurple = new THREE.Color('#9b7eda');
  
  // Refs for animation
  const roomRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Room dimensions
  const roomSize = 5;
  const baseRadius = 5.5;
  const baseHeight = 0.5;

  // Animate room slightly
  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      roomRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 + 0.5;
    }
  });

  return (
    <group>
      {/* Base platform with water effect */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, baseHeight, 32]} />
        <meshStandardMaterial color="#a3d9e9" />
      </mesh>
      
      {/* Lily pads around base */}
      {Array.from({length: 8}).map((_, i) => (
        <mesh 
          key={`lily-${i}`} 
          position={[
            Math.sin(i/8 * Math.PI * 2) * (baseRadius - 0.5), 
            0.05, 
            Math.cos(i/8 * Math.PI * 2) * (baseRadius - 0.5)
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
          <meshStandardMaterial color="#8fbc8f" />
        </mesh>
      ))}
      
      {/* Plants around base */}
      {Array.from({length: 12}).map((_, i) => (
        <group 
          key={`plant-${i}`} 
          position={[
            Math.sin(i/12 * Math.PI * 2) * baseRadius, 
            0.25, 
            Math.cos(i/12 * Math.PI * 2) * baseRadius
          ]}
        >
          <mesh>
            <coneGeometry args={[0.2, 0.6, 4]} />
            <meshStandardMaterial color="#7e976d" />
          </mesh>
        </group>
      ))}
      
      {/* Main room group */}
      <group ref={roomRef} position={[0, 0.5, 0]}>
        {/* Floor */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[roomSize, roomSize, 0.1]} />
          <meshStandardMaterial color="#e6b17e" />
        </mesh>
        
        {/* Back wall */}
        <mesh position={[0, roomSize/2, -roomSize/2]}>
          <boxGeometry args={[roomSize, roomSize, 0.1]} />
          <meshStandardMaterial color="#d8c5e2" />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-roomSize/2, roomSize/2, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[roomSize, roomSize, 0.1]} />
          <meshStandardMaterial color="#d8c5e2" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[roomSize/2, roomSize/2, 0]} rotation={[0, -Math.PI/2, 0]}>
          <boxGeometry args={[roomSize, roomSize, 0.1]} />
          <meshStandardMaterial color="#d8c5e2" />
        </mesh>
        
        {/* Skill stats display */}
        <group position={[-1.5, 1.5, -roomSize/2 + 0.06]}>
          <mesh>
            <boxGeometry args={[2, 1.5, 0.05]} />
            <meshStandardMaterial color={psBrown} />
          </mesh>
          
          <Text 
            position={[0, 0.6, 0.03]} 
            fontSize={0.15} 
            color={psCream} 
            font="/fonts/Poppins-Bold.ttf"
            anchorX="center"
          >
            MEMORY CARD
          </Text>
          
          <Text 
            position={[-0.8, 0.3, 0.03]} 
            fontSize={0.1} 
            color={psCream} 
            font="/fonts/Poppins-Regular.ttf"
            anchorX="left"
          >
            SKILL POINTS
          </Text>
          
          <Text 
            position={[0.8, 0.3, 0.03]} 
            fontSize={0.1} 
            color={psTan} 
            font="/fonts/Poppins-Regular.ttf"
            anchorX="right"
          >
            95/100
          </Text>
          
          {/* Skill bars */}
          {[
            { name: "React", value: 98 },
            { name: "Three.js", value: 92 },
            { name: "TypeScript", value: 95 },
            { name: "UI Design", value: 90 }
          ].map((skill, index) => (
            <group key={skill.name} position={[0, 0.1 - index * 0.25, 0.03]}>
              <Text 
                position={[-0.9, 0, 0]} 
                fontSize={0.08} 
                color={psCream} 
                font="/fonts/Poppins-Regular.ttf"
                anchorX="left"
              >
                {skill.name}
              </Text>
              
              <mesh position={[0.1, 0, 0]}>
                <boxGeometry args={[1.2, 0.05, 0.01]} />
                <meshStandardMaterial color="#444" />
              </mesh>
              
              <mesh position={[-0.6 + (skill.value / 100) * 0.6, 0, 0.01]}>
                <boxGeometry args={[1.2 * (skill.value / 100), 0.05, 0.01]} />
                <meshStandardMaterial color={psTan} />
              </mesh>
              
              <Text 
                position={[0.8, 0, 0]} 
                fontSize={0.08} 
                color={psTan} 
                font="/fonts/Poppins-Regular.ttf"
                anchorX="right"
              >
                {skill.value}%
              </Text>
            </group>
          ))}
        </group>
        
        {/* About me section */}
        <group position={[1.5, 1.8, -roomSize/2 + 0.06]}>
          <mesh>
            <boxGeometry args={[2, 2.2, 0.05]} />
            <meshStandardMaterial color={psGreen} />
          </mesh>
          
          <Text 
            position={[0, 0.9, 0.03]} 
            fontSize={0.15} 
            color={psCream} 
            font="/fonts/Poppins-Bold.ttf"
            anchorX="center"
          >
            ABOUT ME
          </Text>
          
          <Text 
            position={[0, 0.5, 0.03]} 
            fontSize={0.08} 
            color={psCream} 
            font="/fonts/Poppins-Regular.ttf"
            anchorX="center"
            textAlign="center"
            maxWidth={1.8}
          >
            Welcome to my interactive portfolio inspired by the golden era of gaming. I'm a creative developer with a passion for blending nostalgic aesthetics with modern web technologies.
          </Text>
          
          <Text 
            position={[0, 0, 0.03]} 
            fontSize={0.08} 
            color={psCream} 
            font="/fonts/Poppins-Regular.ttf"
            anchorX="center"
            textAlign="center"
            maxWidth={1.8}
          >
            My work focuses on creating immersive digital experiences that combine 3D elements, creative UI design, and seamless interactions.
          </Text>
          
          {/* Skill icons */}
          <group position={[-0.5, -0.5, 0.02]}>
            <mesh>
              <boxGeometry args={[0.8, 0.5, 0.02]} />
              <meshStandardMaterial color="#444" />
            </mesh>
            <Text 
              position={[0, 0.1, 0.02]} 
              fontSize={0.1} 
              color={psCream} 
              font="/fonts/Poppins-Bold.ttf"
              anchorX="center"
            >
              3D Web
            </Text>
            <Text 
              position={[0, -0.1, 0.02]} 
              fontSize={0.06} 
              color={psCream} 
              font="/fonts/Poppins-Regular.ttf"
              anchorX="center"
              textAlign="center"
            >
              Three.js + React
            </Text>
          </group>
          
          <group position={[0.5, -0.5, 0.02]}>
            <mesh>
              <boxGeometry args={[0.8, 0.5, 0.02]} />
              <meshStandardMaterial color="#444" />
            </mesh>
            <Text 
              position={[0, 0.1, 0.02]} 
              fontSize={0.1} 
              color={psCream} 
              font="/fonts/Poppins-Bold.ttf"
              anchorX="center"
            >
              UI Design
            </Text>
            <Text 
              position={[0, -0.1, 0.02]} 
              fontSize={0.06} 
              color={psCream} 
              font="/fonts/Poppins-Regular.ttf"
              anchorX="center"
              textAlign="center"
            >
              Creative interfaces
            </Text>
          </group>
        </group>
        
        {/* Desk with computer */}
        <group position={[0, 0.4, 0]}>
          {/* Desk */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 0.1, 1]} />
            <meshStandardMaterial color="#a88862" />
          </mesh>
          
          {/* Computer */}
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 0.6, 0.1]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          
          <mesh ref={screenRef} position={[0, 0.3, 0.06]}>
            <planeGeometry args={[0.9, 0.5]} />
            <meshBasicMaterial color="#70c7ff" />
          </mesh>
          
          {/* Keyboard */}
          <mesh position={[0, 0.05, 0.3]}>
            <boxGeometry args={[0.7, 0.05, 0.2]} />
            <meshStandardMaterial color="#555" />
          </mesh>
          
          {/* Chair */}
          <mesh position={[0, 0.4, 0.8]}>
            <boxGeometry args={[0.6, 0.8, 0.6]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        </group>
        
        {/* Posters and decor */}
        {/* Left wall decor */}
        <group position={[-roomSize/2 + 0.06, 1.5, -1]}>
          <mesh rotation={[0, Math.PI/2, 0]}>
            <boxGeometry args={[1, 0.8, 0.02]} />
            <meshStandardMaterial color={psTan} />
          </mesh>
          <Text 
            position={[0.03, 0.2, 0]} 
            rotation={[0, Math.PI/2, 0]}
            fontSize={0.1} 
            color={psCream} 
            font="/fonts/Poppins-Bold.ttf"
            anchorX="center"
          >
            PROJECTS
          </Text>
        </group>
        
        {/* Right wall decor */}
        <group position={[roomSize/2 - 0.06, 1.5, -1]}>
          <mesh rotation={[0, -Math.PI/2, 0]}>
            <boxGeometry args={[1, 0.8, 0.02]} />
            <meshStandardMaterial color={psPurple} />
          </mesh>
          <Text 
            position={[0.03, 0.2, 0]} 
            rotation={[0, -Math.PI/2, 0]}
            fontSize={0.1} 
            color={psCream} 
            font="/fonts/Poppins-Bold.ttf"
            anchorX="center"
          >
            CONTACT
          </Text>
        </group>
        
        {/* Ceiling light */}
        <mesh position={[0, roomSize - 0.1, 0]}>
          <cylinderGeometry args={[0.5, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="#ffee88" emissive="#ffee88" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Floor decorations */}
        <mesh position={[-1.5, 0.05, 1.5]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
          <meshStandardMaterial color={psPurple} />
        </mesh>
        
        <mesh position={[1.5, 0.05, 1.5]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
          <meshStandardMaterial color={psTan} />
        </mesh>
        
        {/* Portfolio title */}
        <group position={[0, roomSize-0.6, -roomSize/2 + 0.06]}>
          <Text 
            position={[0, 0, 0]} 
            fontSize={0.3} 
            color={psCream} 
            font="/fonts/Poppins-Bold.ttf"
            anchorX="center"
          >
            ARCADE PORTFOLIO
          </Text>
        </group>
      </group>
      
      {/* Contact form */}
      <Html position={[0, 1.2, 2.5]} transform>
        <div className="bg-black text-white p-4 border-2 border-[#dfbe73] w-[300px]">
          <h3 className="text-center font-bold mb-2">CONTACT ME</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm">Name</label>
              <input type="text" className="w-full bg-black border border-[#dfbe73] p-1 text-sm" />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input type="email" className="w-full bg-black border border-[#dfbe73] p-1 text-sm" />
            </div>
            <div>
              <label className="block text-sm">Message</label>
              <textarea rows={3} className="w-full bg-black border border-[#dfbe73] p-1 text-sm" />
            </div>
            <div className="text-center mt-2">
              <button className="bg-[#dfbe73] text-black px-4 py-1 text-sm">Send Message</button>
            </div>
          </div>
        </div>
      </Html>
      
      {/* Add shadows */}
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={1} 
        far={10} 
      />
    </group>
  );
}

// Main Scene component
export function Scene() {
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Hide instructions after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 10000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={0.8} 
            castShadow 
            shadow-mapSize={[1024, 1024]} 
          />
          <spotLight 
            position={[-5, 8, -5]} 
            intensity={0.5} 
            angle={0.5}
            penumbra={0.5}
            castShadow
          />
          
          <DioramaRoom />
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            minDistance={4}
            maxDistance={12}
            target={[0, 1.5, 0]}
          />
          
          <Environment preset="apartment" background={false} />
        </Suspense>
        
        {/* Instructions overlay */}
        {showInstructions && (
          <Html center>
            <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs text-center">
              <h3 className="text-lg font-bold mb-2">Welcome to Arcade Portfolio</h3>
              <p className="mb-2">Use mouse to orbit around the scene</p>
              <p className="mb-2">Click on items to interact</p>
              <p className="text-xs opacity-70">This message will disappear in a few seconds</p>
            </div>
          </Html>
        )}
      </Canvas>
      
      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/70">
        &copy; {new Date().getFullYear()} Arcade Portfolio. Built with Next.js, Three.js, and nostalgia.
      </div>
    </div>
  );
}
