# Design System Browser Architecture

## Overview

The design system browser lets users switch between design systems and see how components adapt in real time. The architecture is intentionally lightweight: no router, no state management library, no build-time CSS generation. Runtime theming is achieved through CSS custom properties and React context.

## App Structure

### Entry and Routing

`src/main.tsx` bootstraps React 19 into `#root`. `src/App.tsx` acts as the layout shell. There is **no routing library**. The app has exactly two views, switched via local React state:

- **Primitives** — color palette inspection with WCAG contrast labels
- **Components** — interactive showcase of all implemented components

Both pages are **lazy-loaded** with `React.lazy()` and wrapped in `<Suspense>` for code splitting.

### State Management

All global state lives in a single React Context: `DesignSystemContext`.

```ts
interface DesignSystemContextValue {
  system: DesignSystem;   // 'tailwind' | 'carbon' | 'primer' | ...
  accent: string;         // e.g. 'blue', 'gray'
  themeMode: ThemeMode;   // 'light' | 'dark' | 'system'
  radius: string;         // e.g. 'md', 'sm'
  setSystem, setAccent, setThemeMode, setRadius
}
```

Selective consumption is provided via hooks: `useSystem()`, `useAccent()`, `useTheme()`, `useRadius()`.

The `DesignSystemProvider` bridges React state to the DOM through four categories of side effects:
1. `data-*` attributes on `<html>` (`data-design-system`, `data-theme`, `data-accent`, `color-scheme`)
2. Layer 1 canonical CSS custom properties via `injectCanonicalTokens()`
3. Layer 3 dynamic CSS custom properties for accent and radius
4. Palette default initialization when `system` changes

## Three-Layer Token System

### Layer 1: Canonical Tokens (`--canonical-*`)

Raw palette data injected into `document.documentElement` by `injectCanonicalTokens()`.

- Colors: `--canonical-color-{family}-{shade}`
- Semantic colors: `--canonical-{token-name}` (e.g. `--canonical-background-default`)
- Spacing: `--canonical-spacing-{key}`
- Typography: `--canonical-typography-{key}`
- Radius: `--canonical-radius-{key}`

These tokens are the single source of truth for design system data. They change when the user selects a different system or theme mode.

### Layer 2: Semantic Mappings (system CSS files)

Each design system has a CSS file in `src/styles/systems/` that maps canonical tokens to semantic variable names used by components.

Example from Tailwind:
```css
[data-design-system="tailwind"] {
  --color-background: var(--canonical-background-default);
  --color-foreground: var(--canonical-foreground-default);
}
```

This layer lets systems keep their own naming conventions while sharing the same component CSS.

### Layer 3: Dynamic Overrides

Runtime values set by `DesignSystemContext.tsx` based on user selections.

- `--accent-button-bg`, `--accent-button-fg`, `--accent-selected-bg`, `--accent-selected-fg`, `--accent-focus-border` — accent color with contrast-aware foreground resolution
- `--radius-selected` — the currently selected border radius
- `--radius-{component}` — per-component radius caps (e.g. `--radius-checkbox`)

These are set via `document.documentElement.style.setProperty()` in React effects.

## Data Flow

```
src/utils/palettes.ts
  → injectCanonicalTokens()        ← Layer 1: canonical tokens
    → src/styles/systems/{system}.css  ← Layer 2: semantic mappings
      → DesignSystemContext.tsx    ← Layer 3: dynamic overrides
        → Components               ← consume CSS variables
```

## Styling Stack

Components consume design tokens through three channels:

1. **Tailwind utility classes** — layout, spacing, typography, and standard colors (`bg-background`, `text-foreground`, `border-border`)
2. **`ds-*` semantic utility classes** — custom utilities defined in `src/index.css` under `@layer utilities` for design-system-specific styling (`ds-font-heading`, `ds-text-muted-foreground`, `ds-radius-selected`, `ds-bg-accent-button`, `ds-selectable-item`)
3. **Direct CSS variable references** — for dynamic values that Tailwind cannot reference at build time (`var(--accent-selected-bg)`, `var(--accent-selected-fg)`)

