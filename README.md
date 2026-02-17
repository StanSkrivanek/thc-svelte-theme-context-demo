# Theme System with Context

> **Companion demo for:** [Theme System with Context](https://hackpile.chronicles) on _The Hackpile Chronicles_

A production-ready theme system built with Svelte 5 runes and SvelteKit, demonstrating modern context patterns, SSR-safe state management, and nested theme overrides.

## Features

- **Three theme modes:** light, dark, and system (auto-detect)
- **Persistent preferences:** localStorage with cookie fallback for SSR
- **Nested theme overrides:** Force specific themes in component subtrees
- **Reactive & performant:** Built with Svelte 5 runes (`$state`, `$derived`)
- **SSR-safe:** No hydration mismatches or flashing
- **Accessible:** Proper ARIA labels and keyboard navigation
- **Type-safe:** Full TypeScript coverage

## Quick Start

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Architecture

### Core Files

```
src/lib/theme/
├── types.ts                    # Theme types
├── theme-context.svelte.ts     # Context logic with runes
├── ThemeProvider.svelte        # Root provider component
├── ThemeSelector.svelte        # Theme picker UI
└── ThemeToggle.svelte          # Quick toggle button
```

### Key Concepts

#### 1. Theme Context (`theme-context.svelte.ts`)

The heart of the system—manages theme state using Svelte 5 runes:

```typescript
export function createThemeContext(options?: CreateThemeOptions): ThemeContext {
	let systemMode = $state<ResolvedTheme>(getSystemPreference());
	let preference = $state<ThemePreference>('system');

	let mode = $derived.by<ResolvedTheme>(() => {
		const forced = getForceTheme();
		if (forced) return forced;
		return preference === 'system' ? systemMode : preference;
	});

	return {
		get mode() {
			return mode;
		},
		get preference() {
			return preference;
		},
		setPreference(theme) {
			/* ... */
		},
		toggle() {
			/* ... */
		}
		// ...
	};
}
```

**Key features:**

- Uses `$state` for reactive preference tracking
- Uses `$derived` for computed theme resolution
- Handles system preference changes with `matchMedia` listener
- Persists to localStorage and sets secure cookie

#### 2. SSR-Safe Initialization

Prevents hydration mismatches with inline script:

```svelte
<script>
	// Runs before hydration
	const preference = localStorage.getItem('theme-preference') || 'system';
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
	document.documentElement.setAttribute('data-theme', theme);
</script>
```

#### 3. Nested Theme Overrides

Force specific themes in component subtrees:

```svelte
<ThemeProvider forceTheme="dark">
	<!-- Always renders in dark mode -->
	<Card>Dark card content</Card>
</ThemeProvider>
```

## Usage Examples

### Basic Setup

```svelte
<!-- +layout.svelte -->
<script>
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte';
</script>

<ThemeProvider>
	<slot />
</ThemeProvider>
```

### Accessing Theme Context

```svelte
<script>
	import { getThemeContext } from '$lib/theme/theme-context.svelte';

	const theme = getThemeContext();
</script>

<button onclick={() => theme.toggle()}>
	Current: {theme.mode} (preference: {theme.preference})
</button>
```

### Using Theme Components

```svelte
<script>
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import ThemeSelector from '$lib/theme/ThemeSelector.svelte';
</script>

<!-- Quick toggle button -->
<ThemeToggle />

<!-- Full theme selector with icons -->
<ThemeSelector />
```

## API Reference

### `createThemeContext(options?)`

Creates a theme context instance.

**Options:**

- `forceTheme?: ResolvedTheme | (() => ResolvedTheme)` - Force a specific theme

**Returns:** `ThemeContext` with:

- `mode: ResolvedTheme` - Current resolved theme ('light' or 'dark')
- `preference: ThemePreference` - User preference ('light', 'dark', or 'system')
- `isDark: boolean` - Whether current mode is dark
- `isLight: boolean` - Whether current mode is light
- `isSystem: boolean` - Whether preference is 'system'
- `setPreference(theme: ThemePreference): void` - Update preference
- `toggle(): void` - Toggle between light and dark
- `reset(): void` - Reset to system default

### `<ThemeProvider>`

Root component that initializes theme context.

**Props:**

- `forceTheme?: ResolvedTheme` - Force a specific theme for nested override

### Types

```typescript
type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
```

## Styling

Themes are applied via CSS custom properties on `[data-theme]`:

```css
:root[data-theme='light'] {
	--color-background: #ffffff;
	--color-text: #1a1a1a;
}

:root[data-theme='dark'] {
	--color-background: #1a1a1a;
	--color-text: #ffffff;
}
```

Components automatically inherit theme via CSS variables.

## Testing Locally

1. Toggle themes using the UI controls
2. Open DevTools → Application → Local Storage to see persistence
3. Change system preference to test 'system' mode
4. Refresh page to verify no flash of wrong theme
5. Check nested overrides on demo cards

## Learn More

Read the full article: **[Theme System with Context](https://hackpilechronicles)** on _The Hackpile Chronicles_

Topics covered:

- Why context beats prop drilling for themes
- Svelte 5 runes vs. stores for state management
- SSR challenges and solutions
- Cookie vs. localStorage trade-offs
- Nested context patterns

## Contributing

This is a companion demo—feel free to fork and experiment!

## License

MIT
