# CLAUDE.md - Coding Assistant Guidelines

## Agent Instructions
This section contains instructions specifically for the Claude code agent to understand how to assist with this project.

### Project Type
- Next.js application with TypeScript
- 3D interactive portfolio website with arcade theme
- Uses Three.js, React Three Fiber, GSAP, and Tailwind CSS

### Build Commands
- `npm run dev` - Run development server with turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style Guidelines
- **TypeScript**: Use strict mode, explicit types for function params/returns
- **React**: Functional components with hooks, avoid class components
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Imports**: Group imports (React, 3rd party, internal), use path aliases (@/*)
- **CSS**: Use Tailwind utility classes, SASS for custom styling
- **State Management**: Zustand for global state, React hooks for local state
- **Animation**: GSAP for complex animations, CSS for simple transitions
- **Error Handling**: Try/catch for async operations, ErrorBoundary for components
- **3D**: React Three Fiber for Three.js integration

### Project Structure
- `src/app` - Next.js app directory with pages and layouts
- `public` - Static assets (models, textures, fonts, images)
- `src/components` - Reusable UI components
- `src/hooks` - Custom React hooks
- `src/styles` - Global styles and typography
- `src/utils` - Utility functions
- `src/pages` - Page components (if not using app directory)

### Common Tasks
- Adding new arcade machine: Create new component in components directory
- Styling: Use Tailwind classes with custom SCSS when needed
- 3D model integration: Place models in public/models and load with useLoader
- Animation: Use GSAP for complex animations, CSS for simple transitions
- Responsive design: Use the useResponsive hook for device detection

### Troubleshooting Common Issues
1. **Performance Issues**
   - Check for memory leaks in animations
   - Reduce texture sizes
   - Implement object pooling

2. **Mobile Compatibility**
   - Test on various devices
   - Implement touch-friendly controls
   - Optimize for different aspect ratios

3. **3D Model Loading Errors**
   - Verify file formats and compression
   - Check for missing textures
   - Implement error handling for failed loads

## Project Overview
This document outlines the implementation of an interactive arcade-themed portfolio website. The design transforms vintage arcade machines into clickable interactive elements that showcase different projects.

### Key Features
- 3D interactive environment using Three.js
- Clickable arcade machines that reveal project details
- Retro-nostalgic aesthetic with cultural elements
- Responsive design that works across devices
- Animation effects using GSAP

### Technology Stack
- **Frontend Framework**: Next.js with React
- **3D Rendering**: Three.js via react-three-fiber
- **Animation**: GSAP
- **Styling**: Tailwind CSS + custom SCSS
- **State Management**: Zustand
- **Deployment**: Vercel or Netlify

### Detailed Project Structure
```
arcade-portfolio/
├── public/
│   ├── models/           # 3D models
│   ├── textures/         # Texture files
│   ├── fonts/            # Custom typography
│   └── images/           # Project screenshots
├── src/
│   ├── components/
│   │   ├── ArcadeScene.jsx       # Main Three.js scene
│   │   ├── ArcadeMachine.jsx     # Interactive arcade component
│   │   └── ProjectDetails.jsx    # Project info display
│   ├── hooks/
│   │   └── useResponsive.js      # Responsive design hook
│   ├── styles/
│   │   ├── globals.css           # Global styles
│   │   └── typography.scss       # Retro font styling
│   ├── utils/
│   │   └── three-helpers.js      # Three.js utility functions
│   └── pages/
│       ├── index.js              # Home page
│       └── projects/[id].js      # Individual project pages
└── package.json
```

## Implementation Details

### Setup Instructions

#### 1. Project Initialization
```bash
# Create a new Next.js project
npx create-next-app@latest arcade-portfolio --typescript
cd arcade-portfolio

# Install dependencies
npm install three @react-three/fiber @react-three/drei gsap zustand
npm install tailwindcss postcss autoprefixer sass
npx tailwindcss init -p
```

#### 2. Configure Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          green: '#84a98c',
          orange: '#ff9e64',
          cream: '#e0d8c0'
        }
      },
      fontFamily: {
        retro: ['RetroSerif', 'serif']
      }
    },
  },
  plugins: [],
}
```

#### 3. Setup SCSS for Retro Effects
```scss
// src/styles/typography.scss
@font-face {
  font-family: 'RetroSerif';
  src: url('/fonts/your-retro-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.retro-text {
  font-family: 'RetroSerif', serif;
  letter-spacing: 0.5px;
}

.grainy-effect {
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/textures/grain.png');
    opacity: 0.15;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
}
```

### Component Implementation

#### 1. Three.js Scene Setup

The 3D scene is set up using react-three-fiber with the following components:

- **Canvas**: Main container for the Three.js scene
- **PerspectiveCamera**: Controls the viewpoint
- **OrbitControls**: Allows navigation around the scene
- **ArcadeRoom**: Contains the environment elements
- **ArcadeMachine**: Interactive elements for each project

#### 2. Interactive Elements

Each arcade machine is implemented with:

- Basic geometry for the cabinet, screen, and controls
- Raycasting for click detection
- GSAP animations for transitions
- HTML overlays for project information

#### 3. Arcade Machine Component

```jsx
function ArcadeMachine({ position, rotation, projectData }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Handle hover effects
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  // Handle click to show project details
  const handleClick = () => {
    setClicked(!clicked);
    
    // Animation code using GSAP
    // ...
  };
  
  return (
    <group 
      position={position} 
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Arcade machine geometry */}
      {/* ... */}
      
      {/* Project information overlay */}
      {clicked && (
        <Html position={[0, 2, 0]}>
          <div className="project-info">
            <h2>{projectData.title}</h2>
            <p>{projectData.description}</p>
            <a href={projectData.link}>View Project</a>
          </div>
        </Html>
      )}
    </group>
  );
}
```

### Performance Optimizations

To ensure smooth performance, especially on mobile devices:

1. **Asset Loading**
   - Use draco compression for 3D models
   - Implement progressive loading with suspense
   - Preload critical textures

2. **Rendering Optimizations**
   - Use instanced meshes for repeated elements
   - Implement frustum culling
   - Reduce polygon count for distant objects

3. **Mobile Considerations**
   - Detect device capabilities and adjust quality
   - Simplify scene on mobile devices
   - Optimize touch controls for mobile interaction

### Responsive Design

The application adapts to different screen sizes:

```javascript
// src/hooks/useResponsive.js
import { useState, useEffect } from 'react';

export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile };
}
```

### Retro-Nostalgic Aesthetic Implementation

The retro aesthetic is achieved through:

1. **Color Palette**
   - Mint greens (#84a98c)
   - Warm oranges (#ff9e64)
   - Cream tones (#e0d8c0)

2. **Typography**
   - Funky serif fonts for headings
   - Monospace fonts for technical details

3. **Visual Effects**
   - Grain overlay for texture
   - CRT screen effects for arcade displays
   - Subtle vignetting

4. **Animation**
   - Slightly bouncy transitions (using GSAP elastic easing)
   - Pulsing effects on hover
   - Screen flicker effects

## Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Animation Library](https://greensock.com/gsap/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Next Steps & Future Enhancements

1. **Advanced Interactions**
   - Implement joystick controls for navigation
   - Add mini-games related to each project
   - Create animated transitions between sections

2. **Content Management**
   - Add a headless CMS for easier project updates
   - Implement dynamic loading of project data

3. **Accessibility**
   - Add keyboard navigation
   - Implement screen reader support
   - Provide alternative non-3D view