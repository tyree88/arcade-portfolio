
'use client';

import React from "react";
import { Scene } from "@/components/three/Scene";
// Placeholder for 3D arcade machine component (requires Three.js and GSAP implementation)
const ProjectArcadeMachine = () => <div>Project Arcade Machine Placeholder</div>;

const ProjectsSection = () => (
  <section id="projects" className="bg-black py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-ps-cream ps-title mb-12 text-center">FEATURED PROJECTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Example Project Arcade Machine */}
        <ProjectArcadeMachine />
        <ProjectArcadeMachine />
        <ProjectArcadeMachine />
        <ProjectArcadeMachine />
      </div>
    </div>
  </section>
);

// Dynamically import the 3D scene component with no SSR to prevent hydration issues
const ArcadeRoom = dynamic(() => import("@/components/three/ArcadeRoom").then(mod => ({ default: mod.ArcadeRoom })), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-xl mb-2">Loading 3D Environment</h2>
        <p>Please wait...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with PlayStation-inspired styling */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black">
          <Scene />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-ps-cream ps-title mb-4">
              ARCADE PORTFOLIO
            </h1>
            <p className="text-xl text-ps-cream mb-8">
              A nostalgic blend of PlayStation-era aesthetics with interactive 3D elements.
            </p>
            <a href="#projects" className="inline-block bg-ps-green/90 text-ps-cream px-6 py-3 rounded-lg font-mono text-lg hover:bg-ps-green transition-colors">
              Explore Projects
            </a>
          </div>
        </div>
      </section>

      {/* About section with memory card styling */}
      <section className="bg-ps-brown py-20 border-t-4 border-ps-tan">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-ps-cream ps-title mb-6">ABOUT ME</h2>
              <p className="text-ps-cream mb-4">
                Welcome to my interactive portfolio inspired by the golden era of gaming. I'm a creative developer with a passion for blending nostalgic aesthetics with modern web technologies.
              </p>
              <p className="text-ps-cream mb-4">
                My work focuses on creating immersive digital experiences that combine 3D elements, creative UI design, and seamless interactions.
              </p>
              <div className="mt-8 flex space-x-4">
                <div className="bg-ps-sage p-4 rounded-sm">
                  <h3 className="text-xl font-bold text-ps-cream mb-2">3D Web</h3>
                  <p className="text-ps-cream text-sm">Interactive 3D experiences using Three.js and React Three Fiber</p>
                </div>
                <div className="bg-ps-sage p-4 rounded-sm">
                  <h3 className="text-xl font-bold text-ps-cream mb-2">UI Design</h3>
                  <p className="text-ps-cream text-sm">Nostalgic interfaces with modern usability principles</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="bg-ps-sage p-6 rounded-sm w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-ps-cream">MEMORY CARD</h3>
                  <span className="text-ps-cream text-sm">01</span>
                </div>
                <div className="bg-black/30 p-4 rounded-sm mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-ps-cream">SKILL POINTS</span>
                    <span className="text-ps-tan">95/100</span>
                  </div>
                  <div className="w-full bg-ps-cream/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-ps-tan h-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-ps-cream">React</span>
                    <span className="text-ps-cream">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ps-cream">Three.js</span>
                    <span className="text-ps-cream">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ps-cream">TypeScript</span>
                    <span className="text-ps-cream">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ps-cream">UI Design</span>
                    <span className="text-ps-cream">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section with arcade machines */}
      <ProjectsSection />

      {/* Contact section */}
      <section className="bg-ps-sage py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-ps-cream ps-title mb-6 text-center">CONTACT ME</h2>
            <p className="text-ps-cream text-center mb-8">
              Interested in working together? Drop me a message and let's create something amazing.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-ps-cream mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-black/20 border border-ps-cream/30 text-ps-cream p-3 rounded-sm focus:outline-none focus:border-ps-tan"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-ps-cream mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-black/20 border border-ps-cream/30 text-ps-cream p-3 rounded-sm focus:outline-none focus:border-ps-tan"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-ps-cream mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-black/20 border border-ps-cream/30 text-ps-cream p-3 rounded-sm focus:outline-none focus:border-ps-tan"
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit"
                  className="bg-ps-tan text-black px-8 py-3 rounded-sm font-medium hover:bg-ps-cream transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with PlayStation memory card styling */}
      <footer className="bg-ps-brown py-8 border-t-4 border-ps-tan">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-ps-cream ps-title">ARCADE PORTFOLIO</h2>
              <p className="text-ps-cream text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
            </div>

            <div className="flex space-x-8">
              {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="text-ps-cream hover:text-ps-tan transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
