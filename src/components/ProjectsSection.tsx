'use client';

import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProjectsSection as OriginalProjectsSection } from './original-projects-section';

export function ProjectsSection() {
  // Your component implementation here
  return (
    <section className="projects-section">
      {/* Projects content */}
      <OriginalProjectsSection /> {/* Added this line to use the original component */}
    </section>
  );
}