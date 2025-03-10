import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Retro Game Hub',
    description: 'A nostalgic platform for discovering and playing classic games from the PlayStation era.',
    thumbnail: '/images/projects/retro-game-hub.svg',
    images: [
      '/images/projects/retro-game-hub.svg',
    ],
    category: 'Web App',
    tags: ['Gaming', 'Retro', 'PlayStation'],
    technologies: ['React', 'Three.js', 'Firebase', 'WebGL'],
    demoUrl: 'https://retro-game-hub.example.com',
    githubUrl: 'https://github.com/username/retro-game-hub',
    features: [
      'Interactive 3D game selection interface',
      'Game emulation directly in the browser',
      'User accounts with saved game progress',
      'Community features for sharing game tips',
    ],
    challenges: [
      'Implementing efficient 3D rendering for low-end devices',
      'Creating authentic retro visual effects',
      'Optimizing game emulation performance',
    ],
    outcomes: [
      '10,000+ monthly active users',
      'Featured on several retro gaming blogs',
      'Active community with daily engagement',
    ],
    date: '2023-05-15',
  },
  {
    id: 'project-2',
    title: 'Pixel Art Creator',
    description: 'A digital canvas for creating pixel art with PlayStation-inspired color palettes and tools.',
    thumbnail: '/images/projects/pixel-art-creator.svg',
    images: [
      '/images/projects/pixel-art-creator.svg',
    ],
    category: 'Creative Tool',
    tags: ['Pixel Art', 'Digital Art', 'Creative'],
    technologies: ['Canvas API', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    demoUrl: 'https://pixel-art-creator.example.com',
    githubUrl: 'https://github.com/username/pixel-art-creator',
    features: [
      'Custom color palette creation',
      'Animation timeline for sprite animation',
      'Export to multiple formats (PNG, GIF, sprite sheets)',
      'Community gallery for sharing creations',
    ],
    challenges: [
      'Building an intuitive UI for pixel-perfect editing',
      'Implementing efficient undo/redo system',
      'Creating smooth animation preview',
    ],
    outcomes: [
      'Used by indie game developers for asset creation',
      'Featured in digital art communities',
      'Over 5,000 artworks created and shared',
    ],
    date: '2023-08-22',
  },
  {
    id: 'project-3',
    title: 'Urban Beats',
    description: 'A music production app inspired by Japanese city pop and PlayStation-era sound design.',
    thumbnail: '/images/projects/urban-beats.svg',
    images: [
      '/images/projects/urban-beats.svg',
    ],
    category: 'Music App',
    tags: ['Music', 'Production', 'Audio'],
    technologies: ['Web Audio API', 'React', 'Node.js', 'MongoDB'],
    demoUrl: 'https://urban-beats.example.com',
    githubUrl: 'https://github.com/username/urban-beats',
    features: [
      'Virtual synthesizers with retro sound profiles',
      'Beat sequencer with vintage drum machine samples',
      'Cloud storage for projects and samples',
      'Collaboration tools for remote music production',
    ],
    challenges: [
      'Achieving low-latency audio processing in the browser',
      'Creating an intuitive interface for music production',
      'Implementing real-time collaboration features',
    ],
    outcomes: [
      'Used by music producers worldwide',
      'Featured on music production blogs',
      'Over 1,000 tracks created and shared',
    ],
    date: '2023-11-10',
  },
  {
    id: 'project-4',
    title: 'Neon City',
    description: 'An interactive 3D cityscape inspired by Japanese cyberpunk aesthetics and PlayStation visual style.',
    thumbnail: '/images/projects/neon-city.svg',
    images: [
      '/images/projects/neon-city.svg',
    ],
    category: '3D Experience',
    tags: ['3D', 'Interactive', 'Cyberpunk'],
    technologies: ['Three.js', 'WebGL', 'GLSL Shaders', 'React Three Fiber'],
    demoUrl: 'https://neon-city.example.com',
    githubUrl: 'https://github.com/username/neon-city',
    features: [
      'Procedurally generated city with unique buildings',
      'Day/night cycle with dynamic lighting',
      'Interactive elements throughout the cityscape',
      'Custom shader effects for neon and rain',
    ],
    challenges: [
      'Optimizing performance for complex 3D scenes',
      'Creating convincing lighting and atmosphere',
      'Balancing visual fidelity with performance',
    ],
    outcomes: [
      'Featured in WebGL showcase galleries',
      'Used as reference for 3D web experiences',
      'Positive feedback from the 3D artist community',
    ],
    date: '2024-01-05',
  },
];

// Fallback images for development
export const placeholderThumbnail = '/images/placeholder-project.svg'; 