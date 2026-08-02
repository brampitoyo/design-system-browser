import { useDesignSystem } from '../context/DesignSystemContext';
import { palettes } from '../utils/palettes';
import { getContrastLevelCached } from '../utils/contrast';
import { TabsDemo, TabsPillsDemo, TabsBareDemo } from './TabsDemos';
export { TabsDemo, TabsPillsDemo, TabsBareDemo };

export default function PrimitivesPage() {
  const { system } = useDesignSystem();
  const palette = palettes[system];
  const isPrimer = system === 'primer';
  const darkPalette = isPrimer ? palettes['primer-dark'] : null;

  const renderPaletteGrid = (colors: Record<string, Record<string, string>>, label: string) => (
    <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
      <h3 className="text-base font-medium ds-font-heading">{label}</h3>
      <p className="mt-1 text-xs ds-text-muted-foreground">
        Full color families with all shades. Click a swatch to copy the hex value.
      </p>
      <div className="mt-4 space-y-6">
        {Object.entries(colors).map(([category, shades]) => (
          <div key={category} className="space-y-6">
            <h4 className="text-sm font-medium ds-text-foreground capitalize">{category}</h4>
            <div className="mt-2 flex gap-1" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
              {Object.entries(shades).map(([key, value]) => (
                <button
                  key={`${category}-${key}`}
                  type="button"
                  className="ds-swatch flex-1 min-w-0 appearance-none bg-transparent border-0 p-0 rounded-sm py-2 text-center text-[10px] font-medium hover:opacity-80 ds-focus-ring"
                  style={{ '--swatch-bg': value } as React.CSSProperties}
                  title={`${category}-${key}: ${value}`}
                  onClick={async () => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.warn('Failed to copy swatch color:', err);
  }
}}
                >
                  <span className={`${getContrastLevelCached(value) === 'FAIL' ? 'text-black' : 'text-white'}`}>
                    {key}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const hasSystemPalette = 'systemPalette' in palette && palette.systemPalette;
  const hasColorPalette = 'colorPalette' in palette && palette.colorPalette;

  return (
    <div>
      {isPrimer && darkPalette ? (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            {renderPaletteGrid(palette.colors, 'Light Color Palette')}
          </div>
          <div>
            {renderPaletteGrid(darkPalette.colors, 'Dark Palette')}
          </div>
        </div>
      ) : hasSystemPalette || hasColorPalette || palette.baselinePalette || palette.staticPalette ? (
        <div className="grid gap-4">
          {hasSystemPalette && renderPaletteGrid(palette.systemPalette!, 'System Palette')}
          {hasColorPalette && renderPaletteGrid(palette.colorPalette!, 'Color Palette')}
          {palette.baselinePalette && renderPaletteGrid(palette.baselinePalette, 'Baseline Palette')}
          {palette.staticPalette && renderPaletteGrid(palette.staticPalette, 'Static Palette')}
        </div>
      ) : palette.lightNeutrals && palette.darkNeutrals ? (
        <div className="grid gap-4">
          {renderPaletteGrid(palette.colors, 'Color Palette')}
          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderPaletteGrid({
                Solid: Object.fromEntries(Object.entries(palette.lightNeutrals).filter(([k]) => !k.includes('A'))),
                Alpha: Object.fromEntries(Object.entries(palette.lightNeutrals).filter(([k]) => k.includes('A'))),
              }, 'Light Mode Neutrals Palette')}
            </div>
            <div>
              {renderPaletteGrid({
                Solid: Object.fromEntries(Object.entries(palette.darkNeutrals).filter(([k]) => !k.includes('A'))),
                Alpha: Object.fromEntries(Object.entries(palette.darkNeutrals).filter(([k]) => k.includes('A'))),
              }, 'Dark Mode Neutrals Palette')}
            </div>
          </div>
        </div>
      ) : palette.colorsDark ? (
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderPaletteGrid(palette.colors, 'Light Color Palette')}
            </div>
            <div>
              {renderPaletteGrid(palette.colorsDark, 'Dark Color Palette')}
            </div>
          </div>
          {palette.overlays && renderPaletteGrid(palette.overlays, 'Overlays')}
        </div>
      ) : palette.overlays ? (
        <div className="grid gap-4">
          {renderPaletteGrid(palette.colors, 'Color Palette')}
          {renderPaletteGrid(palette.overlays, 'Overlays')}
        </div>
      ) : (
        <div className="grid gap-4">
          {renderPaletteGrid(palette.colors, 'Color Palette')}
        </div>
      )}
    </div>
  );
}