The system CSS files define semantic tokens consumed by all three channels. Components never reference `--canonical-*` directly.

## Component Architecture

Components are built on **Radix UI primitives** with a custom styling layer. Two patterns are used:

### Self-Contained Components
`Button`, `Input`, `Textarea`, `Switch`, `Checkbox`, `RadioGroup`, `Fieldset`, and `Card` use **Class Variance Authority (CVA)** for variant management. Styling is a single className string combining Tailwind utilities, `ds-*` classes, and direct `var()` references.

### Compound Components
`Tabs`, `Dialog`, `Popover`, `DropdownMenu`, `Select`, `Combobox`, `Listbox`, `Disclosure`, and `RadioGroup` wrap Radix UI primitives using the compound component pattern. Subcomponents are exported as named exports and composed declaratively in JSX.

## Key Files

| File | Role |
|------|------|
| `src/main.tsx` | React bootstrap |
| `src/App.tsx` | Layout shell, manual view switching, lazy-loaded pages |
| `src/utils/palettes.ts` | Design system data (colors, spacing, typography, radius) |
| `src/utils/injectCanonicalTokens.ts` | Injects Layer 1 canonical tokens |
| `src/utils/paletteResolvers.ts` | Pure functions for accent foreground contrast and radius cap logic |
| `src/context/DesignSystemContext.tsx` | State management + Layer 3 dynamic overrides |
| `src/styles/systems/*.css` | Layer 2 semantic mappings per design system |
| `src/styles/systems/overrides.css` | Cross-system state-dependent styling (e.g. active tabs) |
| `src/index.css` | Global styles, `ds-*` utilities, Tailwind imports |
| `src/pages/*` | Primitive palette inspection and component showcase |
| `src/components/*` | UI component library |

## Extension Points

### Adding a new design system

1. Add palette data to `palettes.ts`
2. Add a CSS file in `src/styles/systems/` mapping canonical tokens to semantic names
3. Add the system to the `DesignSystem` type and `systems` array in `SystemSwitcher`

### Adding a new component radius cap

Add an entry to `componentOverrides` in the palette's `radius` object:

```ts
radius: {
  default: 'md',
  values: { sm: '4px', md: '8px', lg: '12px' },
  componentOverrides: { checkbox: 'sm', radio: 'md' },
}
```

The context automatically sets `--radius-checkbox` and `--radius-radio` with cap logic. No code changes required.

### Adding a new state dimension

Currently the context manages `system`, `accent`, `themeMode`, and `radius`. To add a new dimension (e.g. spacing scale):

1. Add state and setter to `DesignSystemContextValue`
2. Add a `useSpacing()` hook following the existing pattern
3. Add palette data and any resolver functions in `paletteResolvers.ts`
4. Add effects to set CSS variables in `DesignSystemProvider`

## System-Specific Capabilities

Palettes can declare a `capabilities` object that controls which controls appear in `SystemSwitcher`:

- `accent: string[]` — allowed accent colors
- `radius: boolean` — whether to show the radius selector
- `gray: string[]` — allowed gray scale values
- `darkMode: boolean` — whether dark mode is supported

The `SystemSwitcher` component reads these to conditionally show controls.

## Contrast-Aware Theming

Accent foreground colors are resolved dynamically in `paletteResolvers.ts`:

- If the accent option defines a `contrast` mode for the current theme, that value is used
- Otherwise it falls back to `auto` (white text)
- Semantic `fgColor.contrast` tokens from the palette are used as the source of truth for custom contrast colors

The `PrimitivesPage` also includes WCAG contrast checking with memoized ratio calculations (`contrast.ts`) to label color swatches as AAA, AA, or FAIL against white.

## Why This Architecture

- **Separation of concerns**: data, mapping, and behavior are independent
- **No build-time CSS generation**: all theming happens at runtime via CSS variables
- **System-specific naming**: each design system keeps its own semantic vocabulary
- **Extensible**: new systems and component types can be added with minimal code changes
- **Testable**: pure resolver functions can be unit tested independently
- **Lightweight**: no router, no external state library, minimal dependencies
