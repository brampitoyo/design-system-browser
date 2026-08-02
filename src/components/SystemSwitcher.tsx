import { useDesignSystem } from '../context/DesignSystemContext';
import { palettes } from '../utils/palettes';

const systems = [
  { id: 'radix', name: 'Radix UI' },
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'carbon', name: 'IBM Carbon' },
  { id: 'primer', name: 'GitHub Primer' },
  { id: 'pajamas', name: 'GitLab Pajamas' },
  { id: 'material', name: 'Material 3' },
  { id: 'lightning', name: 'Salesforce Lightning' },
  { id: 'atlassian', name: 'Atlassian Design System' },
  { id: 'chakra', name: 'Chakra UI' },
] as const;

const themeModes = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'system', name: 'System' },
] as const;

export function SystemSwitcher() {
  const { system, accent, themeMode, radius, setSystem, setAccent, setThemeMode, setRadius } = useDesignSystem();
  const palette = palettes[system];
  const accentOptions = palette.accentOptions ?? [];
  const supportsAccent = accentOptions.length > 1;

  const isDark = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const radiusConfig = palette.radius;
  const radiusOptions = radiusConfig?.values ? Object.entries(radiusConfig.values) : [];
  const selectedRadius = radiusOptions.find(([key]) => key === radius)?.[0]
    ?? radiusConfig?.default
    ?? radiusOptions[0]?.[0];
  const supportsRadius = radiusConfig?.selector !== false && radiusOptions.length > 1;

  return (
    <div className="flex items-center gap-3 bg-neutral-900 text-neutral-100 px-3 py-1.5 text-xs ds-font-mono">
      <select
        value={system}
        onChange={(e) => setSystem(e.target.value as typeof system)}
        className="bg-transparent border-0 text-xs ds-font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 cursor-pointer"
      >
        {systems.map((s) => (
          <option key={s.id} value={s.id} className="bg-neutral-800 text-neutral-100">
            {s.name}
          </option>
        ))}
      </select>

      <span className="w-px h-5 bg-neutral-700" />

      <select
        value={themeMode}
        onChange={(e) => setThemeMode(e.target.value as typeof themeMode)}
        className="bg-transparent border-0 text-xs ds-font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 cursor-pointer"
      >
        {themeModes.map((t) => (
          <option key={t.id} value={t.id} className="bg-neutral-800 text-neutral-100">
            {t.name}
          </option>
        ))}
      </select>

      {supportsRadius && (
        <>
          <span className="w-px h-5 bg-neutral-700" />
          <select
            value={selectedRadius}
            onChange={(e) => setRadius(e.target.value)}
            className="bg-transparent border-0 text-xs ds-font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 cursor-pointer"
          >
            {radiusOptions.map(([key, value]) => (
              <option key={key} value={key} className="bg-neutral-800 text-neutral-100">
                {key} ({value})
              </option>
            ))}
          </select>
        </>
      )}

      {supportsAccent && (
        <>
          <span className="w-px h-5 bg-neutral-700" />
          <div className="flex flex-wrap items-center gap-1">
            {accentOptions.map((a) => {
              const color = isDark ? a.dark : a.light;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAccent(a.id)}
                  className={`ds-accent-chip h-4 w-4 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 ${
                    accent === a.id ? 'border-neutral-100' : 'border-neutral-600'
                  }`}
                  style={{ '--accent-chip-bg': color } as React.CSSProperties}
                  aria-label={a.name}
                  title={a.name}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
