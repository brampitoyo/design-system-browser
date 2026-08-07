import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { palettes } from '../utils/palettes';

// ─── Layer system ───────────────────────────────────────────────────────────
//
// Layers are numbered 0–4 and correspond to the navigation rows.
// Each layer has a unique `data-layer` attribute on its radio inputs.
// `visibleLayers` lists the layers currently rendered (some are conditional).
// Keyboard navigation (ArrowUp/ArrowDown) moves between visible layers.
//
// 0: View (primitives / components)
// 1: Design System
// 2: Appearance (light / dark)
// 3: Border Radius (conditional)
// 4: Accent (conditional)
// ─────────────────────────────────────────────────────────────────────────────

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

type View = 'primitives' | 'components';

interface SystemSwitcherProps {
  view: View;
  setView: (view: View) => void;
}

interface NavLayerProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

function NavLayer({ name, onClick, children }: NavLayerProps) {
  return (
    <fieldset
      className="flex items-center gap-1 overflow-x-auto min-w-0 nav-layer"
      onClick={onClick}
    >
      <legend className="sr-only">{name}</legend>
      {children}
    </fieldset>
  );
}

export function SystemSwitcher({ view, setView }: SystemSwitcherProps) {
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

  const [resolvedAppearance, setResolvedAppearance] = useState<'light' | 'dark'>(() => {
    if (themeMode === 'dark') return 'dark';
    if (themeMode === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setResolvedAppearance(e.matches ? 'dark' : 'light');
      };
      setResolvedAppearance(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedAppearance(themeMode);
    }
  }, [themeMode]);

  const navRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const visibleLayers = [0, 1, 2];
  if (supportsRadius) visibleLayers.push(3);
  if (supportsAccent) visibleLayers.push(4);

  // Focus the checked radio in the top-most layer on mount so keyboard
  // navigation works immediately without a mouse click.
  useEffect(() => {
    const radios = navRef.current?.querySelectorAll(`input[data-layer="0"]`);
    if (!radios) return;
    for (const radio of radios) {
      if ((radio as HTMLInputElement).checked) {
        (radio as HTMLInputElement).focus();
        break;
      }
    }
  }, []);

  const focusLayer = useCallback((layer: number) => {
    const radios = navRef.current?.querySelectorAll(`input[data-layer="${layer}"]`);
    if (!radios) return;
    for (const radio of radios) {
      if ((radio as HTMLInputElement).checked) {
        const el = radio as HTMLInputElement;
        el.focus();
        const label = navRef.current?.querySelector(`label[for="${el.id}"]`);
        if (label) {
          label.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
        break;
      }
    }
  }, []);

  const handleRadioFocus = useCallback((layer: number) => {
    setActiveLayer(layer);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

    let currentLayerNum = activeLayer;

    const activeEl = document.activeElement as HTMLElement | null;
    if (activeEl) {
      const elLayer = activeEl.getAttribute('data-layer');
      if (elLayer !== null) {
        currentLayerNum = parseInt(elLayer, 10);
      }
    }

    const currentIndex = visibleLayers.indexOf(currentLayerNum);
    if (currentIndex === -1) return;

    let targetIndex: number | null = null;
    if (e.key === 'ArrowDown') {
      targetIndex = currentIndex + 1;
    } else if (e.key === 'ArrowUp') {
      targetIndex = currentIndex - 1;
    }

    if (targetIndex === null || targetIndex < 0 || targetIndex >= visibleLayers.length) return;
    e.preventDefault();

    const targetLayerNum = visibleLayers[targetIndex];
    setActiveLayer(targetLayerNum);

    const targetRadios = navRef.current?.querySelectorAll(`input[data-layer="${targetLayerNum}"]`);
    if (!targetRadios) return;

    for (const radio of targetRadios) {
      if ((radio as HTMLInputElement).checked) {
        (radio as HTMLInputElement).focus();
        break;
      }
    }
  }, [activeLayer, visibleLayers]);

  return (
    <div
      ref={navRef}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 bg-neutral-900 text-neutral-100 px-3 py-2 text-xs ds-font-mono"
    >
      <NavLayer name="View" onClick={() => focusLayer(0)}>
        <input
          type="radio"
          name="layer-view"
          value="primitives"
          checked={view === 'primitives'}
          onChange={() => setView('primitives')}
          onFocus={() => handleRadioFocus(0)}
          className="nav-radio-input sr-only"
          id="view-primitives"
          data-layer="0"
        />
        <label htmlFor="view-primitives" className="nav-radio-label">Primitives</label>
        <input
          type="radio"
          name="layer-view"
          value="components"
          checked={view === 'components'}
          onChange={() => setView('components')}
          onFocus={() => handleRadioFocus(0)}
          className="nav-radio-input sr-only"
          id="view-components"
          data-layer="0"
        />
        <label htmlFor="view-components" className="nav-radio-label">Components</label>
      </NavLayer>

      <span className="w-full h-px bg-neutral-700" />

      <NavLayer name="Design System" onClick={() => focusLayer(1)}>
        {systems.map((s) => (
          <React.Fragment key={s.id}>
            <input
              type="radio"
              name="layer-system"
              value={s.id}
              checked={system === s.id}
              onChange={(e) => setSystem(e.target.value as typeof system)}
              onFocus={() => handleRadioFocus(1)}
              className="nav-radio-input sr-only"
              id={`system-${s.id}`}
              data-layer="1"
            />
            <label htmlFor={`system-${s.id}`} className="nav-radio-label">{s.name}</label>
          </React.Fragment>
        ))}
      </NavLayer>

      <span className="w-full h-px bg-neutral-700" />

      <NavLayer name="Appearance" onClick={() => focusLayer(2)}>
        <input
          type="radio"
          name="layer-appearance"
          value="light"
          checked={resolvedAppearance === 'light'}
          onChange={() => setThemeMode('light')}
          onFocus={() => handleRadioFocus(2)}
          className="nav-radio-input sr-only"
          id="appearance-light"
          data-layer="2"
        />
        <label htmlFor="appearance-light" className="nav-radio-label">Light</label>
        <input
          type="radio"
          name="layer-appearance"
          value="dark"
          checked={resolvedAppearance === 'dark'}
          onChange={() => setThemeMode('dark')}
          onFocus={() => handleRadioFocus(2)}
          className="nav-radio-input sr-only"
          id="appearance-dark"
          data-layer="2"
        />
        <label htmlFor="appearance-dark" className="nav-radio-label">Dark</label>
      </NavLayer>

      {supportsRadius && (
        <>
          <span className="w-full h-px bg-neutral-700" />
          <NavLayer name="Border Radius" onClick={() => focusLayer(3)}>
            {radiusOptions.map(([key]) => (
              <React.Fragment key={key}>
                <input
                  type="radio"
                  name="layer-radius"
                  value={key}
                  checked={selectedRadius === key}
                  onChange={(e) => setRadius(e.target.value)}
                  onFocus={() => handleRadioFocus(3)}
                  className="nav-radio-input sr-only"
                  id={`radius-${key}`}
                  data-layer="3"
                />
                <label htmlFor={`radius-${key}`} className="nav-radio-label">{key}</label>
              </React.Fragment>
            ))}
          </NavLayer>
        </>
      )}

      {supportsAccent && (
        <>
          <span className="w-full h-px bg-neutral-700" />
          <NavLayer name="Accent" onClick={() => focusLayer(4)}>
            {accentOptions.map((a) => {
              const color = isDark ? a.dark : a.light;
              return (
                <React.Fragment key={a.id}>
                  <input
                    type="radio"
                    name="layer-accent"
                    value={a.id}
                    checked={accent === a.id}
                    onChange={() => setAccent(a.id)}
                    onFocus={() => handleRadioFocus(4)}
                    className="nav-radio-input sr-only"
                    id={`accent-${a.id}`}
                    data-layer="4"
                  />
                  <label htmlFor={`accent-${a.id}`} className="nav-accent-label">
                    <span className="nav-accent-circle" style={{ backgroundColor: color }} />
                  </label>
                </React.Fragment>
              );
            })}
          </NavLayer>
        </>
      )}
    </div>
  );
}
