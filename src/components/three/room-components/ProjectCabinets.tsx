'use client';

import { useState, useCallback } from 'react';
import { ProjectArcadeCabinet } from '../ProjectArcadeCabinet';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';

interface ProjectCabinetsProps {
  onSelectProject: (project: Project) => void;
}

/**
 * Project cabinets display in a semi-circle arrangement
 */
export function ProjectCabinets({ onSelectProject }: ProjectCabinetsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Handle project selection with useCallback to prevent unnecessary re-renders
  const handleSelectProject = useCallback((project: Project) => {
    // Use setTimeout to defer state updates to the next event loop tick
    // This prevents state updates during render phase
    setTimeout(() => {
      setSelectedProject(project);
      onSelectProject(project);
    }, 0);
  }, [onSelectProject]);
  
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
