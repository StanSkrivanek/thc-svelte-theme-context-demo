// src/lib/theme/types.ts

/** User-facing theme options */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Actual rendered theme after resolving 'system' */
export type ResolvedTheme = 'light' | 'dark';

/** Theme context shape exposed to consumers */
export interface ThemeContext {
	readonly mode: ResolvedTheme;
	readonly preference: ThemePreference;
	readonly isDark: boolean;
	readonly isLight: boolean;
	readonly isSystem: boolean;
	setPreference: (theme: ThemePreference) => void;
	toggle: () => void;
	reset: () => void;
}
