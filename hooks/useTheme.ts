import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from 'react';

export type AppTheme = 'light' | 'dark';

export type ThemeContextValue = {
  theme: AppTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  return useContext(ThemeContext);
}
