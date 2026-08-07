# AGENTS.md

Project-specific rules and quality gates for AI coding agents working on this repository.

## Quality criteria (required for every implementation)

Before marking any task complete, verify:

1. **Is the code as simple as possible?** No unnecessary abstraction, no duplicated logic, no premature generalization.
2. **Is the code following best practices?** Correct React patterns, proper TypeScript typing, accessible markup, CSS that uses project variables instead of hardcoded values.
3. **Is the code as understandable as possible?** Clear naming, documented non-obvious decisions, no magic numbers or implicit behavior.
4. **Is the code as maintainable as possible?** Single source of truth for repeated logic, easy to extend, easy to debug.

## Cleanup checklist

Before considering any refactor or deletion complete:

1. Grep for all references to the feature being removed
2. Verify zero references remain
3. Build and lint — ensure no unused imports/variables
4. Review the diff — check for orphaned blank lines, empty blocks, or commented-out code

## Project-specific rules

These are the non-obvious decisions made for this codebase. Follow them without re-asking.

- Navigation uses **radio buttons + labels**, not dropdowns or button groups
- Keyboard navigation must work **on page load without a mouse click** — focus the checked item in the top-most layer immediately
- `scrollIntoView` uses `inline: 'nearest'`, never `'center'`
- Accent circles use `flex-shrink: 0` and must remain circles at any viewport width
- Checked accent outline uses `outline` (not `border`), with `var(--color-border)` as the color
- Hover and keyboard focus share the same visual treatment (white background for labels, white ring for accents)
- Clicking anywhere on a navigation row moves focus to the checked item in that row
- All navigation rows scroll horizontally when content overflows, with `scroll-padding-inline: 0.75rem`
- The `DesignSystem` type, `systems` array in `SystemSwitcher`, and palette keys in `palettes.ts` must stay in sync
- When adding a new design system: palette data → CSS file → type + selector entry → theme mapping in `injectCanonicalTokens`
