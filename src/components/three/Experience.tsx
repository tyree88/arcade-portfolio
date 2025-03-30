'use client'; // Mark this component as a Client Component

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Preload, Loader } from '@react-three/drei';
// Import correct effects: Noise and Scanline instead of Film
import { EffectComposer, Bloom, Noise, Scanline } from '@react-three/postprocessing';
// Import BlendFunction from the underlying postprocessing library
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Import placeholder components
import Room from './Room';
import ArcadeMachine from './ArcadeMachine';
import Stool from './Stool';
import Coin from './Coin';
import SoundToggle from '../ui/SoundToggle'; // Import the sound toggle UI component


function SceneLighting() {
  return (
    <>
      {/* Soft ambient light */}
      <ambientLight intensity={0.5} color={0xf0f0ff} />
      {/* Main directional light for shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* TODO: Add point lights for neon accents later */}
    </>
  );
}

export default function Experience() {
  return (
    <>
      <SoundToggle /> {/* Render the sound toggle button */}
      <Canvas
        shadows // Enable shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true, // Keep alpha if needed, might affect performance slightly
          outputColorSpace: THREE.SRGBColorSpace, // Use sRGBEncoding equivalent
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Camera Setup */}
        <PerspectiveCamera
          makeDefault // Sets this as the default camera
          fov={35} // Field of view from plan
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
          position={[8, 6, 8]} // Initial position from plan
        />

        {/* Controls Setup */}
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2} // Limit looking down too much
          minPolarAngle={Math.PI / 6} // Limit looking up too much
          target={[0, 1, 0]} // Point camera slightly down towards center
          enablePan={false} // Disable panning as per plan
        />

        {/* Lighting */}
        <SceneLighting />

        {/* Scene Content */}
        <Suspense fallback={null}> {/* Use null fallback within Canvas, Loader handles overall */}
          <group>
            {/* Room Environment */}
            <Room />
            {/* Arcade Machine */}
            <ArcadeMachine />
            {/* Stool */}
            <Stool />
            {/* Collectible Coin */}
            <Coin />
          </group>
          <Preload all /> {/* Preload assets */}
        </Suspense>

        {/* Post Processing */}
        <EffectComposer>
          <Bloom
            intensity={0.5} // strength
            luminanceThreshold={0.6} // threshold
            luminanceSmoothing={0.9} // radius equivalent adjustment
            mipmapBlur={true} // Often improves quality
          />
          {/* Add Noise for film grain effect */}
          <Noise
            premultiply // enables better blending
            opacity={0.1} // Adjust opacity for desired grain intensity
          />
          {/* Add Scanline effect */}
          <Scanline
             blendFunction={BlendFunction.OVERLAY} // Use imported BlendFunction
             density={1.25} // Density of scanlines
             opacity={0.05} // Opacity of scanlines
          />
          {/* Vignette requires a custom shader pass or a library update - kept commented */}
          {/* <Vignette eskil={false} offset={0.95} darkness={1.6} /> */}
        </EffectComposer>

      </Canvas>
      {/* Drei Loader for overall loading state */}
      <Loader />
    </>
  );
}
