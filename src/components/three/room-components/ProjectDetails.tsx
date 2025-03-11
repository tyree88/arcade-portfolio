'use client';

import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

/**
 * Project details overlay component
 */
export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        {project.thumbnail && (
          <div className="md:w-1/3 relative">
            <Image 
              src={project.thumbnail} 
              alt={project.title} 
              width={400}
              height={300}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className={project.thumbnail ? "md:w-2/3" : "w-full"}>
          <p className="mb-2">{project.description}</p>
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-300 mb-1">Technologies</h3>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {project.features && project.features.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-300 mb-1">Key Features</h3>
              <ul className="list-disc list-inside text-sm">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
