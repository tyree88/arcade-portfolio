'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Import the WebGL detection utilities with proper error handling
import { isWebGLSupported, logWebGLInfo } from '@/utils/webglDetection';

// Add debug logging
console.log("Scene component initializing");

// Dynamically import the Canvas component with no SSR to prevent hydration mismatches
const Scene3D = dynamic(
  () => {
    console.log("Dynamic import of Scene3D executing");
    return import('./Scene3D').then(mod => {
      console.log("Scene3D module loaded successfully");
      return mod;
    }).catch(err => {
      console.error("Error loading Scene3D:", err);
      throw err;
    });
  }, 
  { 
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg three-scene-container">
        <div className="text-center">
          <p className="text-ps-cream">Loading 3D scene...</p>
          <p className="text-ps-cream text-sm mt-2 opacity-70">
            Initializing WebGL and preparing 3D environment
          </p>
        </div>
      </div>
    )
  }
);

export function Scene() {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true); // Assume supported until we check

  // Ensure we're running on the client and check WebGL support
  useEffect(() => {
    console.log("Scene component mounted on client");
    setIsClient(true);

    // Check if WebGL is supported
    try {
      const supported = isWebGLSupported();
      setWebGLSupported(supported);

      // Log detailed WebGL information to help with debugging
      if (supported) {
        logWebGLInfo();
      } else {
        console.error("WebGL is not supported in this browser");
        setHasError(true);
      }
    } catch (error) {
      console.error("Error checking WebGL support:", error);
      setHasError(true);
    }
  }, []);

  // Handle errors with proper type
  const handleError = (error: Error | unknown) => {
    // Log the error to the console with detailed information
    console.error("3D rendering error:", error);

    // Set the error state to trigger the fallback UI
    setHasError(true);

    // You could also send this error to an analytics service here
    // Example: analytics.captureException(error);
  };

  // Show fallback UI if there's an error or if WebGL is not supported
  if (hasError || !webGLSupported) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-black/10 dark:bg-white/5 rounded-lg three-scene-container">
        <div className="text-center p-4">
          <h3 className="text-lg font-bold text-ps-cream mb-2">3D Scene Unavailable</h3>
          <p className="text-ps-cream mb-4">
            {!webGLSupported 
              ? "Your browser doesn't support WebGL, which is required for 3D graphics." 
              : "There was an error loading the 3D scene."}
          </p>
          <p className="text-ps-cream text-sm opacity-70">
            Try using a modern browser or enabling hardware acceleration.
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything on the server
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full aspect-video three-scene-container">
      <Scene3D onError={handleError} />
    </div>
  );
}