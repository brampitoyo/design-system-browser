# Design System Browser

Browse design system primitives and see them applied to consistent components across popular design systems.

## What it does

- Switch between 9 design systems: Tailwind, Carbon, Primer, Pajamas, Material, Lightning, Atlassian, Radix, and Chakra
- Inspect color palettes with WCAG contrast labels
- See how components adapt in real time as you change the active system, accent color, theme mode, and border radius

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Radix UI primitives
- Class Variance Authority (CVA)

## Getting started

```bash
npm install
npm run dev
```

## Architecture

The app uses a three-layer CSS custom property system:

1. **Canonical tokens** (`--canonical-*`) — raw palette data injected at runtime
2. **Semantic mappings** (`src/styles/systems/*.css`) — map canonical tokens to design-system-specific names
3. **Dynamic overrides** (`--accent-*`, `--radius-selected`) — runtime values set by React context

See [docs/architecture.md](docs/architecture.md) for the full explanation.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint (oxlint) |
| `npm run preview` | Preview production build |

## License

MIT
