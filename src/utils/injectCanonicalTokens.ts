import { palettes, type PaletteData } from './palettes';
import type { DesignSystem, ThemeMode } from '../context/DesignSystemContext';

/**
 * Three-layer token architecture:
 *
 * 1. Canonical tokens (`--canonical-*`) — raw palette data injected here.
 * 2. Semantic mappings (system CSS files) — map canonical tokens to design-system-specific names.
 * 3. Dynamic overrides (`--accent-*`, `--radius-selected`, `--radius-{component}`) — runtime values
 *    set by DesignSystemContext based on user selections and palette rules.
 *
 * For the full architecture explanation, see docs/architecture.md.
 */
const canonicalProperties = new Set<string>();

function injectColors(palette: PaletteData, root: HTMLElement, isDark: boolean): void {
  const colors = palette.colorsDark && isDark ? palette.colorsDark : palette.colors;
  if (!colors) return;

  for (const [family, shades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(shades)) {
      const varName = `--canonical-color-${family}-${shade}`;
      root.style.setProperty(varName, value);
      canonicalProperties.add(varName);
    }
  }
}

function injectSemantic(palette: PaletteData, root: HTMLElement, isDark: boolean): void {
  if (!palette.semantic) return;

  for (const [tokenName, values] of Object.entries(palette.semantic)) {
    const varName = `--canonical-${tokenName.replace(/\./g, '-')}`;
    const value = isDark ? values.dark : values.light;
    root.style.setProperty(varName, value);
    canonicalProperties.add(varName);
  }
}

function injectSpacing(palette: PaletteData, root: HTMLElement): void {
  if (!palette.spacing) return;

  for (const [key, value] of Object.entries(palette.spacing)) {
    const varName = `--canonical-spacing-${key}`;
    root.style.setProperty(varName, value);
    canonicalProperties.add(varName);
  }
}

function injectTypography(palette: PaletteData, root: HTMLElement): void {
  if (!palette.typography) return;

  for (const [key, value] of Object.entries(palette.typography)) {
    const varName = `--canonical-typography-${key}`;
    root.style.setProperty(varName, value);
    canonicalProperties.add(varName);
  }
}


// Injects --canonical-radius-* tokens from palette data.
// These are the raw scale values; component-specific caps are applied by DesignSystemContext.
function injectRadius(palette: PaletteData, root: HTMLElement): void {
  if (!palette.radius?.values) return;

  for (const [key, value] of Object.entries(palette.radius.values)) {
    const varName = `--canonical-radius-${key}`;
    root.style.setProperty(varName, value);
    canonicalProperties.add(varName);
  }
}
export function injectCanonicalTokens(system: DesignSystem, themeMode: ThemeMode): void {
  const root = document.documentElement;
  const palette = palettes[system];
  if (!palette) return;

  const isDark =
    typeof window !== 'undefined' &&
    (themeMode === 'dark' ||
      (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));

  injectColors(palette, root, isDark);
  injectSemantic(palette, root, isDark);
  injectSpacing(palette, root);
  injectTypography(palette, root);
  injectRadius(palette, root);
}

export function clearCanonicalTokens(): void {
  const root = document.documentElement;
  for (const prop of canonicalProperties) {
    root.style.removeProperty(prop);
  }
  canonicalProperties.clear();
}
