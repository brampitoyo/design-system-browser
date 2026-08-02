export function resolveAccentForeground(
  selected: { contrast?: { light: string; dark: string } } | undefined,
  isDark: boolean,
  contrastColor: { light: string; dark: string }
): string {
  const mode = isDark ? 'dark' : 'light';
  const value = selected?.contrast?.[mode] ?? 'auto';
  if (value === 'auto') return '#ffffff';

  return contrastColor[mode];
}

export function isWithinCap(
  selectedKey: string,
  maxKey: string,
  values: Record<string, string>
): boolean {
  // Palette radius values are intentionally ordered by size in the data file.
  // Object.keys() preserves insertion order for string keys, so index comparison
  // reflects the visual scale (smaller index = smaller radius).
  const orderedKeys = Object.keys(values);
  const maxIndex = orderedKeys.indexOf(maxKey);
  const selectedIndex = orderedKeys.indexOf(selectedKey);
  return selectedIndex !== -1 && selectedIndex <= maxIndex;
}
