'use client';

import { useState } from 'react';
import { Project } from '@/types/project';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech' | 'challenges'>('overview');
  
  return (
    <div className="project-details">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Close project details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-4 border-b border-gray-700">
        <button 
          className={`px-3 py-2 ${activeTab === 'overview' ? 'text-white border-b-2 border-ps-tan' : 'text-gray-400'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'features' ? 'text-white border-b-2 border-ps-tan' : 'text-gray-400'}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'tech' ? 'text-white border-b-2 border-ps-tan' : 'text-gray-400'}`}
          onClick={() => setActiveTab('tech')}
        >
          Tech
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'challenges' ? 'text-white border-b-2 border-ps-tan' : 'text-gray-400'}`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
      </div>
      
      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-ps-green/30 text-white px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            {project.outcomes && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Outcomes</h3>
                <ul className="list-disc list-inside">
                  {project.outcomes.map((outcome, index) => (
                    <li key={index} className="text-sm mb-1">{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'features' && project.features && (
          <div>
            <ul className="list-disc list-inside">
              {project.features.map((feature, index) => (
                <li key={index} className="mb-2">{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'tech' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => (
                <span key={tech} className="bg-ps-sage/30 text-white px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-playstation"
                >
                  View Demo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-playstation"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'challenges' && project.challenges && (
          <div>
            <ul className="list-disc list-inside">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="mb-2">{challenge}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 