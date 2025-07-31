import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function logWarning(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(...args);
  }
}

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: (() => {
        try {
          const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
          if (storedTheme) return storedTheme;
        } catch {
          logWarning('localStorage no disponible, usando preferencia del sistema');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      })(),
      setTheme: theme =>
        set(() => ({
          theme: theme,
        })),
      toggleTheme: () =>
        set(state => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
