import { create } from 'zustand';
// TODO: Define the Project interface based on the plan
// import { Project } from '@/types/project';
// import { projects } from '@/data/projects';

// Placeholder Project type
interface Project {
  id: string;
  title: string;
  description: string;
  type: string; // Example type
  thumbnailUrl: string; // Example property
}
const projects: Project[] = []; // Placeholder data

interface PortfolioState {
  projects: Project[];
  currentProjectIndex: number;
  selectedProject: Project | null;
  isShowingDetails: boolean;
  coinCount: number;
  unlockedSections: string[];
  isSoundEnabled: boolean; // Added for sound toggle
  setCurrentProjectIndex: (index: number) => void;
  selectProject: (project: Project | null) => void;
  showDetails: (show: boolean) => void;
  addCoin: () => void;
  spendCoin: (cost: number, section: string) => boolean;
  toggleSound: () => void; // Added for sound toggle
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  projects: projects,
  currentProjectIndex: 0,
  selectedProject: null,
  isShowingDetails: false,
  coinCount: 0,
  unlockedSections: ['website'], // Example starting section
  isSoundEnabled: true, // Sound enabled by default
  setCurrentProjectIndex: (index) => set({ currentProjectIndex: index }),
  selectProject: (project) => set({ selectedProject: project, isShowingDetails: !!project }),
  showDetails: (show) => set({ isShowingDetails: show }),
  addCoin: () => set((state) => ({ coinCount: state.coinCount + 1 })),
  spendCoin: (cost, section) => {
    if (get().coinCount >= cost) {
      set((state) => ({
        coinCount: state.coinCount - cost,
        unlockedSections: [...new Set([...state.unlockedSections, section])], // Use Set to avoid duplicates
      }));
      return true;
    }
    return false;
  },
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })), // Toggle function
}));