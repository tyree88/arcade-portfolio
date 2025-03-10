'use client';

import { Scene } from "@/components/three/Scene";

// Debug for development
console.log("Page component rendering");

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Top navigation bar styled like PS2 menu */}
      <header className="bg-ps-green p-4 border-b-4 border-ps-tan">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-ps-cream ps-title">ARCADE PORTFOLIO</h1>
          <nav className="hidden md:flex space-x-6">
            {['Projects', 'About', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-ps-cream hover:text-ps-tan transition-colors duration-300 pixel-text"
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-ps-cream">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero section with PS1-style graphics */}
      <section className="bg-ps-brown py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grain"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-ps-cream mb-4 ps-title">URBAN GAMER</h1>
              <p className="text-lg md:text-xl text-ps-cream mb-8 jp-block">
                A nostalgic journey through my portfolio, inspired by PlayStation memories and Japanese anime aesthetics.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-playstation hover-bounce">
                  View Projects
                </button>
                <button className="btn-playstation hover-bounce">
                  Contact Me
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="arcade-cabinet">
                {/* Insert the 3D Scene component */}
                <Scene />
                
                {/* Arcade cabinet controls below the screen */}
                <div className="flex justify-between mt-4">
                  <div className="w-12 h-12 rounded-full bg-ps-tan border-2 border-ps-cream"></div>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 rounded-full bg-ps-green border-2 border-ps-cream text-ps-cream font-bold">A</button>
                    <button className="w-8 h-8 rounded-full bg-ps-tan border-2 border-ps-cream text-ps-brown font-bold">B</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className="py-16 bg-ps-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-ps-brown mb-12 ps-title">FEATURED PROJECTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="arcade-cabinet hover-bounce">
                <div className="crt-screen aspect-video w-full mb-4">
                  <div className="absolute inset-0 bg-ps-brown flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-ps-cream pixel-text">PROJECT {item}</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-ps-cream mb-2 anime-highlight">Arcade Project {item}</h3>
                <p className="text-ps-cream text-sm mb-4">
                  A nostalgic blend of PlayStation-era aesthetics with Japanese anime influences.
                </p>
                <button className="bg-ps-cream text-ps-brown px-4 py-2 rounded font-bold text-sm uppercase hover:bg-ps-tan transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section with Japanese influence */}
      <section id="about" className="py-16 bg-ps-green relative">
        <div className="absolute inset-0 opacity-10 bg-grain"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="pixel-border p-6 bg-ps-brown inline-block">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-ps-beige"></div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ps-cream mb-6 ps-title">ABOUT ME</h2>
              <div className="jp-block">
                <p className="text-ps-cream mb-4">
                  An African American developer with a passion for Japanese culture and anime, 
                  growing up playing PlayStation games that shaped my creative journey.
                </p>
                <p className="text-ps-cream mb-4">
                  My work combines urban aesthetics with Japanese design principles, 
                  creating unique digital experiences that feel nostalgic yet fresh.
                </p>
              </div>
              <div className="mt-8">
                <button className="btn-playstation hover-bounce">
                  My Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills section with PlayStation controller-like design */}
      <section id="skills" className="py-16 bg-ps-brown">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-ps-cream mb-12 ps-title">SKILLS</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Frontend', 'Backend', '3D Design', 'Animation', 'UI/UX', 'Game Dev', 'Mobile', 'AR/VR'].map((skill) => (
              <div key={skill} className="bg-ps-beige rounded-lg p-4 text-center hover-bounce">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ps-green flex items-center justify-center">
                  <span className="text-2xl font-bold text-ps-cream">{skill.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-ps-brown">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form styled like a game menu */}
      <section id="contact" className="py-16 bg-ps-sage">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-ps-cream mb-12 ps-title">CONTACT</h2>
          
          <div className="max-w-2xl mx-auto arcade-cabinet">
            <form className="space-y-6">
              <div>
                <label className="block text-ps-cream mb-2 pixel-text">NAME</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-ps-brown border-2 border-ps-tan text-ps-cream focus:border-ps-cream outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-ps-cream mb-2 pixel-text">EMAIL</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-ps-brown border-2 border-ps-tan text-ps-cream focus:border-ps-cream outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-ps-cream mb-2 pixel-text">MESSAGE</label>
                <textarea 
                  className="w-full p-3 bg-ps-brown border-2 border-ps-tan text-ps-cream focus:border-ps-cream outline-none h-32"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button className="btn-playstation w-full">SEND MESSAGE</button>
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
