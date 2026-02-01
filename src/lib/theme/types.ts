// src/lib/theme/types.ts

/** User-facing theme options */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Actual rendered theme after resolving 'system' */
export type ResolvedTheme = 'light' | 'dark';

/** Complete theme definition with design tokens */
export interface ThemeColors {
	// Backgrounds
	background: string;
	surface: string;
	surfaceHover: string;

	// Text
	foreground: string;
	foregroundMuted: string;
	foregroundSubtle: string;

	// Interactive
	primary: string;
	primaryHover: string;
	primaryForeground: string;

	// Semantic
	success: string;
	warning: string;
	error: string;
	info: string;

	// Structural
	border: string;
	borderFocus: string;
	shadow: string;
}

/** Theme context shape exposed to consumers */
export interface ThemeContext {
	readonly mode: ResolvedTheme;
	readonly preference: ThemePreference;
	readonly colors: ThemeColors;
	readonly isDark: boolean;
	readonly isLight: boolean;
	readonly isSystemPreference: boolean;
	setPreference: (theme: ThemePreference) => void;
	toggle: () => void;
	reset: () => void;
}
