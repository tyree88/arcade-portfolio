export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  category: string;
  tags: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  date: string;
} 
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  category?: string;
  tags?: string[];
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  date?: string;
}
