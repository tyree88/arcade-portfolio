import { Scene } from "@/components/three/Scene";
import { Button } from "@/components/ui/Button";
// import useResponsive from "./hooks/useResponsive";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 md:p-8">
      <header className="py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Arcade Portfolio</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="hover:underline underline-offset-4">About</a>
          <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
          <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Interactive Portfolio Experience</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore my work through this immersive arcade-inspired showcase
          </p>
        </div>

        <Scene />

        <div className="flex gap-4 mt-8">
          <Button variant="primary" size="lg">
            View Projects
          </Button>
          <Button variant="secondary" size="lg">
            Contact Me
          </Button>
        </div>
      </main>

      <footer className="py-6 mt-16 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">
          © {new Date().getFullYear()} Arcade Portfolio. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}
