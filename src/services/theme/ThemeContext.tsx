import { createContext, useContext } from 'react';
// eslint-disable-next-line no-restricted-imports
import type { PaletteType } from '@material-ui/core';

export const ThemeContext = createContext<ThemeContext | null>(null);

export interface ThemeContext {
  currentTheme: PaletteType;
  changeTheme(next: PaletteType): void;
}

export function useThemeContext(): ThemeContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeContext is not found');
  }
  return context;
}
