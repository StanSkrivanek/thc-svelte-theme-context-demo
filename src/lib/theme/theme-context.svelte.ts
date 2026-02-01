// src/lib/theme/theme-context.svelte.ts

import { setContext, getContext, hasContext } from 'svelte';
import { browser } from '$app/environment';
import { themes } from './colors';
import type { ThemeColors, ThemePreference, ResolvedTheme, ThemeContext } from './types';

// Context key (Symbol for collision safety)
const THEME_KEY = Symbol('theme');

// Storage key for localStorage
const STORAGE_KEY = 'theme-preference';

/**
 * Detects the operating system's color scheme preference.
 * Returns 'dark' if the user prefers dark mode, 'light' otherwise.
 */
function getSystemPreference(): ResolvedTheme {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Loads the saved theme preference from localStorage.
 * Returns null if no preference is saved or if not in browser.
 */
function loadSavedPreference(): ThemePreference | null {
	if (!browser) return null;

	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark' || saved === 'system') {
		return saved;
	}
	return null;
}

/**
 * Applies CSS custom properties to the document root.
 * This makes theme colors available to all components via var(--color-name).
 */
function applyCSSProperties(colors: ThemeColors): void {
	if (!browser) return;

	const root = document.documentElement;

	// Set each color as a CSS custom property
	root.style.setProperty('--color-background', colors.background);
	root.style.setProperty('--color-surface', colors.surface);
	root.style.setProperty('--color-surface-hover', colors.surfaceHover);

	root.style.setProperty('--color-foreground', colors.foreground);
	root.style.setProperty('--color-foreground-muted', colors.foregroundMuted);
	root.style.setProperty('--color-foreground-subtle', colors.foregroundSubtle);

	root.style.setProperty('--color-primary', colors.primary);
	root.style.setProperty('--color-primary-hover', colors.primaryHover);
	root.style.setProperty('--color-primary-foreground', colors.primaryForeground);

	root.style.setProperty('--color-success', colors.success);
	root.style.setProperty('--color-warning', colors.warning);
	root.style.setProperty('--color-error', colors.error);
	root.style.setProperty('--color-info', colors.info);

	root.style.setProperty('--color-border', colors.border);
	root.style.setProperty('--color-border-focus', colors.borderFocus);
	root.style.setProperty('--color-shadow', colors.shadow);
}

interface CreateThemeOptions {
	/** Force a specific theme (for local overrides) */
	forceTheme?: ResolvedTheme;
	/** Custom storage key for localStorage */
	storageKey?: string;
}

/**
 * Creates the theme context and sets it up for descendants to use.
 * This should be called once in your root layout or app component,
 * or nested for local theme overrides.
 */
export function createThemeContext(options: CreateThemeOptions = {}): ThemeContext {
	const { forceTheme, storageKey = STORAGE_KEY } = options;

	// Initialize preference from saved value or default to 'system'
	const initialPreference = loadSavedPreference() ?? 'system';

	// Track the current system preference (may change while app is running)
	let systemMode = $state<ResolvedTheme>(getSystemPreference());

	// User's explicit preference
	let preference = $state<ThemePreference>(initialPreference);

	// Resolved mode: what we're actually displaying
	// Use $derived.by for complex logic
	const mode = $derived.by<ResolvedTheme>(() => {
		if (forceTheme) return forceTheme;
		if (preference === 'system') return systemMode;
		return preference;
	});

	// Current color palette based on resolved mode
	const colors = $derived<ThemeColors>(themes[mode]);

	// Convenience booleans
	const isDark = $derived(mode === 'dark');
	const isLight = $derived(mode === 'light');
	const isSystemPreference = $derived(preference === 'system');

	// Effect: Listen for system preference changes
	$effect(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		function handleChange(event: MediaQueryListEvent) {
			systemMode = event.matches ? 'dark' : 'light';
		}

		// Update current value
		systemMode = mediaQuery.matches ? 'dark' : 'light';

		// Listen for changes
		mediaQuery.addEventListener('change', handleChange);

		// Cleanup listener on unmount
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	// Effect: Persist preference to localStorage (skip for forced themes)
	$effect(() => {
		if (!browser || forceTheme) return;
		localStorage.setItem(storageKey, preference);
	});

	// Effect: Set data-theme attribute on document (skip for nested providers)
	$effect(() => {
		if (!browser || forceTheme) return;
		document.documentElement.setAttribute('data-theme', mode);
	});

	// Effect: Apply CSS custom properties (skip for nested providers)
	$effect(() => {
		if (forceTheme) return;
		applyCSSProperties(colors);
	});

	// Effect: Update meta theme-color for mobile browsers
	$effect(() => {
		if (!browser || forceTheme) return;

		let metaThemeColor = document.querySelector('meta[name="theme-color"]');

		if (!metaThemeColor) {
			metaThemeColor = document.createElement('meta');
			metaThemeColor.setAttribute('name', 'theme-color');
			document.head.appendChild(metaThemeColor);
		}

		metaThemeColor.setAttribute('content', colors.background);
	});

	// Build the context object with getters for reactivity
	const context: ThemeContext = {
		get mode() {
			return mode;
		},
		get preference() {
			return preference;
		},
		get colors() {
			return colors;
		},
		get isDark() {
			return isDark;
		},
		get isLight() {
			return isLight;
		},
		get isSystemPreference() {
			return isSystemPreference;
		},

		setPreference(pref: ThemePreference) {
			preference = pref;
		},

		toggle() {
			// If currently following system, switch to explicit opposite
			// If already explicit, toggle between light and dark
			if (preference === 'system') {
				preference = mode === 'dark' ? 'light' : 'dark';
			} else {
				preference = preference === 'dark' ? 'light' : 'dark';
			}
		},

		reset() {
			preference = 'system';
		}
	};

	// Register the context
	return setContext(THEME_KEY, context);
}

/**
 * Retrieves the theme context. Must be called from a component
 * that is a descendant of a ThemeProvider.
 */
export function getThemeContext(): ThemeContext {
	if (!hasContext(THEME_KEY)) {
		throw new Error(
			'Theme context not found. ' + 'Ensure your component is wrapped in a ThemeProvider.'
		);
	}
	return getContext(THEME_KEY);
}

/**
 * Checks if theme context is available.
 * Useful for components that can work with or without theming.
 */
export function hasThemeContext(): boolean {
	return hasContext(THEME_KEY);
}
