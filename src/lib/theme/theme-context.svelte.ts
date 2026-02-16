// src/lib/theme/theme-context.svelte.ts

import { browser } from '$app/environment';
import { getContext, hasContext, setContext } from 'svelte';
import type { ResolvedTheme, ThemeContext, ThemePreference } from './types.js';

const THEME_KEY = Symbol('theme');
const STORAGE_KEY = 'theme-preference';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getSystemPreference(): ResolvedTheme {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadSavedPreference(): ThemePreference | null {
	if (!browser) return null;
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark' || saved === 'system') {
		return saved;
	}
	return null;
}

interface CreateThemeOptions {
	/** Force a specific theme (for nested overrides) */
	forceTheme?: ResolvedTheme | (() => ResolvedTheme | undefined);
}

/**
 * Creates the theme context. Call once in root layout,
 * or nested for local theme overrides.
 */
export function createThemeContext(options: CreateThemeOptions = {}): ThemeContext {
	const { forceTheme: forceThemeOption } = options;
	
	// Support both direct values and getter functions for reactivity
	const getForceTheme = typeof forceThemeOption === 'function' 
		? forceThemeOption 
		: () => forceThemeOption;

	// State
	let systemMode = $state<ResolvedTheme>(getSystemPreference());
	let preference = $state<ThemePreference>(loadSavedPreference() ?? 'system');

	// Derived values
	let mode = $derived.by<ResolvedTheme>(() => {
		const forced = getForceTheme();
		if (forced) return forced;
		if (preference === 'system') return systemMode;
		return preference;
	});

	let isDark = $derived(mode === 'dark');
	let isLight = $derived(mode === 'light');
	let isSystem = $derived(preference === 'system');

	// Effect: Listen for system preference changes
	$effect(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		function handleChange(event: MediaQueryListEvent) {
			systemMode = event.matches ? 'dark' : 'light';
		}

		systemMode = mediaQuery.matches ? 'dark' : 'light';
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	// Effect: Apply theme (skip for nested providers)
	$effect(() => {
		if (!browser || getForceTheme()) return;

		// This is ALL JavaScript needs to do!
		document.documentElement.dataset.theme = mode;
		document.documentElement.style.colorScheme = mode;
	});

	// Effect: Persist preference (skip for nested providers)
	$effect(() => {
		if (!browser || getForceTheme()) return;

		localStorage.setItem(STORAGE_KEY, preference);
		document.cookie = `${STORAGE_KEY}=${preference};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
	});

	// Effect: Update meta theme-color for mobile browsers
	$effect(() => {
		if (!browser || getForceTheme()) return;

		let meta = document.querySelector('meta[name="theme-color"]');
		if (!meta) {
			meta = document.createElement('meta');
			meta.setAttribute('name', 'theme-color');
			document.head.appendChild(meta);
		}

		// Read the CSS variable value
		const bg = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-background')
			.trim();
		meta.setAttribute('content', bg);
	});

	// Build context with getters for reactivity
	const context: ThemeContext = {
		get mode() {
			return mode;
		},
		get preference() {
			return preference;
		},
		get isDark() {
			return isDark;
		},
		get isLight() {
			return isLight;
		},
		get isSystem() {
			return isSystem;
		},

		setPreference(pref: ThemePreference) {
			preference = pref;
		},

		toggle() {
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

	return setContext(THEME_KEY, context);
}

export function getThemeContext(): ThemeContext {
	if (!hasContext(THEME_KEY)) {
		throw new Error('Theme context not found. Wrap your app in ThemeProvider.');
	}
	return getContext(THEME_KEY);
}

export function hasThemeContext(): boolean {
	return hasContext(THEME_KEY);
}
