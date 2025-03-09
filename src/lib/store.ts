import { create } from 'zustand';

interface AppState {
  currentSection: string;
  isDarkMode: boolean;
  setCurrentSection: (section: string) => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: 'home',
  isDarkMode: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));