export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  if (darker === 0) return Infinity;
  return (lighter + 0.05) / (darker + 0.05);
}



// Memoization cache for contrast levels against white (#ffffff)
// Keys are color hex values, values are contrast levels
// This eliminates redundant contrastRatio() calculations for the same color
const contrastCache = new Map<string, 'AAA' | 'AA' | 'FAIL'>();

export function getContrastLevelCached(colorHex: string): 'AAA' | 'AA' | 'FAIL' {
  const cached = contrastCache.get(colorHex);
  if (cached) return cached;

  const ratio = contrastRatio(colorHex, '#ffffff');
  const level = getContrastLevel(ratio);
  contrastCache.set(colorHex, level);
  return level;
}
export function getContrastLevel(ratio: number): 'AAA' | 'AA' | 'FAIL' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'FAIL';
}
