'use client'; // Mark this as a Client Component

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Define the loading fallback component here or import if separate
function LoadingFallback() {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e', color: 'white' }}>
      Loading Experience...
    </div>
  );
}

// Dynamically import the main 3D experience component within the Client Component
const Experience = dynamic(() => import('@/components/three/Experience'), {
  ssr: false, // ssr: false is allowed here now
  loading: () => <LoadingFallback />,
});


export default function ClientExperienceLoader() {
  // This component simply renders the dynamically loaded Experience component
  // with Suspense handling the loading state.
  return (
      <Suspense fallback={<LoadingFallback />}>
        <Experience />
      </Suspense>
  );
}