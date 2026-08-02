import { createContext, useContext, useState, useEffect } from 'react';
import { injectCanonicalTokens, clearCanonicalTokens } from '../utils/injectCanonicalTokens';
import { palettes } from '../utils/palettes';
import { resolveAccentForeground, isWithinCap } from '../utils/paletteResolvers';

export type DesignSystem = 'tailwind' | 'carbon' | 'primer' | 'pajamas' | 'material' | 'lightning' | 'atlassian' | 'radix' | 'chakra';
export type ThemeMode = 'light' | 'dark' | 'system';
export interface DesignSystemContextValue {
  system: DesignSystem;
  accent: string;
  themeMode: ThemeMode;
  radius: string;
  setSystem: (system: DesignSystem) => void;
  setAccent: (accent: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setRadius: (radius: string) => void;
}

export const DesignSystemContext = createContext<DesignSystemContextValue>({
  system: 'radix',
  accent: 'blue',
  themeMode: 'system',
  radius: 'md',
  setSystem: () => {},
  setAccent: () => {},
  setThemeMode: () => {},
  setRadius: () => {},
});

export function useDesignSystem() {
  return useContext(DesignSystemContext);
}

export function useSystem() {
  const { system, setSystem } = useDesignSystem();
  return { system, setSystem };
}

export function useAccent() {
  const { accent, setAccent } = useDesignSystem();
  return { accent, setAccent };
}

export function useTheme() {
  const { themeMode, setThemeMode } = useDesignSystem();
  return { themeMode, setThemeMode };
}

export function useRadius() {
  const { radius, setRadius } = useDesignSystem();
  return { radius, setRadius };
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [system, setSystem] = useState<DesignSystem>('radix');
  const [accent, setAccent] = useState<string>('blue');
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [radius, setRadius] = useState<string>(() => {
    const defaultRadius = palettes[system]?.radius?.default;
    return defaultRadius || 'md';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-design-system', system);
  }, [system]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  useEffect(() => {
    const palette = palettes[system];
    const defaultRadius = palette.radius?.default;
    if (defaultRadius) {
      setRadius(defaultRadius);
    }
  }, [system]);

  useEffect(() => {
    const root = document.documentElement;
    let isDark = false;
    if (themeMode === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      root.style.colorScheme = isDark ? 'dark' : 'light';
    } else {
      isDark = themeMode === 'dark';
      root.setAttribute('data-theme', themeMode);
      root.style.colorScheme = themeMode;
    }
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#0a0a0a' : '#ffffff');
    }
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = palettes[system];
    const radiusConfig = palette.radius;

    if (radiusConfig) {
      const selectedValue = radiusConfig.values[radius];
      if (selectedValue) {
        root.style.setProperty('--radius-selected', selectedValue);
      }

      // Apply per-component radius caps (e.g. checkbox) from palette data.
      // New component types can be added to componentOverrides without code changes here.
      if (radiusConfig.componentOverrides) {
        for (const [component, maxKey] of Object.entries(radiusConfig.componentOverrides)) {
          const maxValue = radiusConfig.values[maxKey];
          const finalValue = isWithinCap(radius, maxKey, radiusConfig.values) ? selectedValue : maxValue;
          root.style.setProperty(`--radius-${component}`, finalValue);
        }
      }
    } else {
      root.style.removeProperty('--radius-selected');
      root.style.removeProperty('--radius-checkbox');
    }
  }, [radius, system]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = palettes[system];
    const selected = palette.accentOptions?.find(a => a.id === accent);

    if (selected) {
      const isDark = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const bg = isDark ? selected.dark : selected.light;
      const contrastColor = palette.semantic?.['fgColor.contrast'] ?? { light: '#000000', dark: '#ffffff' };
      const fg = resolveAccentForeground(selected, isDark, contrastColor);

      root.style.setProperty('--accent-button-bg', bg);
      root.style.setProperty('--accent-button-fg', fg);
      root.style.setProperty('--accent-selected-bg', bg);
      root.style.setProperty('--accent-selected-fg', fg);
      root.style.setProperty('--accent-focus-border', bg);
    } else {
      root.style.setProperty('--accent-button-bg', 'var(--color-primary)');
      root.style.setProperty('--accent-button-fg', 'var(--color-primary-foreground)');
      root.style.setProperty('--accent-selected-bg', 'var(--color-primary)');
      root.style.setProperty('--accent-selected-fg', 'var(--color-primary-foreground)');
      root.style.setProperty('--accent-focus-border', 'var(--color-primary)');
    }
  }, [system, accent, themeMode]);

  useEffect(() => {
    clearCanonicalTokens();
    injectCanonicalTokens(system, themeMode);
  }, [system, themeMode]);

  return (
    <DesignSystemContext.Provider value={{ system, accent, themeMode, radius, setSystem, setAccent, setThemeMode, setRadius }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
